import React, {Component} from 'react'
import Round from "./Round"

class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            roundNumber : props.state.roundNumber,
            player1Moves : false,
            roundResult:[]
        }
        this.onSubmitRound = this.onSubmitRound.bind(this)
    }
    
    onSubmitRound(move){
        this.setState(prevState => {
            const aux = prevState.roundResult
            aux.push(move)
            return{
                roundNumber : prevState.roundNumber + 1,
                player1Moves : true,
                roundResult : aux
            }  
        })
        console.log("GAME onSubmitRound() .... ",move)
    }
    
    
    
    // calculateWin(){
    //     console.log("calculating round win...")
    //     console.log(this.state)
    //     console.log(this.state.roundResult[0])
    //     console.log(this.state.roundResult[1])
    //             console.log(this.state.roundResult[2])


    //     const p1_move = this.state.roundResult[0]
    //     const p2_move = this.state.roundResult[1]
    //     const winner = this.getWinner(p1_move,p2_move)
    //     if(winner === 0){
    //         console.log("hubo empate")
    //     }else{
    //         alert("updateRound")
    //         //this.props.updateRoundWin(winner)
    //     }
    // }
    
    getWinner(){
        const aux = this.state.roundResult
        const actualRound = this.state.roundNumber
        console.log("GAME getWinner() .... ")
        console.log("CHECKING FOR A ROUND WINNER")
        console.log("Round result",actualRound)
        const m1 = aux[0]
        const m2 = aux[1]
        let result = -1
        console.log(m1,m2)
        console.log(m1 == "paper" && m2 == "rocks")

        if(m1 === "paper" && m2 === "rocks"){ result = 1 }
        else if(m1 === "paper" && m2 === "scissor"){ result = 2 }

        else if(m1 === "rocks" && m2 === "scissor"){ result = 1 }
        else if(m1 === "rocks" && m2 === "paper"){ result = 2 }

        else if(m1 === "scissor" && m2 === "paper"){ result = 1 }
        else if(m1 === "scissor" && m2 === "rocks"){ result = 2 }
        
        else if(m1 === m2){ result = 0 }
        
        console.log("GAME getWinner() actual winner.... ", result)
        
        this.props.updateRoundWin(1,actualRound) //hardcoded PLAYER
    }
    
    componentDidUpdate(){
        console.log("GAME componentDidUpdate() .... START")
        const aux =  this.state.roundResult.length
        console.log("aux lenght: ",aux)

        {aux === 2 ? this.getWinner() : console.log("not yet")}
        

        this.setState({
            player1Moves : false,
            roundResult : []
            }
        )
        console.log("GAME componentDidUpdate() .... FINISHED")

    }
    
    render() {
        console.log("GAME render() ....")
        const playerName = !this.state.player1Moves ? 
            this.props.state.names.player1Name : this.props.state.names.player2Name
        return (
            <div>
                <h1 className="main">GAME STARTED</h1>
                <br/>
                
                {this.state.player1Moves ? 
                    <Round 
                        playerName={playerName}
                        state={this.state}
                        onSubmitRound={this.onSubmitRound}
                    /> : 
                    <Round
                        onSubmitRound={this.onSubmitRound} 
                        playerName={playerName}
                        state={this.props.state}
                    />
                }
            </div>
        );
    }
}
export default Game