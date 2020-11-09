import React from 'react'
import LeaderBoardFour from './LeaderBoardFour'
// import LeaderBoardFour from './LeaderBoardFour'



class PollFour extends React.Component{
    

    state = {

        mixLeaderboard: this.props.createMixLeaderBoard,
        
        
        
       
        
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
            user_id: 130
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
            winnable_type: "Mix",
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
            const mixToBeUpdated = this.state.mixLeaderboard.find(mix => mix.mix.id === resultObj.winnable.id)
            const newEl = {mix: mixToBeUpdated.mix, wins: mixToBeUpdated.wins + 1}
            const mixToBeUpdatedIndex = this.state.mixLeaderboard.indexOf(mixToBeUpdated)
            let newArray = [...this.state.mixLeaderboard]
            newArray.splice(mixToBeUpdatedIndex, 1, newEl)
            console.log(newArray)

            const sortedByWins = newArray.sort(function (l, r) {
                return r.wins - l.wins;
            });
            this.setState({mixLeaderboard: sortedByWins})
        })

        this.setState({clicked: false})
    }


    render(){
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
            <LeaderBoardFour mixDataFlow={this.props.mixDataFlow} songObj={this.props.songObj} mixLeaderboard={this.state.mixLeaderboard}/>
        </div>
        )
    }
}

export default PollFour