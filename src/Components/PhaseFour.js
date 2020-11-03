import React from 'react'


class PhaseFour extends React.Component {

    state = {
        mixesArray: [],
        leaderboard: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/mixes")
        .then(r => r.json())
        .then(mixes =>{ 
            this.setState({mixesArray: mixes})
        })
    }

    filterMixes = () => {
        if (this.props.songObj.mixes.length > 0){
            const winner = this.props.songObj.mixes.filter(mix => mix.selected === true)
            return winner[0].id
        } 
    }

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
    
    render(){
        if (this.props.songObj.phase > 4){
            return(
                <div>
                    {this.props.songObj.mixes.length > 0 ? <p>Mix ID: {this.props.winningMix.id} </p> : null}
                </div>
            )
        } else if (this.props.songObj.phase === 4){
            return (
                <div>
                    <p>1. {this.createMixesLeaderBoard()[0] !== undefined ? this.createMixesLeaderBoard()[0].mix.id : null}</p>
                    <p>2. {this.createMixesLeaderBoard()[1] !== undefined ? this.createMixesLeaderBoard()[1].mix.id : null}</p>
                    <p>3. {this.createMixesLeaderBoard()[2] !== undefined ? this.createMixesLeaderBoard()[2].mix.id : null}</p>
                </div>
            ) 
        } else {
            return(null)
        }
    }
}

export default PhaseFour