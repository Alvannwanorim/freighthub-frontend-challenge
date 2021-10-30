import React, { useState } from 'react'
import SearchInput from '../../components/SearchInput'
import styles from './style.module.css'

type Props = {
  handleSearch: (idToSearch: string) => void
}

const Search = ({ handleSearch }: Props) => {
  const [id, setId] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value)
  }

  return (
    <div className={styles.search}>
      <SearchInput handleChange={handleChange} />
      <button type="button" onClick={() => handleSearch(id)}>
        Search
      </button>
    </div>
  )
}

export default Search
