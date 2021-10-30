import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './style.module.css'

const ErrorPage = () => {
  const history = useHistory()

  return (
    <div className={styles.wrapper}>
      <h1>...oops something went wrong</h1>
      <button type="button" onClick={() => history.push('/')}>
        Return to home
      </button>
    </div>
  )
}

export default ErrorPage
