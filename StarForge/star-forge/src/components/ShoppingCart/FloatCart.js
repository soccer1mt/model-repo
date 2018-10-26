import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadCart, removeProduct } from '../../store/actions/shoppingCart/floatCartActions';
import { updateCart } from '../../store/actions/shoppingCart/updateCartActions';

import classes from './FloatCart.css';
import CartProduct from './CartProduct';
import persistentCart from "./persistentCart";
import util from './util';


class FloatCart extends Component {

  state = {
    isOpen: false,
  };

  componentWillMount() {
    this.props.loadCart( JSON.parse(persistentCart().get()) || [] );
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.updateCart(this.props.cartProducts);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }

  openFloatCart = () => {
    this.props.open();
  }

  closeFloatCart = () => {
    this.props.close();
  }

  addProduct = (product) => {
    const { cartProducts, updateCart } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
    this.openFloatCart();
  }

  removeProduct = (product) => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  }

  proceedToCheckout = () => {
    const { totalPrice, productQuantity, currencyFormat, currencyId } = this.props.cartTotals;

    if (!productQuantity) {
      alert("Add some product in the bag!");
    }else {
      alert(`Checkout - Subtotal: ${currencyFormat} ${util.formatPrice(totalPrice, currencyId)}`);
    }
  }

  render() {
    const { cartTotals, cartProducts, removeProduct } = this.props;

    const products = cartProducts.map(p => {
      return (
        <CartProduct
          product={p}
          removeProduct={removeProduct}
          key={p.id}
        />
      );
    });

    let floatClass = [classes['float-cart']];

    if (!!this.props.show) {
      floatClass.push(classes['float-cart--open']);
    }

    return (
      <div className={floatClass.join(' ')}>
        {/* If cart open, show close (x) button */}
        {this.props.show && (
          <div
            onClick={() => this.closeFloatCart()}
            className={classes['float-cart__close-btn']}
          >
          X
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.props.show && (
          <span
            onClick={() => this.openFloatCart()}
            className={classes['bag bag--float-cart-closed']}
          >
            <span className={classes['bag__quantity']}>{cartTotals.productQuantity}</span>
          </span>
        )}

        <div className={classes['float-cart__content']}>
          <div className={classes['float-cart__header']}>
            <span className={classes['bag']}>
              <span className={classes['bag__quantity']}>
                {cartTotals.productQuantity}
              </span>
            </span>
            <span className={classes['header-title']}>Bag</span>
          </div>

          <div className={classes['float-cart__shelf-container']}>
            {products}
            {!products.length && (
              <p className={classes['shelf-empty']}>
                Add some product in the bag <br />:)
              </p>
            )}
          </div>

          <div className={classes['float-cart__footer']}>
            <div className={classes['sub']}>SUBTOTAL</div>
            <div className={classes['sub-price']}>
              <p className={classes['sub-price__val']}>
                {`${cartTotals.currencyFormat} ${util.formatPrice(cartTotals.totalPrice, cartTotals.currencyId)}`}
              </p>
              <small className={classes['sub-price__installment']}>
                {!!cartTotals.installments && (
                  <span>
                    {`OR UP TO ${cartTotals.installments} x ${cartTotals.currencyFormat} ${util.formatPrice(cartTotals.totalPrice / cartTotals.installments, cartTotals.currencyId)}`}
                  </span>
                )}
              </small>
            </div>
            <div onClick={() => this.proceedToCheckout()} className={classes['buy-btn']}>
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FloatCart.propTypes = {
  loadCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.array.isRequired,
  newProduct: PropTypes.object,
  removeProduct: PropTypes.func,
  productToRemove: PropTypes.object,
};

const mapStateToProps = state => ({
  cartProducts: state.shoppingCart.cartProducts.items,
  newProduct: state.shoppingCart.cartProducts.item,
  productToRemove: state.shoppingCart.cartProducts.itemToRemove,
  cartTotals: state.shoppingCart.cartTotals.item,
});

export default connect(mapStateToProps, { loadCart, updateCart, removeProduct})(FloatCart);