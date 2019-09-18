import React from 'react';
import Modal from 'react-bootstrap4-modal';

class F1WCPointsCalc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <Modal className="f1wc-points-calc-modal" visible={this.props.showF1WCPointsCalc} onClickBackdrop={this.props.closeF1WCPointsCalcModal}>
                    <div className="close" onClick={this.props.closeF1WCPointsCalcModal}>&times;</div>
                <div className="f1wc-points-calc-modal-container">
                    <h3>TD competition is main competition of Sportske Fantasy</h3>
                    <div className="label-wrapper">
                        <p>At the end of every round, top 10 Sportske Fantasy users for that day are awarded with TD points</p>
                        <p>They are calculated on the following way:</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100 ">
                        <div className="d-flex flex-column justify-content-around rule-items-wraper">
                            <div className="d-flex justify-content-between rule-item">
                                <p>1st place</p>
                                <p>25pt</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>2nd place</p>
                                <p>18pt</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>3rd place</p>
                                <p>15pt</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>4th place</p>
                                <p>12pt</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>5th place</p>
                                <p>10pt</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>6th place</p>
                                <p>8pt</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>7th place</p>
                                <p>6pt</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>8th place</p>
                                <p>4pt</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>9th place</p>
                                <p>2pt</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>10th place</p>
                                <p>1pt</p>
                            </div>
                        </div>
                        <div className="winner-container d-flex flex-column justify-content-center align-items-center">
                        <div className="winner-image-wrapper">
                            <img className="img-fluid" src={require("../../images/wreath-304896_640.png")} alt="winner"/>
                        </div>
                        <div className="winner-label d-flex flex-column">
                        <span className="winner-label-1">Winner of All Winners, Fantasy Grand Master, Ruler of Ignorants and Slayer of Noobs...</span><span className="winner-label-1">You can become one, if on evening of 15th September 2019<br/>you have most points at the main hall of Hall of Fame</span>
                        </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default F1WCPointsCalc