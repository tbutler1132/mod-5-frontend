import React from 'react'
import SubmitFormFive from './PhaseFive/SubmitFormFive';
import PollFive from './PhaseFive/PollFive';

class PhaseFive extends React.Component {

    selectPollChoices = () => {
        
        const shuffled = this.props.mastersArray.sort(() => 0.5 - Math.random());
        let choices = shuffled.slice(0, 2);
        const pollOptions = choices.map(choice => choice)
        return choices

    }

    createMasterLeaderBoard = () => {
        if (this.props.mastersArray.length > 0){
        const wins = this.props.mastersArray.map(master => master.results.filter(result => result.win === true).length)
        const mastersWithWins = []
        this.props.mastersArray.forEach(function(v,i){
            const obj = {};
            obj.master = v;
            obj.wins = wins[i];
            mastersWithWins.push(obj);
        });
        const sortedByWins = mastersWithWins.sort(function (l, r) {
            return r.wins - l.wins;
        });
        
        return sortedByWins
        }
    }



    render(){
        console.log(this.props.mastersArray)
            return(
                <>
                <SubmitFormFive 
                songObj={this.props.songObj}
                selectedMix={this.props.selectedMix}
                newPoll={this.props.newPoll} 
                pollId={this.props.pollId} 
                pollResults={this.props.pollResults}
                mastersArray={this.props.mastersArray}
                mastersArrayDataFlow={this.props.mastersArrayDataFlow}
                />
                <PollFive masterDataFlow={this.props.masterDataFlow} mastersArray={this.props.mastersArray} selectPollChoices={this.selectPollChoices} createMasterLeaderBoard={this.createMasterLeaderBoard()} songObj={this.props.songObj} pollId={this.props.pollId}/>
                </>
            )
    }
}

export default PhaseFive