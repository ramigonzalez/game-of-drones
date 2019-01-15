import React, {Component} from 'react'


class SetupGame extends Component{
    constructor(props){
        super()
        this.state = {
            player1Name : "",
            player2Name : ""
        }
        
    }
    
    change(e){
        const {value, name} = e.target
        this.setState({
            [name] : value
        })
    }
    
    onSubmit(e){
        e.preventDefault()
        if(this.state.player1Name=== "" || this.state.player1Name === "")
            alert("Please enter a player name...")
        else this.props.savePlayersNames(this.state)
    }
    
    render(){
        return (
            <div>
                <form>
                    <h1 className="main">Enter Player's Names</h1>
                    <div>
                        <span>Player 1 </span>
                        <input 
                            name="player1Name"
                            type="text" 
                            placeholder="Enter name here.."
                            value={this.state.player1Name}
                            onChange={e => this.change(e)}
                            />
                        
                    </div>
                    <br/>
                    <div>
                        <span>Player 2 </span>
                        <input 
                            name="player2Name" 
                            type="text" 
                            placeholder="Enter name here.."
                            value={this.state.player2Name}
                            onChange={e => this.change(e)}
                        />
                    </div>
                    <br/>
                    <button onClick={e => this.onSubmit(e)}>Start Game!</button>
                </form>
            </div>
        );
    }
}
export default SetupGame