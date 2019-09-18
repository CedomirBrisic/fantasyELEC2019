import React from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../_context/AppContext';
import TotalPointsByDay from './TotalPointsByDay';



class Header extends React.Component {
    static contextType = AppContext;

    render() {
        return (
            <div className="header-container d-flex justify-content-between align-items-center">
                {this.context.showSelectPlayer && <button type="button" className="btn  btn-danger back-button" onClick={this.context.goBackToTeamView}>Back to User screen</button>}
                <a href={`https://www.sportske.net/vesti-kosarka.html?utm_source=sportskeFantasy&utm_medium=game&utm_campaign=worldCup2019`} target="_blank">
                    <div className="username-wrapper text-danger">
                        Read all about it !
                    </div>
                </a>
                <div className="username-wrapper">
                    <i>username:</i> {this.context.bitrulez}
                </div>
                <div className="d-flex">
                    <TotalPointsByDay />
                </div>
                <Link className="hall-of-fame-wrapper" to={`hall-of-fame`}>
                    Hall of Fame
                </Link>
                <Link className="hall-of-fame-wrapper text-danger" to={`/srb/user-screen`}>
                    Daj na srpskom
                </Link>
            </div>
        )
    }
}

export default Header