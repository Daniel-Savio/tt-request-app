import { Route } from 'react-router-dom'

import { Router } from 'lib/electron-router-dom'

import { Home } from './screens/main'
import { Layout } from './screens/layout'
import { Login } from './screens/login'
import { Docs } from './screens/docs'
import { Toaster } from 'sonner'

export function AppRoutes() {
  return (
    <>
      <Toaster />
      <Router
        main={
          <Route element={<Layout />} path="/">
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Docs />} path="/docs" />
          </Route>
        }
      />
    </>
  )
}
