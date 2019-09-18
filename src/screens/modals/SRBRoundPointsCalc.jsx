import React from 'react';
import Modal from 'react-bootstrap4-modal';

class SRBRoundPointsCalc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <Modal className="round-points-calc-modal-container" visible={this.props.showRoundPointsCalc} onClickBackdrop={this.props.closeRoundPointsCalcModal}>
                <div className="close" onClick={this.props.closeRoundPointsCalcModal}>&times;</div>
                <h3>Igra traje 16 dana / 16 runda... Prva runda je 31-og avgusta a poslednja 15-og septembra 2019
                </h3>
                <div className="label-wrapper">
                    <p>Na kraju svake runde, 10 prvoplasiranih Sportske Fantazi igrača tog dana su nagrađeni TD poenima</p>
                    <p>Ali da bi bio u 10 prvoplasiranih, prvo moraš da izabereš svoju ekipu sačinjenu od 7 košarkaša</p>
                    <p>Onda kada završe svoje mečeve, njihova statistika u stvarnosti postaje njihova baza a poeni prve petorke se računa u poene tvog tima za aktuelnu rundu<br />Preostala dvojica idu na klupu...</p>
                </div>
                <div className="stats-calc-container d-flex justify-content-between align-items-center">
                    <div className="left-container d-flex flex-column justify-content-between">
                        <p className="container-label">Čisti Sportske Fantazi poeni:</p>
                        <div className="d-flex justify-content-between rule-item">
                            <p>1 Asistencija</p>
                            <p>+1 poen</p>
                        </div>
                        <div className="d-flex justify-content-between rule-item">
                            <p>1 Skok</p>
                            <p>+1 poen</p>
                        </div>
                        <div className="d-flex justify-content-between rule-item">
                            <p>1 Blokada</p>
                            <p>+1 poen</p>
                        </div>
                        <div className="d-flex justify-content-between rule-item">
                            <p>1 Ukradena lopta</p>
                            <p>+1 poen</p>
                        </div>
                        <div className="d-flex justify-content-between rule-item">
                            <p>1 Izgubljena lopta</p>
                            <p>-1 poen</p>
                        </div>
                        <div className="d-flex justify-content-between rule-item">
                            <p>Pobeda</p>
                            <p>+4 poena</p>
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="set-rules-wrapper">
                            <p className="container-label">Ponderisani Sportske Fantazi poeni:</p>
                            <p className="rule-label">Poeni ponderisani procentom šuta:</p>
                            <p className="rule-explanation">
                                Svi postignuti koševi se množe procentom šuta i to se radi odvojeno za slobodna bacanja,<br />
                                kao i za šuteve za dva i tri poena
                                <br /><br />
                                npr. Košarkaš šutira 7/10 slobodna bacanja --> to je 7 koševa ponderisano sa 70% ==> 7 x 0.7 = 4.9p
                                <br /><br />
                                npr. Košarkaš šutira 6/10 za dva poena --> to je 12 koševa ponderisano sa 60% ==> 12 x 0.6 = 7.2p
                                <br /><br />
                                npr. Košarkaš šutira 5/10 za tri poena --> to je 15 koševa ponderisano sa 50% ==> 15 x 0.5 = 7.5p
                            </p>
                        </div>
                        <div className="set-rules-wrapper">
                            <p className="rule-label">Bonus poeni:</p>
                            <p className="rule-explanation">
                                Kada košarkaš pogađa bez promašaja (ali 3 ili više šuta !!!) nagrađen je bonus poenima koji se opet računaju zasebno i oni iznose:<br />
                                (Slobodna bacanja - 25%) (Šutevi za dva - 50%) (Šutevi za tri - 100%)
                                <br /><br />
                                npr. Košarkaš šutira 7/7 slobodna bacanja --> to je 7 koševa ponderisano sa 25% ==> 7 x 0.25 = 1.75p BONUS
                                <br /><br />
                                npr. Košarkaš šutira 6/6 za dva --> to je 12 koševa ponderisano sa 50% ==> 12 x 0.5 = 6p BONUS
                                <br /><br />
                                npr. Košarkaš šutira5/5 za tri --> to je 15 koševa ponderisano sa 100% ==> 15 x 1 = 15p BONUS
                            </p>
                        </div>
                        <div className="set-rules-wrapper">
                            <p className="rule-label">Kazneni poeni:</p>
                            <p className="rule-explanation">
                                Kada košarkaš šutira bez pogotka (ali 3 ili više pokušaja !!!) dobija kaznene poene koji se opet računaju zasebno i oni iznose:<br />
                                (Slobodna bacanja- prva tri promašaja su -1p, dok je svaki sledeći dodatnih -1p)<br />
                                (Šut za dva- prva tri promašaja su -2p, dok je svaki sledeći dodatnih -1p)<br />
                                (Šut za tri- prva tri promašaja su -3p, dok je svaki sledeći dodatnih -1p)
                                <br /><br />
                                npr. Košarkaš šutira 0/7 slobodna bacanja --> to je -1p za 0/3 i -4p za narednih 0/4 ==> -1 + (4 x -1) = -5p PENALA
                                <br /><br />
                                npr. Košarkaš šutira 0/6 za dva --> to je -2p za 0/3 i -3p za narednih 0/3 ==> -2 + (3 x -1) = -5p PENALA
                                <br /><br />
                                npr. Košarkaš šutira 0/5 za tri --> to je -3p za 0/3 i -2p za narednih 0/2 ==> -3 + (2 x -1) = -5p PENALA
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

export default SRBRoundPointsCalc