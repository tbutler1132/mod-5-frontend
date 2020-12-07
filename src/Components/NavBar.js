import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <div className="topnav">
            <NavLink to="/user/43">
                <p>Profile</p>
            </NavLink>
            {/* <NavLink to="/dogs">
                <p>index</p>
            </NavLink>
            <NavLink to="/dogs/favorites">
                <p className="left">favorites</p>
            </NavLink> */}
        </div>
    )
}

export default NavBar