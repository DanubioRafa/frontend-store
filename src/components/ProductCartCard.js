import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './productCartCard.css';
import ButtonRemoveFromCart from './ButtonRemoveFromCart';

export default class ProductCartCard extends Component {
  constructor() {
    super();

    this.state = {
      quantity: 1,
      price: 0,
    }
  }

  addOneItem = () => {
    const { product: { available_quantity }, sumPrice, product: { price } } = this.props;
    this.setState((prevState) => ({
      quantity: prevState.quantity < available_quantity ?
        prevState.quantity + 1 : prevState.quantity,
    }));
    sumPrice(price);
  }

  removeOneItem = () => {
    const { sumPrice, product: { price } } = this.props;
    const { quantity } = this.state;
    const minQuantity = 0;
    this.setState((prevState) => ({
      quantity: prevState.quantity > minQuantity ?
        prevState.quantity - 1 : prevState.quantity,
    }));

    if(quantity > 0) sumPrice(( price * -1 ))
  }

  removeItemFromCart = () => {
    const { sumPrice, product: { price } } = this.props;

    sumPrice(( price * -1 ))
  }
    

  handleChange = ({ target }) => {
    const { name, value} = target;

    this.setState({
      [name]: value,
    })
  }

  priceQuantity = (price) => {
    const { quantity } = this.state;
    const totalPrice = (quantity * price).toFixed(2);
    
    return totalPrice;
  }

  render() {
    const { product } = this.props;
    const { quantity } = this.state;
    return (
      <div className="productCartCard">
        <img src={product.thumbnail} alt={ product.title }/>
        <h5 className="productTitle">{product.title}</h5>
        <div className="container-buttons">
          <button onClick={ this.removeOneItem }>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
              <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
            </svg>
          </button>
          <input name="quantity" type="number" value={ quantity } onChange={ this.handleChange } />
          <button onClick={ this.addOneItem }>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
              <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
            </svg>
          </button>
          <ButtonRemoveFromCart removeItem={ this.removeItemFromCart } product={ product }/>
        </div>
        <div className="containerPriceProduct">
          <p>{`R$${this.priceQuantity(product.price)}`}</p>
        </div>
        
      </div>
    )
  }
}

ProductCartCard.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  sumPrice: PropTypes.func.isRequired,
}


