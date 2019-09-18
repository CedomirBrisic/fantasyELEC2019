import React from 'react';
import LogIn from './LogIn';
import Register from './Register';


class SignInWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            successfullyRegistered: false,
            initialLoad: true,
            username: "",
            password:"",
        }
    }

    successfullyRegistered = (name, pass) => {
        this.setState({
            successfullyRegistered: true,
            username: name,
            password:pass
        })
    }

    checkIsActiveTab = () => {
        if (this.state.initialLoad || this.state.successfullyRegistered){
            return "active show"
        }
    }
    checkIsActiveTab2 = () => {
        if (this.state.initialLoad || this.state.successfullyRegistered){
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
    render() {
        return (
            <section className="sign-in-container d-flex">
                <div className="nav-wrapper d-flex">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" onClick={this.changeInitialLoadState}>
                        <a className={`nav-link btn-outline-light ${this.checkIsActiveTab()}`} id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">LogIn</a>
                        <a className="nav-link btn-outline-light" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Register</a>
                    </div>
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className={`tab-pane fade ${this.checkIsActiveTab()}`} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><LogIn successfullyRegistered={this.state.successfullyRegistered} username={this.state.username} password={this.state.password}/></div>
                        <div className={`tab-pane fade ${this.checkIsActiveTab2()}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><Register successfullyRegistered={this.successfullyRegistered}/></div>
                    </div>
                </div>
            </section>
        )
    }
}

export default SignInWrapper