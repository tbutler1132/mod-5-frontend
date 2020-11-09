import React from 'react'


class LeaderBoardThree extends React.Component{


    incrementPhase = () => {
        const selectOptions = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ selected: true })
          }
        fetch(`http://localhost:3000/vocals/${this.props.vocalLeaderboard[0].vocal.id}`, selectOptions)
        .then(r => r.json())
        .then(vocalObj => {
          console.log(vocalObj)
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
                this.props.vocalDataFlow(vocalObj, songObj)
            })
        })


    }

    render(){
        return(
            this.props.vocalLeaderboard !== undefined ?
            <div>
                <h3>Vocal Leaderboard</h3>
                    <p>1. {this.props.vocalLeaderboard[0].vocal.id}</p> 
                    <p>{this.props.vocalLeaderboard[0].wins}</p> 
                    <p>2. {this.props.vocalLeaderboard[1].vocal.id} </p>
                    <p>{this.props.vocalLeaderboard[1].wins}</p>
                    {/* <p>3. {this.props.vocalLeaderboard[2].vocal.id} </p> 
                    <p>{this.props.vocalLeaderboard[2].wins}</p> */}
                    <button onClick={this.incrementPhase}>Initiate Next Phase</button>
                    {/* <PhaseTwo /> */}
             </div>
            :
            <p>Awaiting Results</p>
            
        )
    }
}

export default LeaderBoardThree