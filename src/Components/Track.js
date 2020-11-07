import React from 'react'
import PhaseOne from './PhaseOne'
import PhaseTwo from './PhaseTwo'
import PhaseThree from './PhaseThree'
import PhaseFour from './PhaseFour'
import PhaseFive from './PhaseFive'
// import { Route, Switch, NavLink } from 'react-router-dom'
// import Poll from './Poll'
// import SubmitForm from './SubmitForm'

class Track extends React.Component {

    state = {

        songObj: this.props.songObj,

        phase: this.props.songObj.phase,

        trackClicked: false,
        pollResults: this.props.pollResults,
        pollClickedFirstTime: false,
        currentPollId: "",
        pollClickedAgain: false,
        
        imagesArray: [],
        beatsArray: [],
        vocalsArray: [],
        mixesArray: [],
        mastersArray: [],

        selectedImage: {},
        selectedBeat: {},
        selectedVocal: {},
        selectedMix: {},
        selectedMaster: {}
    }

    
    
    componentDidMount = () => {
       
            fetch("http://localhost:3000/ref_imgs")
            .then(r => r.json())
            .then(images =>{ 
                const filtered = images.filter(image => image.song.id === this.state.songObj.id)
                const selected = filtered.filter(image => image.selected === true)[0]
                this.setState({imagesArray: filtered, selectedImage: selected})
                
            }) 
     
            fetch("http://localhost:3000/beats")
            .then(r => r.json())
            .then(beats =>{ 
                const filtered = beats.filter(beat => beat.song.id === this.state.songObj.id)
                const selected = filtered.filter(beat => beat.selected === true)[0]
                this.setState({beatsArray: filtered, selectedBeat: selected})
            })
            
            fetch("http://localhost:3000/vocals")
            .then(r => r.json())
            .then(vocals =>{ 
                const filtered = vocals.filter(vocal => vocal.beat.song.id === this.state.songObj.id)
                const selected = filtered.filter(vocal => vocal.selected === true)[0]
                this.setState({vocalsArray: filtered, selectedVocal: selected})
            }) 

            fetch("http://localhost:3000/mixes")
            .then(r => r.json())
            .then(mixes =>{ 
                const filtered = mixes.filter(mix => mix.vocal.beat.song_id === this.state.songObj.id)
                const selected = filtered.filter(mix => mix.selected === true)[0]
                this.setState({mixesArray: filtered, selectedMix: selected})
            })
            
            fetch("http://localhost:3000/masters")
            .then(r => r.json())
            .then(masters =>{ 
                const filtered = masters.filter(master => master.beat.beat.song_id === this.state.songObj.id)
                const selected = filtered.filter(master => master.selected === true)[0]
                this.setState({mastersArray: filtered, selectedMaster: selected})
            }) 
        

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

    trackDataFlow = (newImagesArray) => {
        this.setState({imagesArray: newImagesArray})
    }

    imageDataFlow = (imageObj, songObj) => {
        this.setState({selectedImage: imageObj})
        this.setState({phase: songObj.phase})
    }

    beatsArrayDataFlow = (newBeatsArray) => {
        this.setState({beatsArray: newBeatsArray})
    }

    beatDataFlow = (beatObj, songObj) => {
        this.setState({selectedBeat: beatObj})
        this.setState({phase: songObj.phase})
    }

    vocalsArrayDataFlow = (newVocalsArray) => {
        this.setState({vocalsArray: newVocalsArray})
    }

    vocalDataFlow = (vocalObj, songObj) => {
        this.setState({selectedVocal: vocalObj})
        this.setState({phase: songObj.phase})
    }

    mixesArrayDataFlow = (newMixesArray) => {
        this.setState({mixesArray: newMixesArray})
    }

    mixDataFlow = (mixObj, songObj) => {
        this.setState({selectedMix: mixObj})
        this.setState({phase: songObj.phase})
    }

    mastersArrayDataFlow = (newMastersArray) => {
        this.setState({mastersArray: newMastersArray})
    }

    masterDataFlow = (masterObj, songObj) => {
        this.setState({selectedMaster: masterObj})
        this.setState({phase: songObj.phase})
    }


    leaderBoardDataFlow = () => {

    }

    // pollClickHandler = () => {
    //    // Get all polls. If polls filtered by phase === songOBj.phase >= 15 declare winner, get state.leaderboard and take [0] and PATCH selected to true and PATCH phase to +1
    //     if (this.state.pollClickedFirstTime === false){
    //         this.setState({pollClickedFirstTime: true})
    //     } 
    //     const newPoll = {
    //         phase: this.state.songObj.phase,
    //         user_id: 76
    //     }
    //     const options = {
    //         method: "POST",
    //         headers: {
    //           "content-type": "application/json",
    //           "accept": "application/json"
    //         },
    //         body: JSON.stringify({ poll: newPoll })
    //       }
    //     fetch("http://localhost:3000/polls", options)
    //     .then(r => r.json())
    //     .then(pollObj => {
    //         console.log(pollObj)
    //         this.setState({currentPollId: pollObj.id})
    //     })
    // }


// LEADERBOARDS

    // createImageLeaderBoard = () => {
    //     if (this.state.imagesArray.length > 0){
    //     const wins = this.state.imagesArray.map(image => image.results.filter(result => result.win === true).length)
    //     const imagesWithWins = []
    //     this.state.imagesArray.forEach(function(v,i){
    //         const obj = {};
    //         obj.image = v;
    //         obj.wins = wins[i];
    //         imagesWithWins.push(obj);
    //     });
    //     const sortedByWins = imagesWithWins.sort(function (l, r) {
    //         return r.wins - l.wins;
    //     });
        
    //     return sortedByWins
    //     }
    //     else {
    //         return [null, null, null]
    //     }
    // }


    // filterSongImages = () => {
    //     const filtered = this.state.imagesArray.filter(image => image.song.id === this.state.songObj.id)
    //     console.log(this.state.songObj.id)
    //     this.setState({imagesArray: filtered})
    // }



//      WINNERS

    // filterResults = () => {

    //     const results = this.state.pollResults
    //     // console.log(this.state.songObj.id)
    //     // const ear = results.filter(result => result.winnable.song.id === this.props.songObj.id)
    //     console.log(results)
        

    // }

    // filterSelectedBeats = () => {
    //     const winner = this.props.songObj.beats.filter(beat => beat.selected)
    //         if (winner){
    //             return winner[0]
    //         }
    // }

    // filterSelectedImages = () => {
    //     const winner = this.state.songObj.ref_imgs.filter(image => image.selected)
    //     if (winner){
    //         return winner[0]
    //     }
    // }



    // filterVocals = () => {
    //     if (this.state.songObj.vocals.length > 0){
    //         const winner = this.state.songObj.vocals.filter(vocal => vocal.selected === true)
    //         return winner[0]
    //     } 
    // }

    // filterMixes = () => {
    //     if (this.state.songObj.mixes.length > 0){
    //         const winner = this.state.songObj.mixes.filter(mix => mix.selected === true)
    //         return winner[0]
    //     } 
    // }

    // filterMasters = () => {
    //     if (this.state.songObj.masters.length > 0){
    //         const winner = this.state.songObj.masters.filter(master => master.selected === true)
    //         return winner[0]
    //     } 
    // }

    phaseChange = () => {
        const newPhase = this.state.phase + 1
        const songOptions = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
                body: JSON.stringify({ phase: newPhase })
            }

        fetch(`http://localhost:3000/songs/${this.state.songObj.id}`, songOptions)
        .then(r => r.json())
        .then(song => {
            console.log(song)
            if (this.state.phase === 6){
                this.setState({phase: 1})
            } else {
                this.setState({phase: newPhase})
            }
        })
        
        
        if (this.state.pollClickedFirstTime === true){
            this.setState({pollClickedFirstTime: false})
        }
    }
    

    render(){
        return(
            <div className="track" >
                {/* <NavLink to={`tracks/${this.props.songObj.id}`}> */}
                    <h1 onClick={this.trackClickHandler}>{this.state.songObj.title}</h1>
                {/* </NavLink> */}
                <h3>Phase: {this.state.phase === 6 ? "Complete" :  this.state.phase}</h3>
                <h4>Song description</h4>
                
                {this.state.trackClicked === true ?
                <div>
                {this.state.phase === 1 ?
                <PhaseOne 
                songObj={this.state.songObj} 
                referenceResults={this.referenceResults()} 
                imageDataFlow={this.imageDataFlow} 
                imagesArray={this.state.imagesArray} 
                // imageLeaderboard={this.createImageLeaderBoard()} 
                phase={this.state.phase}
                pollId={this.state.currentPollId}
                newPoll={this.pollClickHandler}
                pollId={this.state.currentPollId}
                pollResults={this.state.pollResults}
                trackDataFlow={this.trackDataFlow}
                />

                :
                this.state.phase === 2 ?
                <>
                <img alt="" src={this.state.selectedImage.img_url} width="125" height="100"/>
                <PhaseTwo 
                songObj={this.state.songObj}
                beatsArray={this.state.beatsArray}
                beatsArrayDataFlow={this.beatsArrayDataFlow}
                beatDataFlow={this.beatDataFlow}
                phase={this.state.phase}
                pollId={this.state.currentPollId}
                newPoll={this.pollClickHandler}
                pollId={this.state.currentPollId}
                pollResults={this.state.pollResults}
                />
                </>
                :
                this .state.phase === 3 ?
                <>
                <img alt="" src={this.state.selectedImage.img_url} width="125" height="100"/>
                <p>Beat winner: {this.state.selectedBeat.key_sig}</p>
                <PhaseThree
                selectedBeat={this.state.selectedBeat} 
                songObj={this.state.songObj}
                vocalsArray={this.state.vocalsArray}
                vocalsArrayDataFlow={this.vocalsArrayDataFlow}
                vocalDataFlow={this.vocalDataFlow}
                phase={this.state.phase}
                pollId={this.state.currentPollId}
                newPoll={this.pollClickHandler}
                pollId={this.state.currentPollId}
                />
                </>
                :
                this.state.phase === 4 ?
                <>
                <PhaseFour
                selectedVocal={this.state.selectedVocal} 
                songObj={this.state.songObj}
                mixesArray={this.state.mixesArray}
                phase={this.state.phase}
                mixesArrayDataFlow={this.mixesArrayDataFlow}
                mixDataFlow={this.mixDataFlow}
                pollId={this.state.currentPollId}
                newPoll={this.pollClickHandler}
                pollId={this.state.currentPollId}
                />
                </>
                :
                this.state.phase === 5 ?
                <PhaseFive 
                selectedMix={this.state.selectedMix} 
                songObj={this.state.songObj}
                mastersArray={this.state.mastersArray}
                phase={this.state.phase}
                mastersArrayDataFlow={this.mastersArrayDataFlow}
                masterDataFlow={this.masterDataFlow}
                pollId={this.state.currentPollId}
                newPoll={this.pollClickHandler}
                pollId={this.state.currentPollId}
                />
                :
                null


                }
                
                
                
                
                {/* {this.state.songObj.phase === 6 ? null :<button>Submit</button>} */}
                {/* {this.state.songObj.phase === 6 ? null : <button onClick={this.pollClickHandler}>Vote on poll</button>} */}
                {/* {this.state.pollClickedFirstTime === true ? <Poll  songObj={this.state.songObj} pollId={this.state.currentPollId} newPoll={this.pollClickHandler} phase={this.state.phase}/> : null}
                <SubmitForm songObj={this.state.songObj} winningBeat={this.filterSelectedBeats()} winningVocal={this.filterVocals()} winningMix={this.filterMixes()} winningMaster={this.filterMasters()} phase={this.state.phase}/> */}
                {/* <Route path="poll" component={Poll} />  */}
                {/* <button onClick={this.phaseChange}>Initiate New Phase</button> */}
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