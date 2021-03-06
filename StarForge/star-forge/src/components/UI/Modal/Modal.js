import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/_Aux/_Aux';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.outer}                           style={{
                    zIndex: this.props.show ? '500' : '-1',
                    //transform: this.props.show ? 'translateY(0)' : 'translateY(100vh)',
                    opacity: this.props.show ? '1' : '0'}}>
                    <div className={classes.middle}                           style={{
                            zIndex: this.props.show ? '500' : '-1',
                            //transform: this.props.show ? 'translateY(0)' : 'translateY(100vh)',
                            opacity: this.props.show ? '1' : '0'}}>
                        <div className={classes.inner}                    
                            style={{
                            zIndex: this.props.show ? '500' : '-1',
                            //transform: this.props.show ? 'translateY(0)' : 'translateY(100vh)',
                            opacity: this.props.show ? '1' : '0'}}>
                                {this.props.children}
                        </div>
                    </div>
                </div>

            </Aux>
        )
    }
}

export default Modal;
