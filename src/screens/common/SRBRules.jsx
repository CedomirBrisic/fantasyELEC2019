import React from 'react';
import { Portal } from 'react-portal';
import SRBRoundPointsCalc from '../modals/SRBRoundPointsCalc';


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

    render() {
        return (
            <>
                <section className="rules-container">
                    <h3 className="d-flex justify-content-between align-items-center"><i>Pravila</i></h3>
                    <h5><span className="rule-numer-order">#1 -</span> Možeš birati ekipu za svako kolo posebno.</h5>
                    <h6><i>#1-a Ako se zaboraviš pa bi ekipu sastavio u sred kola, nije problem. Možeš je sačiniti od igrača čije utakmice još uvek nisu počele.</i></h6>
                    <h5><span className="rule-numer-order">#2 -</span> Moraš izabrati 7 igrača za svaku rundu ali se samo poeni 5 najbolje rangiranih računa.</h5>
                    <h5><span className="rule-numer-order">#3 -</span> Potrebno je da postaviš 2 beka, 2 krila, 1 centra i dva bonus igrača (nije važno na kojoj poziciji igraju).</h5>
                    <h6><i>#3-a Još jednom! Biraš 7 igrača. Oni odigraju svoje utakmice. Na kraju kola, 5 igrača koji su zaradili najviše Sportske Fantazi poena su tvoja petorka za tu rundu.</i></h6>
                    <h5><span className="rule-numer-order">#4 -</span>Ako zaboraviš da izabereš ekipu, ne brini ništa mi ćemo to uraditi umesto tebe. Ponovićemo tvoj poslednji izbor tima. </h5>
                    <h5><span className="rule-numer-order">#5 -</span> Merodavna je samo statistike sa sajtova <a href="https://www.euroleague.net/?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">EuroLeague</a> i<a href="https://www.eurocupbasketball.com/?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer"> EuroCup</a>.</h5>
                    <h5><span className="rule-numer-order">#6 -</span> EuroLeague i EuroCup su dva različita takmičenja ali ako želiš da se takmičiš u oba - niko ti ne može zabraniti!</h5>
                    <h5><span className="rule-numer-order">#7 -</span> Ultimativni veliki pobednik je onaj ko sakupi najviše Sportske Fantazi poena. (takmičenja su odvojena i ne sabiraju se)</h5>
                    <h5><span className="rule-numer-order">#8 -</span> Na kraju ono najbitnije - Možeš napraviti svoju ligu i pozvati prijatelje da ti se priduže.</h5>
                    <h6><i>#8-a Nije ni loše? ;-)</i></h6>
                    <div className="d-flex justify-content-center buttons-container">
                        <button type="button" className="btn btn-outline-light" onClick={this.openRoundPointsCalcModal}>Sportske Fantazi poeni - objašnjenje</button>
                    </div>
                </section>
                <Portal>
                    <SRBRoundPointsCalc showRoundPointsCalc={this.state.showRoundPointsCalc} closeRoundPointsCalcModal={this.closeRoundPointsCalcModal} />
                </Portal>
            </>
        )
    }
}

export default SRBRules