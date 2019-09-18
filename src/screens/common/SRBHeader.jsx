import React from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../_context/AppContext';
import SRBTotalPointsByDay from './SRBTotalPointsByDay';



class SRBHeader extends React.Component {
    static contextType = AppContext;

    render() {
        return (
            <div className="header-container d-flex justify-content-between align-items-center">
                {this.context.showSelectPlayer && <button type="button" className="btn  btn-danger back-button" onClick={this.context.goBackToTeamView}>Povratak nazad</button>}
                <a href={`https://www.sportske.net/vesti-kosarka.html?utm_source=sportskeFantasy&utm_medium=game&utm_campaign=worldCup2019`} target="_blank">
                    <div className="username-wrapper text-danger">
                        Saznaj sve o košarci !
                    </div>
                </a>
                <div className="username-wrapper">
                    <i>korisnik:</i> {this.context.bitrulez}
                </div>
                <div className="d-flex">
                    <SRBTotalPointsByDay />
                </div>
                <Link className="hall-of-fame-wrapper" to={`hall-of-fame`}>
                    Kuća slavnih
                </Link>
                <Link className="hall-of-fame-wrapper text-danger" to={`/user-screen`}>
                    English please
                </Link>
            </div>
        )
    }
}

export default SRBHeader