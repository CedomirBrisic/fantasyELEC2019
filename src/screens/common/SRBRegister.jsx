import React from 'react';
import postRegisterNewUser from '../../webhooks/postRegisterNewUser';
import postRegisterNewFantasyUser from "../../webhooks/postRegisterNewFantasyUser";
import putCheckIsUsername from '../../webhooks/putCheckIsUsername';


class SRBRegister extends React.Component {
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
            return "Trebalo bi da staviš nešto kao korisničko ime ali gledaj da nema više od 16 karaktera"
        } else {
            return this.state.isUsernameOccupied ? "Korisničko ime je zauzeto, trebaš biti malo kreativniji :-)" : "";
        }
    }

    checkPasswordValidationMessage = () => {
        if (this.state.validatePasswordAlert) {
            return "Znaš da ti je potrebna lozinka?"
        }
    }

    checkPasswordConfirmValidationMessage = () => {
        if (this.state.validatePasswordConfirmAlert) {
            return "Samo treba da ponoviš lozinku još jednom, nije baš toliko teško :-)"
        }
    }


    checkEmailValidationMessage = () => {
        if (this.state.validateEmailAlert) {
            return `Barem stavi znak "@" da izgleda kao da je prava emejl adresa`
        }
    }

    render() {
        return (
            <section className="register-container d-flex flex-column justify-content-between">
                <div className="form-group">
                    <label htmlFor="username" className={`${this.state.isUsernameOccupied ? "red-letters" : ""} ${this.state.validateUsernameAlert ? "red-letters" : ""}`}>
                        {this.checkUsernameValidationMessage()}
                    </label>
                    <input value={this.state.username} onChange={this.depositUsername} onKeyDown={this.checkBlur} type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Unesi željeno korisničko ime" required />
                    <small id="usernameHelp" className="form-text text-muted">Ovo je tvoje korisničko ime za igru.<br/>Treba da bude jedinstveno i da nema više od 16 karaktera
                        </small>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className={`${this.state.validatePasswordAlert ? "red-letters" : ""}`}>
                        {this.checkPasswordValidationMessage()}
                    </label>
                    <input value={this.state.password} onChange={this.depositPassword} onKeyDown={this.checkBlur} type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Unesi svoju buduću lozinku" required />
                    <small id="passwordHelp" className="form-text text-muted">Ovo je tvoja lozinka za ovu igru. Predlažemo nešto tipa 12345 :-)
                        </small>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm" className={`${this.state.validatePasswordConfirmAlert ? "red-letters" : ""}`}>
                        {this.checkPasswordConfirmValidationMessage()}
                    </label>
                    <input value={this.state.passwordConfirm} onChange={this.depositPasswordConfirm} onKeyDown={this.checkBlur} type="password" className="form-control" id="passwordConfirm" aria-describedby="passwordComfirmHelp" placeholder="Ponovi lozinku još jednom" required />
                    <small id="passwordHelp" className="form-text text-muted">Ponovi lozinku još jednom kako bi bio siguran da je nisi pogrešno otkucao
                        </small>
                </div>
                <div className="form-group">
                    <label htmlFor="emailInput" className={`${this.state.validateEmailAlert ? "red-letters" : ""}`}>
                        {this.checkEmailValidationMessage()}
                    </label>
                    <input value={this.state.email} onChange={this.depositEmail} onKeyDown={this.checkIsEnter} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Unesi svoju emejl adresu" required />
                    <small id="emailHelp" className="form-text text-muted">Nikada je nećemo podeliti sa nekim drugim.<br />
                        Nismo baš ni sigurni zašto nam treba :-) ... osim ako budeš hteo da promeniš lozinku
                        </small>
                </div>
                <button onClick={this.sendRegistration} type="submit" className="btn btn-outline-secondary">Pošalji registraciju</button>
            </section>
        )
    }
}

export default SRBRegister