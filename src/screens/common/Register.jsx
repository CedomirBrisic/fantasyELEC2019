import React from 'react';
import postRegisterNewUser from '../../webhooks/postRegisterNewUser';
import postRegisterNewFantasyUser from "../../webhooks/postRegisterNewFantasyUser";
import putCheckIsUsername from '../../webhooks/putCheckIsUsername';


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            email: "",
            isUsernameOccupied: false,

            validateUsernameAlert: false,
            validatePasswordAlert: false,
            validatePasswordConfirmAlert: false,
            validateEmailAlert: false
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

    depositPasswordConfirm = (event) => {
        const passwordConfirm = event.target.value;
        this.setState({
            passwordConfirm
        })
    }
    depositEmail = (event) => {
        const email = event.target.value;
        
        this.setState({
            email
        })
    }
    checkIsEnter = (event) => {
        if (event.keyCode === 13) {
            event.target.blur()
            this.sendRegistration()
        }
    }
    checkBlur = (event) => {
        if (event.keyCode === 13) {
            event.target.blur()
        }
    }

    sendRegistration = () => {
        let isValidated = true
        if (this.state.username === "" || this.state.username.length > 16) {
            this.setState({
                validateUsernameAlert: true
            })
            isValidated = false
        } else {
            this.setState({
                validateUsernameAlert: false
            })
        }
        if (this.state.password === "") {
            this.setState({
                validatePasswordAlert: true
            })
            isValidated = false
        } else {
            this.setState({
                validatePasswordAlert: false
            })
        }
        if (this.state.passwordConfirm !== this.state.password) {
            this.setState({
                validatePasswordConfirmAlert: true
            })
            isValidated = false
        } else {
            this.setState({
                validatePasswordConfirmAlert: false
            })
        }

        if (this.state.email === "" || !this.state.email.includes("@")) {
            this.setState({
                validateEmailAlert: true
            })
            isValidated = false
        } else {
            this.setState({
                validateEmailAlert: false
            })
        }

        if (isValidated) {

            const data = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }
            putCheckIsUsername(data, "nekaRendomSiFRaOdDostaKARAkterA123").then((response) => {
                if (response.length === 0) {
                    postRegisterNewUser(data, "nekaRenDomSiFRaOdDostaKARAkterA123").then(() => {
                        postRegisterNewFantasyUser(data.username, "nekaRendOMSiFRaOdDostaKARAkterA123").then(() => {
                            this.props.successfullyRegistered(data.username, data.password);
                        })
                    })
                } else {
                    this.setState({
                        isUsernameOccupied: true
                    })
                }
            })
        }

    }

    checkUsernameValidationMessage = () => {
        if (this.state.validateUsernameAlert) {
            return "Hey! You need to put something as Username but not more then 16 characters"
        } else {
            return this.state.isUsernameOccupied ? "User Name is Occupied, you need to be more creative :-)" : "";
        }
    }

    checkPasswordValidationMessage = () => {
        if (this.state.validatePasswordAlert) {
            return "You know that you'll need password, right?"
        }
    }

    checkPasswordConfirmValidationMessage = () => {
        if (this.state.validatePasswordConfirmAlert) {
            return "Just retype your password once again, it's not that difficult"
        }
    }


    checkEmailValidationMessage = () => {
        if (this.state.validateEmailAlert) {
            return `At least put "@" sign so it looks like an email`
        }
    }

    render() {
        return (
            <section className="register-container d-flex flex-column justify-content-between">
                <div className="form-group">
                    <label htmlFor="username" className={`${this.state.isUsernameOccupied ? "red-letters" : ""} ${this.state.validateUsernameAlert ? "red-letters" : ""}`}>
                        {this.checkUsernameValidationMessage()}
                    </label>
                    <input value={this.state.username} onChange={this.depositUsername} onKeyDown={this.checkBlur} type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username" required />
                    <small id="usernameHelp" className="form-text text-muted">It's your username for this game<br/>It needs to be unique and it has to be 16 characters max.
                        </small>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className={`${this.state.validatePasswordAlert ? "red-letters" : ""}`}>
                        {this.checkPasswordValidationMessage()}
                    </label>
                    <input value={this.state.password} onChange={this.depositPassword} onKeyDown={this.checkBlur} type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Enter password" required />
                    <small id="passwordHelp" className="form-text text-muted">It's your password for this game. We suggest something like 12345 :-)
                        </small>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm" className={`${this.state.validatePasswordConfirmAlert ? "red-letters" : ""}`}>
                        {this.checkPasswordConfirmValidationMessage()}
                    </label>
                    <input value={this.state.passwordConfirm} onChange={this.depositPasswordConfirm} onKeyDown={this.checkBlur} type="password" className="form-control" id="passwordConfirm" aria-describedby="passwordComfirmHelp" placeholder="Confirm password" required />
                    <small id="passwordHelp" className="form-text text-muted">Retype your password once again so you can be sure that you didn't misspelled it
                        </small>
                </div>
                <div className="form-group">
                    <label htmlFor="emailInput" className={`${this.state.validateEmailAlert ? "red-letters" : ""}`}>
                        {this.checkEmailValidationMessage()}
                    </label>
                    <input value={this.state.email} onChange={this.depositEmail} onKeyDown={this.checkIsEnter} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.<br />
                        We actually don't know why do we need it at all :-) ... except if you'll need to reset password
                        </small>
                </div>
                <button onClick={this.sendRegistration} type="submit" className="btn btn-outline-secondary">Submit</button>
            </section>
        )
    }
}

export default Register