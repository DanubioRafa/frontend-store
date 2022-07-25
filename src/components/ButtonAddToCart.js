import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../redux/actions';
import PropTypes from 'prop-types';

class ButtonAddToCart extends Component {
  constructor() {
    super();

    this.state = {
      isThisProductAdded: false,
    }
  }

  addOrRemove = (product) => {
    const { isThisProductAdded } = this.state;
    const { addItemToCartFunc, removeItemFromCartFunc } = this.props;

    if(isThisProductAdded) {
      removeItemFromCartFunc(product)
      this.setState({
        isThisProductAdded: false,
      })
    } else {
      addItemToCartFunc(product);
      this.setState({
        isThisProductAdded: true,
      })
    }
  }

  render() {
    const { product } = this.props;
    const { isThisProductAdded } = this.state;
    return (
      <button onClick={ () => this.addOrRemove(product) }>{
        isThisProductAdded ? 'Remover do carrinho' : 'Adicionar ao carrinho'
      }</button>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItemToCartFunc: (product) => dispatch(addItemToCart(product)), 
  removeItemFromCartFunc: (product => dispatch(removeItemFromCart(product))),
})

ButtonAddToCart.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  addItemToCartFunc: PropTypes.func.isRequired,
  removeItemFromCartFunc: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(ButtonAddToCart);
