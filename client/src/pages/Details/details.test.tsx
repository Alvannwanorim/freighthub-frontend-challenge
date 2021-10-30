import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'

import Details, { SHIPMENT_BY_ID, EDIT_NAME } from './'
import { MemoryRouter, Route } from 'react-router-dom'

const mocks = [
  {
    request: {
      query: SHIPMENT_BY_ID,
      variables: { id: 's1' },
    },
    result: {
      data: {
        id: 's1',
        name: 'test name',
        destination: 'testDestination',
        origin: 'test origin',
        mode: 'sea',
        type: 'red',
      },
    },
  },

  {
    request: {
      query: EDIT_NAME,
      variables: {
        id: 's1',
        name: {
          name: 'randomstring',
        },
      },
    },
    result: {
      data: {
        id: 's1',
        name: 'test name',
      },
    },
  },
]

describe('Home', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Route>
            <Details />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    )
  })

  afterEach(() => cleanup())

  test('fetches shipment by id and displays it', () => {
    setTimeout(() => {
      expect(screen.findByText('testDestination')).toBeInTheDocument()
    }, 10000)
  })

  test('edits the shipment name', async () => {
    setTimeout(() => {
      userEvent.type(screen.getByRole('input'), 'randomstring')
      userEvent.click(screen.getByRole('button'))
    }, 6000)

    setTimeout(() => {
      expect(screen.findByText('randomstring')).toBeInTheDocument()
    }, 10000)
  })
})
