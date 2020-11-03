import React from 'react'
import PhaseTwo from './PhaseTwo'

class PhaseOne extends React.Component {

    state = {
        imagesArray: [],
        leaderboard: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/ref_imgs")
        .then(r => r.json())
        .then(images =>{ 
            this.setState({imagesArray: images})
        })
    }


// COMPLETED
        filterSelectedImages = () => {
            const winner = this.props.songObj.ref_imgs.filter(image => image.selected)
            if (winner){
                return winner[0].img_url
            }
        }

// IN PROGRESS


        createLeaderBoard = () => {
            const wins = this.state.imagesArray.map(image => image.results.filter(result => result.win === true).length)
            const imagesWithWins = []
            this.state.imagesArray.forEach(function(v,i){
                const obj = {};
                obj.image = v;
                obj.wins = wins[i];
                imagesWithWins.push(obj);
              });
              const sortedByWins = imagesWithWins.sort(function (l, r) {
                return r.wins - l.wins;
            });
            // this.setState({leaderboard: sortedByWins})
            return sortedByWins
        }

        
        
        
        render(){
            // this.createLeaderBoard()
            if (this.props.songObj.phase > 1) {
                return(
                    this.props.songObj.ref_imgs.length > 0 ? <div><img src={this.filterSelectedImages()} width="250" height="200"/> </div> : null
                )
            } else if (this.props.songObj.phase === 1) {
                return(
                <div>
                    <p>1. {this.createLeaderBoard()[0] !== undefined ? this.createLeaderBoard()[0].image.title : null}</p>
                    <p>2. {this.createLeaderBoard()[1] !== undefined ? this.createLeaderBoard()[1].image.title : null}</p>
                    <p>3. {this.createLeaderBoard()[2] !== undefined ? this.createLeaderBoard()[2].image.title : null}</p>
                </div>
                )
            } else {
                return(
                    null
                )
            }
        }
    }


export default PhaseOne