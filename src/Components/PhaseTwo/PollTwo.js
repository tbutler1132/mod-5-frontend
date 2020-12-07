import React from 'react'
import LeaderBoardTwo from './LeaderBoardTwo'
import ReactAudioPlayer from 'react-audio-player';
import {Button} from 'react-bootstrap'


class PollTwo extends React.Component{

    state = {

        beatLeaderboard: this.props.createBeatLeaderBoard,
        
        
        
        pollResults: this.props.pollResults,
        
        currentPollId: "",
        
        clicked: false,

        buttonDisable: "",

        selectPollChoices: this.props.selectPollChoices()
    }

    pollClickHandler = () => {
        this.setState({buttonDisable: true})
        this.setState({selectPollChoices: this.props.selectPollChoices()})
        const newPoll = {
            phase: this.props.songObj.phase,
            user_id: 202
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
            console.log(pollObj)
            this.setState({currentPollId: pollObj.id})
        })

        this.setState({clicked: true})

    }

    voteClickHandler = (e) => {
        this.setState({buttonDisable: true})
        let optionId = (e.target.name === "1") ? this.state.selectPollChoices[0].id : this.state.selectPollChoices[1].id
        const newResult = {
            win: true,
            winnable_id: optionId,
            winnable_type: "Beat",
            poll_id: this.state.currentPollId, 
        }
        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ result: newResult })
          }
        fetch("http://localhost:3000/results", options)
        .then(r => r.json())
        .then(resultObj => {
            const beatToBeUpdated = this.state.beatLeaderboard.find(beat => beat.beat.id === resultObj.winnable.id)
            const newEl = {beat: beatToBeUpdated.beat, wins: beatToBeUpdated.wins + 1}
            const beatToBeUpdatedIndex = this.state.beatLeaderboard.indexOf(beatToBeUpdated)
            let newArray = [...this.state.beatLeaderboard]
            newArray.splice(beatToBeUpdatedIndex, 1, newEl)
            console.log(newArray)

            const sortedByWins = newArray.sort(function (l, r) {
                return r.wins - l.wins;
            });
            this.setState({beatLeaderboard: sortedByWins})
        })

        this.setState({clicked: false})
    }


    render(){
        console.log(this.state.selectPollChoices)
        return(
            <div className="poll">
                <Button variant="dark" onClick={this.pollClickHandler}>Click to Create Poll!</Button>
                {this.state.clicked === true && this.state.selectPollChoices.length > 0 ?
                <div>
                    <ReactAudioPlayer
                    src={`http://localhost:3000/${this.state.selectPollChoices[0].audio_data.url}`}
                    controls
                    />
                    {this.state.selectPollChoices[0] !== null ? <button disabled={false} name="1" onClick={this.voteClickHandler}>Vote</button> : null}
                    <ReactAudioPlayer
                  src={`http://localhost:3000/${this.state.selectPollChoices[1].audio_data.url}`}
                  controls
                  />
                    {this.state.selectPollChoices[1] !== null ? <button disabled={false} name="2" onClick={this.voteClickHandler}>Vote</button> : null}
                </div>
                :
                null
                }
                <LeaderBoardTwo phase={this.props.phase} beatDataFlow={this.props.beatDataFlow} songObj={this.props.songObj} beatLeaderboard={this.state.beatLeaderboard}/>
            </div>
        )
    }
}

export default PollTwo