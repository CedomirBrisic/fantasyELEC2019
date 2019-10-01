import React from 'react';
import { AppContext } from '../../screens/_context/AppContext';
import SRBLogIn from './SRBLogIn';
import SRBRegister from './SRBRegister';


class SRBSignInWrapper extends React.Component {
    static contextType = AppContext;
    state = {
        successfullyRegistered: false,
        initialLoad: true,
        username: "",
        password: "",
        askLeague: false,
        redirectToUserScreen: false
    }
    selectLeague = (event) => {
        const selectedLeague = event.target.getAttribute("data-league")
        sessionStorage.setItem("bitrulez3", selectedLeague)
        this.context.depositSelectedLeague(selectedLeague)
        this.setState({
            askLeague: false,
            redirectToUserScreen: true
        })
    }

    successfullyRegistered = (name, pass) => {
        this.setState({
            successfullyRegistered: true,
            username: name,
            password: pass
        })
    }

    checkIsActiveTab = () => {
        if (this.state.initialLoad || this.state.successfullyRegistered) {
            return "active show"
        }
    }
    checkIsActiveTab2 = () => {
        if (this.state.initialLoad || this.state.successfullyRegistered) {
            return ""
        } else {
            return "active show"
        }
    }

    changeInitialLoadState = () => {
        this.setState({
            initialLoad: false
        })
    }
    changeAskLeague = () => {
        this.setState({
            askLeague: true
        })
    }
    render() {
        return (
            <section className="sign-in-container d-flex">
                {!this.state.askLeague &&
                    <div className="nav-wrapper d-flex">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" onClick={this.changeInitialLoadState}>
                            <a className={`nav-link btn-outline-light ${this.checkIsActiveTab()}`} id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Logovanje</a>
                            <a className="nav-link btn-outline-light" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Registracija</a>
                        </div>
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className={`tab-pane fade ${this.checkIsActiveTab()}`} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><SRBLogIn successfullyRegistered={this.state.successfullyRegistered} username={this.state.username} password={this.state.password} changeAskLeague={this.changeAskLeague} redirectToUserScreen={this.state.redirectToUserScreen} /></div>
                            <div className={`tab-pane fade ${this.checkIsActiveTab2()}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><SRBRegister successfullyRegistered={this.successfullyRegistered} /></div>
                        </div>
                    </div>
                }
                {this.state.askLeague &&
                    <div className="ask-league-container">
                        <h2>Izaberi takmičenje koje ćeš više pratiti...</h2>
                        <button data-league="euroLeague" onClick={this.selectLeague} type="submit" className="w-100 btn btn-light">EuroLeague</button>
                        <h3>ili</h3>
                        <button data-league="euroCup" onClick={this.selectLeague} type="submit" className="w-100 btn btn-light">EuroCup</button>
                        <h4>...ali ne brini, pri samom vrhu ekrana primetićeš dugme za prebacivanje između liga<br />
                            (možeš promeniti igru kada god to poželiš)<br/>
                            a ako želiš da igaš oba takmičenja, niko ti ne može zabraniti ! :-)</h4>
                    </div>
                }
            </section>
        )
    }
}

export default SRBSignInWrapper