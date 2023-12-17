import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { Product, searchProduct } from '../../redux/slices/products/productSlice'
import SortProducts from '../../components/SortProducts'
import SearchInput from '../../components/SearchInput'
import useCategoryState from '../../hooks/useCategoryState'
import { prices } from '../../prices'
import { addItemToCart } from '../../redux/slices/cart/cartSlice'

const Home = () => {
  const dispatch: AppDispatch = useDispatch()
  const { products, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsR
  )
  const { categories } = useCategoryState()

  const [checkedCategories, setCheckedCategories] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([])

  // currentPageNumber , itemsPerPage
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(2)

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProduct(event.target.value))
  }

  // handle checkbox change
  const handleCheckedCategoryChange = (categoryId: number) => {
    if (checkedCategories.includes(categoryId)) {
      // remove the category name here from the array
      const filteredCategories = checkedCategories.filter((c) => c !== categoryId)
      setCheckedCategories(filteredCategories)
    } else {
      setCheckedCategories((prevState) => {
        return [...prevState, categoryId]
      })
    }
  }

  const handlePriceChange = (priceId: number) => {
    // find the range based on id
    const selectedPriceObj = prices.find((price) => price.id === priceId)
    if (selectedPriceObj) {
      setPriceRange(selectedPriceObj.range)
    }
  }

  const filterProducts = products.filter((product) => {
    const categoryMatch =
      checkedCategories.length > 0
        ? checkedCategories.some((id) => product.categories.includes(Number(id)))
        : product

    const priceMatch =
      priceRange.length > 0
        ? product.price >= priceRange[0] && product.price <= priceRange[1]
        : product

    const searchMatch =
      searchTerm !== '' ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : product

    return categoryMatch && priceMatch && searchMatch
  })

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage // 6
  const indexOfFirstItem = indexOfLastItem - itemsPerPage // 6 - 3 = 3
  const currentItems = filterProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleAddToCart = (product: Product) => {
    console.log(product)
    // dispatch an action - addToCart
    dispatch(addItemToCart(product))
    // toast
  }

  const buttonElements = []
  for (let i = 2; i <= totalPages - 1; i++) {
    buttonElements.push(
      <button
        onClick={() => {
          handlePageChange(i)
        }}>
        {i}
      </button>
    )
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Filter by price</h2>
        {prices.length > 0 &&
          prices.map((price) => {
            return (
              <div key={price.id}>
                <label htmlFor="price">
                  <input
                    type="radio"
                    name="price"
                    value={price.id}
                    onChange={() => {
                      handlePriceChange(price.id)
                    }}
                  />
                  {price.name}
                </label>
              </div>
            )
          })}

        <h2>Filter by category</h2>
        <div>
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <div key={category.id}>
                  <label htmlFor="category">
                    <input
                      type="checkbox"
                      name="category"
                      value={category.name}
                      onChange={() => {
                        handleCheckedCategoryChange(category.id)
                      }}
                    />
                    {category.name}
                  </label>
                </div>
              )
            })}
        </div>
      </div>
      <div className="main-content">
        <div className="actions">
          <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
          <SortProducts />
        </div>

        <section className="products">
          {currentItems.length > 0 &&
            currentItems.map((product: Product) => {
              return (
                <article key={product.id} className="product card">
                  <img src={product.image} alt={product.name} className="product__img" />
                  <div className="product__body">
                    <h3 className="product__name">{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="product__price">{product.price} euros</p>
                    <div className="flex-center">
                      <button
                        className="btn product__btn"
                        onClick={() => {
                          handleAddToCart(product)
                        }}>
                        Add To Cart
                      </button>
                      <Link to={`/products/${product.id}`}>
                        <button className="btn product__btn">Show Details</button>
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
        </section>

        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            previous
          </button>
          <>{buttonElements}</>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
