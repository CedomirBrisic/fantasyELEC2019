import React from 'react';
import { Link } from 'react-router-dom'
import SignInWrapper from './common/SignInWrapper';
import Rules from './common/Rules';


class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="w-100 welcome-screen-container d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-center align-items-center">
                    <h1>
                        Sportske Fantasy - Virtual basketball game
                    </h1>
                    <Link className="jezik" to={`/srb`}>
                        Daj na srpskom
                    </Link>
                </div>
                <div className="d-flex h-100 justify-content-between">
                    <SignInWrapper />
                    <Rules />
                </div>
                <div className="powered-by-wrapper d-flex justify-content-between">
                    <div className="sportske d-flex justify-content-between align-items-end">
                        <i>Made by</i> <a href="https://sportske.net/?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer"><img src={require("../images/logo-sportske.png")} alt="Belgrade Institute of Technology" /></a>
                    </div>
                    <div className="bit d-flex justify-content-between align-items-end">
                        <i>Powered by</i> <a href="https://www.bgit.rs/en/" target="_blank" rel="noopener noreferrer"><img src={require("../images/logo-bit.png")} alt="Belgrade Institute of Technology" /></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default WelcomeScreen