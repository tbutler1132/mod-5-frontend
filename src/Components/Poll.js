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

    render(){
        this.selectPollChoices()
        return(
            <div>
                <p>{this.selectPollChoices()[0]}</p>
                {this.selectPollChoices()[0] !== null ? <button>Vote</button> : null}
                <p>{this.selectPollChoices()[1]}</p>
                {this.selectPollChoices()[1] !== null ? <button>Vote</button> : null}
            </div>
        )
    }
}

export default Poll