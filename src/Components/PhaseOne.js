import React from 'react'
import SubmitFormOne from './PhaseOne/SubmitFormOne'
import PollOne from './PhaseOne/PollOne'



class PhaseOne extends React.Component {

    selectPollChoices = () => {

        // return this.state.imagesArray[Math.floor(Math.random()*this.state.imagesArray.length)];
        
        const shuffled = this.props.imagesArray.sort(() => 0.5 - Math.random());
        let choices = shuffled.slice(0, 2);
        const pollOptions = choices.map(choice => choice)
        // this.setState({pollChoices: pollOptions})
        return choices

    }  


    createImageLeaderBoard = () => {
        if (this.props.imagesArray.length > 0){
        const wins = this.props.imagesArray.map(image => image.results.filter(result => result.win === true).length)
        const imagesWithWins = []
        this.props.imagesArray.forEach(function(v,i){
            const obj = {};
            obj.image = v;
            obj.wins = wins[i];
            imagesWithWins.push(obj);
        });
        const sortedByWins = imagesWithWins.sort(function (l, r) {
            return r.wins - l.wins;
        });
        
        return sortedByWins
        } else {
            return []
        }
    }

        
        
        
        
        
        render(){
            console.log(this.createImageLeaderBoard())
                return(
                <div>
                    <SubmitFormOne 
                        songObj={this.props.songObj} 
                        newPoll={this.props.newPoll} 
                        pollId={this.props.pollId} 
                        pollResults={this.props.pollResults}
                        imagesArray={this.props.imagesArray}
                        trackDataFlow={this.props.trackDataFlow}
                        
                    />
                    <PollOne imageDataFlow={this.props.imageDataFlow} createImageLeaderBoard={this.createImageLeaderBoard()} songObj={this.props.songObj} newPoll={this.props.newPoll} pollId={this.props.pollId} imagesArray={this.props.imagesArray} pollResults={this.props.pollResults} selectPollChoices={this.selectPollChoices}/>
                </div>
                )
        }
    }


export default PhaseOne