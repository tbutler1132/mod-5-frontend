import React from 'react'
import PhaseOne from './PhaseOne'
import PhaseTwo from './PhaseTwo'
import PhaseThree from './PhaseThree'
import PhaseFour from './PhaseFour'
import PhaseFive from './PhaseFive'
import {NavLink} from 'react-router-dom'
import ReactPlayer from 'react-player'
import Upload from './Upload'
import {Container, Row, Col} from 'react-bootstrap'
// import { Route, Switch, NavLink } from 'react-router-dom'
// import Poll from './Poll'
// import SubmitForm from './SubmitForm'

class Track extends React.Component {

    state = {

        songObj: this.props.songObj,

        phase: this.props.songObj.phase,

        clicked: false,

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

    
    
    filterImages = () => {
        const filtered = this.props.imageArray.filter(image => image.song.id === this.state.songObj.id)
        const selected = filtered.filter(image => image.selected === true)[0]
        this.setState({imagesArray: filtered, selectedImage: selected})
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

    trackClickHandler = () => {
        this.state.clicked === false ? this.setState({clicked: true}) : this.setState({clicked: false})
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
       console.log(this.state.selectedImage)
        return(
            <div className="track" >
                <NavLink className="link" to={`tracks/${this.props.songObj.id}`}>
                    <h1 className="header" >{this.state.songObj.title}</h1>
                    <progress value={this.state.phase} max="5">10%</progress>
                </NavLink>
                <h3>Phase: {this.state.phase === 6 ? "Complete" :  this.state.phase}</h3>
                <h5 onClick={this.trackClickHandler}>See progress</h5>

                
                {this.state.clicked === true ?
                <div>
                {this.state.phase === 1 ?
                <>
                <Container className="phasebox">
                <Row>
                <Col>
                <p>Phase 1: Let's select the artwork for our song! This will serve as inspiration and a creative direction for our song!</p>
                </Col>
                <Col >
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
                </Col>
                </Row>
                </Container>
                <hr></hr>
                <p>Submit an image or vote on others!</p>
                </>
                :
                this.state.phase === 2 ?
                <>
                <img className="winning-image" alt="" src={this.state.selectedImage.img_url} width="250" height="250"/>
                <Container className="phasebox">
                <Row>
                <Col>
                <hr></hr>
                <p>Phase 2: Let's select the beat for our song! This will serve as the musical foundation for our song. Once a beat is selected, artists will record their vocals over it.</p>
                </Col>
                <Col >
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
                </Col>
                </Row>
                </Container>
                <hr></hr>
                </>
                :
                this .state.phase === 3 ?
                <>
                <img className="winning-image" alt="" src={this.state.selectedImage.img_url} width="250" height="250"/>
                <Upload songObj={this.state.songObj} selectedBeat={this.state.selectedBeat} phase={this.state.phase} selectedVocal={this.state.selectedVocal} selectedMix={this.state.selectedMix} selectedMaster={this.state.selectedMaster}/>
                <Container className="phasebox">
                <Row>
                <Col>
                <p>Phase 3: Let's select the best vocal performance for our song!</p>
                </Col>
                <Col >
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
                                </Col>
                </Row>
                </Container>
                <hr></hr>
                </>
                :
                this.state.phase === 4 ?
                <>
                <img className="winning-image" alt="" src={this.state.selectedImage.img_url} width="250" height="250"/>
                <Upload songObj={this.state.songObj} selectedBeat={this.state.selectedBeat} phase={this.state.phase} selectedVocal={this.state.selectedVocal} selectedMix={this.state.selectedMix} selectedMaster={this.state.selectedMaster}/>
                <Container className="phasebox">
                <Row>
                <Col>
                <p>Phase 4: Let's select the best mix for our song! Differences between mixes can be subtle, so just trust to your ears!</p>
                </Col>
                <Col >
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
                                                </Col>
                </Row>
                </Container>
                <hr></hr>
                </>
                :
                this.state.phase === 5 ?
                <>
                <img className="winning-image" alt="" src={this.state.selectedImage.img_url} width="250" height="250"/>
                <Upload songObj={this.state.songObj} selectedBeat={this.state.selectedBeat} phase={this.state.phase} selectedVocal={this.state.selectedVocal} selectedMix={this.state.selectedMix} selectedMaster={this.state.selectedMaster}/>
                <Container className="phasebox">
                <Row>
                <Col>
                <p>Phase 5: Let's select the best master for our song! Differences between masters can be subtle, so just trust to your ears!</p>
                </Col>
                <Col >
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
                </Col>
                </Row>
                </Container>
                <hr></hr>
                </>
                :
                <>
                <img className="winning-image" alt="" src={this.state.selectedImage.img_url} width="250" height="250"/>
                <Upload songObj={this.state.songObj} selectedBeat={this.state.selectedBeat} phase={this.state.phase} selectedVocal={this.state.selectedVocal} selectedMix={this.state.selectedMix} selectedMaster={this.state.selectedMaster}/>
                </>
                



                }
                
                
                
                
                {/* {this.state.songObj.phase === 6 ? null :<button>Submit</button>} */}
                {/* {this.state.songObj.phase === 6 ? null : <button onClick={this.pollClickHandler}>Vote on poll</button>} */}
                {/* {this.state.pollClickedFirstTime === true ? <Poll  songObj={this.state.songObj} pollId={this.state.currentPollId} newPoll={this.pollClickHandler} phase={this.state.phase}/> : null}
                <SubmitForm songObj={this.state.songObj} winningBeat={this.filterSelectedBeats()} winningVocal={this.filterVocals()} winningMix={this.filterMixes()} winningMaster={this.filterMasters()} phase={this.state.phase}/> */}
                {/* <Route path="poll" component={Poll} />  */}
                {/* <button onClick={this.phaseChange}>Initiate New Phase</button> */}
                </div>
                :
                null}
                
                <hr></hr>
            </div>

            
        )
    }
}


export default Track 