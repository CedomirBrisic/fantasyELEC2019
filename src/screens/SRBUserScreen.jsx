import React from 'react';
import { AppContext } from '../screens/_context/AppContext';
import { Redirect } from 'react-router-dom'
import SRBHeader from './common/SRBHeader';
import SRBDashboardSelectDay from './common/SRBDashboardSelectDay';
import SRBPlayersOnField from './common/SRBPlayersOnField';
import SRBSelectPlayer from './common/SRBSelectPlayer';
import SRBDashboardSelectTeam from './common/SRBDashboardSelectTeam';



class SRBUserScreen extends React.Component {
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
                {this.context.isInitialLoading &&
                    <div className="loader-container d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column align-items-center">
                            <h1>Učitavanje . . .</h1>
                            <div className="crveno d-flex">
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div className="made-in"><i>Iskliktano u zemlji košarke</i></div>
                            <div className="credits-container w-100 d-flex flex-column">
                                <i>Zahvaljujemo se PIXABAY-u što nam je omogućio da pozajmimo neke od njihovih slika</i>
                                <i>POSEBNO SE ZAHVALJUJEMO:</i>
                                <i className="credits">David Mark iz Pixabay-a</i>
                                <i className="credits">Dimitris Vetsikas iz Pixabay-a</i>
                                <i className="credits">Pexels iz Pixabay-a</i>
                                <i className="credits">Clker-Free-Vector-Images iz Pixabay-a</i>
                                <i className="credits">mohamed Hassan iz Pixabay-a</i>
                                <i className="credits">BedexpStock iz Pixabay-a</i>
                                <i className="credits">OpenClipart-Vectors iz Pixabay-a </i>
                            </div>
                        </div>
                    </div>
                }
                {!this.context.isInitialLoading &&
                    <div className="user-screen-container d-flex flex-column justify-content-between">
                        <SRBHeader />
                        <div className="d-flex justify-content-between">
                            <SRBDashboardSelectDay />
                            <div className={`main-screen-container ${this.checkMainContainerWidth()}`}>
                                {this.context.showTeam && <SRBPlayersOnField />}
                                {/* vs */}
                                {this.context.showSelectPlayer && <SRBSelectPlayer />}
                            </div>
                            <SRBDashboardSelectTeam />
                        </div>
                        <div className="user-screen-dashboard-select-day-wrapper">
                            {!this.context.showSelectPlayer && <div className="select-round-button" onClick={this.toggleShowSelectDayDashboard}>{this.context.showSelectDayDashboard ? "sakrij Selektor rundi" : "prikaži Selektor rundi"}</div>}
                            {this.context.showSelectPlayer && <div className="select-round-button" onClick={this.goBackToTeamView}>{`Izaberi košarkaša za ekipu ili klikni ovde za povratak na prethodni ekran`}</div>}
                        </div>
                    </div>
                }

            </>
        )
    }
}

export default SRBUserScreen