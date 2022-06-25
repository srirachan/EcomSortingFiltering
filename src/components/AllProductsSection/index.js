import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: 'initial',
    activeOptionId: sortbyOptions[0].optionId,
    titleSearch: '',
    category: '',
    rating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: 'loading',
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, titleSearch, category, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`
    console.log(apiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: 'success',
      })
    } else {
      this.setState({isLoading: 'failure'})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  onChangeInputSearch = value => {
    this.setState({titleSearch: value}, this.getProducts)
  }

  onChangeRatingId = ratingId => {
    this.setState({rating: ratingId}, this.getProducts)
  }

  onChangeCategoryId = categoryId => {
    this.setState({category: categoryId}, this.getProducts)
  }

  onClearFilter = () => {
    console.log('hello')
    this.setState(
      {
        titleSearch: '',
        category: '',
        rating: '',
        activeOptionId: sortbyOptions[0].optionId,
      },
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    if (productsList.length === 0) {
      return (
        <div className="dum-container">
          <div className="filtered-container">
            <FiltersGroup
              onChangeRatingId={this.onChangeRatingId}
              onChangeCategoryId={this.onChangeCategoryId}
              ratingsList={ratingsList}
              categoryOptions={categoryOptions}
              onClearFilter={this.onClearFilter}
              onChangeInputSearch={this.onChangeInputSearch}
            />
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              alt="no products"
              className="error-image"
            />
            <h1>No Products Found</h1>
            <p>We couldnot any products Try other filters</p>
          </div>
        </div>
      )
    }
    return (
      <div className="dum-container">
        <div className="filtered-container">
          <FiltersGroup
            onChangeRatingId={this.onChangeRatingId}
            onChangeCategoryId={this.onChangeCategoryId}
            ratingsList={ratingsList}
            categoryOptions={categoryOptions}
            onClearFilter={this.onClearFilter}
            onChangeInputSearch={this.onChangeInputSearch}
          />
        </div>

        <div className="all-products-container">
          <ProductsHeader
            activeOptionId={activeOptionId}
            sortbyOptions={sortbyOptions}
            changeSortby={this.changeSortby}
          />
          <div className="sub-container">
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {isLoading} = this.state

    switch (isLoading) {
      case 'success':
        return this.renderProductsList()

      case 'failure':
        return (
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
            alt="products failure"
            className="error-image"
          />
        )

      case 'loading':
        return this.renderLoader()

      default:
        return null
    }
  }
}

export default AllProductsSection
