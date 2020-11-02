import React from 'react'

class SubmitForm extends React.Component{

    state = {
        imageTitle: "",
        imageUrl: "",

        
        beatBpm: "",
        beatKeySig: "",
        beatUrl: ""
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
            user_id: 34,
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
        if (this.props.songObj.phase === 2){
            return(
                <form onSubmit={this.phaseTwoSubmitHandler}>
                    <input type="text" name="beatBpm" value={this.state.beatBpm} placeholder="BPM" onChange={this.changeHandler} />
                    <input type="text" name="beatKeySig" value={this.state.beatKeySig} placeholder="Key" onChange={this.changeHandler} />
                    {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                    <button>Add Beat</button>
                </form>
            )
        } else {
            return(
                null
            )
        }
    }
}

export default SubmitForm