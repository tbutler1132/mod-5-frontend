import React from 'react'
import PhaseThree from './PhaseThree'
import SubmitFormTwo from './PhaseTwo/SubmitFormTwo'


class PhaseTwo extends React.Component {

    state = {
        vocalsArray: [],
        highestScore: "",
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/vocals")
        .then(r => r.json())
        .then(vocals =>{ 
            const filtered = vocals.filter(vocal => vocal.beat.song.id === this.props.songObj.id)
            this.setState({vocalsArray: filtered})
        }) 
    }

// IN PROGRESS

// createBeatsLeaderBoard = () => {
//     const wins = this.props.beatsArray.map(beat => beat.results.filter(result => result.win === true).length)
//     const beatsWithWins = []
//     this.props.beatsArray.forEach(function(v,i){
//         const obj = {};
//         obj.beat = v;
//         obj.wins = wins[i];
//         beatsWithWins.push(obj);
//       });
//       const sortedByWins = beatsWithWins.sort(function (l, r) {
//         return r.wins - l.wins;
//     });
//     return sortedByWins
// }

    createVocalsLeaderBoard = () => {
        const wins = this.state.vocalsArray.map(vocal => vocal.results.filter(result => result.win === true).length)
        const vocalsWithWins = []
        this.state.vocalsArray.forEach(function(v,i){
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


// COMPLETED

    filterVocals = () => {
        if (this.props.songObj.vocals.length > 0){
            const winner = this.props.songObj.vocals.filter(vocal => vocal.selected === true)
            return winner[0]
        } 
    }

        
        render(){
            console.log(this.state.highestScore)
            if (this.props.phase > 2)
                return(
                    this.props.songObj.beats.length > 0 ? 
                    <div>
                        
                        {this.props.phase === 6 && this.props.songObj.title === "Track 1" ? <iframe width="35%" height="200" scrolling="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/411293064&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                        :
                        <p>Beat Key: {this.props.winningBeat.key_sig}</p>
                        }
                        <PhaseThree songObj={this.props.songObj} winningVocal={this.filterVocals()} vocalsArray={this.state.vocalsArray} vocalsLeaderBoard={this.createVocalsLeaderBoard()} phase={this.props.phase}/>
                    </div> 
                    : 
                    null
                )
            else if (this.props.phase === 2){
                return (
                <div>
                    {/* <SubmitFormTwo songObj={this.props.songObj}/> */}

                    <h3>Beats Leaderboard</h3>
                    <p>1. {this.props.beatsLeaderBoard[0] !== undefined ? this.props.beatsLeaderBoard[0].beat.key_sig : null}</p>
                    <p>2. {this.props.beatsLeaderBoard[1] !== undefined ? this.props.beatsLeaderBoard[1].beat.key_sig : null}</p>
                    <p>3. {this.props.beatsLeaderBoard[2] !== undefined ? this.props.beatsLeaderBoard[2].beat.key_sig : null}</p>
                </div>
                )
            }
            else {
                return (
                    null
                )
            }
        }
    }


export default PhaseTwo