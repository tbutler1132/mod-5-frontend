import React from 'react'


class LeaderBoardFive extends React.Component{


    incrementPhase = () => {
        const selectOptions = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ selected: true })
          }
        fetch(`http://localhost:3000/masters/${this.props.masterLeaderboard[0].master.id}`, selectOptions)
        .then(r => r.json())
        .then(masterObj => {
          console.log(masterObj)
            const phaseOptions = {
                method: "PATCH",
                headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
                },
                body: JSON.stringify({ phase: this.props.songObj.phase + 1 })
              }
            fetch(`http://localhost:3000/songs/${this.props.songObj.id}`, phaseOptions)
            .then(r => r.json())
            .then(songObj => {
                this.props.masterDataFlow(masterObj, songObj)
            })
        })


    }

    render(){
        return(
            this.props.masterLeaderboard !== undefined ?
            <div>
                <h3>master Leaderboard</h3>
                    <p>1. {this.props.masterLeaderboard[0].master.id}</p> 
                    <p>{this.props.masterLeaderboard[0].wins}</p> 
                    <p>2. {this.props.masterLeaderboard[1].master.id} </p>
                    <p>{this.props.masterLeaderboard[1].wins}</p>
                    {/* <p>3. {this.props.masterLeaderboard[2].master.id} </p> 
                    <p>{this.props.masterLeaderboard[2].wins}</p> */}
                    <button onClick={this.incrementPhase}>Initiate Next Phase</button>
                    {/* <PhaseTwo /> */}
             </div>
            :
            <p>Awaiting Results</p>
            
        )
    }
}

export default LeaderBoardFive