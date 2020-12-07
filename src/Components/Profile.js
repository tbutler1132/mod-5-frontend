import React from 'react'
import {NavLink} from 'react-router-dom'
import UserImages from './UserImages'
import {Button} from 'react-bootstrap'

class Profile extends React.Component {

    state = {
        usersArray: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/users")
        .then(r => r.json())
        .then(users => {
          console.log(users)
          this.setState({usersArray: users})})
    }


    render(){
        console.log(this.state.usersArray)
        return(
            <div className="profile-page">
                <h1>Your Albums</h1>
                <h4 className="profile-info">In progress</h4>
                <NavLink to="/tracks">Tim Album 1</NavLink>
                <h4 className="profile-info">Complete</h4>
                <p>You have no complete albums</p>
                <h4 className="profile-info">Albums you are contributing to:</h4>
                <p>You have no contributions</p>
                <Button variant="dark">Create New Album</Button>
                {/* <UserImages userObj={this.props.usersArray}/> */}
            </div>
        )
    }
}
export default Profile