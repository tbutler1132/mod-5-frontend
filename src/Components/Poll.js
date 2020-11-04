import React from 'react'

class Poll extends React.Component {

    selectPollChoices = () => {
        if (this.props.songObj.phase === 1){
            const shuffled = this.props.songObj.ref_imgs.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice.id)
        } else if (this.props.songObj.phase === 2){
            const shuffled = this.props.songObj.beats.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice.id)
        } else if (this.props.songObj.phase === 3){ 
            const shuffled = this.props.songObj.vocals.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice.id)
        } else if (this.props.songObj.phase === 4){
            const shuffled = this.props.songObj.mixes.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice.id)
        } else if (this.props.songObj.phase === 5){
            const shuffled = this.props.songObj.masters.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice.id)
        } else if (this.props.songObj.phase === 6){
            return [null , null]
        }
    }

    voteClickHandler = (e) => {
        let optionId = (e.target.name === "1") ? parseInt(e.target.previousSibling.textContent) : parseInt(e.target.previousSibling.textContent)
        let winnableType = (this.props.songObj.phase === 1) ? "RefImg" : (this.props.songObj.phase === 2) ? "Beat" : (this.props.songObj.phase === 3) ? "Vocal" : (this.props.songObj.phase === 3) ? "Mix" : "Master"
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
        this.selectPollChoices()
        console.log(this.props.pollId)
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

export default Poll