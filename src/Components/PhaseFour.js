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
            console.log(masters)
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

    createMastersLeaderBoard = () => {
        const wins = this.state.mastersArray.map(master => master.results.filter(result => result.win === true).length)
        const mastersWithWins = []
        this.state.mastersArray.forEach(function(v,i){
            const obj = {};
            obj.master = v;
            obj.wins = wins[i];
            mastersWithWins.push(obj);
        });
        const sortedByWins = mastersWithWins.sort(function (l, r) {
            return r.wins - l.wins;
        });
        // this.setState({leaderboard: sortedByWins})
        return sortedByWins
    } 
    
    render(){
        if (this.props.phase > 4){
            return(
                    this.props.songObj.mixes.length > 0 ? 
                        <div> 
                            <p>Mix ID: {this.props.winningMix.id}</p>
                            <PhaseFive songObj={this.props.songObj} winningMaster={this.filterMasters()} mastersArray={this.state.mastersArray} mastersLeaderBoard={this.createMastersLeaderBoard()} phase={this.props.phase}/>
                        </div> 
                    : 
                    null
            )
        } else if (this.props.phase === 4){
            return (
                <div>
                    <h3>Leaderboard</h3>
                    <p>1. {this.props.mixesLeaderBoard[0] !== undefined ? this.props.mixesLeaderBoard[0].mix.id : null}</p>
                    <p>2. {this.props.mixesLeaderBoard[1] !== undefined ? this.props.mixesLeaderBoard[1].mix.id : null}</p>
                    <p>3. {this.props.mixesLeaderBoard[2] !== undefined ? this.props.mixesLeaderBoard[2].mix.id : null}</p>
                </div>
            ) 
        } else {
            return(null)
        }
    }
}

export default PhaseFour