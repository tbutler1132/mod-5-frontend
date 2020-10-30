import React from 'react'
import PhaseTwo from './PhaseTwo'

    class PhaseOne extends React.Component {

        filterSelectedImages = () => {
            const winner = this.props.songObj.ref_imgs.filter(image => image.selected)
            if (winner){
                return winner[0].img_url
            }
        }

        render(){
            return(
                this.props.songObj.ref_imgs.length > 0 ? <div><img src={this.filterSelectedImages()} width="250" height="200"/> </div> : null
            )
        }
    }


export default PhaseOne