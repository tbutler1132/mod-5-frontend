import React from 'react'
import LeaderBoardThree from './LeaderBoardThree'
import ReactAudioPlayer from 'react-audio-player';


class PollThree extends React.Component{
    

    state = {

        vocalLeaderboard: this.props.createVocalLeaderBoard,
        
        
        
       
        
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
            winnable_type: "Vocal",
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
            const vocalToBeUpdated = this.state.vocalLeaderboard.find(vocal => vocal.vocal.id === resultObj.winnable.id)
            const newEl = {vocal: vocalToBeUpdated.vocal, wins: vocalToBeUpdated.wins + 1}
            const vocalToBeUpdatedIndex = this.state.vocalLeaderboard.indexOf(vocalToBeUpdated)
            let newArray = [...this.state.vocalLeaderboard]
            newArray.splice(vocalToBeUpdatedIndex, 1, newEl)
            console.log(newArray)

            const sortedByWins = newArray.sort(function (l, r) {
                return r.wins - l.wins;
            });
            this.setState({vocalLeaderboard: sortedByWins})
        })

        this.setState({clicked: false})
    }


    render(){
        return(
            <div className="poll">
                <button onClick={this.pollClickHandler}>Click to Create Poll!</button>
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
                <LeaderBoardThree vocalDataFlow={this.props.vocalDataFlow} songObj={this.props.songObj} vocalLeaderboard={this.state.vocalLeaderboard}/>
                {/* <LeaderBoardTwo beatDataFlow={this.props.beatDataFlow} songObj={this.props.songObj} beatLeaderboard={this.state.beatLeaderboard} imageDataFlow={this.props.imageDataFlow}/> */}
            </div>
        )
    }
}

export default PollThree