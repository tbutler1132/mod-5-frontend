import React from 'react'
import PhaseTwo from './PhaseTwo'

    class PhaseOne extends React.Component {


// COMPLETED
        filterSelectedImages = () => {
            const winner = this.props.songObj.ref_imgs.filter(image => image.selected)
            if (winner){
                return winner[0].img_url
            }
        }

// IN PROGRESS
        testFunction = () => {
            return this.props.referenceResults.length
        }

        render(){
            
            if (this.props.songObj.phase > 1) {
                return(
                    this.props.songObj.ref_imgs.length > 0 ? <div><img src={this.filterSelectedImages()} width="250" height="200"/> </div> : null
                )
            } else if (this.props.songObj.phase === 1) {
                return(
                <p>{this.testFunction()}</p>
                )
            } else {
                return(
                    null
                )
            }
        }
    }


export default PhaseOne