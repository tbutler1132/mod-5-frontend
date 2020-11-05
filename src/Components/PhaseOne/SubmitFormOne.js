import React from 'react'
import PollOne from './PollOne'


class SubmitFormOne extends React.Component {

    state = {
        imageTitle: "",
        imageUrl: "",

        imagesArray: this.props.imagesArray
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
            user_id: 82,
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

    render (){
        return(
            <>
                <form onSubmit={this.phaseOneSubmitHandler}>
                    <input type="text" name="imageTitle" value={this.state.imageTitle} placeholder="Title" onChange={this.changeHandler} disabled={this.state.disabled} />
                    <input type="text" name="imageUrl" value={this.state.imageUrl} placeholder="URL" onChange={this.changeHandler} disabled={this.state.disabled}/>
                    {/* <input type="text" name="beatUrl" value={this.state.beatUrl} onChange={this.changeHandler} /> */}
                    <button>Submit image</button>
                </form>
                <PollOne songObj={this.props.songObj} newPoll={this.props.newPoll} pollId={this.props.pollId} imagesArray={this.props.imagesArray} pollResults={this.props.pollResults}/>
             </>
        )
        
    }
}

export default SubmitFormOne