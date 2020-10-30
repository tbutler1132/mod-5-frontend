import React from 'react'
import Track from '../Components/Track'

class Album extends React.Component {

    state = {
        trackArray: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/songs")
        .then(r => r.json())
        .then(songs => this.setState({trackArray: songs}))
    }


    renderTracks = () => {
        return this.state.trackArray.map(songObj => <Track key={songObj.id} songObj={songObj} ear="ear"/>)
    }

    render(){
        return(
        <div>
            {this.renderTracks()}
        </div>
        )
    }

}

export default Album