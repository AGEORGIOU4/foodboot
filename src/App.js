import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import { CLoading } from './views/pages/loading/CLoading'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={<CLoading image_source='foodboot-logo-square-min.png' />}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          </Switch>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
