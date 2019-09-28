import React from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../_context/AppContext';



class SRBHeader extends React.Component {
    static contextType = AppContext;
    selectLeague = (event) => {
        const selectedLeague = event.target.getAttribute("data-league")
        sessionStorage.setItem("bitrulez3", selectedLeague)
        this.context.depositSelectedLeague(selectedLeague)
    }
    render() {
        return (
            <div className="header-container d-flex justify-content-between align-items-center">
                {this.context.showSelectPlayer && <button type="button" className="btn  btn-danger back-button" onClick={this.context.goBackToTeamView}>Povratak nazad</button>}
                <a href={`https://www.sportske.net/vesti-kosarka.html?utm_source=sportskeFantasy&utm_medium=game&utm_campaign=elec2019/2020`} target="_blank" rel="noopener noreferrer">
                    <div className="username-wrapper text-danger">
                        Saznaj sve o košarci !
                    </div>
                </a>
                <div className="username-wrapper">
                    <i>korisnik:</i> {this.context.bitrulez}
                </div>
                {/* <div className="d-flex">
                    <SRBTotalPointsByDay />
                </div> */}
                  {this.context.selectedLeague == "euroLeague" && !this.context.showSelectPlayer &&
                    <button type="button" className="btn btn-danger back-button" data-league="euroCup" onClick={this.selectLeague}>Promeni na EuroCup izdanje</button>}
                {this.context.selectedLeague == "euroCup" && !this.context.showSelectPlayer &&
                    <button type="button" className="btn btn-danger back-button" data-league="euroLeague" onClick={this.selectLeague}>Promeni na EuroLeague izdanje</button>}
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