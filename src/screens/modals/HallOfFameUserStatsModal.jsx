import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { AppContext } from '../../screens/_context/AppContext';
import eligibleDays from "../../services/eligibleDays";
import checkEligibilityForPickTeam from "../../services/checkEligibilityForPickTeam";
import calculateBasketballPlayerTDFantasyPoints from "../../services/calculateBasketballPlayerTDFantasyPoints";



class HallOfFameUserStatsModal extends React.Component {
    static contextType = AppContext;
    state = {
        selectedDay: "",
        userDataForSelectedDay: {},
        fantasyTotalForSelectedDay: 0,
        calulatedFirstFiveRealLifeStats: {},
        calculatedFirstFiveFantasyStats: {}
    }


    calculateF1WCGrandTotal = () => {
        let outputCalculated = []
        eligibleDays.forEach((day) => {
            const fantasyUsersF1WCforOneDay = []
            this.context.fantasyUsers.forEach((user) => {
                const calculatedData = checkEligibilityForPickTeam(this.context.fantasyUsers, user.username, day, this.context.nowDateAndTime, this.context.dropdowns[0].teamsByDay, this.context.basketballPlayers)
                const userData = {
                    username: user.username,
                    summaSummarum: calculatedData.totalSummaSummarum,
                    teamPickIds: calculatedData.teamPickData,
                }
                fantasyUsersF1WCforOneDay.push(userData)
            })
            if (fantasyUsersF1WCforOneDay !== null) {
                fantasyUsersF1WCforOneDay.sort(function (a, b) {
                    return b.summaSummarum - a.summaSummarum
                })
                for (let i = 0; i < 10; i++) {
                    if (fantasyUsersF1WCforOneDay[i].summaSummarum != 0) {

                        switch (i) {
                            case 0:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 25
                                break;
                            case 1:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 18
                                break;
                            case 2:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 15
                                break;
                            case 3:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 12
                                break;
                            case 4:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 10
                                break;
                            case 5:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 8
                                break;
                            case 6:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 6
                                break;
                            case 7:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 4
                                break;
                            case 8:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 2
                                break;
                            case 9:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 1
                                break;
                        }
                        outputCalculated.push(fantasyUsersF1WCforOneDay[i])
                    }
                }

            }
        })

        const outputCalculatedSummedUp = []
        const outputUsernames = []
        outputCalculated.forEach((user) => {
            if (outputUsernames.indexOf(user.username) === -1) {
                outputUsernames.push(user.username)
            }
        })


        outputUsernames.forEach((username) => {
            let f1WCgrandTotal = 0
            let summedUpUser = null
            outputCalculated.forEach((user) => {
                if (username === user.username) {
                    f1WCgrandTotal += user.f1wcPoints
                    summedUpUser = user
                    summedUpUser["f1WCgrandTotal"] = f1WCgrandTotal
                }
            })
            outputCalculatedSummedUp.push(summedUpUser)
        })

        const selectedUserForModal = outputCalculatedSummedUp.filter((user) => user.username === this.props.userData.username)

        if (selectedUserForModal.length === 1) {
            return selectedUserForModal[0].f1WCgrandTotal
        } else {
            return "0"
        }

    }

    calculateSummaSummarumGrandTotal = () => {
        const fantasyUsersCalculatedPointsForAllDays = []
        this.context.fantasyUsers.forEach((user) => {
            const calculatedPointsForOneUser = {
                username: user.username,
                summaSummarum: 0,
                data: []
            }
            eligibleDays.forEach((day) => {
                const calculatedData = checkEligibilityForPickTeam(this.context.fantasyUsers, user.username, day, this.context.nowDateAndTime, this.context.dropdowns[0].teamsByDay, this.context.basketballPlayers)
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
        const selectedUserForModal = fantasyUsersCalculatedPointsForAllDays.filter((user) => user.username === this.props.userData.username)

        if (selectedUserForModal.length === 1) {
            return selectedUserForModal[0].summaSummarum.toFixed(2)
        } else {
            return "0"
        }

    }


    depositSelectedDay = (event) => {
        const dayToSet = event.target.getAttribute("data-day-to-select")
        this.setState({
            selectedDay: dayToSet
        })

    }

    calculatePlayerRoundPoints = (inputPlayerData) => {
        const calculatedPlayerData = calculateBasketballPlayerTDFantasyPoints(inputPlayerData, this.state.selectedDay)
        return calculatedPlayerData.summaSummarum
    }

    calculateFirstFive = () => {
        const userRawDataForSelectedDay = this.context.fantasyUsers.filter((user) => user.username === this.props.userData.username)
        let userDataForSelectedDay = {}
        let fantasyTotalForSelectedDay = 0;
        if (!!userRawDataForSelectedDay[0][this.state.selectedDay] && userRawDataForSelectedDay[0][this.state.selectedDay].Player1Id !== null) {
            const player1rawData = this.context.basketballPlayers.filter((player) => player._id.$oid === userRawDataForSelectedDay[0][this.state.selectedDay].Player1Id)
            const player2rawData = this.context.basketballPlayers.filter((player) => player._id.$oid === userRawDataForSelectedDay[0][this.state.selectedDay].Player2Id)
            const player3rawData = this.context.basketballPlayers.filter((player) => player._id.$oid === userRawDataForSelectedDay[0][this.state.selectedDay].Player3Id)
            const player4rawData = this.context.basketballPlayers.filter((player) => player._id.$oid === userRawDataForSelectedDay[0][this.state.selectedDay].Player4Id)
            const player5rawData = this.context.basketballPlayers.filter((player) => player._id.$oid === userRawDataForSelectedDay[0][this.state.selectedDay].Player5Id)
            const player6rawData = this.context.basketballPlayers.filter((player) => player._id.$oid === userRawDataForSelectedDay[0][this.state.selectedDay].Player6Id)
            const player7rawData = this.context.basketballPlayers.filter((player) => player._id.$oid === userRawDataForSelectedDay[0][this.state.selectedDay].Player7Id)

            userDataForSelectedDay = [
                {
                    name: player1rawData[0].name,
                    team: player1rawData[0].team,
                    points: this.calculatePlayerRoundPoints(player1rawData[0])
                },
                {
                    name: player2rawData[0].name,
                    team: player2rawData[0].team,
                    points: this.calculatePlayerRoundPoints(player2rawData[0])
                },
                {
                    name: player3rawData[0].name,
                    team: player3rawData[0].team,
                    points: this.calculatePlayerRoundPoints(player3rawData[0])
                },
                {
                    name: player4rawData[0].name,
                    team: player4rawData[0].team,
                    points: this.calculatePlayerRoundPoints(player4rawData[0])
                }, {
                    name: player5rawData[0].name,
                    team: player5rawData[0].team,
                    points: this.calculatePlayerRoundPoints(player5rawData[0])
                }, {
                    name: player6rawData[0].name,
                    team: player6rawData[0].team,
                    points: this.calculatePlayerRoundPoints(player6rawData[0])
                }, {
                    name: player7rawData[0].name,
                    team: player7rawData[0].team,
                    points: this.calculatePlayerRoundPoints(player7rawData[0])
                }
            ]



            userDataForSelectedDay.sort(function (a, b) {
                return b.points - a.points
            })
            for (let i = 0; i < 5; i++) {
                fantasyTotalForSelectedDay += parseFloat(userDataForSelectedDay[i].points)
            }

            if (isNaN(fantasyTotalForSelectedDay)) {
                fantasyTotalForSelectedDay = "n/a"
            }


            const calculatedPickData = checkEligibilityForPickTeam(this.context.selectedLeague, this.context.fantasyUsers, this.props.userData.username, this.state.selectedDay, this.context.nowDateAndTime, this.context.teamsByDay, this.context.basketballPlayers)
            this.setState({
                userDataForSelectedDay,
                fantasyTotalForSelectedDay,
                calulatedFirstFiveRealLifeStats: calculatedPickData.calculatedFirstFiveRealLifeStatsTotals,
                calculatedFirstFiveFantasyStats: calculatedPickData.calculatedFirstFiveFantasyPointsStatsTotals
            })
        } else {
            userDataForSelectedDay = [
                {
                    name: "n/a name",
                    team: "n/a team",
                    points: "N/A"
                },
                {
                    name: "n/a name",
                    team: "n/a team",
                    points: "N/A"
                },
                {
                    name: "n/a name",
                    team: "n/a team",
                    points: "N/A"
                },
                {
                    name: "n/a name",
                    team: "n/a team",
                    points: "N/A"
                },
                {
                    name: "n/a name",
                    team: "n/a team",
                    points: "N/A"
                },
                {
                    name: "n/a name",
                    team: "n/a team",
                    points: "N/A"
                },
                {
                    name: "n/a name",
                    team: "n/a team",
                    points: "N/A"
                }
            ]
            const calculatedFirstFiveRealLifeStatsTotals = {
                gameWinsCounter: 0,
                assists: 0,
                rebounds: 0,
                blocks: 0,
                steals: 0,
                turnovers: 0,
                freeThrows: 0,
                twoPoints: 0,
                threePoints: 0,
            }
            const calculatedFirstFiveFantasyPointsStatsTotals = {
                gameWins: 0,
                assists: 0,
                rebounds: 0,
                blocks: 0,
                steals: 0,
                turnovers: 0,
                freeThrows: 0,
                freeThrowsBonuses: 0,
                freeThrowsPenalties: 0,
                twoPoints: 0,
                twoPointsBonuses: 0,
                twoPointsPenalties: 0,
                threePoints: 0,
                threePointsBonuses: 0,
                threePointsPenalties: 0
            }
            this.setState({
                userDataForSelectedDay,
                fantasyTotalForSelectedDay: "n/a",
                calulatedFirstFiveRealLifeStats: calculatedFirstFiveRealLifeStatsTotals,
                calculatedFirstFiveFantasyStats: calculatedFirstFiveFantasyPointsStatsTotals
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.userData !== null && prevProps.userData !== this.props.userData) {
            const dayToSet = this.context.hallOfFameSelectedDay === "all-days" ? "ROUND-1" : this.context.hallOfFameSelectedDay
            this.setState({
                selectedDay: dayToSet,
            })
            this.calculateFirstFive()
        } else if (prevState.selectedDay !== this.state.selectedDay) {
            this.calculateFirstFive()
        }
    }

    render() {
        return (
            <>
                <Modal className="user-details-modal" visible={this.props.isShowing} onClickBackdrop={this.props.closeModal}>
                    {this.props.userData !== null &&
                        <div className="user-details-modal-inner-container d-flex flex-column">
                            <div className="modal-title d-flex justify-content-between align-items-center">
                                <div className="username">
                                    <i>username:</i>{this.props.userData.username}
                                </div>
                                {/* <div className="username">
                                    <i>Grand Total F1WC points:</i>{`${this.props.userData.f1WCgrandTotal ? this.props.userData.f1WCgrandTotal : this.calculateF1WCGrandTotal()}`} <sup>pt</sup>
                                </div> */}
                                {/* <div className="username">
                                    <i>Grand Total TD Fantasy points:</i>{`${this.props.userData.summaSummarum !== null ? this.props.userData.summaSummarum : this.calculateSummaSummarumGrandTotal()}`} <sup>pt</sup>
                                </div> */}
                                <div className="close" onClick={this.props.closeModal}>&times;</div>
                            </div>

                            <div className="d-flex">
                                {this.context.selectedLeague == "euroLeague" &&
                                    <div className="select-days-container d-flex flex-column justify-conten-around align-items-center">
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>ROUND 1<br /><i data-day-to-select="ROUND-1">October 3-4, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>ROUND 2<br /><i data-day-to-select="ROUND-2">October 10-11, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>ROUND 3<br /><i data-day-to-select="ROUND-3">October 17-18, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>ROUND 4<br /><i data-day-to-select="ROUND-4">October 24-25, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>ROUND 5<br /><i data-day-to-select="ROUND-5">October 29-30, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>ROUND 6<br /><i data-day-to-select="ROUND-6">October 31 -<br /> November 1, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>ROUND 7<br /><i data-day-to-select="ROUND-7">November 7-8, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>ROUND 8<br /><i data-day-to-select="ROUND-8">November 14-15, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>ROUND 9<br /><i data-day-to-select="ROUND-9">November 19-20, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>ROUND 10<br /><i data-day-to-select="ROUND-10">November 21-22, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-11" ? "is-selected" : ""}`} data-day-to-select="ROUND-11" onClick={this.depositSelectedDay}>ROUND 11<br /><i data-day-to-select="ROUND-11">November 28-29, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-12" ? "is-selected" : ""}`} data-day-to-select="ROUND-12" onClick={this.depositSelectedDay}>ROUND 12<br /><i data-day-to-select="ROUND-12">December 5-6, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-13" ? "is-selected" : ""}`} data-day-to-select="ROUND-13" onClick={this.depositSelectedDay}>ROUND 13<br /><i data-day-to-select="ROUND-13">December 12-13, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-14" ? "is-selected" : ""}`} data-day-to-select="ROUND-14" onClick={this.depositSelectedDay}>ROUND 14<br /><i data-day-to-select="ROUND-14">December 17-18, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-15" ? "is-selected" : ""}`} data-day-to-select="ROUND-15" onClick={this.depositSelectedDay}>ROUND 15<br /><i data-day-to-select="ROUND-15">December 19-20, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-16" ? "is-selected" : ""}`} data-day-to-select="ROUND-16" onClick={this.depositSelectedDay}>ROUND 16<br /><i data-day-to-select="ROUND-16">December 26-27, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-17" ? "is-selected" : ""}`} data-day-to-select="ROUND-17" onClick={this.depositSelectedDay}>ROUND 17<br /><i data-day-to-select="ROUND-17">January 2-3, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-18" ? "is-selected" : ""}`} data-day-to-select="ROUND-18" onClick={this.depositSelectedDay}>ROUND 18<br /><i data-day-to-select="ROUND-18">January 9-10, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-19" ? "is-selected" : ""}`} data-day-to-select="ROUND-19" onClick={this.depositSelectedDay}>ROUND 19<br /><i data-day-to-select="ROUND-19">January 14-15, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-20" ? "is-selected" : ""}`} data-day-to-select="ROUND-20" onClick={this.depositSelectedDay}>ROUND 20<br /><i data-day-to-select="ROUND-20">January 16-17, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-21" ? "is-selected" : ""}`} data-day-to-select="ROUND-21" onClick={this.depositSelectedDay}>ROUND 21<br /><i data-day-to-select="ROUND-21">January 23-24, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-22" ? "is-selected" : ""}`} data-day-to-select="ROUND-22" onClick={this.depositSelectedDay}>ROUND 22<br /><i data-day-to-select="ROUND-22">January 30-31, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-23" ? "is-selected" : ""}`} data-day-to-select="ROUND-23" onClick={this.depositSelectedDay}>ROUND 23<br /><i data-day-to-select="ROUND-23">February 4-5, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-24" ? "is-selected" : ""}`} data-day-to-select="ROUND-24" onClick={this.depositSelectedDay}>ROUND 24<br /><i data-day-to-select="ROUND-24">February 6-7, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-25" ? "is-selected" : ""}`} data-day-to-select="ROUND-25" onClick={this.depositSelectedDay}>ROUND 25<br /><i data-day-to-select="ROUND-25">February 20-21, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-26" ? "is-selected" : ""}`} data-day-to-select="ROUND-26" onClick={this.depositSelectedDay}>ROUND 26<br /><i data-day-to-select="ROUND-26">February 27-28, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-27" ? "is-selected" : ""}`} data-day-to-select="ROUND-27" onClick={this.depositSelectedDay}>ROUND 27<br /><i data-day-to-select="ROUND-27">March 3-4, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-28" ? "is-selected" : ""}`} data-day-to-select="ROUND-28" onClick={this.depositSelectedDay}>ROUND 28<br /><i data-day-to-select="ROUND-28">March 5-6, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-29" ? "is-selected" : ""}`} data-day-to-select="ROUND-29" onClick={this.depositSelectedDay}>ROUND 29<br /><i data-day-to-select="ROUND-29">March 12-13, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-30" ? "is-selected" : ""}`} data-day-to-select="ROUND-30" onClick={this.depositSelectedDay}>ROUND 30<br /><i data-day-to-select="ROUND-30">March 19-20, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-31" ? "is-selected" : ""}`} data-day-to-select="ROUND-31" onClick={this.depositSelectedDay}>ROUND 31<br /><i data-day-to-select="ROUND-31">March 24-25, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-32" ? "is-selected" : ""}`} data-day-to-select="ROUND-32" onClick={this.depositSelectedDay}>ROUND 32<br /><i data-day-to-select="ROUND-32">March 26-27, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-33" ? "is-selected" : ""}`} data-day-to-select="ROUND-33" onClick={this.depositSelectedDay}>ROUND 33<br /><i data-day-to-select="ROUND-33">April 2-3, 2020</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-34" ? "is-selected" : ""}`} data-day-to-select="ROUND-34" onClick={this.depositSelectedDay}>ROUND 34<br /><i data-day-to-select="ROUND-34">April 9-10, 2020</i></button>
                                    </div>
                                }


                                {this.context.selectedLeague == "euroCup" &&
                                    <div className="select-days-container d-flex flex-column justify-conten-around align-items-center">
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>ROUND 1<br /><i data-day-to-select="ROUND-1">October 1-2, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>ROUND 2<br /><i data-day-to-select="ROUND-2">October 8-9, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>ROUND 3<br /><i data-day-to-select="ROUND-3">October 15-16, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>ROUND 4<br /><i data-day-to-select="ROUND-4">October 22-23, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>ROUND 5<br /><i data-day-to-select="ROUND-5">October 29-30, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>ROUND 6<br /><i data-day-to-select="ROUND-6">November 5-6, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>ROUND 7<br /><i data-day-to-select="ROUND-7">November 12-13, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>ROUND 8<br /><i data-day-to-select="ROUND-8">November 19-20, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>ROUND 9<br /><i data-day-to-select="ROUND-9">December 10-11, 2019</i></button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.selectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>ROUND 10<br /><i data-day-to-select="ROUND-10">December 17-18, 2019</i></button>
                                    </div>
                                }

                                <div className="field-container d-flex flex-column">
                                    <div className="player-on-field-container">
                                        <div className="first-three-wrapper d-flex justify-content-around align-items-center">
                                            <div className="first-five-player-wrapper d-flex flex-column justify-content-between">
                                                <div className="points">
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        this.state.userDataForSelectedDay[0].points} <sup>pt</sup>
                                                </div>
                                                <div className="name">
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        this.state.userDataForSelectedDay[0].name}
                                                </div>
                                                {this.state.userDataForSelectedDay.length > 0 &&
                                                    <div className="team d-flex justify-content-center align-items-center">
                                                        {this.state.userDataForSelectedDay[0].team}
                                                    </div>}
                                            </div>
                                            <div className="first-five-player-wrapper d-flex flex-column justify-content-between">
                                                <div className="points">
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        this.state.userDataForSelectedDay[1].points} <sup>pt</sup>
                                                </div>
                                                <div className="name">
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        this.state.userDataForSelectedDay[1].name}
                                                </div>
                                                {this.state.userDataForSelectedDay.length > 0 &&
                                                    <div className="team d-flex justify-content-center align-items-center">
                                                        {this.state.userDataForSelectedDay[1].team}
                                                    </div>}
                                            </div>
                                            <div className="first-five-player-wrapper d-flex flex-column justify-content-between">
                                                <div className="points">
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        this.state.userDataForSelectedDay[2].points} <sup>pt</sup>
                                                </div>
                                                <div className="name">
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        this.state.userDataForSelectedDay[2].name}
                                                </div>
                                                {this.state.userDataForSelectedDay.length > 0 &&
                                                    <div className="team d-flex justify-content-center align-items-center">
                                                        {this.state.userDataForSelectedDay[2].team}
                                                    </div>}
                                            </div>
                                        </div>
                                        <div className="second-two-wrapper d-flex justify-content-around align-items-center">
                                            <div className="first-five-player-wrapper d-flex flex-column justify-content-between">
                                                <div className="points">
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        this.state.userDataForSelectedDay[3].points} <sup>pt</sup>
                                                </div>
                                                <div className="name">
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        this.state.userDataForSelectedDay[3].name}
                                                </div>
                                                {this.state.userDataForSelectedDay.length > 0 &&
                                                    <div className="team d-flex justify-content-center align-items-center">
                                                        {this.state.userDataForSelectedDay[3].team}
                                                    </div>}
                                            </div>
                                            <div className="first-five-player-wrapper d-flex flex-column justify-content-between">
                                                <div className="points">
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        this.state.userDataForSelectedDay[4].points} <sup>pt</sup>
                                                </div>
                                                <div className="name">
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        this.state.userDataForSelectedDay[4].name}
                                                </div>
                                                {this.state.userDataForSelectedDay.length > 0 &&
                                                    <div className="team d-flex justify-content-center align-items-center">
                                                        {this.state.userDataForSelectedDay[4].team}
                                                    </div>}
                                            </div>

                                        </div>
                                        <div className="bench-wrapper w-100 d-flex justify-content-between align-items-end">
                                            <div className="w-25 d-flex h-100">
                                                <div className="bench-player-wrapper d-flex flex-column justify-content-between">
                                                    <div className="points">
                                                        {this.state.userDataForSelectedDay.length > 0 &&
                                                            this.state.userDataForSelectedDay[5].points} <sup>pt</sup>
                                                    </div>
                                                    <div className="name">
                                                        {this.state.userDataForSelectedDay.length > 0 &&
                                                            this.state.userDataForSelectedDay[5].name}
                                                    </div>
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        <div className="team d-flex justify-content-center align-items-center">
                                                            {this.state.userDataForSelectedDay[5].team}
                                                        </div>}
                                                </div>
                                                <div className="bench-player-wrapper d-flex flex-column justify-content-between">
                                                    <div className="points">
                                                        {this.state.userDataForSelectedDay.length > 0 &&
                                                            this.state.userDataForSelectedDay[6].points} <sup>pt</sup>
                                                    </div>
                                                    <div className="name">
                                                        {this.state.userDataForSelectedDay.length > 0 &&
                                                            this.state.userDataForSelectedDay[6].name}
                                                    </div>
                                                    {this.state.userDataForSelectedDay.length > 0 &&
                                                        <div className="team d-flex justify-content-center align-items-center">
                                                            {this.state.userDataForSelectedDay[6].team}
                                                        </div>}
                                                </div>
                                            </div>
                                            {/* <div className="total-points-wrapper d-flex justify-content-between">
                                                <div>
                                                    <i>Round fantasy points:</i>{this.state.fantasyTotalForSelectedDay === "n/a" ? "n/a" : this.state.fantasyTotalForSelectedDay.toFixed(2)} <sup>pt</sup>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="stats-container">
                                        <table className="w-100 h-100">
                                            <thead className="w-100">
                                                <tr className="w-100">
                                                    <th>FIRST FIVE TOTAL</th>
                                                    <th>Team wins</th>
                                                    <th>Assists</th>
                                                    <th>Rebounds</th>
                                                    <th>Blocks</th>
                                                    <th>Steals</th>
                                                    <th>Turnovers</th>
                                                    <th>Free throws</th>
                                                    <th>FT bonuses</th>
                                                    <th>FT penalties</th>
                                                    <th>Two points</th>
                                                    <th>2pt bonuses</th>
                                                    <th>2pt penalties</th>
                                                    <th>Three points</th>
                                                    <th>3pt bonuses</th>
                                                    <th>3pt penalties</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        Real life (qty)
                                                </th>
                                                    <td>{this.state.calulatedFirstFiveRealLifeStats.gameWinsCounter}</td>
                                                    <td>{this.state.calulatedFirstFiveRealLifeStats.assists}</td>
                                                    <td>{this.state.calulatedFirstFiveRealLifeStats.rebounds}</td>
                                                    <td>{this.state.calulatedFirstFiveRealLifeStats.blocks}</td>
                                                    <td>{this.state.calulatedFirstFiveRealLifeStats.steals}</td>
                                                    <td>{this.state.calulatedFirstFiveRealLifeStats.turnovers}</td>
                                                    <td>{this.state.calulatedFirstFiveRealLifeStats.freeThrows}</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>{this.state.calulatedFirstFiveRealLifeStats.twoPoints}</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>{this.state.calulatedFirstFiveRealLifeStats.threePoints}</td>
                                                    <td>-</td>
                                                    <td>-</td>

                                                </tr>
                                                <tr>
                                                    <th>
                                                        Fantasy points
                                                </th>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.gameWins > 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.gameWins !== undefined ? this.state.calculatedFirstFiveFantasyStats.gameWins.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.assists > 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.assists !== undefined ? this.state.calculatedFirstFiveFantasyStats.assists.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.rebounds > 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.rebounds !== undefined ? this.state.calculatedFirstFiveFantasyStats.rebounds.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.blocks > 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.blocks !== undefined ? this.state.calculatedFirstFiveFantasyStats.blocks.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.steals > 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.steals !== undefined ? this.state.calculatedFirstFiveFantasyStats.steals.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.turnovers >= 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.turnovers !== undefined ? this.state.calculatedFirstFiveFantasyStats.turnovers.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.freeThrows > 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.freeThrows !== undefined ? this.state.calculatedFirstFiveFantasyStats.freeThrows.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.freeThrowsBonuses > 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.freeThrowsBonuses !== undefined ? this.state.calculatedFirstFiveFantasyStats.freeThrowsBonuses.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.freeThrowsPenalties >= 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.freeThrowsPenalties !== undefined ? this.state.calculatedFirstFiveFantasyStats.freeThrowsPenalties.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.twoPoints > 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.twoPoints !== undefined ? this.state.calculatedFirstFiveFantasyStats.twoPoints.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.twoPointsBonuses > 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.twoPointsBonuses !== undefined ? this.state.calculatedFirstFiveFantasyStats.twoPointsBonuses.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.twoPointsPenalties >= 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.twoPointsPenalties !== undefined ? this.state.calculatedFirstFiveFantasyStats.twoPointsPenalties.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.threePoints > 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.threePoints !== undefined ? this.state.calculatedFirstFiveFantasyStats.threePoints.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.threePointsBonuses > 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.threePointsBonuses !== undefined ? this.state.calculatedFirstFiveFantasyStats.threePointsBonuses.toFixed(2) : ""}`}</td>
                                                    <td className={`${this.state.calculatedFirstFiveFantasyStats.threePointsPenalties >= 0 ? "points-good" : "points-not-good"}`}>{`${this.state.calculatedFirstFiveFantasyStats.threePointsPenalties !== undefined ? this.state.calculatedFirstFiveFantasyStats.threePointsPenalties.toFixed(2) : ""}`}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>

                        </div>}
                </Modal>
            </>
        )
    }
}

export default HallOfFameUserStatsModal