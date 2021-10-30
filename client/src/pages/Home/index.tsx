import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import Sort from '../../containers/Sort'
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination'
import Search from '../../containers/Search'
import ShipmentsTable from '../../containers/ShipmentsTable'
import styles from './style.module.css'

export const SHIPMENTS = gql`
  query getShipments($page: INT, $limit: INT, $sort: STR, $order: STR) {
    shipments(_page: $page, _limit: $limit, _sort: $sort, _order: $order)
      @rest(type: "Shipments", path: "/shipments?{args}") {
      id
      name
      destination
      origin
      mode
    }
  }
`

export const SEARCH_SHIPMENTS = gql`
  query getShipmentsById($id: STR) {
    shipment(id: $id) @rest(type: "ShipmentByID", path: "/shipments?{args}") {
      id
      name
      destination
      origin
      mode
    }
  }
`

const Home = () => {
  const [sortValue, setSortValue] = useState('id')
  const [order, setOrder] = useState('asc')
  const [currentShipments, setCurrentShipments] = useState(null)
  const [page, setPage] = useState(1)
  const [id, setId] = useState('')

  const { loading, data, error, refetch } = useQuery(SHIPMENTS, {
    variables: { page, limit: 20, sort: sortValue, order },
  })

  const { data: searchData } = useQuery(SEARCH_SHIPMENTS, { variables: { id } })

  useEffect(() => {
    setCurrentShipments(data?.shipments)
  }, [data])

  useEffect(() => {
    if (id !== '') {
      setCurrentShipments(searchData?.shipment)
    }
  }, [id, searchData])

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.currentTarget.value)
  }

  const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.currentTarget.value)
  }

  const loadPreviousPage = () => {
    setPage(1)
  }

  const loadNextPage = () => {
    setPage(2)
  }

  const handleSearch = (idToSearch: string) => {
    setId(idToSearch)
  }

  if (error) {
    throw new Error('There was an Error getting Shipments')
  }

  return (
    <div className={styles.wrapper}>
      <Search handleSearch={handleSearch} />
      <Sort handleType={handleSortType} handleOrder={handleSortOrder} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentShipments && <ShipmentsTable shipments={currentShipments} />}
          <Pagination
            loadNextPage={loadNextPage}
            loadPreviousPage={loadPreviousPage}
          />
        </>
      )}
    </div>
  )
}

export default Home
