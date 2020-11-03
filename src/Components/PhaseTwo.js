import React from 'react'
import PhaseThree from './PhaseThree'
import SubmitForm from './SubmitForm'

class PhaseTwo extends React.Component {

    state = {
        beatsArray: [],
        highestScore: "",
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/beats")
        .then(r => r.json())
        .then(beats =>{ 
            this.setState({beatsArray: beats})
        })
    }

// IN PROGRESS

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
    // sortedByWins !== undefined ? this.setState({highestScore: sortedByWins[0].wins}) : console.log("ass")
    return sortedByWins
}


// COMPLETED

    filterSelectedBeats = () => {
        const winner = this.props.songObj.beats.filter(beat => beat.selected)
            if (winner){
                return winner[0]
            }
    }

        
        render(){
            console.log(this.state.highestScore)
            if (this.props.songObj.phase > 2)
                return(
                    this.props.songObj.beats.length > 0 ? <div><p>Beat ID: {this.props.winningBeat.id}</p></div> : null
                )
            else if (this.props.songObj.phase === 2){
                return (
                <div>
                    <p>1. {this.createBeatsLeaderBoard()[0] !== undefined ? this.createBeatsLeaderBoard()[0].beat.id : null}</p>
                    <p>2. {this.createBeatsLeaderBoard()[1] !== undefined ? this.createBeatsLeaderBoard()[1].beat.id : null}</p>
                    <p>3. {this.createBeatsLeaderBoard()[2] !== undefined ? this.createBeatsLeaderBoard()[2].beat.id : null}</p>
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