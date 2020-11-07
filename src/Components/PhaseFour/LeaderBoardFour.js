import React from 'react'


class LeaderBoardFour extends React.Component{


    incrementPhase = () => {
        const selectOptions = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ selected: true })
          }
        fetch(`http://localhost:3000/mixes/${this.props.mixLeaderboard[0].mix.id}`, selectOptions)
        .then(r => r.json())
        .then(mixObj => {
          console.log(mixObj)
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
                this.props.mixDataFlow(mixObj, songObj)
            })
        })


    }

    render(){
        return(
            this.props.mixLeaderboard !== undefined ?
            <div>
                <h3>mix Leaderboard</h3>
                    <p>1. {this.props.mixLeaderboard[0].mix.id}</p> 
                    <p>{this.props.mixLeaderboard[0].wins}</p> 
                    <p>2. {this.props.mixLeaderboard[1].mix.id} </p>
                    <p>{this.props.mixLeaderboard[1].wins}</p>
                    {/* <p>3. {this.props.mixLeaderboard[2].mix.id} </p> 
                    <p>{this.props.mixLeaderboard[2].wins}</p> */}
                    <button onClick={this.incrementPhase}>Initiate Next Phase</button>
                    {/* <PhaseTwo /> */}
             </div>
            :
            <p>Awaiting Results</p>
            
        )
    }
}

export default LeaderBoardFour