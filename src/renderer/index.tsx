import ReactDom from 'react-dom/client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { AppRoutes } from './routes'

import './globals.css'

ReactDom.createRoot(document.querySelector('app') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>

    <AppRoutes />
  </QueryClientProvider>

)
