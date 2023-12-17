import { ChangeEvent, FormEvent } from 'react'
import { Product } from '../redux/slices/products/productSlice'

type ProductFormProps = {
  product: Product
  handleSubmit: (e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function ProductForm({ product, handleSubmit, handleChange }: ProductFormProps) {
  const inputStyle =
    'w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:border-blue-400'
  const labelStyle = 'block text-sm font-medium text-gray-600'

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <label htmlFor="name" className={labelStyle}>
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={product.name}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className={labelStyle}>
          Image URL:
        </label>
        <input
          type="text"
          name="image"
          id="image"
          value={product.image}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className={labelStyle}>
          Description:
        </label>
        <textarea
          name="description"
          id="description"
          value={product.description}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="categories" className={labelStyle}>
          Categories: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="categories"
          id="categories"
          value={product.categories.join(',')}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="variants" className={labelStyle}>
          Variants: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="variants"
          id="variants"
          value={product.variants.join(',')}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sizes" className={labelStyle}>
          Sizes: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="sizes"
          id="sizes"
          value={product.sizes.join(',')}
          onChange={handleChange}
          className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:border-blue-400"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Add Product
      </button>
    </form>
  )
}
