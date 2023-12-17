import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import AdminSidebar from './AdminSidebar'
import { AppDispatch } from '../redux/store'
import useCategoryState from '../hooks/useCategoryState'
import {
  addCategory,
  deleteCategory,
  updateCategory
} from '../redux/slices/categories/categorySlice'

const Category = () => {
  const { categories, isLoading, error } = useCategoryState()
  const [categoryName, setCategoryName] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [categoryId, setCategoryId] = useState(0)

  const dispatch: AppDispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchCategory())
  // }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleEdit = (id: number, name: string) => {
    setCategoryId(id)
    setIsEdit(!isEdit)
    setCategoryName(name)
  }
  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!isEdit) {
      const newCategory = { id: new Date().getTime(), name: categoryName }
      dispatch(addCategory(newCategory))
    } else {
      // update
      const updateCategoryData = { id: categoryId, name: categoryName }
      dispatch(updateCategory(updateCategoryData))
    }

    setCategoryName('')
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <div>
          <h3>Create a Category</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="category"
              value={categoryName}
              placeholder="enter category name"
              onChange={handleChange}
            />
            <button>{isEdit ? 'Update' : 'Create'}</button>
          </form>
          <br />
        </div>

        <section className="products">
          {categories &&
            categories.map((category) => {
              return (
                <article key={category.id} className="product">
                  <h3>{category.name}</h3>
                  <button
                    onClick={() => {
                      handleEdit(category.id, category.name)
                    }}>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(category.id)
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

export default Category
