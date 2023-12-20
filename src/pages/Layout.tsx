import { FC } from "react"
import { Outlet, Link } from "react-router-dom"
import PrivateRoute from "../components/PrivateRoute"

const Layout: FC = () => {
  return (
    <PrivateRoute>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </PrivateRoute>
  )
}

export default Layout