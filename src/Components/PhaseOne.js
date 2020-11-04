import React from 'react'
import PhaseTwo from './PhaseTwo'



class PhaseOne extends React.Component {

    state = {
        beatsArray: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/beats")
        .then(r => r.json())
        .then(beats =>{ 
            const filtered = beats.filter(beat => beat.song.id === this.props.songObj.id)
            this.setState({beatsArray: filtered})
        }) 
    }


// COMPLETED
    filterSelectedBeats = () => {
        const winner = this.props.songObj.beats.filter(beat => beat.selected)
            if (winner){
                return winner[0]
            }
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

        
        
        
        
        
        render(){
            // console.log(this.props.winningImage.img_url)
            if (this.props.phase > 1) {
                return(
                    this.props.songObj.ref_imgs.length > 0 ? 
                    <div>
                        <h3>Artwork</h3>
                        <img src={this.props.winningImage.img_url} width="200" height="200"/>
                        <PhaseTwo songObj={this.props.songObj} winningBeat={this.filterSelectedBeats()} beatsArray={this.state.beatsArray} beatsLeaderBoard={this.createBeatsLeaderBoard()} phase={this.props.phase}/> 
                    </div> 
                    : 
                    null
                )
            } else if (this.props.phase === 1) {
                return(
                <div>
                    <h3>Artwork Leaderboard</h3>
                    <p>1. <img src={this.props.imageLeaderboard[0].image.img_url} width="125" height="100"/></p>
                    {/* <p>{this.props.imageLeaderboard[0].wins}</p> */}
                    <p>2. <img src={this.props.imageLeaderboard[1].image.img_url} width="125" height="100"/></p>
                    <p>3. <img src={this.props.imageLeaderboard[2].image.img_url} width="125" height="100"/></p>
                </div>
                )
            } else {
                return(
                    null
                )
            }
        }
    }


export default PhaseOne