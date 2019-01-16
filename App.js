import React, {Component} from 'react'
import SetupGame from './SetupGame'
import Game from './Game'
import Score from './Score'

class App extends Component {

    constructor(){
        super()
        this.state = {
            gameStarted : false,
            existWinner : false,
            winnerPlayer : "",
            names: {playerName1 : "",
                    playerName2 : ""},
            game: {
                roundNumber : 1,
                player1Moves : false,
                roundWinCount : [0,0],
                roundMoves : [],
                roundWin : []
            }

        }
        this.savePlayersNames = this.savePlayersNames.bind(this)
        this.getWinner = this.getWinner.bind(this)
        this.updateRoundWin = this.updateRoundWin.bind(this)
        this.resetRoundWin = this.resetRoundWin.bind(this)
        this.checkIfEndGame = this.checkIfEndGame.bind(this)
    }

    savePlayersNames(data){
        this.setState({
            names : data,
            gameStarted : true
            }
        )
    };

    onSubmitMove(move){
        console.log("APP onSubmitMove() .... START ")
        console.log("Move ... ",move)
        this.setState(prevState => {
            const newRoundMoves = prevState.game.roundMoves
            newRoundMoves.push(move) //add a movement to the roundMoves array
            return{
                game: {
                            roundMoves : newRoundMoves,
                            player1Moves : true,
                            roundNumber : prevState.game.roundNumber,
                            roundWinCount : prevState.game.roundWinCount,
                            roundWin : prevState.game.roundWin
                    }
            }
        })
        console.log("APP onSubmitMove() .... FINISH ")
    }

    resetRoundWin(){
        console.log("APP resetRoundWin() ... START")
        this.setState(prevState => {
            const winnerPlayer = this.getWinner(prevState.game.roundMoves)
            let newRoundWinCount;
            let winnerPlayerName;
            if(winnerPlayer == 1 || winnerPlayer == 2){

                const aux = prevState.game.roundWinCount
                console.log("APP resetRoundWin() ... prevState.game.roundWinCount ",aux)
                console.log("APP resetRoundWin() ... winnerPlayer ",winnerPlayer)

                newRoundWinCount = this.updateRoundWin(winnerPlayer, aux)
                winnerPlayerName = (winnerPlayer == 1) ? prevState.names.player1Name :                                     prevState.names.player2Name
                console.log("APP resetRoundWin() ... winnerPlayerName",winnerPlayerName)
            }else{
                winnerPlayerName = "Draw"
                newRoundWinCount = prevState.game.roundWinCount
            }
            const newRoundWin = prevState.game.roundWin
            newRoundWin.push(winnerPlayerName)
            return{
                game: {
                        roundMoves : [],
                        player1Moves : false,
                        roundNumber : prevState.game.roundNumber + 1,
                        roundWinCount : newRoundWinCount,
                        roundWin : newRoundWin
                }
            }
        })
        console.log("APP resetRoundWin() ... FINISH")
    }

    getWinner(newRoundResult_){
        const newRoundResult = newRoundResult_
        console.log("APP getWinner() ....START")
        console.log("CHECKING FOR A ROUND WINNER")
        const m1 = newRoundResult[0]
        const m2 = newRoundResult[1]
        let winResult = -1
        console.log("MOVE PLAYER 1: ",m1)
        console.log("MOVE PLAYER 2: ",m2)
        if(m1 === "paper" && m2 === "rock"){ winResult = 1 }
        else if(m1 === "paper" && m2 === "scissor"){ winResult = 2 }

        else if(m1 === "rock" && m2 === "scissor"){ winResult = 1 }
        else if(m1 === "rock" && m2 === "paper"){ winResult = 2 }

        else if(m1 === "scissor" && m2 === "paper"){ winResult = 1 }
        else if(m1 === "scissor" && m2 === "rock"){ winResult = 2 }

        else if(m1 === m2){ winResult = 0 }

        console.log("APP getWinner() actual winner.... ", winResult)

        if(winResult == -1) alert ("APP getWinner() ERROR .....")

        console.log("APP getWinner() .... FINISH")
        return winResult
    }

    updateRoundWin(roundWinner_, newRoundWinCount_){
        console.log("APP updateRoundWin() ... START")

        const roundWinner = roundWinner_ - 1
        const newRoundWinCount = newRoundWinCount_

        console.log("ACTUAL STATUS OF roundWinCount[]", newRoundWinCount )

        newRoundWinCount[roundWinner] = newRoundWinCount[roundWinner] + 1

        console.log("APP newRoundWinCount modified ",newRoundWinCount)
        console.log("APP updateRoundWin() ... FINISH")

        return newRoundWinCount
    }

    componentWillUnmount(){
        console.log("APP componentWillUnmount() ... ")
    }

    checkIfEndGame(){
        console.log("APP checkIfEndGame() ... START")
        const roundWinCount = this.state.game.roundWinCount
        console.log("APP checkIfEndGame() ... roundWinCount ", roundWinCount)

        const p1_wins = roundWinCount[0]
        const p2_wins = roundWinCount[1]

        let existWinner = false;
        if(p1_wins == 3 || p2_wins == 3)
            existWinner = true

        if(existWinner)
        {
            this.setState(prevState => {
                const roundWinCount_ = prevState.game.roundWinCount
                console.log(roundWinCount_)
                const p1_wins = roundWinCount_[0]
                let winnerPlayerName;
                if(p1_wins == 3)
                    winnerPlayerName = prevState.names.player1Name
                else
                    winnerPlayerName = prevState.names.player2Name

                return {
                    gameStarted : false,
                    existWinner : true,
                    winnerPlayer : winnerPlayerName,
                    names: {
                        playerName1 : "",
                        playerName2 : ""
                    },
                    game: {
                        roundNumber : 1,
                        player1Moves : false,
                        roundWinCount : [0,0],
                        roundMoves : [],
                        roundWin : []
                    }
                }
            })
        }

        console.log("APP checkIfEndGame() ... FINISH")
    }

    render() {
        console.log("APP render() .... ",this.state)
        return (
            <div className="main">
                <h1 >Game of Drones</h1>
                <hr />
                {!this.state.existWinner ?
                    <div>
                        {!this.state.gameStarted ?
                            <SetupGame savePlayersNames={this.savePlayersNames}/>
                            :
                            <div>
                                <Game
                                    state={this.state}
                                    onSubmitMove={this.onSubmitMove.bind(this)}
                                    resetRoundWin={this.resetRoundWin}
                                    checkIfEndGame={this.checkIfEndGame}
                                />
                                <Score  state={this.state}/>
                            </div>
                        }
                    </div>
                :
                <div>
                <h1> THE PLAYER {this.state.winnerPlayer} IS THE NEW EMPEROR </h1>
                </div>
              }
            </div>
        );
    }
}

export default App
