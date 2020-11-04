import React from 'react'
import {NavLink} from 'react-router-dom'

class Profile extends React.Component {
    render(){
        return(
            <div className="profile-page">
                <h1>Your Albums:</h1>
                <h3>In progress</h3>
                <NavLink to="/album/1">Swizzed Album 1</NavLink>
                <h3>Complete</h3>
                <p>You have no complete albums</p>
                <h3>Albums you are contributing to:</h3>
                <p>You have no contributions</p>
                <button>Create New Album</button>
                
            </div>
        )
    }
}
export default Profile