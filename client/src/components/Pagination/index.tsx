import React from 'react'

type Props = {
  loadPreviousPage: () => void
  loadNextPage: () => void
}

const Pagination = ({ loadPreviousPage, loadNextPage }: Props) => {
  return (
    <div>
      <button type="button" onClick={loadPreviousPage}>
        {'<'} Previous
      </button>
      <button type="button" onClick={loadNextPage}>
        Next {'>'}
      </button>
    </div>
  )
}

export default Pagination
