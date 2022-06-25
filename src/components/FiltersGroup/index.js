import './index.css'

const FiltersGroup = props => {
  const {
    onChangeRatingId,
    onChangeCategoryId,
    ratingsList,
    categoryOptions,
    onClearFilter,
  } = props

  const renderCategoryList = eachCategory => {
    const {categoryId, name} = eachCategory

    const categoryClicked = () => {
      onChangeCategoryId(categoryId)
    }
    return (
      <li>
        <button onClick={categoryClicked} type="button">
          <p> {name}</p>
        </button>
      </li>
    )
  }

  const renderRatingList = ratingItem => {
    const {imageUrl, ratingId} = ratingItem
    const altName = `rating${ratingId}`
    console.log(altName)

    const ratingClicked = () => {
      onChangeRatingId(ratingId)
    }
    return (
      <li>
        <button onClick={ratingClicked} type="button">
          <img className="rating-image" src={imageUrl} alt={altName} />
        </button>
      </li>
    )
  }

  const clearFilter = () => {
    onClearFilter()
  }

  return (
    <div>
      <h3>Category</h3>
      <ul type="none">
        {categoryOptions.map(eachCategory => renderCategoryList(eachCategory))}
      </ul>
      <h3>Rating</h3>
      <ul type="none">
        {ratingsList.map(ratingItem => renderRatingList(ratingItem))}
      </ul>
      <button type="button" onClick={clearFilter}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
