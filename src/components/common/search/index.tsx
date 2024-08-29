import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button } from '../../ui/button'
import { SearchBarProps } from './types'

export const SearchBar = ({ value, onSearch, placeholder = 'Buscar Ativo ou Local' }: SearchBarProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <div className="flex pe-3 border-b border-card">
      <input
        value={value}
        type="text"
        placeholder={placeholder}
        className="w-full h-11 px-3 focus-visible:outline-none"
        onChange={handleChange}
        aria-label={placeholder}
      />
      <Button variant="icon" aria-label="Search">
        <AiOutlineSearch size={20} />
      </Button>
    </div>
  )
}
