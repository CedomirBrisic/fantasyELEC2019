import React from 'react';
import Modal from 'react-bootstrap4-modal';

class SRBF1WCPointsCalc extends React.Component {
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
                    <h3>Takmičenje za TD poene je glavni deo takmičenja u okviru Sportske Fantazija</h3>
                    <div className="label-wrapper">
                        <p>Na kraju svake runde, 10 najbolje plasiranih Sportske Fantazi igrača za taj dan su nagrađeni TD poenima</p>
                        <p>Računaju se na sledeći način:</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100 ">
                        <div className="d-flex flex-column justify-content-around rule-items-wraper">
                            <div className="d-flex justify-content-between rule-item">
                                <p>Prvo mesto</p>
                                <p>25 poena</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>Drugo mesto</p>
                                <p>18 poena</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>Treće mesto</p>
                                <p>15 poena</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>Četvrto mesto</p>
                                <p>12 poena</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>Peto mesto</p>
                                <p>10 poena</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>Šesto mesto</p>
                                <p>8 poena</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>Sedmo mesto</p>
                                <p>6 poena</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>Osmo mesto</p>
                                <p>4 poena</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>Deveto mesto</p>
                                <p>2 poena</p>
                            </div>
                            <div className="d-flex justify-content-between rule-item">
                                <p>Deseto mesto</p>
                                <p>1 poen</p>
                            </div>
                        </div>
                        <div className="winner-container d-flex flex-column justify-content-center align-items-center">
                            <div className="winner-image-wrapper">
                                <img className="img-fluid" src={require("../../images/wreath-304896_640.png")} alt="winner" />
                            </div>
                            <div className="winner-label d-flex flex-column">
                                <span className="winner-label-1">Pobednik svih pobednika, Velemajstor ove igre, Tlačitelj površnih i Egzekutor tikvana...</span><span className="winner-label-1">Možeš postati ako uveče, 15-og septembra 2019 imaš najviše poena u glavnom holu Kuće slavnih.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default SRBF1WCPointsCalc