import React from 'react'
import PhaseTwo from './PhaseTwo'

    class PhaseOne extends React.Component {

        filterSelectedImages = () => {
            const winner = this.props.songObj.ref_imgs.filter(image => image.selected)
            if (winner){
                return winner[0].title
            }
        }

        render(){
            return(
                this.props.songObj.ref_imgs.length > 0 ? <div><p>{this.filterSelectedImages()}</p> <PhaseTwo songObj={this.props.songObj}/></div> : null
            )
        }
    }


export default PhaseOne