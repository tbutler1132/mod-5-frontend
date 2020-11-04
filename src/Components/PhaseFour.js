import React from 'react'
import PhaseFive from './PhaseFive'


class PhaseFour extends React.Component {

    state = {
        mastersArray: [],
        leaderboard: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/masters")
        .then(r => r.json())
        .then(masters =>{ 
            const filtered = masters.filter(master => master.beat.beat.song_id === this.props.songObj.id)
            this.setState({mastersArray: filtered})
        }) 
    }

    filterMasters = () => {
        if (this.props.songObj.masters.length > 0){
            const winner = this.props.songObj.masters.filter(master => master.selected === true)
            return winner[0]
        } 
    }

    createMixesLeaderBoard = () => {
        const wins = this.props.mixesArray.map(mix => mix.results.filter(result => result.win === true).length)
        const mixesWithWins = []
        this.props.mixesArray.forEach(function(v,i){
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
                    this.props.songObj.mixes.length > 0 ? 
                        <div> 
                            <p>Mix ID: {this.props.winningMix.id}</p>
                            <PhaseFive songObj={this.props.songObj} winningMaster={this.filterMasters()} mastersArray={this.state.mastersArray}/>
                        </div> 
                    : 
                    null
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