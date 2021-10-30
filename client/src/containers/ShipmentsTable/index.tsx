import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './style.module.css'

type Props = {
  shipments: any
}

const Shipments = ({ shipments }: Props) => {
  const history = useHistory()
  return (
    <table className={styles.table}>
      <caption>Shipments</caption>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>origin</th>
          <th>destination</th>
          <th>mode</th>
        </tr>
      </thead>
      <tbody>
        {shipments.map((shipment: any) => (
          <tr
            key={shipment.id}
            className={styles.row}
            onClick={() => history.push(`/details/${shipment.id}`)}
            data-testid="shipment"
          >
            <td data-label="id">{shipment.id}</td>
            <td data-label="name">{shipment.name}</td>
            <td data-label="origin">{shipment.origin}</td>
            <td data-label="destination">{shipment.destination}</td>
            <td data-label="mode">{shipment.mode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Shipments
