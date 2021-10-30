import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'

import Home, { SHIPMENTS, SEARCH_SHIPMENTS } from './'

const mocks = [
  {
    request: {
      query: SHIPMENTS,
      variables: { page: 1, limit: 20, sort: 'is', order: 'asc' },
    },
    result: {
      data: {
        id: 's1',
        name: 'test name',
        destination: 'testDestination',
        origin: 'test origin',
        mode: 'sea',
      },
    },
  },

  {
    request: {
      query: SEARCH_SHIPMENTS,
      variables: { id: 's1' },
    },
    result: {
      data: {
        id: 's1',
        name: 'test name',
        destination: 'testDestination',
        origin: 'test origin',
        mode: 'sea',
      },
    },
  },
]

describe('Home', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )
  })

  afterEach(() => cleanup())

  test('fetches shipments and displays them', () => {
    setTimeout(() => {
      expect(screen.findAllByTestId('shipment')).toBeGreaterThanOrEqual(1)
    }, 10000)
  })

  test('searches shipment by id and displays it', () => {
    userEvent.type(screen.getByPlaceholderText(/search/i), 's1')

    setTimeout(() => {
      expect(screen.findAllByTestId('shipment')).toBeGreaterThanOrEqual(1)
    }, 10000)
  })
})
