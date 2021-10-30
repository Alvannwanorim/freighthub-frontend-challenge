import React, { Suspense, lazy } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Loader from './components/Loader'
import DetailsPage from './pages/Details'

const restLink = new RestLink({ uri: process.env.REACT_APP_API_URI })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
})

const HomePage = lazy(() => import('./pages/Home'))

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/details/:id" component={DetailsPage} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </ApolloProvider>
  )
}

export default App
