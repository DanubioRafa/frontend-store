import React, { Component } from 'react'
import { connect } from 'react-redux';
import ButtonCategory from '../components/ButtonCategory';
import Loading from '../components/Loading';
import ProductHomeCard from '../components/ProductHomeCard';
import { fetchCategories } from '../services/fetchAPI';
import { productsDefault } from '../data/data';

import './home.css';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      categories: '',
      loadingCategories: true,
    }
  }

  async componentDidMount() {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
    const allCategories = await fetchCategories(endpoint);

    this.setState({
      categories: allCategories,
      loadingCategories: false,
    })
  }

  render() {
    const { categories, loadingCategories } = this.state;
    const { products } = this.props;
    return (
      <div className="home">
        <section className="categories">
        { loadingCategories ? 
        <Loading />
        : categories.map((category) => <ButtonCategory key={category.id} category={category} />)}
        </section>
        <section className="products">
          { products.length ? 
            products.map((product) =>  <ProductHomeCard key={product.id} product={product} />)
          : (
            <div>
              <h3>Produtos Recomendados</h3>
              <section className="products">
                {productsDefault.map((product) =>  <ProductHomeCard key={product.id} product={product} />)}
              </section>
            </div>)
            }
        </section>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  products: store.categoryReducer.products,
});

export default connect(mapStateToProps, null)(Home);

