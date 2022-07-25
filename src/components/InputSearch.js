import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchProduct } from '../redux/actions';
import { fetchProductsBySearch } from '../services/fetchAPI';
import './inputSearch.css';


class InputSearch extends Component {
  constructor() {
    super();

    this.state = {
      loadingProducts: false,
      inputSearch: '',
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    })
  }

  searchClick = async () => {
    const { inputSearch } = this.state;
    const { searchProductFunc } = this.props;
    const products = await fetchProductsBySearch(inputSearch);
    searchProductFunc(products);
  }

  render() {
    return (
      <div>
      <input onChange={ this.handleChange } name="inputSearch" className="input-search" type="text" placeholder="Busque aqui"/>
      <button onClick={ this.searchClick }>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchProductFunc: (products) => dispatch(searchProduct(products))
})

export default connect(null, mapDispatchToProps)(InputSearch);
