import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'

import Overview from "./pages/Overview"
import Data from './pages/Data'
import KNN from './pages/KNN'
import GaussianNB from './pages/GaussianNB'
import Visualize from './pages/Visualize'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Overview />
  },
  {
    path: "/data",
    element: <Data />
  },
  {
    path: "/knn",
    element: <KNN />
  },
  {
    path: "/gaussian_nb",
    element: <GaussianNB />
  },
  {
    path: "/visualize",
    element: <Visualize />
  },
  {
    path: "/visualize",
    element: <Visualize />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
