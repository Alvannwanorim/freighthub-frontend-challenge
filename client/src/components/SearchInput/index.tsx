import React from 'react'
import styles from './style.module.css'

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ handleChange }: Props) => {
  return (
    <div>
      <label htmlFor="search">
        <input
          type="search"
          name="search"
          placeholder="Search for a shipment by id"
          onChange={handleChange}
          className={styles.searchInput}
        />
      </label>
    </div>
  )
}

export default SearchInput
