import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.jsx'

// Import de assest
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.css'
import './assets/css/normalize.css'
import './assets/css/styles.css'
import './assets/css/responsive.css'
import Layout from './components/layouts/private/layout/Layout.jsx'
import About from './components/layouts/private/pages/About.jsx'
import Contact from './components/layouts/private/pages/Contact.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashBoard from './components/layouts/private/DashBoard.jsx'


const router = createBrowserRouter([
  {
    Component: DashBoard,
    children:[
      {
        path: '/',
        Component: Layout,
        children:[
          {
            path: '/about',
            Component: About,
          },
          {
            path: '/contact',
            Component: Contact,
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
