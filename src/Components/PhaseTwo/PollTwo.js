import React from 'react'

class PollTwo extends React.Component{

    selectPollChoices = () => {
            const shuffled = this.props.songObj.beats.sort(() => 0.5 - Math.random());
            let choices = shuffled.slice(0, 2);
            return choices.map(choice => choice)
    }


    render(){
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