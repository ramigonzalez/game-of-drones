import React, {Component} from 'react'


class Score extends Component {
    constructor(props){
        super(props)
        this.state = {
            roundWinners:[]
        }
    }
    
    render() {
        const pos = 1
        const roundWinnersItems = this.state.roundWinners.map(
            item => {
                pos = pos + 1
                return  <li>
                            <span>{pos}</span>
                            <span>{item.name}</span>
                        </li>
            }
        )
        return (
            <div>
                <h1>SCORE</h1>
                <ul>
                    <li>
                        <span>Round</span>
                        <span>Winner</span>
                    </li>
                    {roundWinnersItems}
                </ul>
            </div>
        );
    }
}
export default Score