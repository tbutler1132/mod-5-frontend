import React from 'react'

class PhaseFive extends React.Component {

    state = {
        mastersArray: [],
        leaderboard: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/masters")
        .then(r => r.json())
        .then(masters =>{ 
            this.setState({mastersArray: masters})
        })
    }

    filterMasters = () => {
        if (this.props.songObj.masters.length > 0){
            const winner = this.props.songObj.masters.filter(master => master.selected === true)
            return winner[0].id
        } 
    }

    createMastersLeaderBoard = () => {
        const wins = this.state.mastersArray.map(mix => mix.results.filter(result => result.win === true).length)
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
        if (this.props.songObj.phase > 5){
            return(
                <div>
                    { this.props.songObj.masters.length  > 0 ? <p>Master Id: {this.props.winningMaster.id}</p> : null}
                </div>
            )
        } else if (this.props.songObj === 5){
            return (
                <div>
                    <p>1. {this.createMastersLeaderBoard()[0] !== undefined ? this.createMastersLeaderBoard()[0].master.id : null}</p>
                    <p>2. {this.createMastersLeaderBoard()[1] !== undefined ? this.createMastersLeaderBoard()[1].master.id : null}</p>
                    <p>3. {this.createMastersLeaderBoard()[2] !== undefined ? this.createMastersLeaderBoard()[2].master.id : null}</p>
                </div>
            )  
        } else {
            return(null)
        }
    }
}

export default PhaseFive