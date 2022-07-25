import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { chooseCategory } from '../redux/actions';
import { fetchProductsFromCategory } from '../services/fetchAPI';
import Loading from './Loading';
import './buttonCategory.css';

class ButtonCategory extends Component {
  constructor() {
    super();

    this.state = {
      loadingProducts: false,
    }
  }

  handleClick = async (value) => {
    const { chooseCategoryFunc } = this.props;
    this.setState({
      loadingProducts: true,
    })
    const products = await fetchProductsFromCategory(value);
    console.log(products);
    chooseCategoryFunc(products)
    this.setState({
      loadingProducts: false,
    })
  }

  render() {
    const { category } = this.props;
    const { loadingProducts } = this.state;
    return (
      <button
        type="button"
        className="btn-category"
        value={category.id}
        onClick={ ({ target: { value } }) => this.handleClick(value)}
      >
        { loadingProducts ? <Loading />
        : category.name}
        
      </button>
      )}
  }

const mapDispatchToProps = (dispatch) => ({
  chooseCategoryFunc: (category) => dispatch(chooseCategory(category))
})

ButtonCategory.propTypes = {
  category: PropTypes.objectOf(PropTypes.any).isRequired,
  chooseCategoryFunc: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(ButtonCategory);