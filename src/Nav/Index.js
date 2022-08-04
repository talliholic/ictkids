import { NavLink } from "react-router-dom"
import "./index.css"

const Nav = () => {
  return (
    <div className="main-menu">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "link")}
      >
        Home
      </NavLink>
      <NavLink
        to="/video-activities"
        className={({ isActive }) => (isActive ? "active-link" : "link")}
      >
        Video Activities
      </NavLink>
    </div>
  )
}

export default Nav
