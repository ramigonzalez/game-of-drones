import React, {Component} from 'react'
import Round from "./Round"

class Game extends Component {
    constructor(props){
        super(props)
        this.onSubmitMove = this.onSubmitMove.bind(this)
        this._isMounted = false

    }

    onSubmitMove(move){
        console.log("GAME onSubmitMove() ... ")
        this.props.onSubmitMove(move)
    }

    componentWillReceiveProps(nextProps){
        console.log("GAME componentWillReceiveProps() ... ")
        const roundMoves = nextProps.state.game.roundMoves
        console.log("GAME roundMoves .... ",roundMoves)
        console.log("GAME roundMoves.length == 2 ?.... ",roundMoves.length)
        if(this._isMounted){
            console.log("GAME is mounted")
            if( roundMoves.length == 2 ){
                this.props.resetRoundWin()
            }
            else console.log("GAME ... Cannot calculate win yet")
            this.props.checkIfEndGame()
        }
    }

    componentWillUnmount(){
        console.log("GAME  componentWillUnmount() ... ")
        this._isMounted = false
    }

    componentDidMount(){
        console.log("GAME  componentDidMount() ... ")
        this._isMounted = true
    }

    render() {
        console.log("GAME render() ....")
        const player1Moves = !this.props.state.game.player1Moves
        const playerName =
            player1Moves ? this.props.state.names.player1Name :            this.props.state.names.player2Name

        return (
            <div>
                <h1 className="main">GAME STARTED</h1>
                <br/>

                {player1Moves ?
                    <Round
                        playerName={playerName}
                        state={this.props.state}
                        onSubmitMove={this.onSubmitMove}
                    /> :
                    <Round
                        playerName={playerName}
                        state={this.props.state}
                        onSubmitMove={this.onSubmitMove}
                    />
                }
            </div>
        );
    }
}
export default Game
