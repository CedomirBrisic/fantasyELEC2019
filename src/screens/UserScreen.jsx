import React from 'react';
import { AppContext } from '../screens/_context/AppContext';
import { Redirect } from 'react-router-dom'
import Header from './common/Header';
import DashboardSelectDay from './common/DashboardSelectDay';
import PlayersOnField from './common/PlayersOnField';
import SelectPlayer from './common/SelectPlayer';
import DashboardSelectTeam from './common/DashboardSelectTeam';



class UserScreen extends React.Component {
    static contextType = AppContext;
    state = {
        redirect: false
    }

    componentDidMount() {
        let data = sessionStorage.getItem("bitrulez")
        let data2 = sessionStorage.getItem("bitrulez2")
        if (data === null && data2 === null) {
            this.setState({
                redirect: true,
            })
        } else {
            this.setState({
                redirect: false,
            })
            this.context.getFantasyDataContext()
            this.context.depositIsNotHallOfFame()
        }
    }
    toggleShowSelectDayDashboard = () => {
        this.context.toggleShowSelectDayDashboard()
    }
    goBackToTeamView = () => {
        this.context.goBackToTeamView()
    }

    checkMainContainerWidth = () => {
        if (!this.context.showSelectDayDashboard && !this.context.showSelectTeamDashboard) {
            return "dashboard-none"
        } else if ((this.context.showSelectDayDashboard && !this.context.showSelectTeamDashboard) ||
            (!this.context.showSelectDayDashboard && this.context.showSelectTeamDashboard)) {
            return "dashboard-one"
        } else {
            return "dashboard-two"
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            <>
                {!this.context.isInitialLoading &&
                    <div className="loader-container d-flex justify-content-center align-items-start">
                        <div className="d-flex flex-column align-items-center">
                            <div className="d-flex align-items-center">
                                <h1>Game is Setting Up </h1>
                                <div class="spinner-grow text-light" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-light" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow text-light" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div className="club-logos-container d-flex flex-column justify-content-around">
                                <div className="d-flex justify-content-around h-25 w-100">
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=BER&seasoncode=E2?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroLeague/Alba_Berlin_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=IST&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroLeague/Anadolu_Efes_SK_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=MCO&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroCup/AS_Monaco_Basket_Logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=SOP&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroCup/Arka_Gdynia_(basketball)_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=MIL&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroLeague/Pallacanestro_Olimpia_Milano_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=BUD&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroCup/KK_Budućnost_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=LJU&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroCup/Cedevita_Olimpija_Ljubljana_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=RED&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroLeague/KK_Crvena_zvezda_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=CSK&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroLeague/PBC_CSKA_Moscow_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=DAR&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroCup/Darüşşafaka_SK_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around h-25 w-100">
                                <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=TRN&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroCup/Aquila_Basket_Trento_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=OLD&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroCup/EWE_Baskets_Oldenburg_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=BAR&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroLeague/FC_Barcelona_Bàsquet_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=MUN&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroLeague/FC_Bayern_Munich_(basketball)_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=ULK&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroLeague/Fenerbahçe_Men's_Basketball_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=GAL&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroCup/Galatasaray_SK_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=BRE&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroCup/Basket_Brescia_Leonessa_Logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=JOV&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroCup/Joventut_Badalona_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=KHI&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroLeague/BC_Khimki_2016_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=BAS&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroLeague/Saski_Baskonia.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=ASV&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank">
                                            <img src={require("../images/logos/euroLeague/LDLC_ASVEL_Basket_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around h-25 w-100">

                                </div>
                                <div className="d-flex justify-content-around h-25 w-100">

                                </div>
                            </div>
                            <div className="credits-container w-100 d-flex flex-column">
                                <a href="https://www.inta.org/TrademarkBasics/FactSheets/Pages/Fair-Use-of-TrademarksNL.aspx" target="_blank"><b>Fair Use</b> of teams' logos.</a>
                                <i>We thank to Pixabay for letting us borrow some of theirs images</i>
                                <i>SPECIAL THANKS TO:</i>
                                <i className="credits">David Mark from Pixabay</i>
                                <i className="credits">Dimitris Vetsikas from Pixabay</i>
                                <i className="credits">Pexels from Pixabay</i>
                                <i className="credits">Clker-Free-Vector-Images from Pixabay</i>
                                <i className="credits">mohamed Hassan from Pixabay</i>
                                <i className="credits">BedexpStock from Pixabay</i>
                                <i className="credits">OpenClipart-Vectors from Pixabay </i>
                            </div>
                        </div>
                    </div>
                }
                {!this.context.isInitialLoading &&
                    <div className="user-screen-container d-flex flex-column justify-content-between">
                        <Header />
                        <div className="d-flex justify-content-between">
                            <DashboardSelectDay />
                            <div className={`main-screen-container ${this.checkMainContainerWidth()}`}>
                                {this.context.showTeam && <PlayersOnField />}
                                {/* vs */}
                                {this.context.showSelectPlayer && <SelectPlayer />}
                            </div>
                            <DashboardSelectTeam />
                        </div>
                        <div className="user-screen-dashboard-select-day-wrapper">
                            {!this.context.showSelectPlayer && <div className="select-round-button" onClick={this.toggleShowSelectDayDashboard}>{this.context.showSelectDayDashboard ? "hide Round-picker" : "show Round-picker"}</div>}
                            {this.context.showSelectPlayer && <div className="select-round-button" onClick={this.goBackToTeamView}>{`Pick ${this.context.choosePlayerPosition} or click here to go back on Team View screen`}</div>}
                        </div>
                    </div>
                }

            </>
        )
    }
}

export default UserScreen