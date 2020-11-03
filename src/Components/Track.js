import React from 'react'
import PhaseOne from './PhaseOne'
import PhaseTwo from './PhaseTwo'
import PhaseThree from './PhaseThree'
import PhaseFour from './PhaseFour'
import PhaseFive from './PhaseFive'
import { Route, Switch } from 'react-router-dom'
import Poll from './Poll'
import SubmitForm from './SubmitForm'

class Track extends React.Component {

    state = {
        trackClicked: false,
        pollResults: [],
        pollClickedFirstTime: false,
        currentPollId: "",
        pollClickedAgain: false,
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

    trackClickHandler = (e) => {
        if (this.state.trackClicked === false){
            this.setState({trackClicked: true})
        } else {
            this.setState({trackClicked: false})
        }
        // PUT FETCH REQUEST IN CLICKHANDLER?????
    }

    pollClickHandler = () => {
        console.log(this.props.songObj.phase)
        if (this.state.pollClickedFirstTime === false){
            this.setState({pollClickedFirstTime: true})
        } 
        const newPoll = {
            phase: this.props.songObj.phase,
            user_id: 34
        }
        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ poll: newPoll })
          }
        fetch("http://localhost:3000/polls", options)
        .then(r => r.json())
        .then(pollObj => {
            console.log(pollObj.id)
            this.setState({currentPollId: pollObj.id})
        })
    }
    

    render(){
        return(
            <div className="track" >
                <h1 onClick={this.trackClickHandler}>{this.props.songObj.title}</h1>
                <h3>Phase: {this.props.songObj.phase === 6 ? "Complete" :  this.props.songObj.phase}</h3>
                
                {this.state.trackClicked === true ?
                <div>
                <PhaseOne songObj={this.props.songObj} referenceResults={this.referenceResults()}/>
                <PhaseTwo songObj={this.props.songObj} beatResults={this.beatResults()}/>
                <PhaseThree songObj={this.props.songObj} />
                <PhaseFour songObj={this.props.songObj}/>
                <PhaseFive songObj={this.props.songObj}/>
                {this.props.songObj.phase === 6 ? null :<button>Submit</button>}
                {this.props.songObj.phase === 6 ? null : <button onClick={this.pollClickHandler}>Vote on poll</button>}
                {this.state.pollClickedFirstTime === true ? <Poll  songObj={this.props.songObj} pollId={this.state.currentPollId}/> : null}
                <SubmitForm songObj={this.props.songObj}/>
                {/* <Route path="poll" component={Poll} />  */}
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