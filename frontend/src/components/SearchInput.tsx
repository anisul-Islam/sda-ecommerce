import React, { ChangeEvent } from 'react'

type SeacrhInputProps = {
  searchTerm: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ searchTerm, handleSearch }: SeacrhInputProps) => {
  return <input type="text" placeholder="Search here" value={searchTerm} onChange={handleSearch} />
}

export default SearchInput
