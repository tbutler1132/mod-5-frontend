import React from 'react'
import PhaseOne from './PhaseOne'
import PhaseTwo from './PhaseTwo'
import PhaseThree from './PhaseThree'
import PhaseFour from './PhaseFour'
import PhaseFive from './PhaseFive'
import { Route, Switch } from 'react-router-dom'
import Poll from './Poll'
import SubmitForm from './SubmitForm'

class Track extends React.Component {

    state = {
        trackClicked: false,
        pollResults: [],
        pollClickedFirstTime: false,
        currentPollId: "",
        pollClickedAgain: false,
        
        imagesArray: [],
        beatsArray: [],
        vocalsArray: [],
        mixesArray: [],
        mastersArray: []
    }

    
    
    componentDidMount = () => {
        fetch("http://localhost:3000/results")
        .then(r => r.json())
        .then(results => this.setState({pollResults: results}))

        if (this.props.songObj.phase === 1){
            fetch("http://localhost:3000/ref_imgs")
            .then(r => r.json())
            .then(images =>{ 
                const filtered = images.filter(image => image.song.id === this.props.songObj.id)
                this.setState({imagesArray: filtered})
            })
        } else if (this.props.songObj.phase === 2) {
            fetch("http://localhost:3000/beats")
            .then(r => r.json())
            .then(beats =>{ 
                const filtered = beats.filter(beat => beat.song.id === this.props.songObj.id)
                this.setState({beatsArray: filtered})
            }) 
        } else if (this.props.songObj.phase === 3) {
            fetch("http://localhost:3000/vocals")
            .then(r => r.json())
            .then(vocals =>{ 
                const filtered = vocals.filter(vocal => vocal.beat.song.id === this.props.songObj.id)
                this.setState({vocalsArray: filtered})
            }) 
        } else if (this.props.songObj.phase === 4) {
            fetch("http://localhost:3000/mixes")
            .then(r => r.json())
            .then(mixes =>{ 
                console.log(mixes[0].vocal.beat.beat)
                const filtered = mixes.filter(mix => mix.vocal.beat.song_id === this.props.songObj.id)
                this.setState({mixesArray: filtered})
            })
        } else if (this.props.songObj.phase === 5) {
            fetch("http://localhost:3000/masters")
            .then(r => r.json())
            .then(masters =>{ 
                const filtered = masters.filter(master => master.beat.beat.song_id === this.props.songObj.id)
                this.setState({mastersArray: filtered})
            }) 
        }
    }
    
/////////////////////////////////////////////////////////////////////////////////
    referenceResults = () => {
        return this.state.pollResults.filter (result => result.poll.phase === 1)
    }

    beatResults = () => {
        return this.state.pollResults.filter (result => result.poll.phase === 2)
    }

    vocalResults = () => {
        return this.state.pollResults.filter (result => result.poll.phase === 3)
    }
/////////////////////////////////////////////////////////////////////////////////
    
    trackClickHandler = (e) => {
        if (this.state.trackClicked === false){
            this.setState({trackClicked: true})
        } else {
            this.setState({trackClicked: false})
        }
    }

    pollClickHandler = () => {
       // Get all polls. If polls filtered by phase === songOBj.phase >= 15 declare winner, get state.leaderboard and take [0] and PATCH selected to true and PATCH phase to +1
        if (this.state.pollClickedFirstTime === false){
            this.setState({pollClickedFirstTime: true})
        } 
        const newPoll = {
            phase: this.props.songObj.phase,
            user_id: 49
        }
        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ poll: newPoll })
          }
        fetch("http://localhost:3000/polls", options)
        .then(r => r.json())
        .then(pollObj => {
            console.log(pollObj.id)
            this.setState({currentPollId: pollObj.id})
        })
    }


// Phase 1 Leaderboard

// createLeaderBoard = () => {
//     const wins = this.state.imagesArray.map(image => image.results.filter(result => result.win === true).length)
//     const imagesWithWins = []
//     this.state.imagesArray.forEach(function(v,i){
//         const obj = {};
//         obj.image = v;
//         obj.wins = wins[i];
//         imagesWithWins.push(obj);
//       });
//       const sortedByWins = imagesWithWins.sort(function (l, r) {
//         return r.wins - l.wins;
//     });
//     this.setState({leaderboard: sortedByWins})
// }

//      WINNERS

    filterSelectedImages = () => {
        const winner = this.props.songObj.ref_imgs.filter(image => image.selected)
        if (winner){
            return winner[0]
        }
    }

    filterSelectedBeats = () => {
        const winner = this.props.songObj.beats.filter(beat => beat.selected)
            if (winner){
                return winner[0]
            }
    }

    filterVocals = () => {
        if (this.props.songObj.vocals.length > 0){
            const winner = this.props.songObj.vocals.filter(vocal => vocal.selected === true)
            return winner[0]
        } 
    }

    filterMixes = () => {
        if (this.props.songObj.mixes.length > 0){
            const winner = this.props.songObj.mixes.filter(mix => mix.selected === true)
            return winner[0]
        } 
    }

    filterMasters = () => {
        if (this.props.songObj.masters.length > 0){
            const winner = this.props.songObj.masters.filter(master => master.selected === true)
            return winner[0]
        } 
    }
    

    render(){
        return(
            <div className="track" >
                <h1 onClick={this.trackClickHandler}>{this.props.songObj.title}</h1>
                <h3>Phase: {this.props.songObj.phase === 6 ? "Complete" :  this.props.songObj.phase}</h3>
                
                {this.state.trackClicked === true ?
                <div>
                <PhaseOne songObj={this.props.songObj} referenceResults={this.referenceResults()} winningImage={this.filterSelectedImages()} imagesArray={this.state.imagesArray}/>
                <PhaseTwo songObj={this.props.songObj} beatResults={this.beatResults()} winningBeat={this.filterSelectedBeats()} beatsArray={this.state.beatsArray}/>
                <PhaseThree songObj={this.props.songObj} vocalResults={this.vocalResults()} winningVocal={this.filterVocals()} vocalsArray={this.state.vocalsArray}/>
                <PhaseFour songObj={this.props.songObj} winningMix={this.filterMixes()} mixesArray={this.state.mixesArray}/>
                <PhaseFive songObj={this.props.songObj} winningMaster={this.filterMasters()} mastersArray={this.state.mastersArray}/>
                {/* {this.props.songObj.phase === 6 ? null :<button>Submit</button>} */}
                {this.props.songObj.phase === 6 ? null : <button onClick={this.pollClickHandler}>Vote on poll</button>}
                {this.state.pollClickedFirstTime === true ? <Poll  songObj={this.props.songObj} pollId={this.state.currentPollId}/> : null}
                <SubmitForm songObj={this.props.songObj} winningBeat={this.filterSelectedBeats()} winningVocal={this.filterVocals()} winningMix={this.filterMixes()} winningMaster={this.filterMasters()}/>
                {/* <Route path="poll" component={Poll} />  */}
                </div>
                : 
                null
                }
                
                <hr></hr>
            </div>
        )
    }
}


export default Track 