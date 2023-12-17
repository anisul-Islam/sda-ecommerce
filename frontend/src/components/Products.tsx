import React, { ChangeEvent, FormEvent, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import {
  Product,
  addProduct,
  deleteProduct,
  updateProduct
} from '../redux/slices/products/productSlice'

const initialProductData = {
  id: 0,
  name: '',
  image: '',
  description: '',
  categories: [0, 0],
  variants: ['0', '0'],
  sizes: ['0', '0'],
  price: 0
}

const Products = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.productsR)

  const [isEdit, setIsEdit] = useState(false)

  const dispatch: AppDispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchProducts())
  // }, [])

  const [product, setProduct] = useState({ ...initialProductData })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setProduct((prevProduct) => {
      return { ...prevProduct, [name]: value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!isEdit) {
      dispatch(addProduct(product))
    } else {
      dispatch(updateProduct(product))
    }
    // Reset the form after submission
    setProduct({ ...initialProductData })
  }

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id))
  }
  const handleEdit = (product: Product) => {
    setIsEdit(true)
    setProduct({
      id: product.id,
      name: product.name,
      image: product.image,
      description: product.description,
      categories: product.categories,
      variants: product.variants,
      sizes: product.sizes,
      price: product.price
    })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <div>
          <h2>Create a New Product</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Product Name:
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              Image URL:
              <input
                type="text" // Use file input for image uploads
                name="image"
                value={product.image}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              Description:
              <textarea
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              Categories (Comma-separated):
              <input
                type="text"
                name="categories"
                value={product.categories}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <label>
              Variants (Comma-separated):
              <input
                type="text"
                name="variants"
                value={product.variants}
                onChange={handleInputChange}
              />
            </label>
            <br />

            <label>
              Sizes (Comma-separated):
              <input type="text" name="sizes" value={product.sizes} onChange={handleInputChange} />
            </label>
            <br />

            <label>
              Price:
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />

            <button type="submit">Create Product</button>
          </form>
        </div>
        <h2>List of Products</h2>
        <section className="products">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <article key={product.id} className="product">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button
                    onClick={() => {
                      handleEdit(product)
                    }}>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(product.id)
                    }}>
                    Delete
                  </button>
                </article>
              )
            })}
        </section>
      </div>
    </div>
  )
}

export default Products
