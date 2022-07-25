import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import ProductCartCard from '../components/ProductCartCard';
import './cart.css'

class Cart extends Component {  
  constructor() {
    super();

    this.state = {
      priceProducts: 0,
      shippingPrice: 0,
    }
  }

  componentDidMount() {
    this.totalProducts();

    this.setState({
      shippingPrice: this.shippingGenerator(),
    })
    
  }

  totalProducts = () => {
    const { productsOnCart } = this.props;

    const result = productsOnCart.reduce((acc, product) => acc + product.price, 0).toFixed(2);
    console.log(result);
    this.setState({
      priceProducts: result,
    });
  }

  sumPrice = (price) => {
    this.setState((prevState) => ({
      priceProducts: (parseInt(prevState.priceProducts) + price).toFixed(2),
    }));
  }

  shippingGenerator = () => {
    const { productsOnCart } = this.props;
    const isAllFree = productsOnCart.every((product) => product.shipping.free_shipping);

    if(isAllFree) return "Grátis"
    return `R$${(Math.random() * 100).toFixed(2)}`;
  }

  render() {
    const { productsOnCart } = this.props;
    const { priceProducts, shippingPrice } = this.state;
    return (
      <main className="cart">
        { productsOnCart.length ?
        <>
        <section className="containerProducts">
          {
            productsOnCart.map((product) => <ProductCartCard key={ product.id } sumPrice={this.sumPrice} product={product} />)
          }
        </section>
        <section className="containerFinish">
          <p>
            Valor dos produtos: R$
            { 
              priceProducts < 0 ? 0.00 : priceProducts
            }
            </p>
          <p>{`Frete: ${shippingPrice}`}</p>
          <p>
            {`Total: R$${(parseInt(priceProducts) + (
              (typeof shippingPrice) === String 
              ? (parseInt(shippingPrice)).toFixed(2)
              : 0 )).toFixed(2)
              }`}
          </p>
          <button className="button-finishbuy">Finalizar Compra</button>
        </section>
        </>
        : <section className="emptyCart">
            <p>Carrinho Vazio</p>
          </section>
        }
      </main>
    )
  }
}

const mapStateToProps = (store) => ({
  productsOnCart: store.cartReducer.productsOnCart,
})

Cart.propTypes = {
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(mapStateToProps, null)(Cart);
