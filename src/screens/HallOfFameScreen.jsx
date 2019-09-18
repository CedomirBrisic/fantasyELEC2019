import React from 'react';
import { AppContext } from '../screens/_context/AppContext';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import HallOfFameRealLifePlayerListStats from "./common/HallOfFameRealLifePlayerListStats";
import HallOfFameFantasyPlayersList from "./common/HallOfFameFantasyPlayersList";
import HallOfFameF1WCList from './common/HallOfFameF1WCList';
import HallOfFameTotalPointsList from './common/HallOfFameTotalPointsList';




class HallOfFameScreen extends React.Component {
    static contextType = AppContext;
    state = {
        listView: "basketball-players-real-life-stats",
        searchPlaceholder: "Search user by name",
        searchValue: "",
        redirect: false
    }

    depositSelectedDay = (event) => {
        const selectedDay = event.target.getAttribute("data-day-to-select")
        this.context.depositHallOfFameSelectedDay(selectedDay)
    }

    depositSelectedList = (event) => {
        const listView = event.target.getAttribute("data-view")
        let searchPlaceholder = ""

        if (listView === "basketball-players-real-life-stats" || listView === "basketball-players-fantasy-points") {
            searchPlaceholder = "Search player by name"
        } else {
            searchPlaceholder = "Search user by name"
        }
        this.setState({
            listView,
            searchPlaceholder
        })
    }
    depositSearchValue = (event) => {
        const searchValue = event.target.value
        this.setState({
            searchValue
        })
    }
    clearSearchValue = () => {
        this.setState({
            searchValue: ""
        })
    }
    checkBlur = (event) => {
        if (event.keyCode === 13) {
            event.target.blur()
        }
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
            if (this.context.isInitialLoading) {
                this.context.getFantasyDataContext()
            }
            this.context.depositIsHallOfFame()
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
                            <h1>Loading . . .</h1>
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
                            <div className="made-in"><i>Made in Land of Basketball</i></div>
                            <div className="credits-container w-100 d-flex flex-column">
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
                    <div className="hall-of-fame-screen-container d-flex flex-column">
                        <div className="d-flex">
                            {this.state.listView !== "f1wc" &&
                                <div className="dashboard-select-day-container move-it-down d-flex flex-column justify align-items-center show-selected-day">
                                    <p><i>Select Round</i></p>
                                    <div className="dashboard-select-day-list-wrapper d-md-flex flex-md-column justify-content-md-between">
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "all-days" ? "is-selected" : ""}`} data-day-to-select="all-days" onClick={this.depositSelectedDay}>All rounds - Total</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "31st-August" ? "is-selected" : ""}`} data-day-to-select="31st-August" onClick={this.depositSelectedDay}>31st<br className="d-block d-md-none" />August</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "1st-September" ? "is-selected" : ""}`} data-day-to-select="1st-September" onClick={this.depositSelectedDay}>1st September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "2nd-September" ? "is-selected" : ""}`} data-day-to-select="2nd-September" onClick={this.depositSelectedDay}>2nd September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "3rd-September" ? "is-selected" : ""}`} data-day-to-select="3rd-September" onClick={this.depositSelectedDay}>3rd September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "4th-September" ? "is-selected" : ""}`} data-day-to-select="4th-September" onClick={this.depositSelectedDay}>4th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "5th-September" ? "is-selected" : ""}`} data-day-to-select="5th-September" onClick={this.depositSelectedDay}>5th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "6th-September" ? "is-selected" : ""}`} data-day-to-select="6th-September" onClick={this.depositSelectedDay}>6th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "7th-September" ? "is-selected" : ""}`} data-day-to-select="7th-September" onClick={this.depositSelectedDay}>7th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "8th-September" ? "is-selected" : ""}`} data-day-to-select="8th-September" onClick={this.depositSelectedDay}>8th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "9th-September" ? "is-selected" : ""}`} data-day-to-select="9th-September" onClick={this.depositSelectedDay}>9th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "10th-September" ? "is-selected" : ""}`} data-day-to-select="10th-September" onClick={this.depositSelectedDay}>10th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "11th-September" ? "is-selected" : ""}`} data-day-to-select="11th-September" onClick={this.depositSelectedDay}>11th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "12th-September" ? "is-selected" : ""}`} data-day-to-select="12th-September" onClick={this.depositSelectedDay}>12th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "13th-September" ? "is-selected" : ""}`} data-day-to-select="13th-September" onClick={this.depositSelectedDay}>13th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "14th-September" ? "is-selected" : ""}`} data-day-to-select="14th-September" onClick={this.depositSelectedDay}>14th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "15th-September" ? "is-selected" : ""}`} data-day-to-select="15th-September" onClick={this.depositSelectedDay}>15th September</button>
                                    </div>
                                </div>}

                            {!this.context.isInitialLoading &&
                                <div className="lists-container">
                                    <Link to={`user-screen`}>
                                        <button type="button" className="btn  btn-danger back-button">Back to User screen</button>
                                    </Link>
                                    <div className="hall-of-fame-links-wrapper d-flex justify-content-around">
                                        {/* <button className="btn btn-outline-dark" disabled>(it's calculating now...)</button>
                                        <button className="btn btn-outline-dark" disabled>(it's calculating now...)</button> */}
                                          <button type="button" className={`btn btn-outline-dark ${this.state.listView === "f1wc" ? "active" : ""}`} data-view="f1wc" onClick={this.depositSelectedList}>Main room at Hall of Fame</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "round-points" ? "active" : ""}`} data-view="round-points" onClick={this.depositSelectedList}>Users - Fantasy points</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "basketball-players-fantasy-points" ? "active" : ""}`} data-view="basketball-players-fantasy-points" onClick={this.depositSelectedList}>Players - Fantasy points</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "basketball-players-real-life-stats" ? "active" : ""}`} data-view="basketball-players-real-life-stats" onClick={this.depositSelectedList}>Players - Real Life stats</button>
                                        <input type="search" placeholder={this.state.searchPlaceholder} value={this.state.searchValue} onChange={this.depositSearchValue} onKeyDown={this.checkBlur}/>
                                    </div>
                                    {this.state.listView === "f1wc" &&
                                        <HallOfFameF1WCList searchValue={this.state.searchValue} clearSearchValue={this.clearSearchValue} />
                                    }
                                    {/* <HallOfFameUserStats /> */}

                                    {this.state.listView === "round-points" &&
                                        <HallOfFameTotalPointsList searchValue={this.state.searchValue} selectedDay={this.context.hallOfFameSelectedDay} clearSearchValue={this.clearSearchValue} />
                                    }
                                    {this.state.listView === "basketball-players-fantasy-points" &&
                                        <HallOfFameFantasyPlayersList searchValue={this.state.searchValue} clearSearchValue={this.clearSearchValue} />
                                    }
                                    {this.state.listView === "basketball-players-real-life-stats" &&
                                        <HallOfFameRealLifePlayerListStats searchValue={this.state.searchValue} clearSearchValue={this.clearSearchValue} />
                                    }
                                </div>
                            }

                        </div>
                        <Link to={`user-screen`}>
                            <div className="go-back-button">Click here to go back to User screen</div>
                        </Link>
                    </div>
                }
            </>
        )
    }
}

export default HallOfFameScreen