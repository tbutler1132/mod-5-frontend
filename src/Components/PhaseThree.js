import React from 'react'
import PhaseFour from './PhaseFour'
import PollThree from './PhaseThree/PollThree';
import SubmitFormThree from './PhaseThree/SubmitFormThree'

class PhaseThree extends React.Component {

    selectPollChoices = () => {

        // return this.state.imagesArray[Math.floor(Math.random()*this.state.imagesArray.length)];
        
        const shuffled = this.props.vocalsArray.sort(() => 0.5 - Math.random());
        let choices = shuffled.slice(0, 2);
        const pollOptions = choices.map(choice => choice)
        // this.setState({pollChoices: pollOptions})
        return choices

    }

    createVocalLeaderBoard = () => {
        if (this.props.vocalsArray.length > 0){
        const wins = this.props.vocalsArray.map(vocal => vocal.results.filter(result => result.win === true).length)
        const vocalsWithWins = []
        this.props.vocalsArray.forEach(function(v,i){
            const obj = {};
            obj.vocal = v;
            obj.wins = wins[i];
            vocalsWithWins.push(obj);
        });
        const sortedByWins = vocalsWithWins.sort(function (l, r) {
            return r.wins - l.wins;
        });
        
        return sortedByWins
        }
    }


    render(){
        console.log(this.props.vocalsArray)
            return(
                <>
                <SubmitFormThree
                selectedBeat={this.props.selectedBeat}
                songObj={this.props.songObj}
                newPoll={this.props.newPoll} 
                pollId={this.props.pollId} 
                pollResults={this.props.pollResults}
                vocalsArray={this.props.vocalsArray} 
                vocalsArrayDataFlow={this.props.vocalsArrayDataFlow}

                />
                <PollThree vocalDataFlow={this.props.vocalDataFlow} vocalsArray={this.props.vocalsArray} selectPollChoices={this.selectPollChoices} createVocalLeaderBoard={this.createVocalLeaderBoard()} songObj={this.props.songObj} pollId={this.props.pollId}/>
                </>
            )

    }

}

export default PhaseThree