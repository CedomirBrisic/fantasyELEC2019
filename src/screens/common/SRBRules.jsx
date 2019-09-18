import React from 'react';
import { Portal } from 'react-portal';
import SRBRoundPointsCalc from '../modals/SRBRoundPointsCalc';
import SRBF1WCPointsCalc from '../modals/SRBF1WCPointsCalc';


class SRBRules extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showRoundPointsCalc: false,
            showF1WCPointsCalc: false
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


    openF1WCPointsCalcModal = () => {
        this.setState({
            showF1WCPointsCalc: true
        })
    }

    closeF1WCPointsCalcModal = () => {
        this.setState({
            showF1WCPointsCalc: false
        })
    }

    render() {
        return (
            <>
                <section className="rules-container">
                    <h3 className="d-flex justify-content-between align-items-center"><i>Pravila</i></h3>
                    <h5><span className="rule-numer-order">#1 -</span> O Sportske Fantaziju <span className="first-do-not-talk">se ne priča !</span></h5>
                    <h5><span className="rule-numer-order">#2 -</span> O Sportske Fantaziju <span className="second-do-not-talk">SE NE PRIČA !</span></h5>
                    <h5><span className="rule-numer-order">#3 -</span> Jedan dan - jedna runda (16 runda ukupno)</h5>
                    <h5><span className="rule-numer-order">#4 -</span> Za svaku rundu treba da izabereš ekipu zasebno</h5>
                    <h6><i>#4-a Izaberi je mudro</i></h6>
                    <h5><span className="rule-numer-order">#5 -</span> Kvalifikovani igrači za biranje su oni čiji timovi igraju na isti dan kada je i <b>Sportske Fantazi</b> runda</h5>
                    <h5><span className="rule-numer-order">#6 -</span> Samo statistika sa <a href="http://www.fiba.basketball/basketballworldcup/2019" target="_blank" rel="noopener noreferrer">FIBA web sajta</a> je merodavna</h5>
                    <h5><span className="rule-numer-order">#7 -</span> Možeš izabrati 7 igrača za svaku rundu ali se samo 5 najbolje rangiranih računa u takmičenju</h5>
                    <h6><i>#7-a Ako si izabrao nekog ko je povređen ili si izabrao nekog ko nije igrao... nije naša greška- moraćeš da naučiš kako da živiš sa tim...</i></h6>
                    <h5><span className="rule-numer-order">#8 -</span> Ograničenja po pitanju odabira igrača ne postoje<br/>(osim pravila #5)</h5>
                    <h6><i>#8-a Ako želiš da 5 igrača bude iz istog tima ili želiš da svi igraju na centarskoj poziciji - niko ti ne može zabraniti!</i></h6>
                    <h5><span className="rule-numer-order">#9 -</span>Na kraju svake runde (svakog dana), specijalni TD poeni se dodeljuju na osnovu osvojenih poena u rundi</h5>
                    <div className="d-flex justify-content-between buttons-container">
                        <button type="button" className="btn btn-outline-light" onClick={this.openF1WCPointsCalcModal}>TD poeni - objašnjenje</button>
                        <button type="button" className="btn btn-outline-light" onClick={this.openRoundPointsCalcModal}>Runda poeni - objašnjenje</button>
                    </div>
                </section>
                <Portal>
                    <SRBRoundPointsCalc showRoundPointsCalc={this.state.showRoundPointsCalc} closeRoundPointsCalcModal={this.closeRoundPointsCalcModal} />
                    <SRBF1WCPointsCalc showF1WCPointsCalc={this.state.showF1WCPointsCalc} closeF1WCPointsCalcModal={this.closeF1WCPointsCalcModal} />
                </Portal>
            </>
        )
    }
}

export default SRBRules