import React from 'react'
import LeaderBoardOne from './LeaderBoardOne'

class PollOne extends React.Component{

    state = {

        imagesArray: this.props.imagesArray,
        
        pollResults: this.props.pollResults,
        
        currentPollId: "",
        
        clicked: false,

        buttonDisable: ""
    }

    filterResults = () => {
        const winners = this.props.pollResults.filter (result => result.win === true)
        return winners.filter (winner => winner.winnable.song.id === this.props.songObj.id)
    }

    createImageLeaderBoard = () => {
        if (this.state.imagesArray.length > 0){
        const wins = this.state.imagesArray.map(image => image.results.filter(result => result.win === true).length)
        const imagesWithWins = []
        this.state.imagesArray.forEach(function(v,i){
            const obj = {};
            obj.image = v;
            obj.wins = wins[i];
            imagesWithWins.push(obj);
        });
        const sortedByWins = imagesWithWins.sort(function (l, r) {
            return r.wins - l.wins;
        });
        
        return sortedByWins
        }
        else {
            return [null, null, null]
        }
    }

    pollClickHandler = () => {

        const newPoll = {
            phase: this.props.songObj.phase,
            user_id: 82
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
    
    selectPollChoices = () => {

                const shuffled = this.props.songObj.ref_imgs.sort(() => 0.5 - Math.random());
                let choices = shuffled.slice(0, 2);
                
                return choices.map(choice => choice)

    }    

    voteClickHandler = (e) => {
        this.setState({buttonDisable: "disable"})
        let optionId = (e.target.name === "1") ? this.selectPollChoices()[0].id : this.selectPollChoices()[1].id
        console.log(this.props.songObj.id)
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
            console.log(resultObj)
        })
    }

    render(){
        console.log(this.filterResults())
        return(
            <div>
                <button onClick={this.selectPollChoices, this.pollClickHandler}>Click to Create Poll!</button>
                {this.state.clicked === true ?
                <>
                <img alt={this.selectPollChoices()[0].id} src={this.selectPollChoices()[0].img_url} width="250" height="200"/>
                {this.selectPollChoices()[0] !== null ? <button name="1" onClick={this.voteClickHandler}>Vote</button> : null}
                <img alt={this.selectPollChoices()[1].id} src={this.selectPollChoices()[1].img_url} width="250" height="200"/>
                {this.selectPollChoices()[1] !== null ? <button name="2" onClick={this.voteClickHandler}>Vote</button> : null}
                </>
                :
                null
                }
                <LeaderBoardOne songObj={this.props.songObj} imageLeaderboard={this.props.imageLeaderboard}/>
            </div>
        )
    }
}

export default PollOne