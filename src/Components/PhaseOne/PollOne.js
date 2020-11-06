import React from 'react'
import LeaderBoardOne from './LeaderBoardOne'

class PollOne extends React.Component{

    state = {

        imageLeaderboard: this.props.createImageLeaderBoard,
        
        
        
        pollResults: this.props.pollResults,
        
        currentPollId: "",
        
        clicked: false,

        buttonDisable: "",

        selectPollChoices: this.props.selectPollChoices()
    }

    // filterResults = () => {
    //     const winners = this.state.pollResults.filter (result => result.win === true)
    //     return winners.filter (winner => winner.winnable.song.id === this.props.songObj.id)
    // }



    pollClickHandler = () => {

        const newPoll = {
            phase: this.props.songObj.phase,
            user_id: 94
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
            this.setState({currentPollId: pollObj.id})
        })

        this.setState({clicked: true})

    }
    
  

    voteClickHandler = (e) => {
        this.setState({buttonDisable: "disable"})
        let optionId = (e.target.name === "1") ? this.state.selectPollChoices[0].id : this.state.selectPollChoices[1].id
        const newResult = {
            win: true,
            winnable_id: optionId,
            winnable_type: "RefImg",
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
            console.log(resultObj.winnable)
            const imageToBeUpdated = this.state.imageLeaderboard.find(image => image.image.id === resultObj.winnable.id)
            console.log(imageToBeUpdated)
            const newEl = {image: imageToBeUpdated.image, wins: imageToBeUpdated.wins + 1}
            console.log(newEl)
            const imageToBeUpdatedIndex = this.state.imageLeaderboard.indexOf(imageToBeUpdated)
            let newArray = [...this.state.imageLeaderboard]
            newArray.splice(imageToBeUpdatedIndex, 1, newEl)
            console.log(newArray)

            const sortedByWins = newArray.sort(function (l, r) {
                return r.wins - l.wins;
            });
            this.setState({imageLeaderboard: sortedByWins})
        })

        this.setState({clicked: false})
    }

    render(){
        console.log(this.props.imageDataFlow)
        return(
            <div>
                <button onClick={this.props.selectPollChoices, this.pollClickHandler}>Click to Create Poll!</button>
                {this.state.clicked === true ?
                <div>
                    <img alt={this.state.selectPollChoices[0].id} src={this.state.selectPollChoices[0].img_url} width="250" height="200"/>
                    {this.state.selectPollChoices[0] !== null ? <button name="1" onClick={this.voteClickHandler}>Vote</button> : null}
                    <img alt={this.state.selectPollChoices[1].id} src={this.state.selectPollChoices[1].img_url} width="250" height="200"/>
                    {this.state.selectPollChoices[1] !== null ? <button name="2" onClick={this.voteClickHandler}>Vote</button> : null}
                </div>
                :
                null
                }
                <LeaderBoardOne songObj={this.props.songObj} imageLeaderboard={this.state.imageLeaderboard} imageDataFlow={this.props.imageDataFlow}/>
            </div>
        )
    }
}

export default PollOne