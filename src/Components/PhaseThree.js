import React from 'react'
import PhaseFour from './PhaseFour'

class PhaseThree extends React.Component {

    state = {
        vocalsArray: [],
        leaderboard: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/vocals")
        .then(r => r.json())
        .then(vocals =>{ 
            this.setState({vocalsArray: vocals})
        })
    }

//COMPLETE

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
        // this.setState({leaderboard: sortedByWins})
        return sortedByWins
    }

    filterVocals = () => {
        if (this.props.songObj.vocals.length > 0){
            const winner = this.props.songObj.vocals.filter(vocal => vocal.selected === true)
            return winner[0].id
        } 
    }

//IN PROGRESS

    render(){
        if (this.props.songObj.phase > 3){
            return(
                <div>
                    {this.props.songObj.vocals.length > 0 ? <p>Vocal ID: {this.filterVocals()} </p> : null}
                </div>
            )
        }
        else if (this.props.songObj.phase === 3){
            return (
                <div>
                    <h3>Leaderboard</h3>
                    <p>1. {this.createVocalsLeaderBoard()[0] !== undefined ? this.createVocalsLeaderBoard()[0].vocal.id : null}</p>
                    <p>2. {this.createVocalsLeaderBoard()[1] !== undefined ? this.createVocalsLeaderBoard()[1].vocal.id : null}</p>
                    <p>3. {this.createVocalsLeaderBoard()[2] !== undefined ? this.createVocalsLeaderBoard()[2].vocal.id : null}</p>
                </div>
            )
        }
        else {
            return (null)
        }
    }
}

export default PhaseThree