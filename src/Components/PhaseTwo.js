import React from 'react'
import PhaseThree from './PhaseThree'
import PollTwo from './PhaseTwo/PollTwo'
import SubmitFormTwo from './PhaseTwo/SubmitFormTwo'


class PhaseTwo extends React.Component {


    selectPollChoices = () => {

        // return this.state.imagesArray[Math.floor(Math.random()*this.state.imagesArray.length)];
        
        const shuffled = this.props.beatsArray.sort(() => 0.5 - Math.random());
        let choices = shuffled.slice(0, 2);
        const pollOptions = choices.map(choice => choice)
        // this.setState({pollChoices: pollOptions})
        return choices

    }

 
    
    createBeatLeaderBoard = () => {
        if (this.props.beatsArray.length > 0){
        const wins = this.props.beatsArray.map(beat => beat.results.filter(result => result.win === true).length)
        const beatsWithWins = []
        this.props.beatsArray.forEach(function(v,i){
            const obj = {};
            obj.beat = v;
            obj.wins = wins[i];
            beatsWithWins.push(obj);
        });
        const sortedByWins = beatsWithWins.sort(function (l, r) {
            return r.wins - l.wins;
        });
        
        return sortedByWins
        }
    }

        
        
    
    
    render(){

        return(
            <div>
                <SubmitFormTwo 
                    songObj={this.props.songObj} 
                    newPoll={this.props.newPoll} 
                    pollId={this.props.pollId} 
                    pollResults={this.props.pollResults}
                    beatsArray={this.props.beatsArray}
                    beatsArrayDataFlow={this.props.beatsArrayDataFlow}
                    
                />
                <PollTwo beatDataFlow={this.props.beatDataFlow} createBeatLeaderBoard={this.createBeatLeaderBoard()} songObj={this.props.songObj} newPoll={this.props.newPoll} pollId={this.props.pollId} beatsArray={this.props.beatsArray} pollResults={this.props.pollResults} selectPollChoices={this.selectPollChoices}/>
            </div>
            )
    }
}


export default PhaseTwo