import React from 'react';
import Modal from 'react-bootstrap4-modal';

class RoundPointsCalc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <Modal className="round-points-calc-modal-container" visible={this.props.showRoundPointsCalc} onClickBackdrop={this.props.closeRoundPointsCalcModal}>
                <div className="close" onClick={this.props.closeRoundPointsCalcModal}>&times;</div>
                <div className="label-wrapper">
                    <p>Once when basketball players finish their matches, their real life stats are their basis and points from first five are included in your team points for that round<br />Other two are going to the bench...</p>
                </div>
                <div className="stats-calc-container d-flex justify-content-between align-items-center">
                    <div className="left-container d-flex flex-column justify-content-between">
                        <p className="container-label">Straightforward points:</p>
                        <div className="d-flex justify-content-between rule-item">
                            <p>1 Assist</p>
                            <p>+1 pt</p>
                        </div>
                        <div className="d-flex justify-content-between rule-item">
                            <p>1 Rebound</p>
                            <p>+1 pt</p>
                        </div>
                        <div className="d-flex justify-content-between rule-item">
                            <p>1 Block</p>
                            <p>+2 pt</p>
                        </div>
                        <div className="d-flex justify-content-between rule-item">
                            <p>1 Steal</p>
                            <p>+1 pt</p>
                        </div>
                        <div className="d-flex justify-content-between rule-item">
                            <p>1 Turnover</p>
                            <p>-1 pt</p>
                        </div>
                        <div className="d-flex justify-content-between rule-item">
                            <p>1 Recived Foul</p>
                            <p>+1 pt</p>
                        </div>
                        <div className="d-flex justify-content-between rule-item">
                            <p>Game won</p>
                            <p>+3 pt</p>
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="set-rules-wrapper">
                            <p className="container-label">Weighted score points:</p>
                            <p className="rule-label">Points weighted by shot percentage:</p>
                            <p className="rule-explanation">
                                All points scored by player are multiplied by shot percentage and it's done separately<br/>
                                for Free throws, 2pt shots and 3pt shots.
                                <br/><br/>
                                e.g. Player shoots 7/10 Free throws --> that's 7 points multiplied by 70% ==> 7 x 0.7 = 4.9pt
                                <br/><br/>
                                e.g. Player shoots 6/10 Two points --> that's 12 points multiplied by 60% ==> 12 x 0.6 = 7.2pt
                                <br/><br/>
                                e.g. Player shoots 5/10 Three points --> that's 15 points multiplied by 50% ==> 15 x 0.5 = 7.5pt
                            </p>
                        </div>
                        <div className="set-rules-wrapper">
                            <p className="rule-label">Bonus points:</p>
                            <p className="rule-explanation">
                                When player shoots without miss (but 3 or more shots !!!) he is rewarded with bonus that is again calculated separately and bonuses are as follows:<br/>
                                (Free throws - 25%) (Two points shots - 50%) (Three points shots - 100%) 
                                <br/><br/>
                                e.g. Player shoots 7/7 Free throws --> that's 7 points multiplied by 25% ==> 7 x 0.25 = 1.75pt BONUS
                                <br/><br/>
                                e.g. Player shoots 6/6 Two points --> that's 12 points multiplied by 50% ==> 12 x 0.5 = 6pt <span className="bonus">BONUS</span>
                                <br/><br/>
                                e.g. Player shoots 5/5 Three points --> that's 15 points multiplied by 100% ==> 15 x 1 = 15pt BONUS
                            </p>
                        </div>
                        <div className="set-rules-wrapper">
                            <p className="rule-label">Penalty points:</p>
                            <p className="rule-explanation">
                                When player shoots without scoring (but 3 or more shots !!!) he is penalized with negative points that are again calculated separately and penalties are as follows:<br/>
                                (Free throws, first three misses are -1pt and every next miss is -1pt)<br/>
                                (Two points shots, first three misses are -2pt and every next miss is -1pt)<br/>
                                (Three points shots, first three misses are -3pt and every next miss is -1pt) 
                                <br/><br/>
                                e.g. Player shoots 0/7 Free throws --> that's -1pt for 0/3 and -4pt for next 0/4 ==> -1 + (4 x -1) = -5pt PENALTY
                                <br/><br/>
                                e.g. Player shoots 0/6 Two points --> that's -2pt for 0/3 and -3pt for next 0/3 ==> -2 + (3 x -1) = -5pt PENALTY
                                <br/><br/>
                                e.g. Player shoots 0/5 Three points --> that's -3pt for 0/3 and -2pt for next 0/2 ==> -3 + (2 x -1) = -5pt PENALTY
                            </p>
                        </div>
                    </div>
                </div>
                {/* <h3>How points are calculated for each round?</h3>
            <h5>Answer to this question on first look may seems to be complicated, but acctually it is not.</h5>
            <p>First there are points that are pretty much straightforward</p> */}
            </Modal >
        )
    }
}

export default RoundPointsCalc