import React from 'react'

class Poll extends React.Component {

    selectPollChoices = () => {
        if (this.props.phase === 1){
            const shuffled = this.props.songObj.ref_imgs.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice)
        } else if (this.props.phase === 2){
            const shuffled = this.props.songObj.beats.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice.id)
        } else if (this.props.phase === 3){ 
            const shuffled = this.props.songObj.vocals.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice.id)
        } else if (this.props.phase === 4){
            const shuffled = this.props.songObj.mixes.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice.id)
        } else if (this.props.phase === 5){
            const shuffled = this.props.songObj.masters.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice.id)
        } else if (this.props.phase === 6){
            return [null , null]
        }
    }

    voteClickHandler = (e) => {
        console.log(e.target.previousSibling)
        let optionId = (e.target.name === "1") ? parseInt(e.target.previousSibling.textContent) : parseInt(e.target.previousSibling.textContent)
        let winnableType = (this.props.phase === 1) ? "RefImg" : (this.props.phase === 2) ? "Beat" : (this.props.phase === 3) ? "Vocal" : (this.props.phase === 3) ? "Mix" : "Master"
        console.log(this.props.songObj.id)
        const newResult = {
            win: true,
            winnable_id: optionId,
            winnable_type: winnableType,
            poll_id: this.props.pollId, // POST Poll in track
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
        this.props.newPoll()
    }

    render(){
        console.log(this.selectPollChoices()[0])
        console.log(this.props.pollId)
        if (this.props.phase === 1){
            return(
                <div>
                    <img alt={this.selectPollChoices()[0].id} src={this.selectPollChoices()[0].img_url} width="250" height="200"/>
                    {this.selectPollChoices()[0] !== null ? <button name="1" onClick={this.voteClickHandler}>Vote</button> : null}
                    <img alt={this.selectPollChoices()[1].id} src={this.selectPollChoices()[1].img_url} width="250" height="200"/>
                    {this.selectPollChoices()[1] !== null ? <button name="2" onClick={this.voteClickHandler}>Vote</button> : null}
                </div>
            )
        } else {
        return(
            <div>
                <p>{this.selectPollChoices()[0]}</p>
                {this.selectPollChoices()[0] !== null ? <button name="1" onClick={this.voteClickHandler}>Vote</button> : null}
                <p>{this.selectPollChoices()[1]}</p>
                {this.selectPollChoices()[1] !== null ? <button name="2" onClick={this.voteClickHandler}>Vote</button> : null}
            </div>
        )
        }
    }
}

export default Poll