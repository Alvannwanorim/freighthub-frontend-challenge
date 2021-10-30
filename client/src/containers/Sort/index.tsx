import React from 'react'
import SortDropdown from '../../components/SortDropdown'
import styles from './style.module.css'

type Props = {
  handleType: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Sort = ({ handleType, handleOrder }: Props) => {
  return (
    <div className={styles.sort}>
      <p>Sort By:</p>
      <div className={styles.sort}>
        <SortDropdown
          label="type"
          name="type"
          options={['id', 'name', 'mode', 'destination', 'origin']}
          defaultValue="id"
          onChange={handleType}
        />
        <SortDropdown
          label="order"
          name="order"
          options={['asc', 'desc']}
          defaultValue="asc"
          onChange={handleOrder}
        />
      </div>
    </div>
  )
}

export default Sort
