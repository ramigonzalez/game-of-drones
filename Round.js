import React, {Component} from 'react'


class Round extends Component {
    constructor(props){
        super(props)
        this.state = {
            option : ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmitMove = this.onSubmitMove.bind(this)
    }

    handleChange(e){
        const {name,value} = e.target
        if(value === ""){
            alert("Please select a valid move")
        }else{
            this.setState({
                [name] : value
            })
        }
    }

    onSubmitMove(e){
        e.preventDefault()
        if(this.state.option === ""){
            alert("Please select a valid move")
        }else{
            console.log("ROUND onSubmitMove() ... ")
            this.props.onSubmitMove(this.state.option)
        }
    }

    render() {
        console.log("ROUND render() .... ",this.props.state)
        return (
            <div>
                <h1>ROUND {this.props.state.game.roundNumber}</h1>
                <h2>{this.props.playerName}</h2>
                <span>Select move:</span>
                <select
                    value={this.state.option}
                    name="option"
                    onChange={this.handleChange}
                >
                    <option value="">-- Please Choose a Move --</option>
                    <option value="rock">Rock</option>
                    <option value="paper">Paper</option>
                    <option value="scissor">Scissor</option>
                </select>
                <br />
                <br />
                <button onClick={e => this.onSubmitMove(e)}>Ok</button>
            </div>
        );
    }
}
export default Round
