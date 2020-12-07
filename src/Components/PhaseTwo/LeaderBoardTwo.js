import React from 'react'
import ReactAudioPlayer from 'react-audio-player';

class LeaderBoardTwo extends React.Component{


    incrementPhase = () => {
        const selectOptions = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ selected: true })
          }
        fetch(`http://localhost:3000/beats/${this.props.beatLeaderboard[0].beat.id}`, selectOptions)
        .then(r => r.json())
        .then(beatObj => {
          console.log(beatObj)
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
                this.props.beatDataFlow(beatObj, songObj)
            })
        })


    }

    render(){
      console.log(this.props.beatLeaderboard)
        return(
            this.props.beatLeaderboard !== undefined ?
            <div>
                <h3>Beat Leaderboard</h3>
                  {/* <ReactAudioPlayer
                  src={`http://localhost:3000/${this.props.beatLeaderboard[0].beat.audio_data.url}`}
                  controls
                  /> */}
                <p>{this.props.beatLeaderboard[0].wins}</p> 
                <ReactAudioPlayer
                src={`http://localhost:3000/${this.props.beatLeaderboard[1].beat.audio_data.url}`}
                controls
                />
                <p>{this.props.beatLeaderboard[1].wins}</p>
                <ReactAudioPlayer
                src={`http://localhost:3000/${this.props.beatLeaderboard[2].beat.audio_data.url}`}
                controls
                />
                    <p>{this.props.beatLeaderboard[2].wins}</p>
                    <button onClick={this.incrementPhase}>Initiate Next Phase</button>
                    {/* <PhaseTwo /> */}
             </div>
            :
            null
            // <p>Awaiting Results</p>
            
        )
    }
}

export default LeaderBoardTwo