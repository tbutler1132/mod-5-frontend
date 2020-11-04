import React from 'react'
import PhaseFour from './PhaseFour'
import SubmitForm from './SubmitForm'

class PhaseThree extends React.Component {

    state = {
        mixesArray: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/mixes")
        .then(r => r.json())
        .then(mixes =>{ 
            const filtered = mixes.filter(mix => mix.vocal.beat.song_id === this.props.songObj.id)
            this.setState({mixesArray: filtered})
        })
    }

//COMPLETE

    createMixesLeaderBoard = () => {
        const wins = this.state.mixesArray.map(mix => mix.results.filter(result => result.win === true).length)
        const mixesWithWins = []
        this.state.mixesArray.forEach(function(v,i){
            const obj = {};
            obj.mix = v;
            obj.wins = wins[i];
            mixesWithWins.push(obj);
        });
        const sortedByWins = mixesWithWins.sort(function (l, r) {
            return r.wins - l.wins;
        });
        // this.setState({leaderboard: sortedByWins})
        return sortedByWins
    }

    filterMixes = () => {
        if (this.props.songObj.mixes.length > 0){
            const winner = this.props.songObj.mixes.filter(mix => mix.selected === true)
            return winner[0]
        } 
    }

//IN PROGRESS

    render(){
        if (this.props.phase > 3){
            return(
                this.props.songObj.vocals.length > 0 ? 
                    <div> 
                        <p>Vocal ID: {this.props.winningVocal.id} </p>
                        <PhaseFour songObj={this.props.songObj} winningMix={this.filterMixes()} mixesArray={this.state.mixesArray} mixesLeaderBoard={this.createMixesLeaderBoard()} phase={this.props.phase}/>
                    </div> 
                    : 
                    null
            )
        }
        else if (this.props.phase === 3){
            return (
                <div>
                    <h3>Leaderboard</h3>
                    <p>1. {this.props.vocalsLeaderBoard[0] !== undefined ? this.props.vocalsLeaderBoard[0].vocal.id : null}</p>
                    <p>2. {this.props.vocalsLeaderBoard[1] !== undefined ? this.props.vocalsLeaderBoard[1].vocal.id : null}</p>
                    <p>3. {this.props.vocalsLeaderBoard[2] !== undefined ? this.props.vocalsLeaderBoard[2].vocal.id : null}</p>
                </div>
            )
        }
        else {
            return (null)
        }
    }
}

export default PhaseThree