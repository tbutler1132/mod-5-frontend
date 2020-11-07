import React from 'react'
import SubmitFormOne from './PhaseOne/SubmitFormOne'
import PollOne from './PhaseOne/PollOne'



class PhaseOne extends React.Component {


    
    // componentDidMount = () => {

    //         fetch("http://localhost:3000/ref_imgs")
    //         .then(r => r.json())
    //         .then(images =>{ 
    //             const filtered = images.filter(image => image.song.id === this.props.songObj.id)
    //             this.setState({imagesArray: filtered})
    //         }) 
 
    // }


// COMPLETED
    // filterSelectedBeats = () => {
    //     const winner = this.props.songObj.beats.filter(beat => beat.selected)
    //         if (winner){
    //             // this.setState({selectedBeat: winner[0]})
    //             return winner[0]
    //         }
    // }

    selectPollChoices = () => {

        // return this.state.imagesArray[Math.floor(Math.random()*this.state.imagesArray.length)];
        
        const shuffled = this.props.imagesArray.sort(() => 0.5 - Math.random());
        let choices = shuffled.slice(0, 2);
        const pollOptions = choices.map(choice => choice)
        // this.setState({pollChoices: pollOptions})
        return choices

    }  

// IN PROGRESS

        //Images array sum all wins, if they exceed a certain number than take that leader
        // createLeaderBoard = () => {
        //     const wins = this.props.imagesArray.map(image => image.results.filter(result => result.win === true).length)
        //     const imagesWithWins = []
        //     this.props.imagesArray.forEach(function(v,i){
        //         const obj = {};
        //         obj.image = v;
        //         obj.wins = wins[i];
        //         imagesWithWins.push(obj);
        //     });
        //     const sortedByWins = imagesWithWins.sort(function (l, r) {
        //         return r.wins - l.wins;
        //     });


            
        //     return sortedByWins
        //     // const winner = sortedByWins[0]
        //     // if (winner && sortedByWins[0].wins > 15){
        //     //     const songOptions = {
        //     //         method: "PATCH",
        //     //         headers: {
        //     //           "content-type": "application/json",
        //     //           "accept": "application/json"
        //     //         },
        //     //         body: JSON.stringify({ phase: 2 })
        //     //       }

        //     //     fetch(`http://localhost:3000/songs/${this.props.songObj.id}`, songOptions)
        //     //     .then(r => r.json())
        //     //     .then(song => console.log(song))

        //     //     const beatOptions = {
        //     //         method: "PATCH",
        //     //         headers: {
        //     //           "content-type": "application/json",
        //     //           "accept": "application/json"
        //     //         },
        //     //         body: JSON.stringify({ selected: true })
        //     //     }
        //     //     fetch(`http://localhost:3000/ref_imgs/${winner.id}`, beatOptions)
        //     //     .then(r => r.json())
        //     //     .then(beat => console.log(beat))
            

        //     //     this.setState({winningImage: sortedByWins[0], currentPhase: 2}) 
        //     // } else {
        //     //     return ["Ass", null, null]
        //     // }
            
        // }

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
        }
    }

        
        
        
        
        
        render(){
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