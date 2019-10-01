import React from 'react';
import { AppContext } from '../../screens/_context/AppContext';
import { Portal } from 'react-portal';
import eligibleDays from "../../services/eligibleDays";
import SRBPlayerCardModal from "../modals/PlayerCardModal"
import serbischeDatum from "../../services/serbischeDatum";
import sortPlayersOnSelectScreen from "../../services/sortPlayersOnSelectScreen";
import calculateTeamHref from "../../services/calculateTeamHref";
import calculateBasketballPlayerTDFantasyGrandTotalPoints from "../../services/calculateBasketballPlayerTDFantasyGrandTotalPoints";

class SRBSelectPlayer extends React.Component {
    static contextType = AppContext;
    state = {
        isTooLateMessage: false,
        sortFilterValue: "ptPerGame"
    }
    mapEligiblePlayers = () => {
        const selectedTeam = this.context.teamSelected
        const selectedDay = this.context.selectedDay
        const players = this.context.basketballPlayers
        const eligibleRounds = this.context.teamsByDay
        const nowDateAndTime = this.context.nowDateAndTime
        let playerPosition = ""
        const eligibleTeams = []
        const playerPositionNumber = this.context.choosePlayerPosition
        switch (playerPositionNumber) {
            case "Player 1":
                playerPosition = "F"
                break;
            case "Player 2":
                playerPosition = "C"
                break;
            case "Player 3":
                playerPosition = "F"
                break;
            case "Player 4":
                playerPosition = "G"
                break;
            case "Player 5":
                playerPosition = "G"
                break;
            case "Player 6":
                playerPosition = "all-around"
                break;
            case "Player 7":
                playerPosition = "all-around"
                break;
        }
        const outputPlayers = []
        //DON'T SHOW ALREADY SELECTED PLAYERS//
        const posiblePositions = ["Player1Id", "Player2Id", "Player3Id", "Player4Id", "Player5Id", "Player6Id", "Player7Id"]
        const selectedPlayersIds = []
        let eligibleDaysSelectedCompetition = []
        if (this.context.selectedLeague == "euroLeague") {
            eligibleDaysSelectedCompetition = eligibleDays.euroLeague
        } else if (this.context.selectedLeague == "euroCup") {
            eligibleDaysSelectedCompetition = eligibleDays.euroCup
        }
        posiblePositions.forEach((playerPositionId) => {
            if (this.context.teamPickData[playerPositionId] !== null) {
                selectedPlayersIds.push(this.context.teamPickData[playerPositionId])
            }
        })
        if (selectedTeam === "all-eligible-teams") {
            const roundData = eligibleRounds.filter((round) => {
                if (round.roundName == selectedDay) {
                    return round
                }
            })
            const possibleMonths = ["October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August", "September"]
            const roundMonth = roundData[0].date.split(" ")[0]
            const nowMonth = nowDateAndTime.humanDate.split("-")[1]
            const roundDays = roundData[0].date.split(" ")[1].split("-")
            const nowDayRaw = nowDateAndTime.humanDate.split("-")[0]
            let nowDay = ""
            const roundMonthIndex = possibleMonths.indexOf(roundMonth)
            const nowMonthIndex = possibleMonths.indexOf(nowMonth)
            if (nowDayRaw.length == 3) {
                nowDay = nowDayRaw[0]
            } else if (nowDayRaw.length == 4) {
                nowDay = nowDayRaw[0] + nowDayRaw[1]
            }
            if (selectedDay == "ROUND-6" && this.context.selectedLeague == "euroLeague") {
                if (nowMonth == "October" && nowDay !== "31") {
                    roundData[0].day1.forEach((team) => {
                        eligibleTeams.push(team)
                    })
                    roundData[0].day2.forEach((team) => {
                        eligibleTeams.push(team)
                    })
                } else if (nowMonth == "October" && nowDay == "31") {
                    const outputElements = []
                    roundData[0].day1.forEach((team) => {
                        let isEligible = true
                        const teamHour = parseInt(team.gameStart.split(":")[0])
                        const teamMinutes = parseInt(team.gameStart.split(":")[1])
                        const nowHour = parseInt(this.context.nowDateAndTime.humanTime.split(":")[0])
                        const nowMinutes = parseInt(this.context.nowDateAndTime.humanTime.split(":")[1])
                        if (nowHour > teamHour) {
                            isEligible = false
                        } else if (nowHour === teamHour) {
                            if (nowMinutes >= teamMinutes) {
                                isEligible = false
                            }
                        }
                        team["isEligible"] = isEligible
                        outputElements.push(team)
                    })
                    roundData[0].day2.forEach((team) => {
                        team["isEligible"] = true
                        outputElements.push(team)
                    })
                    outputElements.forEach((team) => {
                        if (team.isEligible) {
                            eligibleTeams.push(team)
                        }
                    })
                } else if (nowMonth == "November" && nowDay == "1") {
                    const outputElements = []
                    roundData[0].day1.forEach((team) => {
                        team["isEligible"] = false
                        outputElements.push(team)
                    })
                    roundData[0].day2.forEach((team) => {
                        let isEligible = true
                        const teamHour = parseInt(team.gameStart.split(":")[0])
                        const teamMinutes = parseInt(team.gameStart.split(":")[1])
                        const nowHour = parseInt(this.context.nowDateAndTime.humanTime.split(":")[0])
                        const nowMinutes = parseInt(this.context.nowDateAndTime.humanTime.split(":")[1])
                        if (nowHour > teamHour) {
                            isEligible = false
                        } else if (nowHour === teamHour) {
                            if (nowMinutes >= teamMinutes) {
                                isEligible = false
                            }
                        }
                        team["isEligible"] = isEligible
                        outputElements.push(team)
                    })
                    outputElements.forEach((team) => {
                        if (team.isEligible) {
                            eligibleTeams.push(team)
                        }
                    })
                }
            } else {
                if (nowMonthIndex < roundMonthIndex) {
                    roundData[0].day1.forEach((team) => {
                        eligibleTeams.push(team)
                    })
                    roundData[0].day2.forEach((team) => {
                        eligibleTeams.push(team)
                    })
                } else if (nowMonthIndex == roundMonthIndex) {
                    if (parseInt(nowDay, 10) < parseInt(roundDays[0], 10)) {

                        roundData[0].day1.forEach((team) => {
                            eligibleTeams.push(team)
                        })
                        roundData[0].day2.forEach((team) => {
                            eligibleTeams.push(team)
                        })

                    } else if (parseInt(nowDay, 10) == parseInt(roundDays[0])) {
                        const outputElements = []
                        roundData[0].day1.forEach((team) => {
                            let isEligible = true
                            const teamHour = parseInt(team.gameStart.split(":")[0])
                            const teamMinutes = parseInt(team.gameStart.split(":")[1])
                            const nowHour = parseInt(this.context.nowDateAndTime.humanTime.split(":")[0])
                            const nowMinutes = parseInt(this.context.nowDateAndTime.humanTime.split(":")[1])
                            if (nowHour > teamHour) {
                                isEligible = false
                            } else if (nowHour === teamHour) {
                                if (nowMinutes >= teamMinutes) {
                                    isEligible = false
                                }
                            }
                            team["isEligible"] = isEligible
                            outputElements.push(team)
                        })
                        roundData[0].day2.forEach((team) => {
                            team["isEligible"] = true
                            outputElements.push(team)
                        })
                        outputElements.forEach((team) => {
                            if (team.isEligible) {
                                eligibleTeams.push(team)
                            }
                        })

                    } else if (parseInt(nowDay, 10) == parseInt(roundDays[1], 10)) {
                        const outputElements = []
                        roundData[0].day1.forEach((team) => {
                            team["isEligible"] = false
                            outputElements.push(team)
                        })
                        roundData[0].day2.forEach((team) => {
                            let isEligible = true
                            const teamHour = parseInt(team.gameStart.split(":")[0])
                            const teamMinutes = parseInt(team.gameStart.split(":")[1])
                            const nowHour = parseInt(this.context.nowDateAndTime.humanTime.split(":")[0])
                            const nowMinutes = parseInt(this.context.nowDateAndTime.humanTime.split(":")[1])
                            if (nowHour > teamHour) {
                                isEligible = false
                            } else if (nowHour === teamHour) {
                                if (nowMinutes >= teamMinutes) {
                                    isEligible = false
                                }
                            }
                            team["isEligible"] = isEligible
                            outputElements.push(team)
                        })
                        outputElements.forEach((team) => {
                            if (team.isEligible) {
                                eligibleTeams.push(team)
                            }
                        })
                    }
                }
            }
            eligibleTeams.forEach((team) => {
                players.forEach((player, index) => {
                    if (playerPosition == "all-around") {
                        if (team.name === player.team) {
                            let assistsSum = 0;
                            let reboundsSum = 0;
                            let blocksSum = 0;
                            let stealsSum = 0;
                            let turnoversSum = 0;
                            let freeThrowsScoredSum = 0;
                            let freeThrowsAttemptsSum = 0;
                            let fieldGoalsScoredSum = 0;
                            let fieldGoalsAttemptsSum = 0;
                            let threePointsScoredSum = 0;
                            let threePointsAttemptsSum = 0;
                            let gamesPlayed = 0;
                            eligibleDaysSelectedCompetition.forEach((day) => {
                                if (player[day].assists !== "n/a") {
                                    gamesPlayed++
                                    assistsSum = !isNaN(parseInt(player[day].assists, 10)) ? assistsSum + parseInt(player[day].assists, 10) : assistsSum
                                    reboundsSum = !isNaN(parseInt(player[day].rebounds, 10)) ? reboundsSum + parseInt(player[day].rebounds, 10) : reboundsSum
                                    blocksSum = !isNaN(parseInt(player[day].blocks, 10)) ? blocksSum + parseInt(player[day].blocks, 10) : blocksSum
                                    stealsSum = !isNaN(parseInt(player[day].steals, 10)) ? stealsSum + parseInt(player[day].steals, 10) : stealsSum
                                    turnoversSum = !isNaN(parseInt(player[day].turnovers, 10)) ? turnoversSum + parseInt(player[day].turnovers, 10) : turnoversSum
                                    freeThrowsScoredSum = !isNaN(parseInt(player[day].freeThrowScored, 10)) ? freeThrowsScoredSum + parseInt(player[day].freeThrowScored, 10) : freeThrowsScoredSum
                                    freeThrowsAttemptsSum = !isNaN(parseInt(player[day].freeThrowAttempts, 10)) ? freeThrowsAttemptsSum + parseInt(player[day].freeThrowAttempts, 10) : freeThrowsAttemptsSum
                                    fieldGoalsScoredSum = !isNaN(parseInt(player[day].fieldGoalsScored, 10)) ? fieldGoalsScoredSum + parseInt(player[day].fieldGoalsScored, 10) : fieldGoalsScoredSum
                                    fieldGoalsAttemptsSum = !isNaN(parseInt(player[day].fieldGoalsAttempts, 10)) ? fieldGoalsAttemptsSum + parseInt(player[day].fieldGoalsAttempts, 10) : fieldGoalsAttemptsSum
                                    threePointsScoredSum = !isNaN(parseInt(player[day].threePointsScored, 10)) ? threePointsScoredSum + parseInt(player[day].threePointsScored, 10) : threePointsScoredSum
                                    threePointsAttemptsSum = !isNaN(parseInt(player[day].threePointsAttempts, 10)) ? threePointsAttemptsSum + parseInt(player[day].threePointsAttempts, 10) : threePointsAttemptsSum
                                }
                            })

                            const outputPlayer =
                                <tr key={player.name + index} className="single-player-item" data-player-name={player.name} data-player-team={player.team} onClick={this.context.showSinglePlayerModal}>
                                    <td data-player-name={player.name} data-player-team={player.team}>{` ${isNaN((calculateBasketballPlayerTDFantasyGrandTotalPoints(player, eligibleDaysSelectedCompetition) / gamesPlayed)) ? "0" : (calculateBasketballPlayerTDFantasyGrandTotalPoints(player,eligibleDaysSelectedCompetition) / gamesPlayed).toFixed(2)}`}</td>
                                    <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.name}`}</td>
                                    <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.team}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(assistsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (assistsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(reboundsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (reboundsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(blocksSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (blocksSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(stealsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (stealsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(turnoversSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (turnoversSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(freeThrowsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (freeThrowsScoredSum / gamesPlayed).toFixed(2)}/${(freeThrowsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (freeThrowsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(fieldGoalsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (fieldGoalsScoredSum / gamesPlayed).toFixed(2)}/${(fieldGoalsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (fieldGoalsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(threePointsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (threePointsScoredSum / gamesPlayed).toFixed(2)}/${(threePointsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (threePointsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${player.position}`}</td>
                                </tr>

                            const indx = selectedPlayersIds.indexOf(player._id.$oid)
                            if (indx === -1) {
                                outputPlayers.push(outputPlayer)
                            }
                        }
                    } else {
                        if (team.name === player.team && player.position == playerPosition) {
                            let assistsSum = 0;
                            let reboundsSum = 0;
                            let blocksSum = 0;
                            let stealsSum = 0;
                            let turnoversSum = 0;
                            let freeThrowsScoredSum = 0;
                            let freeThrowsAttemptsSum = 0;
                            let fieldGoalsScoredSum = 0;
                            let fieldGoalsAttemptsSum = 0;
                            let threePointsScoredSum = 0;
                            let threePointsAttemptsSum = 0;
                            let gamesPlayed = 0;
                            eligibleDaysSelectedCompetition.forEach((day) => {
                                if (player[day].assists !== "n/a") {
                                    gamesPlayed++
                                    assistsSum = !isNaN(parseInt(player[day].assists, 10)) ? assistsSum + parseInt(player[day].assists, 10) : assistsSum
                                    reboundsSum = !isNaN(parseInt(player[day].rebounds, 10)) ? reboundsSum + parseInt(player[day].rebounds, 10) : reboundsSum
                                    blocksSum = !isNaN(parseInt(player[day].blocks, 10)) ? blocksSum + parseInt(player[day].blocks, 10) : blocksSum
                                    stealsSum = !isNaN(parseInt(player[day].steals, 10)) ? stealsSum + parseInt(player[day].steals, 10) : stealsSum
                                    turnoversSum = !isNaN(parseInt(player[day].turnovers, 10)) ? turnoversSum + parseInt(player[day].turnovers, 10) : turnoversSum
                                    freeThrowsScoredSum = !isNaN(parseInt(player[day].freeThrowScored, 10)) ? freeThrowsScoredSum + parseInt(player[day].freeThrowScored, 10) : freeThrowsScoredSum
                                    freeThrowsAttemptsSum = !isNaN(parseInt(player[day].freeThrowAttempts, 10)) ? freeThrowsAttemptsSum + parseInt(player[day].freeThrowAttempts, 10) : freeThrowsAttemptsSum
                                    fieldGoalsScoredSum = !isNaN(parseInt(player[day].fieldGoalsScored, 10)) ? fieldGoalsScoredSum + parseInt(player[day].fieldGoalsScored, 10) : fieldGoalsScoredSum
                                    fieldGoalsAttemptsSum = !isNaN(parseInt(player[day].fieldGoalsAttempts, 10)) ? fieldGoalsAttemptsSum + parseInt(player[day].fieldGoalsAttempts, 10) : fieldGoalsAttemptsSum
                                    threePointsScoredSum = !isNaN(parseInt(player[day].threePointsScored, 10)) ? threePointsScoredSum + parseInt(player[day].threePointsScored, 10) : threePointsScoredSum
                                    threePointsAttemptsSum = !isNaN(parseInt(player[day].threePointsAttempts, 10)) ? threePointsAttemptsSum + parseInt(player[day].threePointsAttempts, 10) : threePointsAttemptsSum
                                }
                            })

                            const outputPlayer =
                                <tr key={player.name + index} className="single-player-item" data-player-name={player.name} data-player-team={player.team} onClick={this.context.showSinglePlayerModal}>
                                    <td data-player-name={player.name} data-player-team={player.team}>{` ${isNaN((calculateBasketballPlayerTDFantasyGrandTotalPoints(player, eligibleDaysSelectedCompetition) / gamesPlayed)) ? "0" : (calculateBasketballPlayerTDFantasyGrandTotalPoints(player, eligibleDaysSelectedCompetition) / gamesPlayed).toFixed(2)}`}</td>
                                    <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.name}`}</td>
                                    <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.team}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(assistsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (assistsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(reboundsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (reboundsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(blocksSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (blocksSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(stealsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (stealsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(turnoversSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (turnoversSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(freeThrowsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (freeThrowsScoredSum / gamesPlayed).toFixed(2)}/${(freeThrowsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (freeThrowsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(fieldGoalsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (fieldGoalsScoredSum / gamesPlayed).toFixed(2)}/${(fieldGoalsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (fieldGoalsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${(threePointsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (threePointsScoredSum / gamesPlayed).toFixed(2)}/${(threePointsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (threePointsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                    <td data-player-name={player.name} data-player-team={player.team}>{`${player.position}`}</td>
                                </tr>

                            const indx = selectedPlayersIds.indexOf(player._id.$oid)
                            if (indx === -1) {
                                outputPlayers.push(outputPlayer)
                            }
                        }
                    }
                })
            })
            const sortedOutputPlayers = sortPlayersOnSelectScreen(outputPlayers, this.state.sortFilterValue, this.context.selectPlayerSearchValue)
            return sortedOutputPlayers
        } else {

            players.forEach((player, index) => {
                if (playerPosition == "all-around") {
                    if (selectedTeam === player.team) {
                        let assistsSum = 0;
                        let reboundsSum = 0;
                        let blocksSum = 0;
                        let stealsSum = 0;
                        let turnoversSum = 0;
                        let freeThrowsScoredSum = 0;
                        let freeThrowsAttemptsSum = 0;
                        let fieldGoalsScoredSum = 0;
                        let fieldGoalsAttemptsSum = 0;
                        let threePointsScoredSum = 0;
                        let threePointsAttemptsSum = 0;
                        let gamesPlayed = 0;
                        eligibleDaysSelectedCompetition.forEach((day) => {
                            if (player[day].assists !== "n/a") {
                                gamesPlayed++
                                assistsSum = !isNaN(parseInt(player[day].assists, 10)) ? assistsSum + parseInt(player[day].assists, 10) : assistsSum
                                reboundsSum = !isNaN(parseInt(player[day].rebounds, 10)) ? reboundsSum + parseInt(player[day].rebounds, 10) : reboundsSum
                                blocksSum = !isNaN(parseInt(player[day].blocks, 10)) ? blocksSum + parseInt(player[day].blocks, 10) : blocksSum
                                stealsSum = !isNaN(parseInt(player[day].steals, 10)) ? stealsSum + parseInt(player[day].steals, 10) : stealsSum
                                turnoversSum = !isNaN(parseInt(player[day].turnovers, 10)) ? turnoversSum + parseInt(player[day].turnovers, 10) : turnoversSum
                                freeThrowsScoredSum = !isNaN(parseInt(player[day].freeThrowScored, 10)) ? freeThrowsScoredSum + parseInt(player[day].freeThrowScored, 10) : freeThrowsScoredSum
                                freeThrowsAttemptsSum = !isNaN(parseInt(player[day].freeThrowAttempts, 10)) ? freeThrowsAttemptsSum + parseInt(player[day].freeThrowAttempts, 10) : freeThrowsAttemptsSum
                                fieldGoalsScoredSum = !isNaN(parseInt(player[day].fieldGoalsScored, 10)) ? fieldGoalsScoredSum + parseInt(player[day].fieldGoalsScored, 10) : fieldGoalsScoredSum
                                fieldGoalsAttemptsSum = !isNaN(parseInt(player[day].fieldGoalsAttempts, 10)) ? fieldGoalsAttemptsSum + parseInt(player[day].fieldGoalsAttempts, 10) : fieldGoalsAttemptsSum
                                threePointsScoredSum = !isNaN(parseInt(player[day].threePointsScored, 10)) ? threePointsScoredSum + parseInt(player[day].threePointsScored, 10) : threePointsScoredSum
                                threePointsAttemptsSum = !isNaN(parseInt(player[day].threePointsAttempts, 10)) ? threePointsAttemptsSum + parseInt(player[day].threePointsAttempts, 10) : threePointsAttemptsSum
                            }
                        })

                        const outputPlayer =
                            <tr key={player.name + index} className="single-player-item" data-player-name={player.name} data-player-team={player.team} onClick={this.context.showSinglePlayerModal}>
                                <td data-player-name={player.name} data-player-team={player.team}>{` ${isNaN((calculateBasketballPlayerTDFantasyGrandTotalPoints(player, eligibleDaysSelectedCompetition) / gamesPlayed)) ? "0" : (calculateBasketballPlayerTDFantasyGrandTotalPoints(player, eligibleDaysSelectedCompetition) / gamesPlayed).toFixed(2)}`}</td>
                                <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.name}`}</td>
                                <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.team}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(assistsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (assistsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(reboundsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (reboundsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(blocksSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (blocksSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(stealsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (stealsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(turnoversSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (turnoversSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(freeThrowsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (freeThrowsScoredSum / gamesPlayed).toFixed(2)}/${(freeThrowsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (freeThrowsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(fieldGoalsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (fieldGoalsScoredSum / gamesPlayed).toFixed(2)}/${(fieldGoalsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (fieldGoalsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(threePointsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (threePointsScoredSum / gamesPlayed).toFixed(2)}/${(threePointsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (threePointsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${player.position}`}</td>
                            </tr>

                        const indx = selectedPlayersIds.indexOf(player._id.$oid)
                        if (indx === -1) {
                            outputPlayers.push(outputPlayer)
                        }
                    }
                } else {
                    if (selectedTeam === player.team && player.position == playerPosition) {
                        let assistsSum = 0;
                        let reboundsSum = 0;
                        let blocksSum = 0;
                        let stealsSum = 0;
                        let turnoversSum = 0;
                        let freeThrowsScoredSum = 0;
                        let freeThrowsAttemptsSum = 0;
                        let fieldGoalsScoredSum = 0;
                        let fieldGoalsAttemptsSum = 0;
                        let threePointsScoredSum = 0;
                        let threePointsAttemptsSum = 0;
                        let gamesPlayed = 0;
                        eligibleDaysSelectedCompetition.forEach((day) => {
                            if (player[day].assists !== "n/a") {
                                gamesPlayed++
                                assistsSum = !isNaN(parseInt(player[day].assists, 10)) ? assistsSum + parseInt(player[day].assists, 10) : assistsSum
                                reboundsSum = !isNaN(parseInt(player[day].rebounds, 10)) ? reboundsSum + parseInt(player[day].rebounds, 10) : reboundsSum
                                blocksSum = !isNaN(parseInt(player[day].blocks, 10)) ? blocksSum + parseInt(player[day].blocks, 10) : blocksSum
                                stealsSum = !isNaN(parseInt(player[day].steals, 10)) ? stealsSum + parseInt(player[day].steals, 10) : stealsSum
                                turnoversSum = !isNaN(parseInt(player[day].turnovers, 10)) ? turnoversSum + parseInt(player[day].turnovers, 10) : turnoversSum
                                freeThrowsScoredSum = !isNaN(parseInt(player[day].freeThrowScored, 10)) ? freeThrowsScoredSum + parseInt(player[day].freeThrowScored, 10) : freeThrowsScoredSum
                                freeThrowsAttemptsSum = !isNaN(parseInt(player[day].freeThrowAttempts, 10)) ? freeThrowsAttemptsSum + parseInt(player[day].freeThrowAttempts, 10) : freeThrowsAttemptsSum
                                fieldGoalsScoredSum = !isNaN(parseInt(player[day].fieldGoalsScored, 10)) ? fieldGoalsScoredSum + parseInt(player[day].fieldGoalsScored, 10) : fieldGoalsScoredSum
                                fieldGoalsAttemptsSum = !isNaN(parseInt(player[day].fieldGoalsAttempts, 10)) ? fieldGoalsAttemptsSum + parseInt(player[day].fieldGoalsAttempts, 10) : fieldGoalsAttemptsSum
                                threePointsScoredSum = !isNaN(parseInt(player[day].threePointsScored, 10)) ? threePointsScoredSum + parseInt(player[day].threePointsScored, 10) : threePointsScoredSum
                                threePointsAttemptsSum = !isNaN(parseInt(player[day].threePointsAttempts, 10)) ? threePointsAttemptsSum + parseInt(player[day].threePointsAttempts, 10) : threePointsAttemptsSum
                            }
                        })

                        const outputPlayer =
                            <tr key={player.name + index} className="single-player-item" data-player-name={player.name} data-player-team={player.team} onClick={this.context.showSinglePlayerModal}>
                                <td data-player-name={player.name} data-player-team={player.team}>{` ${isNaN((calculateBasketballPlayerTDFantasyGrandTotalPoints(player, eligibleDaysSelectedCompetition) / gamesPlayed)) ? "0" : (calculateBasketballPlayerTDFantasyGrandTotalPoints(player, eligibleDaysSelectedCompetition) / gamesPlayed).toFixed(2)}`}</td>
                                <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.name}`}</td>
                                <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.team}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(assistsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (assistsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(reboundsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (reboundsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(blocksSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (blocksSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(stealsSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (stealsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(turnoversSum / gamesPlayed).toFixed(2) === "NaN" ? "n/a" : (turnoversSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(freeThrowsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (freeThrowsScoredSum / gamesPlayed).toFixed(2)}/${(freeThrowsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (freeThrowsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(fieldGoalsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (fieldGoalsScoredSum / gamesPlayed).toFixed(2)}/${(fieldGoalsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (fieldGoalsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${(threePointsScoredSum / gamesPlayed).toFixed(2) === "NaN" ? "n" : (threePointsScoredSum / gamesPlayed).toFixed(2)}/${(threePointsAttemptsSum / gamesPlayed).toFixed(2) === "NaN" ? "a" : (threePointsAttemptsSum / gamesPlayed).toFixed(2)}`}</td>
                                <td data-player-name={player.name} data-player-team={player.team}>{`${player.position}`}</td>
                            </tr>

                        const indx = selectedPlayersIds.indexOf(player._id.$oid)
                        if (indx === -1) {
                            outputPlayers.push(outputPlayer)
                        }
                    }
                }
            })

            const sortedOutputPlayers = sortPlayersOnSelectScreen(outputPlayers, this.state.sortFilterValue, this.context.selectPlayerSearchValue)
            return sortedOutputPlayers
        }
    }


    depositSortFilterValue = (event) => {
        const sortFilterValue = event.target.getAttribute("data-sort-filter-value")
        this.setState({
            sortFilterValue
        })
    }
    render() {
        return (
            <>
                <div className="d-flex justify-content-between align-items-center w-100 select-player-label-wrapper">
                {this.context.teamSelected === "all-eligible-teams" && this.context.selectedLeague == "euroLeague" &&
                        <a href={`https://www.euroleague.net?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy`} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-outline-light">Saznaj više o Euro Ligi</button></a>
                    }
                    {this.context.teamSelected === "all-eligible-teams" && this.context.selectedLeague == "euroCup" &&
                        <a href={`https://www.eurocupbasketball.com/eurocup?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy`} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-outline-light">Saznaj više o Euro Kupu</button></a>
                    }

                    {this.context.teamSelected !== "all-eligible-teams" &&
                        <a href={calculateTeamHref(this.context.teamSelected, this.context.selectedLeague)} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-outline-light">Saznaj više o {this.context.teamSelected}</button></a>
                    }
                    <div className="label-and-clock-wrapper d-flex justify-content-between align-items-center">
                        <div className="table-label">
                            <i>Prosečni statistički podaci u stvarnosti<br className="d-block d-md-none" /> (po utakmici) </i>
                        </div>
                        <div className="clockify-wrapper d-flex justify-content-between">
                            <span>
                                {serbischeDatum(this.context.nowDateAndTime.humanDate)}
                            </span>
                            <span>
                                {this.context.nowDateAndTime.humanTime}
                            </span>
                            <span>
                                Grinič vreme
                                </span>
                        </div>
                    </div>
                </div>
                <section className="select-player-container d-flex flex-column">
                    <div className="players-table-container">
                        <table>
                            <thead>
                                <tr className="">
                                    <th data-sort-filter-value="ptPerGame" onClick={this.depositSortFilterValue}><button data-sort-filter-value="ptPerGame" type="button" className={`btn ${this.state.sortFilterValue === "ptPerGame" ? "btn-success" : "btn-outline-dark"}`}>Fantazi poeni</button></th>
                                    <th className="not-centered" data-sort-filter-value="playerName" onClick={this.depositSortFilterValue}><button data-sort-filter-value="playerName" type="button" className={`btn ${this.state.sortFilterValue === "playerName" ? "btn-success" : "btn-outline-dark"}`}>Ime</button></th>
                                    <th className="not-centered" data-sort-filter-value="playerTeam" onClick={this.depositSortFilterValue}><button data-sort-filter-value="playerTeam" type="button" className={`btn ${this.state.sortFilterValue === "playerTeam" ? "btn-success" : "btn-outline-dark"}`}>Reprezentacija</button></th>
                                    <th data-sort-filter-value="assists" onClick={this.depositSortFilterValue}><button data-sort-filter-value="assists" type="button" className={`btn ${this.state.sortFilterValue === "assists" ? "btn-success" : "btn-outline-dark"}`}>Asistencije</button></th>
                                    <th data-sort-filter-value="rebounds" onClick={this.depositSortFilterValue}><button data-sort-filter-value="rebounds" type="button" className={`btn ${this.state.sortFilterValue === "rebounds" ? "btn-success" : "btn-outline-dark"}`}>Skokovi</button></th>
                                    <th data-sort-filter-value="blocks" onClick={this.depositSortFilterValue}><button data-sort-filter-value="blocks" type="button" className={`btn ${this.state.sortFilterValue === "blocks" ? "btn-success" : "btn-outline-dark"}`}>Blokade</button></th>
                                    <th data-sort-filter-value="steals" onClick={this.depositSortFilterValue}><button data-sort-filter-value="steals" type="button" className={`btn ${this.state.sortFilterValue === "steals" ? "btn-success" : "btn-outline-dark"}`}>Ukradene</button></th>
                                    <th data-sort-filter-value="turnovers" onClick={this.depositSortFilterValue}><button data-sort-filter-value="turnovers" type="button" className={`btn ${this.state.sortFilterValue === "turnovers" ? "btn-success" : "btn-outline-dark"}`}>Izgubljene</button></th>
                                    <th data-sort-filter-value="freeThrows" onClick={this.depositSortFilterValue}><button data-sort-filter-value="freeThrows" type="button" className={`btn ${this.state.sortFilterValue === "freeThrows" ? "btn-success" : "btn-outline-dark"}`}>Slobodna bacanja</button></th>
                                    <th data-sort-filter-value="twoPoints" onClick={this.depositSortFilterValue}><button data-sort-filter-value="twoPoints" type="button" className={`btn ${this.state.sortFilterValue === "twoPoints" ? "btn-success" : "btn-outline-dark"}`}>Za dva poena</button></th>
                                    <th data-sort-filter-value="threePoints" onClick={this.depositSortFilterValue}><button data-sort-filter-value="threePoints" type="button" className={`btn ${this.state.sortFilterValue === "threePoints" ? "btn-success" : "btn-outline-dark"}`}>Za tri poena</button></th>
                                    <th><button className={`btn btn-outline-dark`}>Pozicija</button></th>
                                </tr>
                            </thead>
                            <tbody className="players-data-container">
                                {this.mapEligiblePlayers()}
                            </tbody>
                        </table>
                        {this.state.isTooLateMessage &&
                            <div className="too-late-message d-flex flex-column justify-content-center align-items-center">
                                <span>Svi mečevi za {serbischeDatum(this.context.selectedDay)} su već počeli...</span>
                                <span className="too-late-message-2"><i>izaberi ekipu za narednu rundu... još ništa nije gotovo</i></span>
                            </div>
                        }
                        {this.state.gamesNotFinishedMessage &&
                            <div className="too-late-message d-flex flex-column justify-content-center align-items-center">
                                <span>Nije moguće birati igrače <br/> dok ne budu poznati svi učesnici</span>
                            </div>
                        }
                    </div>
                </section>
                {this.context.selectedPlayerForPlayerCardModal && this.context.showSelectPlayer &&
                    <Portal>
                        <SRBPlayerCardModal />
                    </Portal>
                }
            </>
        )
    }
}

export default SRBSelectPlayer