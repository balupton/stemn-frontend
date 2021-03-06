import React from 'react'
import { Route } from 'react-router'
import AppRootPage from './pages/AppRootPage/AppRootPage.jsx'
import { PreviewPageContainer } from './pages/PreviewPage'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import AppAuthedPage from './pages/AppAuthedPage/AppAuthedPage.jsx'
import AppUnAuthedPage from './pages/AppUnAuthedPage/AppUnAuthedPage.jsx'

export default () => (
  <Route component={ AppRootPage }>
    <Route component={ AppAuthedPage }>
      <Route component={ PreviewPageContainer } path="/" />
    </Route>
    <Route component={ AppUnAuthedPage }>
      <Route component={ LoginPage } path="/login" />
    </Route>
  </Route>
)
