import React from 'react'
import PhaseFive from './PhaseFive'
import SubmitFormFour from './PhaseFour/SubmitFormFour';
import PollFour from './PhaseFour/PollFour'

const ear = 17

class PhaseFour extends React.Component {

    selectPollChoices = () => {
        
        const shuffled = this.props.mixesArray.sort(() => 0.5 - Math.random());
        let choices = shuffled.slice(0, 2);
        const pollOptions = choices.map(choice => choice)
        return choices

    }

    createMixLeaderBoard = () => {
        if (this.props.mixesArray.length > 0){
        const wins = this.props.mixesArray.map(mix => mix.results.filter(result => result.win === true).length)
        const mixesWithWins = []
        this.props.mixesArray.forEach(function(v,i){
            const obj = {};
            obj.mix = v;
            obj.wins = wins[i];
            mixesWithWins.push(obj);
        });
        const sortedByWins = mixesWithWins.sort(function (l, r) {
            return r.wins - l.wins;
        });
        
        return sortedByWins
        }
    }


    
    render(){
            return(
                <>
                <SubmitFormFour 
                songObj={this.props.songObj}
                selectedVocal={this.props.selectedVocal}
                newPoll={this.props.newPoll} 
                pollId={this.props.pollId} 
                pollResults={this.props.pollResults}
                mixesArray={this.props.mixesArray}
                mixesArrayDataFlow={this.props.mixesArrayDataFlow}
                />
                <PollFour mixDataFlow={this.props.mixDataFlow} mixesArray={this.props.mixesArray} selectPollChoices={this.selectPollChoices} createMixLeaderBoard={this.createMixLeaderBoard()} songObj={this.props.songObj} pollId={this.props.pollId}/>
                </>
            )
    }
}

export default PhaseFour