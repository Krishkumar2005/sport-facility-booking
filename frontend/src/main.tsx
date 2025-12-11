import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Protected from './components/Protected.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import BookCourt from './pages/BookCourt.tsx'
import AdminPricingRules from './pages/AdminPricingRules.tsx'

const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/signup",
        element: (
            <Register />
        )
      },
      {
        path: "/login",
        element: (
          <Login />
        ),
      },
      {
        path: "/book",
        element: (
          <Protected>
            <BookCourt/>
          </Protected>
        )
      },
      {
        path: "/pricing/admin",
        element: (
          <Protected>
            <AdminPricingRules/>
          </Protected>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
)
