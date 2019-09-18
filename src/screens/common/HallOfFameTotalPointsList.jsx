import React from 'react';
import { AppContext } from '../../screens/_context/AppContext';
import { Portal } from 'react-portal';
import eligibleDays from "../../services/eligibleDays";
import checkEligibilityForPickTeam from "../../services/checkEligibilityForPickTeam";
import HallOfFameUserStatsModal from "../modals/HallOfFameUserStatsModal";



class HallOfFameTotalPointsList extends React.Component {
    static contextType = AppContext;
    state = {
        fantasyUsersSorted: null,
        showUserModal: false,
        fantasyUserForModalData: null,
        isCalculating: true,
    }
    calculateAllUsers = () => {
        let output = null
        const fantasyUsers= this.context.fantasyUsers
        const hallOfFameSelectedDay = this.context.hallOfFameSelectedDay
        const nowDateAndTime = this.context.nowDateAndTime
        const teamsByDay = this.context.dropdowns[0].teamsByDay
        const basketballPlayers = this.context.basketballPlayers
        if (hallOfFameSelectedDay !== "all-days") {
            const fantasyUsersCalculatedPointsForOneDay = []
            fantasyUsers.forEach((user) => {
                const calculatedData = checkEligibilityForPickTeam(fantasyUsers, user.username, hallOfFameSelectedDay, nowDateAndTime, teamsByDay, basketballPlayers)
                const userData = {
                    username: user.username,
                    summaSummarum: calculatedData.totalSummaSummarum,
                    teamPickIds: calculatedData.teamPickData
                }
                fantasyUsersCalculatedPointsForOneDay.push(userData)
            })
            output = fantasyUsersCalculatedPointsForOneDay
            if (output !== null) {
                output.sort(function (a, b) {
                    return b.summaSummarum - a.summaSummarum
                })
            }
        } else {
            const fantasyUsersCalculatedPointsForAllDays = []
            this.context.fantasyUsers.forEach((user) => {
                const calculatedPointsForOneUser = {
                    username: user.username,
                    summaSummarum: 0,
                    data: []
                }
                eligibleDays.forEach((day) => {
                    const calculatedData = checkEligibilityForPickTeam(fantasyUsers, user.username, day, nowDateAndTime, teamsByDay, basketballPlayers)
                    const userData = {
                        roundDate: day,
                        totalDaySummaSummarum: calculatedData.totalSummaSummarum,
                        teamPickIds: calculatedData.teamPickData
                    }
                    calculatedPointsForOneUser.data.push(userData)
                    calculatedPointsForOneUser.summaSummarum = !isNaN(parseFloat(calculatedData.totalSummaSummarum)) ? calculatedPointsForOneUser.summaSummarum + parseFloat(calculatedData.totalSummaSummarum) : calculatedPointsForOneUser.summaSummarum
                })
                fantasyUsersCalculatedPointsForAllDays.push(calculatedPointsForOneUser)
            })
            output = fantasyUsersCalculatedPointsForAllDays
            if (output !== null) {
                output.sort(function (a, b) {
                    return b.summaSummarum - a.summaSummarum
                })
            }
        }
        this.setState({
            fantasyUsersSorted: output,
            isCalculating: false
        })
    }



    mapPlebs = () => {
        const output = []
        const fantasyUsers = this.state.fantasyUsersSorted
        for (let i = 10; i < fantasyUsers.length; i++) {
            const outputElement =
                <tr key={fantasyUsers[i].username + i} data-fantasy-user-sorted-index={i} onClick={this.depositUserDataForModal}>
                    <td className="orer-no" data-fantasy-user-sorted-index={i}>{i + 1}</td>
                    <td data-fantasy-user-sorted-index={i}>{fantasyUsers[i].username}</td>
                    <td data-fantasy-user-sorted-index={i}>{typeof (fantasyUsers[i].summaSummarum) == "string" ? parseFloat(fantasyUsers[i].summaSummarum).toFixed(2) : fantasyUsers[i].summaSummarum.toFixed(2)}</td>
                </tr>
            output.push(outputElement)
        }
        return output
    }

    mapSearched = () => {
        const output = []
        const fantasyUsers = this.state.fantasyUsersSorted
        const searchValue = this.props.searchValue.toLowerCase()
        for (let i = 0; i < fantasyUsers.length; i++) {
            if (fantasyUsers[i].username.toLowerCase().includes(searchValue)) {
                const outputElement =
                    <tr key={fantasyUsers[i].username + i} data-fantasy-user-sorted-index={i} onClick={this.depositUserDataForModal}>
                        <td className="orer-no" data-fantasy-user-sorted-index={i}>{i + 1}</td>
                        <td data-fantasy-user-sorted-index={i}>{fantasyUsers[i].username}</td>
                        <td data-fantasy-user-sorted-index={i}>{typeof (fantasyUsers[i].summaSummarum) == "string" ? parseFloat(fantasyUsers[i].summaSummarum).toFixed(2) : fantasyUsers[i].summaSummarum.toFixed(2)}</td>
                    </tr>
                output.push(outputElement)
            }
        }
        return output
    }

    checkIsPlebseView = () => {
        return this.state.fantasyUsersSorted[10].summaSummarum == 0 ? false : true
    }

    closeUserModal = () => {
        this.setState({
            showUserModal: false
        })
    }

    depositUserDataForModal = (event) => {
        const index = event.target.getAttribute("data-fantasy-user-sorted-index")
        const data = this.state.fantasyUsersSorted[index]
        this.setState({
            showUserModal: true,
            fantasyUserForModalData: data
        })
    }
    componentDidMount() {
        this.props.clearSearchValue()
        setTimeout(() => {
            this.calculateAllUsers()
        }, 100);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedDay !== this.props.selectedDay) {
            this.setState({
                isCalculating: true,
            })
            setTimeout(() => {
                this.calculateAllUsers()
            }, 100);
        }
    }
    render() {
        return (
            <>
                {this.state.isCalculating &&
                    <div className="loader-container-calculating d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column align-items-center">
                            <h1>Calculating Sportske Fantasy points of {this.context.fantasyUsers.length} Users for {this.context.hallOfFameSelectedDay}</h1>
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
                {this.state.fantasyUsersSorted && !this.state.isCalculating &&
                    this.props.searchValue === "" &&
                    <div className="hall-of-fame-total-points-list-container">
                        <div className="hall-of-fame-total-points-list-wrapper d-flex flex-column align-items-center">
                            {this.context.hallOfFameSelectedDay !== "all-days" &&
                                this.state.fantasyUsersSorted[0].summaSummarum != 0 &&
                                <div className="made-it-trough"><i>Users that made it through in battle<br />for TD points</i></div>
                            }
                            <div className="first-place-wrapper d-flex align-items-center" data-fantasy-user-sorted-index={0} onClick={this.depositUserDataForModal}>
                                <div className="user-order-no" data-fantasy-user-sorted-index={0}>
                                    1.
                                </div>
                                <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={0}>
                                    <div className="top" data-fantasy-user-sorted-index={0}>
                                        <i data-fantasy-user-sorted-index={0}>Username:</i> {this.state.fantasyUsersSorted[0].summaSummarum == 0 ? "Reserved for you" : this.state.fantasyUsersSorted[0].username}
                                    </div>
                                    <div className="bottom" data-fantasy-user-sorted-index={0}>
                                        <i data-fantasy-user-sorted-index={0}>Sportske Fantasy points:</i> {this.state.fantasyUsersSorted[0].summaSummarum == 0 ? "1,000,000" : parseFloat(this.state.fantasyUsersSorted[0].summaSummarum).toFixed(2)}<sup data-fantasy-user-sorted-index={0}>pt</sup>
                                    </div>
                                    {this.context.hallOfFameSelectedDay !== "all-days" &&
                                        <div className="bottom-bottom" data-fantasy-user-sorted-index={0}>
                                            <i data-fantasy-user-sorted-index={0}>TD Points:</i>25<sup data-fantasy-user-sorted-index={0}>pt</sup>
                                        </div>
                                    }
                                </div>
                                <div className="silhouette-wrapper" data-fantasy-user-sorted-index={0}>
                                    <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={0} />
                                </div>
                            </div>


                            <div className=" d-flex justify-content-between align-items-center w-100" >

                                <div className="not-first-place-wrapper d-flex align-items-center second-to-show" data-fantasy-user-sorted-index={1} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={1}>
                                        2.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={1}>
                                        <div className="top" data-fantasy-user-sorted-index={1}>
                                            {this.state.fantasyUsersSorted[1].summaSummarum == 0 ? "Reserved for your friend" : this.state.fantasyUsersSorted[1].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={1}>
                                            {parseFloat(this.state.fantasyUsersSorted[1].summaSummarum).toFixed(2)}<sup data-fantasy-user-sorted-index={1}>pt</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={1}>
                                                18<sup data-fantasy-user-sorted-index={1}>pt</sup>
                                            </div>}
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={1}>
                                        {this.state.fantasyUsersSorted[1].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={1} />}
                                    </div>
                                </div>


                                <div className="not-first-place-wrapper d-flex align-items-center third-to-show" data-fantasy-user-sorted-index={2} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={2}>
                                        3.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={2}>
                                        <div className="top" data-fantasy-user-sorted-index={2}>
                                            {this.state.fantasyUsersSorted[2].summaSummarum == 0 ? "Reserved for your friend" : this.state.fantasyUsersSorted[2].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={2}>
                                            {parseFloat(this.state.fantasyUsersSorted[2].summaSummarum).toFixed(2)}<sup data-fantasy-user-sorted-index={2}>pt</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={2}>
                                                15<sup data-fantasy-user-sorted-index={2}>pt</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={2}>
                                        {this.state.fantasyUsersSorted[2].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={2} />}
                                    </div>
                                </div>



                                <div className="not-first-place-wrapper d-flex align-items-center fourth-to-show" data-fantasy-user-sorted-index={3} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={3}>
                                        4.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={3}>
                                        <div className="top" data-fantasy-user-sorted-index={3}>
                                            {this.state.fantasyUsersSorted[3].summaSummarum == 0 ? "Reserved for your friend" : this.state.fantasyUsersSorted[3].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={3}>
                                            {parseFloat(this.state.fantasyUsersSorted[3].summaSummarum).toFixed(2)}<sup data-fantasy-user-sorted-index={3}>pt</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={3}>
                                                12<sup data-fantasy-user-sorted-index={3}>pt</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={3}>
                                        {this.state.fantasyUsersSorted[3].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={3} />}
                                    </div>
                                </div>
                            </div>



                            <div className=" d-flex justify-content-between align-items-center w-100">
                                <div className="not-first-place-wrapper d-flex align-items-center fifth-to-show" data-fantasy-user-sorted-index={4} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={4}>
                                        5.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={4}>
                                        <div className="top" data-fantasy-user-sorted-index={4}>
                                            {this.state.fantasyUsersSorted[4].summaSummarum == 0 ? "Reserved for your friend" : this.state.fantasyUsersSorted[4].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={4}>
                                            {parseFloat(this.state.fantasyUsersSorted[4].summaSummarum).toFixed(2)}<sup data-fantasy-user-sorted-index={4}>pt</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={4}>
                                                10<sup data-fantasy-user-sorted-index={4}>pt</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={4}>
                                        {this.state.fantasyUsersSorted[4].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={4} />}
                                    </div>
                                </div>



                                <div className="not-first-place-wrapper d-flex align-items-center sixth-to-show" data-fantasy-user-sorted-index={5} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={5}>
                                        6.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={5}>
                                        <div className="top" data-fantasy-user-sorted-index={5}>
                                            {this.state.fantasyUsersSorted[5].summaSummarum == 0 ? "Reserved for your friend" : this.state.fantasyUsersSorted[5].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={5}>
                                            {parseFloat(this.state.fantasyUsersSorted[5].summaSummarum).toFixed(2)}<sup data-fantasy-user-sorted-index={5}>pt</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={5}>
                                                8<sup data-fantasy-user-sorted-index={5}>pt</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={5}>
                                        {this.state.fantasyUsersSorted[5].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={5} />}
                                    </div>
                                </div>

                                <div className="not-first-place-wrapper d-flex align-items-center seventh-to-show" data-fantasy-user-sorted-index={6} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={6}>
                                        7.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={6}>
                                        <div className="top" data-fantasy-user-sorted-index={6}>
                                            {this.state.fantasyUsersSorted[6].summaSummarum == 0 ? "Reserved for your friend" : this.state.fantasyUsersSorted[6].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={6}>
                                            {parseFloat(this.state.fantasyUsersSorted[6].summaSummarum).toFixed(2)}<sup data-fantasy-user-sorted-index={6}>pt</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={6}>
                                                6<sup data-fantasy-user-sorted-index={6}>pt</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper">
                                        {this.state.fantasyUsersSorted[6].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={6} />}
                                    </div>
                                </div>
                            </div>


                            <div className=" d-flex justify-content-between align-items-center w-100">
                                <div className="not-first-place-wrapper d-flex align-items-center eight-to-show" data-fantasy-user-sorted-index={7} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={7}>
                                        8.
                                </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={7}>
                                        <div className="top" data-fantasy-user-sorted-index={7}>
                                            {this.state.fantasyUsersSorted[7].summaSummarum == 0 ? "Reserved for your friend" : this.state.fantasyUsersSorted[7].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={7}>
                                            {parseFloat(this.state.fantasyUsersSorted[7].summaSummarum).toFixed(2)}<sup data-fantasy-user-sorted-index={7}>pt</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={7}>
                                                4<sup data-fantasy-user-sorted-index={7}>pt</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={7}>
                                        {this.state.fantasyUsersSorted[7].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={7} />}
                                    </div>
                                </div>

                                <div className="not-first-place-wrapper d-flex align-items-center ninth-to-show" data-fantasy-user-sorted-index={8} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={8}>
                                        9.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={8}>
                                        <div className="top" data-fantasy-user-sorted-index={8}>
                                            {this.state.fantasyUsersSorted[8].summaSummarum == 0 ? "Reserved for your friend" : this.state.fantasyUsersSorted[8].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={8}>
                                            {parseFloat(this.state.fantasyUsersSorted[8].summaSummarum).toFixed(2)}<sup data-fantasy-user-sorted-index={8}>pt</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={8}>
                                                2<sup data-fantasy-user-sorted-index={8}>pt</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={8}>
                                        {this.state.fantasyUsersSorted[8].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={8} />}
                                    </div>
                                </div>


                                <div className="not-first-place-wrapper d-flex align-items-center tenth-to-show" data-fantasy-user-sorted-index={9} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={9}>
                                        10.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={9}>
                                        <div className="top" data-fantasy-user-sorted-index={9}>
                                            {this.state.fantasyUsersSorted[9].summaSummarum == 0 ? "Reserved for your friend" : this.state.fantasyUsersSorted[9].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={9}>
                                            {parseFloat(this.state.fantasyUsersSorted[9].summaSummarum).toFixed(2)}<sup data-fantasy-user-sorted-index={9}>pt</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={9}>
                                                1<sup data-fantasy-user-sorted-index={9}>pt</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={9}>
                                        {this.state.fantasyUsersSorted[9].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" />}
                                    </div>
                                </div>
                            </div>

                            {this.checkIsPlebseView() &&
                                this.props.searchValue === "" &&
                                <div className="plebs-container">
                                    <div className="plebse-title">------------------------- SCROLL DOWN TO SEE REST OF PLEBSE -------------------------</div>

                                    <table>
                                        <thead className="w-100">
                                            <tr className="w-100">
                                                <th className="orer-no">Position No.</th>
                                                <th>Username</th>
                                                <th className="td-points">TD Fantasy points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.mapPlebs()}
                                        </tbody>
                                    </table>
                                </div>
                            }

                            {!this.checkIsPlebseView() &&
                                this.props.searchValue === "" &&
                                <div className="plebs-container">
                                    <div className="plebse-title">------------------------- THERE IS NO DATA YET -------------------------</div>
                                </div>
                            }

                        </div>
                    </div>
                }
                {this.state.fantasyUsersSorted &&
                    this.props.searchValue !== "" &&
                    <div className="hall-of-fame-total-points-list-container">
                        <div className="hall-of-fame-total-points-list-wrapper d-flex flex-column align-items-center">
                            <div className="plebs-container-searched">
                                <div className="plebse-title">------------------------- SEARCHED RESULTS -------------------------</div>
                                <table>
                                    <thead className="w-100">
                                        <tr className="w-100">
                                            <th className="orer-no">Position No.</th>
                                            <th>Username</th>
                                            <th className="td-points">TD Fantasy points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.mapSearched()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }


                <Portal>
                    <HallOfFameUserStatsModal isShowing={this.state.showUserModal} closeModal={this.closeUserModal} userData={this.state.fantasyUserForModalData} />
                </Portal>
            </>
        )
    }
}

export default HallOfFameTotalPointsList