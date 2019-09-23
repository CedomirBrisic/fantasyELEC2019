import React from 'react';
import { Portal } from 'react-portal';
import RoundPointsCalc from '../modals/RoundPointsCalc';


class Rules extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showRoundPointsCalc: false,
        }
    }

    openRoundPointsCalcModal = () => {
        this.setState({
            showRoundPointsCalc: true
        })
    }

    closeRoundPointsCalcModal = () => {
        this.setState({
            showRoundPointsCalc: false
        })
    }


    render() {
        return (
            <>
                <section className="rules-container">
                    <h3 className="d-flex justify-content-between align-items-center"><i>Rules</i></h3>
                    <h5><span className="rule-numer-order">#1 -</span> You can choose players for each round separately.</h5>
                    <h6><i>#1-a You can select players in the middle of round (but just players who didn't start their match yet)</i></h6>
                    <h5><span className="rule-numer-order">#2 -</span> You need to choose 7 players for each round, but only 5 of them (best ranked picks) counts for score.</h5>
                    <h5><span className="rule-numer-order">#3 -</span> You need to select 2 guards, 2 forwards, 1 center and two<br/>"All around - bonus players" (it doesn't matter on what position they play).</h5>
                    <h6><i>#3-a Once again! You choose 7 players. They all play. On the end of round, 5 players who earned most Sportske Fantasy points are your first five squad for that round!</i></h6>
                    <h5><span className="rule-numer-order">#4 -</span> If you forget to choose them, don't worry- we will do it for you by replicating your last round team.</h5>
                    <h5><span className="rule-numer-order">#5 -</span> Only stats from <a href="https://www.euroleague.net/?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">EuroLeague</a> and<a href="https://www.eurocupbasketball.com/?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer"> EuroCup </a>webistes  are relevant.</h5>
                    <h5><span className="rule-numer-order">#6 -</span> EuroLeague and EuroCup are two separate competitions but if you want to compete in both - no body can forbid you!</h5>
                    <h5><span className="rule-numer-order">#7 -</span> Who accumulates the most Sportske Fantasy points is Ultimate Grand Winner. (counts for each competition separately)</h5>
                    <h5><span className="rule-numer-order">#8 -</span> Last but not least - You can create your own league and invite friends to join.</h5>
                    <h6><i>#8-a That's smart, right? ;-)</i></h6>                   
                    <div className="d-flex justify-content-center buttons-container">
                        <button type="button" className="btn btn-outline-light" onClick={this.openRoundPointsCalcModal}>Sportske Fantasy points explanation</button>
                    </div>
                </section>
                <Portal>
                    <RoundPointsCalc showRoundPointsCalc={this.state.showRoundPointsCalc} closeRoundPointsCalcModal={this.closeRoundPointsCalcModal} />
                </Portal>
            </>
        )
    }
}

export default Rules