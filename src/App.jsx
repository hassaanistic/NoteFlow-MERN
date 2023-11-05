import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import Dashboard from './pages/Dashboard'
import Create from './pages/Create'
import Profile from './pages/Profile'
import FrontPage from './pages/frontPage'
import SignUpAndLogIn from './pages/SignUpAndLogIn'
import 'bootstrap/dist/css/bootstrap.css'

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<FrontPage />} />
      <Route path="/auth" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/auth/create" element={<Create />} />
        <Route path="/auth/profile" element={<Profile />} />
      </Route>

      <Route path="/register" element={<SignUpAndLogIn />} />
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
