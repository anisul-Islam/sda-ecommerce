import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchProducts, findProductById } from '../../redux/slices/products/productSlice'

const categories = {
  1: 'Electronics',
  2: 'Computers',
  3: 'Mobile Phones',
  4: 'Gaming',
  5: 'Photography',
  6: 'Health & Fitness',
  7: 'Home Entertainment',
  8: 'Home Appliances',
  9: 'Audio',
  10: 'Storage'
}

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { singleProduct, isLoading, error } = useSelector((state: RootState) => state.productsR)
  const { categories } = useSelector((state: RootState) => state.categoriesR)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    // dispatch(fetchProducts()).then(() => dispatch(findProductById(Number(id))))
    // fetch the data from the store then make the request
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const getCategoryNameById = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId)
    return category ? category.name + ', ' : 'Category not found'
  }

  return (
    <div>
      {singleProduct && (
        <div className="product-details">
          <div className="product-details__left">
            <img src={singleProduct.image} alt={singleProduct.name} />
          </div>
          <div className="product-details__right">
            <h3>Name: {singleProduct.name}</h3>
            <p>Description: {singleProduct.description}</p>
            <p>Price: {singleProduct.price}</p>
            <p>
              Categories:{' '}
              {singleProduct.categories &&
                singleProduct.categories.map((categoryId) => getCategoryNameById(categoryId))}
            </p>
            <p>Sizes: {singleProduct.sizes && singleProduct.sizes.join(', ')}</p>
            <div>
              <button
                className="btn product__btn"
                onClick={() => {
                  navigate('/')
                }}>
                Back To Shopping
              </button>
              <button className="btn product__btn">Add To cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
