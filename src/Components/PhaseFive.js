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



    render(){
        if (this.props.phase > 5){
            return(
                <div>
                    { this.props.songObj.masters.length  > 0 ? <p>Master Id: {this.props.winningMaster.id}</p> : null}
                </div>
            )
        } else if (this.props.phase === 5){
            return (
                <div>
                    <h3>Leaderboard</h3>
                    <p>1. {this.props.mastersLeaderBoard[0] !== undefined ? this.props.mastersLeaderBoard[0].master.id : null}</p>
                    <p>2. {this.props.mastersLeaderBoard[1] !== undefined ? this.props.mastersLeaderBoard[1].master.id : null}</p>
                    <p>3. {this.props.mastersLeaderBoard[2] !== undefined ? this.props.mastersLeaderBoard[2].master.id : null}</p>
                </div>
            )  
        } else {
            return(null)
        }
    }
}

export default PhaseFive