import React from 'react'
import LeaderBoardFive from './LeaderBoardFive'




class PollFive extends React.Component{
    

    state = {

        masterLeaderboard: this.props.createMasterLeaderBoard,
        
        
        
       
        
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
            user_id: 121
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
            winnable_type: "Master",
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
            const masterToBeUpdated = this.state.masterLeaderboard.find(master => master.master.id === resultObj.winnable.id)
            const newEl = {master: masterToBeUpdated.master, wins: masterToBeUpdated.wins + 1}
            const masterToBeUpdatedIndex = this.state.masterLeaderboard.indexOf(masterToBeUpdated)
            let newArray = [...this.state.masterLeaderboard]
            newArray.splice(masterToBeUpdatedIndex, 1, newEl)
            console.log(newArray)

            const sortedByWins = newArray.sort(function (l, r) {
                return r.wins - l.wins;
            });
            this.setState({masterLeaderboard: sortedByWins})
        })

        this.setState({clicked: false})
    }


    render(){
        console.log(this.state.masterLeaderboard)
        return(
            <div>
            <button onClick={this.pollClickHandler}>Click to Create Poll!</button>
            {this.state.clicked === true && this.state.selectPollChoices.length > 0 ?
            <div>
                <p> alt={this.state.selectPollChoices[0].id} </p>
                {this.state.selectPollChoices[0] !== null ? <button disabled={false} name="1" onClick={this.voteClickHandler}>Vote</button> : null}
                <p> alt={this.state.selectPollChoices[1].id} </p>
                {this.state.selectPollChoices[1] !== null ? <button disabled={false} name="2" onClick={this.voteClickHandler}>Vote</button> : null}
            </div>
            :
            null
        }
            <LeaderBoardFive masterDataFlow={this.props.masterDataFlow} songObj={this.props.songObj} masterLeaderboard={this.state.masterLeaderboard}/> 
        </div>
        )
    }
}

export default PollFive