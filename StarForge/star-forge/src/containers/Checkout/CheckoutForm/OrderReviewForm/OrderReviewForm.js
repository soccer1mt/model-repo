import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';

import MaterialUIButton from '../../../../components/UI/Button/MaterialUIButton'

import Checkbox from '@material-ui/core/Checkbox';
import DeliveryDetails from './DeliveryDetails/DeliveryDetails';
import ItemHeader from './ItemHeader/ItemHeader';
import ItemDescriptionCard from './ItemDescriptionCard/ItemDescriptionCard';

const styles = theme => ({
    holder: {
        overflow: 'auto'
    },
    header: {
        width: '100%',
        borderTop: '.05rem solid black',
    },
    logo: {
        textAlign: 'center',
        height: '3rem'
    },   
    text: {
        marginLeft: '.25rem'
    },
    escape: {
        color: '#696969',
        top: '.3rem',
        right: '.3rem',
        position: 'absolute',
        cursor: 'pointer',
        zIndex: 101,
        '&:hover': {
            color: 'black',
          }
      }, 
    buttonText: {
        fontSize: '.8rem'
    }  

})

class OrderReviewForm extends Component {
    state = {
        confirmedTOS: false
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        };

    render() {

    return (
    <div className={this.props.classes.holder}>
        <div className={this.props.classes.logo}>
            <p>1. Delivery > 2. Payment > <span style={{fontWeight: 'bold'}}>3. Place Order</span></p>
            <FontAwesomeIcon 
                    className={this.props.classes.escape} 
                    icon={['fas', 'times-circle']} 
                    size="1x" 
                    onClick={this.props.close}/>
        </div>
        <div className={this.props.classes.header}>
            <div className={this.props.classes.text}>
                <h1>Place Your Order</h1>
                <p style={{fontSize: '1rem'}}>Please check your delivery and payment details below before placing your order.</p>
                <div style={{fontSize: '1rem', marginLeft: '25%'}}>
                    <Checkbox
                        style={{display: 'inline-block', fontSize: '1rem'}}
                        checked={this.state.confirmedTOS}
                        onChange={this.handleChange('confirmedTOS')}
                        value="confirmedTOS"
                        color="primary"/>
                    <p style={{display: 'inline-block', fontSize: '1rem ', borderRight: '.05rem solid grey', paddingRight: '.65rem'}}>i accept the s&f terms and conditions</p>
                    <div style={{display: 'inline-block', fontSize: '1rem '}}>            
                        <MaterialUIButton
                            classes={{label : this.props.classes.buttonText}}
                            disabled={false}
                            variant="contained"
                            color="primary"
                            clicked={this.handleChange}>place order and pay
                        </MaterialUIButton>
                    </div>
                </div>
                <DeliveryDetails address={this.props.addresses}/>
                <ItemHeader numItems={this.props.numItems} mode={this.props.shippingMode}/>
                {this.props.cart ? this.props.cart.map((item, index) => (
                    <ItemDescriptionCard
                        key={index}
                        image={item.image}
                        name={item.title}
                        description={item.description}
                        material={item.matType}
                        price={item.price}
                        />
                 )) : null}
            </div>
        </div>  
    </div>
    )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.shoppingCart.cartProducts.items,
        cardData: state.order.cardData,
        addresses: state.order.addresses,
        numItems: state.shoppingCart.cartTotals.item.productQuantity,
        shippingMode: state.shoppingCart.cartTotals.mode
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderReviewForm));