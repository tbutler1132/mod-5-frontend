import React from 'react'


class UserImages extends React.Component{
    render(){
        return(
        <p>{this.props.userObj[1].ref_img[0]}</p>
        )
    }
}

export default UserImages