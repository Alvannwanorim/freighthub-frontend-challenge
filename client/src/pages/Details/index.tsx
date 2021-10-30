import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import Loader from '../../components/Loader'
import styles from './style.module.css'

interface ParamsInterface {
  id?: string
}

export const SHIPMENT_BY_ID = gql`
  query getShipmentsById($id: STR) {
    shipment(id: $id) @rest(type: "Shipment", path: "/shipments/:id") {
      id
      name
      cargo
      mode
      type
      destination
      origin
      services
      total
      status
      userId
    }
  }
`

export const EDIT_NAME = gql`
  mutation editNameMutation($name: String, $id: String) {
    shipment(name: $name, id: $id)
      @rest(
        type: "Name"
        path: "/shipments/:id"
        method: "PUT"
        bodyKey: "name"
      ) {
      id
      name
    }
  }
`

const Details = () => {
  const { id } = useParams<ParamsInterface>()
  const [name, setName] = useState('')

  const history = useHistory()

  const { loading, data, error } = useQuery(SHIPMENT_BY_ID, {
    variables: { id },
  })

  const [changeName, { loading: mutateLoading }] = useMutation(EDIT_NAME, {
    refetchQueries: [SHIPMENT_BY_ID],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const editName = (e: React.FormEvent) => {
    e.preventDefault()
    if (name !== '') {
      const existingData = {
        cargo: data.shipment.cargo,
        mode: data.shipment.mode,
        type: data.shipment.type,
        destination: data.shipment.destination,
        origin: data.shipment.origin,
        services: data.shipment.services,
        total: data.shipment.total,
        status: data.shipment.status,
        userId: data.shipment.userId,
      }
      changeName({ variables: { name: { ...existingData, name }, id } })
    }
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    throw new Error('There was an Error getting Shipment by id')
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={() => history.push('/')}>
        {'<'} Back to home
      </button>
      <div className={styles.grid}>
        <div>
          <p>
            <span>Id: </span> {data.shipment.id}
          </p>
          <p>
            <span>name: </span> {data.shipment.name}
          </p>
          <p>
            <span>origin: </span> {data.shipment.origin}
          </p>
          <p>
            <span>destination: </span>
            {data.shipment.destination}
          </p>
          <p>
            <span>mode: </span> {data.shipment.mode}
          </p>
          <p>
            <span>type: </span> {data.shipment.type}
          </p>
          <p>
            <span>total: </span> {data.shipment.total}
          </p>
          <p>
            <span>user id: </span> {data.shipment.userId}
          </p>
        </div>
        <div>
          <p className={styles.heading}>cargo</p>
          {data.shipment.cargo.map((carg: any) => (
            <>
              <p>
                <span>type: </span>
                {carg.type}
              </p>
              <p>
                <span>description: </span>
                {carg.description}
              </p>
              <p>
                <span>volume: </span>
                {carg.volume}
              </p>
            </>
          ))}
          <p className={styles.heading}>services</p>
          {data.shipment.services.map((service: any) => (
            <p>
              <span>type: </span>
              {service.type}
            </p>
          ))}
        </div>
      </div>

      <p className={styles.heading}>Edit Shipment Name</p>
      <form onSubmit={editName}>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            placeholder="Enter name..."
            required
          />
        </label>
        <button type="submit" disabled={!name}>
          {mutateLoading ? '...' : 'Edit'}
        </button>
      </form>
    </div>
  )
}

export default Details
