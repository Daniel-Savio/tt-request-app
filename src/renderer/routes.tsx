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
          <Route path="/" element={<Layout />}>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/docs" element={<Docs />} />

          </Route>
        }
      />
    </>
  )
}
