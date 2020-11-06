import React from 'react'
import PhaseTwo from '../PhaseTwo'

class LeaderBoardOne extends React.Component{
    render(){
        return(
            <div>
            <h3>Artwork Leaderboard</h3>
                <p>1. <img alt="" src={this.props.imageLeaderboard[0].image.img_url} width="125" height="100"/></p> 
                <p>{this.props.imageLeaderboard[0].wins}</p> 
                <p>2. <img alt="" src={this.props.imageLeaderboard[1].image.img_url} width="125" height="100"/></p>
                <p>{this.props.imageLeaderboard[1].wins}</p>
                <p>3. <img alt="" src={this.props.imageLeaderboard[2].image.img_url} width="125" height="100"/></p> 
                <p>{this.props.imageLeaderboard[2].wins}</p>
                {/* <PhaseTwo /> */}
            </div>
        )
    }
}

export default LeaderBoardOne