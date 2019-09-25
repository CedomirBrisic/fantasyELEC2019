import React from 'react';
import { AppContext } from '../../screens/_context/AppContext';
import LogIn from './LogIn';
import Register from './Register';


class SignInWrapper extends React.Component {
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
                        <a className={`nav-link btn-outline-light ${this.checkIsActiveTab()}`} id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">LogIn</a>
                        <a className="nav-link btn-outline-light" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Register</a>
                    </div>
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className={`tab-pane fade ${this.checkIsActiveTab()}`} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><LogIn successfullyRegistered={this.state.successfullyRegistered} username={this.state.username} password={this.state.password} changeAskLeague={this.changeAskLeague} redirectToUserScreen={this.state.redirectToUserScreen}/></div>
                        <div className={`tab-pane fade ${this.checkIsActiveTab2()}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><Register successfullyRegistered={this.successfullyRegistered} /></div>
                    </div>
                </div>
            }
            {this.state.askLeague &&
                <div className="ask-league-container">
                    <h2>Please choose your favorite competition...</h2>
                    <button data-league="euroLeague" onClick={this.selectLeague} type="submit" className="w-100 btn btn-light">EuroLeague</button>
                    <h3>or</h3>
                    <button data-league="euroCup" onClick={this.selectLeague} type="submit" className="w-100 btn btn-light">EuroCup</button>
                    <h4>...but don't worry, at top of the screen you'll see button for switching between leagues<br/>
                    (you can switch at any time you want)<br />
                        and if you want to play both competitions - nobody can't forbid you ! :-)</h4>
                </div>
            }
        </section>
    )
}
}

export default SignInWrapper