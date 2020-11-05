import React from 'react'
import PollTwo from './PollTwo'

class SubmitFormTwo extends React.Component{

    state = {

        beatBpm: "",
        beatKeySig: "",
        beatUrl: "",

    }

    changeHandler = (e) => {
        console.log("changing")
        this.setState({ [e.target.name]: e.target.value })
    }

    phaseTwoSubmitHandler = (e) => {
        e.preventDefault()
        const newBeat = {
            bpm: this.state.beatBpm,
            key_sig: this.state.beatKeySig,
            selected: false,
            user_id: 76,
            song_id: this.props.songObj.id
        }
        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ beat: newBeat })
          }
        fetch("http://localhost:3000/beats", options)
        .then(r => r.json())
        .then(beatObj => console.log(beatObj))
    }

    render(){
        console.log(this.props.songObj)
        return(
            <>
                <h5>Submit a Beat</h5>
                <form onSubmit={this.phaseTwoSubmitHandler}>
                    <input type="text" name="beatBpm" value={this.state.beatBpm} placeholder="BPM" onChange={this.changeHandler} />
                    <input type="text" name="beatKeySig" value={this.state.beatKeySig} placeholder="Key" onChange={this.changeHandler} />
                    <input type="text" name="beatUrl" value={this.state.beatUrl} placeholder="URL" onChange={this.changeHandler} />
                    {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                    <button>Submit beat</button>
                </form>
                {/* <PollTwo pollId={this.props.currentPollId} songObj={this.props.songObj}/> */}
            </>
        )
    }
}

export default SubmitFormTwo