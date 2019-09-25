import React from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../_context/AppContext';



class Header extends React.Component {
    static contextType = AppContext;
    selectLeague = (event) => {
        const selectedLeague = event.target.getAttribute("data-league")
        sessionStorage.setItem("bitrulez3", selectedLeague)
        this.context.depositSelectedLeague(selectedLeague)
    }
    render() {
        return (
            <div className="header-container d-flex justify-content-between align-items-center">
                {this.context.showSelectPlayer && <button type="button" className="btn  btn-danger back-button" onClick={this.context.goBackToTeamView}>Back to User screen</button>}
                <a href={`https://www.sportske.net/vesti-kosarka.html?utm_source=sportskeFantasy&utm_medium=game&utm_campaign=elec2019/2020`} target="_blank" rel="noopener noreferrer">
                    <div className="username-wrapper text-danger">
                        Read all about it !
                    </div>
                </a>
                <div className="username-wrapper">
                    <i>username:</i> {this.context.bitrulez}
                </div>
                {/* <div className="d-flex">
                    <TotalPointsByDay />
                </div> */}
                {this.context.selectedLeague == "euroLeague" &&
                    <button type="button" className="btn btn-danger back-button" data-league="euroCup" onClick={this.selectLeague}>Switch to EuroCup edition</button>}
                {this.context.selectedLeague == "euroCup" &&
                    <button type="button" className="btn btn-danger back-button" data-league="euroLeague" onClick={this.selectLeague}>Switch to EuroLeague edition</button>}
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