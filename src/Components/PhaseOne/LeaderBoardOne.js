import React from 'react'
import {Button} from 'react-bootstrap'


class LeaderBoardOne extends React.Component{


    incrementPhase = () => {
        const selectOptions = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ selected: true })
          }
        fetch(`http://localhost:3000/ref_imgs/${this.props.imageLeaderboard[0].image.id}`, selectOptions)
        .then(r => r.json())
        .then(imageObj => {
            console.log(imageObj)
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
                console.log(songObj)
                this.props.imageDataFlow(imageObj, songObj)
            })
        })


    }

    render(){
      console.log(this.props.imageLeaderboard)
        return(
          this.props.imageLeaderboard.length !== 0 ?
            <div className="leaderboard">
            <h3>Artwork Leaderboard</h3>
                <p>1. <img alt="" src={this.props.imageLeaderboard[0].image.img_url} width="125" height="100"/></p> 
                <p>Votes: {this.props.imageLeaderboard[0].wins}</p> 
                <p>2. <img alt="" src={this.props.imageLeaderboard[1].image.img_url} width="125" height="100"/></p>
                <p>Votes: {this.props.imageLeaderboard[1].wins}</p>
                <p>3. <img alt="" src={this.props.imageLeaderboard[2].image.img_url} width="125" height="100"/></p> 
                <p>Votes: {this.props.imageLeaderboard[2].wins}</p>
                <Button variant="dark" onClick={this.incrementPhase}>Initiate Next Phase</Button>
                {/* <PhaseTwo /> */}
            </div>
                :
                null
        )
    }
}

export default LeaderBoardOne