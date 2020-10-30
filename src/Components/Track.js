import React from 'react'
import PhaseOne from './PhaseOne'
import PhaseTwo from './PhaseTwo'
import PhaseThree from './PhaseThree'

class Track extends React.Component {



    render(){
        return(
            <div className="track">
                <h1>{this.props.songObj.title}</h1>
                <h3>Phase: {this.props.songObj.phase}</h3>
                <PhaseOne songObj={this.props.songObj}/>
                <PhaseTwo songObj={this.props.songObj}/>

                <hr></hr>
            </div>
        )
    }
}


export default Track 