import React from 'react'



class SubmitFormOne extends React.Component {

    state = {
        imageTitle: "",
        imageUrl: "",

        imagesArray: this.props.imagesArray,
    }

    selectPollChoices = () => {
                
        const shuffled = this.state.imagesArray.sort(() => 0.5 - Math.random());
        let choices = shuffled.slice(0, 2);
        
        return choices.map(choice => choice)

    }  

    changeHandler = (e) => {
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
            user_id: 94,
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
        .then(refImgObj => {
            console.log(refImgObj)
            let newArray = [...this.props.imagesArray, refImgObj]
            this.props.trackDataFlow(newArray)
        })
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
             </>
        )
        
    }
}

export default SubmitFormOne