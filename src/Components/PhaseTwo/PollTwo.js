import React from 'react'


class PollTwo extends React.Component{

    selectPollChoices = () => {
            const shuffled = this.props.songObj.beats.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice)
    }

    voteClickHandler = (e) => {
        console.log(this.selectPollChoices()[0])
        let optionId = (e.target.name === "1") ? this.selectPollChoices()[0].id : this.selectPollChoices()[1].id
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
        console.log(this.props.songObj)
        return(
            <div>
                <p>{this.selectPollChoices()[0].id}</p>
                {this.selectPollChoices()[0] !== null ? <button name="1" onClick={this.voteClickHandler}>Vote</button> : null}
                <p>{this.selectPollChoices()[1].id}</p>
                {this.selectPollChoices()[1] !== null ? <button name="2" onClick={this.voteClickHandler}>Vote</button> : null}
            </div>
        )
    }
}

export default PollTwo