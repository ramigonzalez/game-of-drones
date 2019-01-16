import React, {Component} from 'react'


class Score extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const roundWinnersItems = this.props.state.game.roundWin.map(
            (item,index) => {
                const round = index + 1
                return  <li key={round}>
                            <span>{round}</span>
                            <span>{item}</span>
                        </li>
            }
        )
        return (
            <div>
                <h1>SCORE</h1>
                <ul>
                    <li>
                        <span>Round </span>
                        <span> Winner</span>
                    </li>
                    {roundWinnersItems}
                </ul>
            </div>
        );
    }
}
export default Score
