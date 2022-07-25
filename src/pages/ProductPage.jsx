import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { fetchProductByID } from '../services/fetchAPI';
import './productPage.css';
import ButtonAddToCart from '../components/ButtonAddToCart';

export default class ProductPage extends Component {
  constructor() {
    super();

    this.state = {
      product: {},
      pictures: [],
      imageIndex: 0,
      currentPicture: 'url',
    }
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await fetchProductByID(id);
    const { pictures } = product;
    console.log(product);
    this.setState({ 
      product,
      pictures,
      currentPicture: pictures[0].url,
    })
  }

  clickNextImage = () => {
    const { pictures } = this.state;
      this.setState((prevState) => ({
        imageIndex: prevState.imageIndex < pictures.length - 1
        ? prevState.imageIndex + 1
        : prevState.imageIndex,
      }),
      () => {
        const { imageIndex } = this.state;
        this.setState({ currentPicture: pictures[imageIndex].url});
      })
  }

  clickPreviousImage = () => {
    const { pictures } = this.state;
    const minIndex = 0;
      this.setState((prevState) => ({
        imageIndex: prevState.imageIndex > minIndex
        ? prevState.imageIndex - 1
        : prevState.imageIndex,
      }),
      () => {
        const { imageIndex } = this.state;
        this.setState({ currentPicture: pictures[imageIndex].url});
      });
  }

  render() {
    const { product, currentPicture, imageIndex, pictures } = this.state;
    return (
      <main className="productPage">
        <h2>{product.title}</h2>
        <div className="imageContainer">
        { currentPicture ? <img className="imageProduct" src={currentPicture} alt={product.id} />
          : <></>}
          <div className='buttonsContainer'>
            <button id="btn-previous" onClick={ this.clickPreviousImage } >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
              </svg>
            </button>
            <p>{`${imageIndex + 1}/${pictures.length}`}</p>
            <button onClick={ this.clickNextImage }>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
              </svg>
            </button>
          </div>
          <div className="containerPrice">
          <p>{`R$${product.price}`}</p>
          <p>{`Unidades vendidas: ${product.sold_quantity}`}</p>
          <p>{`Restam ${product.available_quantity} UNID`}</p>
          <ButtonAddToCart product={ product }/>
          </div>
        </div>

      </main>
    )
  }
}

ProductPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
}
