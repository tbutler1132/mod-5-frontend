import React from 'react'
import PhaseOne from './PhaseOne'
import PhaseTwo from './PhaseTwo'
import PhaseThree from './PhaseThree'
import PhaseFour from './PhaseFour'
import PhaseFive from './PhaseFive'

class Track extends React.Component {

    state = {
        trackClicked: false,
        pollResults: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/results")
        .then(r => r.json())
        .then(results => this.setState({pollResults: results}))
    }

    referenceResults = () => {
        return this.state.pollResults.filter (result => result.poll.phase === 1)
    }

    beatResults = () => {
        return this.state.pollResults.filter (result => result.poll.phase === 2)
    }

    trackClickHandler = () => {
        if (this.state.trackClicked === false){
            this.setState({trackClicked: true})
        } else {
            this.setState({trackClicked: false})
        }
        console.log(this.state.trackClicked)
    }

    render(){
        return(
            <div className="track" >
                <h1 onClick={this.trackClickHandler}>{this.props.songObj.title}</h1>
                <h3>Phase: {this.props.songObj.phase}</h3>
                
                {this.state.trackClicked === true ?
                <div>
                <PhaseOne songObj={this.props.songObj} referenceResults={this.referenceResults()}/>
                <PhaseTwo songObj={this.props.songObj} beatResults={this.beatResults()}/>
                <PhaseThree songObj={this.props.songObj} />
                <PhaseFour songObj={this.props.songObj}/>
                <PhaseFive songObj={this.props.songObj}/>
                <p>vote/submit buttons</p>
                </div>
                : 
                null
                }
                
                <hr></hr>
            </div>
        )
    }
}


export default Track 