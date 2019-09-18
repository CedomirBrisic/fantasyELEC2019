import React from 'react';
import { AppContext } from '../../screens/_context/AppContext';
import { Redirect } from 'react-router-dom'
import putCheckUsernameAndPassword from "../../webhooks/putCheckUsernameAndPassword";



class LogIn extends React.Component {
    static contextType = AppContext;
    state = {
        username: "",
        password: "",
        badUsernameOrPassword: false,
        goToUserScreen: "",
    }

    successfullyRegisteredMessage = () => {
        if (this.props.successfullyRegistered) {
            const output =
                <div className="d-flex align-items-center">
                    <h3>Good job!!! Successfully registered</h3>
                    <div className="check-mark-wrapper">
                        &#10004;
                    </div>
                </div>
            return output
        }
    }

    depositUsername = (event) => {
        const username = event.target.value;
        this.setState({
            username
        })
    }
    depositPassword = (event) => {
        const password = event.target.value;
        this.setState({
            password
        })
    }

    proceedToUserScreen = (respond) => {
        this.context.depositUserKey(respond[0].username, this.state.password)
        this.setState({
            goToUserScreen: "nekAReNDOMSifraOdBAsdostAkarakTERA",
        })
    }
    sendLogIn = () => {
        let data = {}
        if (this.state.username !== "" || this.state.password !== "") {
            data = {
                username: this.state.username,
                password: this.state.password
            }
        } else {
            data = {
                username: this.props.username,
                password: this.props.password
            }
        }
        putCheckUsernameAndPassword(data, "nekArendomSifrAOdDostaKArakTerA123").then((response) => {

            if (response.length === 0) {
                this.setState({
                    badUsernameOrPassword: true
                })
            } else {
                this.setState({
                    badUsernameOrPassword: false,
                })
                this.proceedToUserScreen(response)
            }
        })
    }
    checkIsEnter = (event) => {
        if (event.keyCode === 13) {
            event.target.blur()
            this.sendLogIn()
        }
    }
    checkBlur = (event) => {
        if (event.keyCode === 13) {
            event.target.blur()
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.successfullyRegistered && prevProps.username !== this.props.username && prevProps.password !== this.props.password) {
            this.setState({
                username: this.props.username,
                password: this.props.password
            })
            setTimeout(function () {
                this.sendLogIn()
            }.bind(this)
                , 2400);
        }
    }
    render() {
        if (this.state.goToUserScreen === "nekAReNDOMSifraOdBAsdostAkarakTERA") {
            return <Redirect to='/user-screen' />
        }
        return (
            // Forgot your username or password?
            <>
                <section className="log-in-container">
                    <div>{this.successfullyRegisteredMessage()}</div>
                    <div className={`${this.state.badUsernameOrPassword ? "red-letters" : ""}`}>{this.state.badUsernameOrPassword ? "It's not your username or it's not your password. Try to remember it." : ""}</div>
                    <div className="form-group">
                        <input value={this.state.username} onChange={this.depositUsername} onKeyDown={this.checkBlur} type="text" className="form-control" id="usernameLogin" aria-describedby="usernameHelp" placeholder="Your username" required />
                    </div>
                    <div className="form-group">
                        <input value={this.state.password} onChange={this.depositPassword} onKeyDown={this.checkIsEnter} type="password" className="form-control" id="passwordLogin" aria-describedby="passwordHelp" placeholder="Your password" required />
                    </div>
                    <h6 className={`${this.state.badUsernameOrPassword ? "d-block" : "d-none"}`}>
                        If you forgot your user name or password, send us an email (<a href="mailto:admin@sportskefantasy.com">admin@sportskefantasy.com</a>) and we'll help...<br/>
                        We are good guys :-) <br />
                        But you need to send it from email address you used for registration <br />
                    </h6>
                    <button onClick={this.sendLogIn} type="submit" className="w-100 btn btn-outline-secondary">Log In</button>
                    <div className="criticism-mail">
                        For criticism and suggestions send us an email to:<br/>
                        <a href="mailto:admin@sportskefantasy.com">admin@sportskefantasy.com</a>
                    </div>
                </section>
            </>
        )
    }
}

export default LogIn