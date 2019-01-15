import React, {Component} from 'react'
import SetupGame from './SetupGame'
import Game from './Game'

class App extends Component {
    
    constructor(){
        super()
        this.state = {
            gameStarted : false,
            winnerPlayer : "",
            names: {playerName1 : "",
                    playerName2 : ""},
            roundWin : [0,0],
            roundNumber : 1
        }
        this.savePlayersNames = this.savePlayersNames.bind(this)
    }
    
    savePlayersNames(data){
        this.setState({
            names : data,
            gameStarted : true
            }
        )
    };
    
    updateRoundWin(roundWinner_,actualround_){
        console.log("UPDATE ROUND WIN CALLED")
        
        const roundWinner = roundWinner_-1
        const round = actualround_
        
        console.log("ACTUAL STATUS OF roundWin", this.state.roundWin)        
        
        const aux =  this.state.roundWin
        aux[roundWinner] = aux[roundWinner] + 1
        console.log("aux modified ",aux)


        
        console.log("UPDATE ROUND WIN FINISHED")

    }
    
    
    componentDidUpdate(){
        
        this.setState({
            roundWin : aux ,
            roundNumber : round       
            }
        )
    }
    
    render() {
        console.log("APP render() .... ",this.state)
        return (
            <div className="main">
                <h1 >Game of Drones</h1>
                <hr />
                {!this.state.gameStarted ? 
                    <SetupGame savePlayersNames={this.savePlayersNames}/> 
                    : 
                    <Game 
                        state={this.state} 
                        updateRoundWin={this.updateRoundWin.bind(this)}
                    />
                }
            </div>
        );
    }
}

export default App