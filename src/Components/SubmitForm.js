import React from 'react'

class SubmitForm extends React.Component{

    state = {
        imageTitle: "",
        imageUrl: "",

        
        beatBpm: "",
        beatKeySig: "",
        beatUrl: "",

        vocalUrl: "",

        mixUrl: "",

        masterUrl: "",

        disabled: ""
    }

    changeHandler = (e) => {
        console.log("changing")
        this.setState({ [e.target.name]: e.target.value })
    }

    phaseOneSubmitHandler = (e) => {
        e.preventDefault()
        if (this.state.disabled === ""){
            this.setState({disabled: "disabled"})
        }
        const newRefImg = {
            title: this.state.imageTitle,
            img_url: this.state.imageUrl,
            selected: false,
            user_id: 73,
            song_id: this.props.songObj.id
        }
        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({ ref_img: newRefImg })
          }
        fetch("http://localhost:3000/ref_imgs", options)
        .then(r => r.json())
        .then(refImgObj => console.log(refImgObj))
    }

    phaseTwoSubmitHandler = (e) => {
        e.preventDefault()
        const newBeat = {
            bpm: this.state.beatBpm,
            key_sig: this.state.beatKeySig,
            selected: false,
            user_id: 73,
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

    // phaseThreeSubmitHandler = (e) => {
    //     e.preventDefault()
    //     const newBeat = {
    //         bpm: this.state.beatBpm,
    //         key_sig: this.state.beatKeySig,
    //         selected: false,
    //         user_id: 37,
    //         song_id: this.props.songObj.id
    //     }
    //     const options = {
    //         method: "POST",
    //         headers: {
    //           "content-type": "application/json",
    //           "accept": "application/json"
    //         },
    //         body: JSON.stringify({ beat: newBeat })
    //       }
    //     fetch("http://localhost:3000/beats", options)
    //     .then(r => r.json())
    //     .then(beatObj => console.log(beatObj))
    // }

    // phaseFourSubmitHandler = (e) => {
    //     e.preventDefault()
    //     const newBeat = {
    //         bpm: this.state.beatBpm,
    //         key_sig: this.state.beatKeySig,
    //         selected: false,
    //         user_id: 37,
    //         song_id: this.props.songObj.id
    //     }
    //     const options = {
    //         method: "POST",
    //         headers: {
    //           "content-type": "application/json",
    //           "accept": "application/json"
    //         },
    //         body: JSON.stringify({ beat: newBeat })
    //       }
    //     fetch("http://localhost:3000/beats", options)
    //     .then(r => r.json())
    //     .then(beatObj => console.log(beatObj))
    // }

    // phaseFiveSubmitHandler = (e) => {
    //     e.preventDefault()
    //     const newBeat = {
    //         bpm: this.state.beatBpm,
    //         key_sig: this.state.beatKeySig,
    //         selected: false,
    //         user_id: 37,
    //         song_id: this.props.songObj.id
    //     }
    //     const options = {
    //         method: "POST",
    //         headers: {
    //           "content-type": "application/json",
    //           "accept": "application/json"
    //         },
    //         body: JSON.stringify({ beat: newBeat })
    //       }
    //     fetch("http://localhost:3000/beats", options)
    //     .then(r => r.json())
    //     .then(beatObj => console.log(beatObj))
    // }
    

    
    
    render(){
        if (this.props.phase === 2){
            return(
                <form onSubmit={this.phaseTwoSubmitHandler}>
                    <input type="text" name="beatBpm" value={this.state.beatBpm} placeholder="BPM" onChange={this.changeHandler} />
                    <input type="text" name="beatKeySig" value={this.state.beatKeySig} placeholder="Key" onChange={this.changeHandler} />
                    <input type="text" name="beatUrl" value={this.state.beatUrl} placeholder="URL" onChange={this.changeHandler} />
                    {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                    <button>Submit beat</button>
                </form>
            )
        } else if (this.props.phase === 1) {
            return(
                <form onSubmit={this.phaseOneSubmitHandler}>
                <input type="text" name="imageTitle" value={this.state.imageTitle} placeholder="Title" onChange={this.changeHandler} disabled={this.state.disabled} />
                <input type="text" name="imageUrl" value={this.state.imageUrl} placeholder="URL" onChange={this.changeHandler} disabled={this.state.disabled}/>
                {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                <button>Submit image</button>
            </form>
            )
        } else if (this.props.phase === 3) {
            return(
                <form onSubmit={this.phaseOneSubmitHandler}>
                <input type="text" name="vocalUrl" value={this.state.vocalUrl} placeholder="URL" onChange={this.changeHandler} />
                {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                <button>Submit vocal</button>
            </form>
            )
        } else if (this.props.phase === 4) {
            return(
                <form onSubmit={this.phaseOneSubmitHandler}>
                    <input type="text" name="mixUrl" value={this.state.mixUrl} placeholder="URL" onChange={this.changeHandler} />
                    {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                    <button>Submit mix</button>
                </form> 
            )
        } else if (this.props.phase === 5) {
            return(
                <form onSubmit={this.phaseOneSubmitHandler}>
                    <input type="text" name="masterUrl" value={this.state.masterUrl} placeholder="URL" onChange={this.changeHandler} />
                    {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                    <button>Submit master</button>
                </form> 
            )
        }
        
        else {
            return(null)
        }
    }
}

export default SubmitForm