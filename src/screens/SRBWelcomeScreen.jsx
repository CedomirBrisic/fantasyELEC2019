import React from 'react';
import { Link } from 'react-router-dom'
import SRBSignInWrapper from './common/SRBSignInWrapper';
import SRBRules from './common/SRBRules';


class SRBWelcomeScreen extends React.Component {
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
                        Sportske Fantazi - Svetsko Prvenstvo u košarci 2019
                    </h1>
                    <Link className="jezik" to={`/`}>
                        English please
                    </Link>
                </div>
                <div className="d-flex h-100 justify-content-between">
                    <SRBSignInWrapper />
                    <SRBRules />
                </div>
            </div>
        )
    }
}

export default SRBWelcomeScreen