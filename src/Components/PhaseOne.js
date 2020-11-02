import React from 'react'
import PhaseTwo from './PhaseTwo'

class PhaseOne extends React.Component {

    state = {
        imagesArray: [],
        leaderboard: []
    }


// COMPLETED
        filterSelectedImages = () => {
            const winner = this.props.songObj.ref_imgs.filter(image => image.selected)
            if (winner){
                return winner[0].img_url
            }
        }

// IN PROGRESS
        componentDidMount = () => {
            fetch("http://localhost:3000/ref_imgs")
            .then(r => r.json())
            .then(images =>{ 
                this.setState({imagesArray: images})
                const totalPolls = images.map(image => image.results.length)
                console.log(totalPolls)
                const wins = images.map(image => image.results.filter(result => result.win === true).length)
                
                
                const imagesWithWins = []
                images.forEach(function(v,i){
                    const obj = {};
                    obj.image = v;
                    obj.wins = wins[i];
                    imagesWithWins.push(obj);
                  });
                  console.log(imagesWithWins);

                  const sortedByWins = imagesWithWins.sort(function (l, r) {
                    return r.wins - l.wins;
                });
                this.setState({leaderboard: sortedByWins})
            })
        }

        
        
        
        
        render(){
            
            if (this.props.songObj.phase > 1) {
                return(
                    this.props.songObj.ref_imgs.length > 0 ? <div><img src={this.filterSelectedImages()} width="250" height="200"/> </div> : null
                )
            } else if (this.props.songObj.phase === 1) {
                return(
                <p>{console.log(this.state.leaderboard)}</p>
                )
            } else {
                return(
                    null
                )
            }
        }
    }


export default PhaseOne