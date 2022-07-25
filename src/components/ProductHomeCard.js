import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ButtonAddToCart from './ButtonAddToCart';
import './productHomeCard.css'

export default class ProductHomeCard extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="product-home-card">
        <Link to={`/product/${product.id}`}>
        <h3>{product.title}</h3>
        <img src={product.thumbnail} alt={product.title} />
        <p>{`R$${product.price}`}</p>
        <p className="unid">{`Restam ${product.available_quantity} UNID`}</p>
        { product.shipping.free_shipping ? <p>Frete Grátis</p> : <></>}
        </Link>
        <ButtonAddToCart product={ product }/>
      </div>
    )
  }
}