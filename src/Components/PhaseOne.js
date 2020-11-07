import React from 'react'
import PhaseTwo from './PhaseTwo'
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

        createBeatsLeaderBoard = () => {
            const wins = this.state.beatsArray.map(beat => beat.results.filter(result => result.win === true).length)
            const beatsWithWins = []
            this.state.beatsArray.forEach(function(v,i){
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
            // if (this.props.phase > 1) {
            //     return(
            //         this.props.songObj.ref_imgs.length > 0 ? 
            //         <div>
            //             <h3>Artwork</h3>
            //             <img src={this.props.winningImage.img_url} width="200" height="200"/>
            //             <PhaseTwo songObj={this.props.songObj} winningBeat={this.filterSelectedBeats()} beatsArray={this.state.beatsArray} beatsLeaderBoard={this.createBeatsLeaderBoard()} phase={this.props.phase}/> 
            //         </div> 
            //         : 
            //         null
            //     )
            // } else if (this.props.phase === 1) {
                return(
                <div>
                    <SubmitFormOne 
                        songObj={this.props.songObj} 
                        newPoll={this.props.newPoll} 
                        pollId={this.props.pollId} 
                        // imageLeaderboard={this.props.imageLeaderboard}
                        pollResults={this.props.pollResults}
                        imagesArray={this.props.imagesArray}
                        trackDataFlow={this.props.trackDataFlow}
                        
                    />
                    <PollOne imageDataFlow={this.props.imageDataFlow} createImageLeaderBoard={this.createImageLeaderBoard()} songObj={this.props.songObj} newPoll={this.props.newPoll} pollId={this.props.pollId} imagesArray={this.props.imagesArray} pollResults={this.props.pollResults} selectPollChoices={this.selectPollChoices}/>
                    {/* <PollOne /> */}
                    {/* <h3>Artwork Leaderboard</h3>
                    <p>1. <img src={this.props.imageLeaderboard[0].image.img_url} width="125" height="100"/></p> */}
                    {/* <p>{this.props.imageLeaderboard[0].wins}</p> */}
                    {/* <p>2. <img src={this.props.imageLeaderboard[1].image.img_url} width="125" height="100"/></p>
                    <p>3. <img src={this.props.imageLeaderboard[2].image.img_url} width="125" height="100"/></p> */}
                </div>
                )
            // } else {
            //     return(
            //         null
            //     )
           // }
        }
    }


export default PhaseOne