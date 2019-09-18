import React from 'react';
import { AppContext } from '../../screens/_context/AppContext';
import { Portal } from 'react-portal';
import eligibleDays from "../../services/eligibleDays";
import PlayerCardModal from "../modals/PlayerCardModal"
import sortPlayersOnSelectScreen from "../../services/sortPlayersOnSelectScreen";
import calculateBasketballPlayerTDFantasyGrandTotalPoints from "../../services/calculateBasketballPlayerTDFantasyGrandTotalPoints";

class SelectPlayer extends React.Component {
    static contextType = AppContext;
    state = {
        isTooLateMessage: false,
        sortFilterValue: "ptPerGame"
    }

    checkSelectedTeamString = () => {
        const selectedTeam = this.context.teamSelected.split(" ").join("-")
        if (selectedTeam === "South-Korea") {
            return "Korea"
        } else {
            return selectedTeam
        }
    }
    mapEligiblePlayers = () => {
        const selectedTeam = this.context.teamSelected
        const selectedDay = this.context.selectedDay
        const players = this.context.basketballPlayers
        const eligibleTeams = this.context.dropdowns[0].teamsByDay
        const outputPlayers = []

        //DON'T SHOW ALREADY SELECTED PLAYERS//
        const posiblePositions = ["Player1Id", "Player2Id", "Player3Id", "Player4Id", "Player5Id", "Player6Id", "Player7Id"]
        const selectedPlayersIds = []
        posiblePositions.forEach((playerPosition) => {
            if (this.context.teamPickData[playerPosition] !== null) {
                selectedPlayersIds.push(this.context.teamPickData[playerPosition])
            }
        })
        if (selectedTeam === "all-eligible-teams" && eligibleDays.indexOf(selectedDay) !== -1) {
            if (Array.isArray(eligibleTeams[selectedDay])) {
                eligibleTeams[selectedDay].forEach((team) => {
                    let isEligible = true
                    if (selectedDay === this.context.nowDateAndTime.humanDate) {
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
                    } else {
                        const possibleMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                        if (possibleMonths.indexOf(selectedDay.split("-")[1]) < possibleMonths.indexOf(this.context.nowDateAndTime.humanDate.split("-")[1])) {
                            isEligible = false
                        } else if (possibleMonths.indexOf(selectedDay.split("-")[1]) === possibleMonths.indexOf(this.context.nowDateAndTime.humanDate.split("-")[1])) {
                            if (selectedDay.split("-")[0].length < this.context.nowDateAndTime.humanDate.split("-")[0].length) {
                                isEligible = false
                            } else if (selectedDay.split("-")[0].length === this.context.nowDateAndTime.humanDate.split("-")[0].length && selectedDay.split("-")[0].length === 3) {
                                if (selectedDay.split("-")[0][0] < this.context.nowDateAndTime.humanDate.split("-")[0][0]) {
                                    isEligible = false
                                }
                            } else if (selectedDay.split("-")[0].length === this.context.nowDateAndTime.humanDate.split("-")[0].length && selectedDay.split("-")[0].length === 4) {
                                let selectedDayNumber = parseInt(selectedDay.split("-")[0][0] + selectedDay.split("-")[0][1], 10)
                                let nowDateNumber = parseInt(this.context.nowDateAndTime.humanDate.split("-")[0][0] + this.context.nowDateAndTime.humanDate.split("-")[0][1], 10)
                                if (selectedDayNumber < nowDateNumber) {
                                    isEligible = false
                                }
                            }
                        }
                    }
                    if (isEligible) {
                        players.forEach((player, index) => {
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
                                eligibleDays.forEach((day) => {
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
                                        <td data-player-name={player.name} data-player-team={player.team}>{` ${isNaN((calculateBasketballPlayerTDFantasyGrandTotalPoints(player) / gamesPlayed)) ? "0" : (calculateBasketballPlayerTDFantasyGrandTotalPoints(player) / gamesPlayed).toFixed(2)}`}</td>
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
                                    </tr>


                                const indx = selectedPlayersIds.indexOf(player._id.$oid)
                                if (indx === -1) {
                                    outputPlayers.push(outputPlayer)
                                }
                            }
                        })
                    }
                })
            }
        }
        else if (eligibleDays.indexOf(selectedDay) !== -1) {
            players.forEach((player, index) => {
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
                    eligibleDays.forEach((day) => {
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
                            <td data-player-name={player.name} data-player-team={player.team}>{` ${isNaN((calculateBasketballPlayerTDFantasyGrandTotalPoints(player) / gamesPlayed)) ? "0" : (calculateBasketballPlayerTDFantasyGrandTotalPoints(player) / gamesPlayed).toFixed(2)}`}</td>
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
                        </tr>


                    const indx = selectedPlayersIds.indexOf(player._id.$oid)
                    if (indx === -1) {
                        outputPlayers.push(outputPlayer)
                    }
                }
            })
        }
        if (Array.isArray(eligibleTeams[selectedDay])) {
            if (outputPlayers.length === 0 && !this.state.isTooLateMessage) {
                this.setState({
                    isTooLateMessage: true
                })
            }
        } else if (!this.state.gamesNotFinishedMessage) {
            this.setState({
                gamesNotFinishedMessage: true
            })
        }
        const sortedOutputPlayer = sortPlayersOnSelectScreen(outputPlayers, this.state.sortFilterValue, this.context.selectPlayerSearchValue)
        return sortedOutputPlayer
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
                    {this.context.teamSelected &&
                        this.context.teamSelected === "Serbia" &&
                        <a href={`https://www.sportske.net/vesti/kosarka/reprezentacija-srbije.html?utm_source=sportskeFantasy&utm_medium=game&utm_campaign=worldCup2019`} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-outline-light">{`Pročitaj više o našima`}</button></a>
                    }
                    {this.context.teamSelected &&
                        this.context.teamSelected === "Cote d'Ivoire" &&
                        this.context.teamSelected !== "Serbia" &&
                        <a href={`http://www.fiba.basketball/basketballworldcup/2019/team/Cote-d-Ivoire`} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-outline-light">{`Find out more about ${this.context.teamSelected} national team`}</button></a>
                    }
                    {this.context.teamSelected &&
                        this.context.teamSelected !== "all-eligible-teams" &&
                        this.context.teamSelected !== "Cote d'Ivoire" &&
                        this.context.teamSelected !== "Serbia" &&
                        <a href={`http://www.fiba.basketball/basketballworldcup/2019/team/${this.checkSelectedTeamString()}`} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-outline-light">{`Find out more about ${this.context.teamSelected} national team`}</button></a>
                    }
                    {this.context.teamSelected === "all-eligible-teams" &&
                        <a href={`http://www.fiba.basketball/basketballworldcup/2019`} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-outline-light">Find out more about World Cup</button></a>
                    }
                    <div className="label-and-clock-wrapper d-flex justify-content-between align-items-center">
                        <div className="table-label">
                            <i>Table of average Real Life stats<br className="d-block d-md-none" /> (per game)</i>
                        </div>
                        <div className="clockify-wrapper d-flex justify-content-between">
                            <span>
                                {this.context.nowDateAndTime.humanDate}
                            </span>
                            <span>
                                {this.context.nowDateAndTime.humanTime}
                            </span>
                            <span>
                                Zulu time
                                </span>
                        </div>
                    </div>
                </div>
                <section className="select-player-container d-flex flex-column">
                    <div className="players-table-container">
                        <table>
                            <thead>
                                <tr className="">
                                    <th data-sort-filter-value="ptPerGame" onClick={this.depositSortFilterValue}><button data-sort-filter-value="ptPerGame" type="button" className={`btn ${this.state.sortFilterValue === "ptPerGame" ? "btn-success" : "btn-outline-dark"}`}>Fantasy points</button></th>
                                    <th className="not-centered" data-sort-filter-value="playerName" onClick={this.depositSortFilterValue}><button data-sort-filter-value="playerName" type="button" className={`btn ${this.state.sortFilterValue === "playerName" ? "btn-success" : "btn-outline-dark"}`}>Player name</button></th>
                                    <th className="not-centered" data-sort-filter-value="playerTeam" onClick={this.depositSortFilterValue}><button data-sort-filter-value="playerTeam" type="button" className={`btn ${this.state.sortFilterValue === "playerTeam" ? "btn-success" : "btn-outline-dark"}`}>Team</button></th>
                                    <th data-sort-filter-value="assists" onClick={this.depositSortFilterValue}><button data-sort-filter-value="assists" type="button" className={`btn ${this.state.sortFilterValue === "assists" ? "btn-success" : "btn-outline-dark"}`}>Assists</button></th>
                                    <th data-sort-filter-value="rebounds" onClick={this.depositSortFilterValue}><button data-sort-filter-value="rebounds" type="button" className={`btn ${this.state.sortFilterValue === "rebounds" ? "btn-success" : "btn-outline-dark"}`}>Rebounds</button></th>
                                    <th data-sort-filter-value="blocks" onClick={this.depositSortFilterValue}><button data-sort-filter-value="blocks" type="button" className={`btn ${this.state.sortFilterValue === "blocks" ? "btn-success" : "btn-outline-dark"}`}>Blocks</button></th>
                                    <th data-sort-filter-value="steals" onClick={this.depositSortFilterValue}><button data-sort-filter-value="steals" type="button" className={`btn ${this.state.sortFilterValue === "steals" ? "btn-success" : "btn-outline-dark"}`}>Steals</button></th>
                                    <th data-sort-filter-value="turnovers" onClick={this.depositSortFilterValue}><button data-sort-filter-value="turnovers" type="button" className={`btn ${this.state.sortFilterValue === "turnovers" ? "btn-success" : "btn-outline-dark"}`}>Turnovers</button></th>
                                    <th data-sort-filter-value="freeThrows" onClick={this.depositSortFilterValue}><button data-sort-filter-value="freeThrows" type="button" className={`btn ${this.state.sortFilterValue === "freeThrows" ? "btn-success" : "btn-outline-dark"}`}>Free throws</button></th>
                                    <th data-sort-filter-value="twoPoints" onClick={this.depositSortFilterValue}><button data-sort-filter-value="twoPoints" type="button" className={`btn ${this.state.sortFilterValue === "twoPoints" ? "btn-success" : "btn-outline-dark"}`}>Two points</button></th>
                                    <th data-sort-filter-value="threePoints" onClick={this.depositSortFilterValue}><button data-sort-filter-value="threePoints" type="button" className={`btn ${this.state.sortFilterValue === "threePoints" ? "btn-success" : "btn-outline-dark"}`}>Three points</button></th>
                                </tr>
                            </thead>
                            <tbody className="players-data-container">
                                {this.mapEligiblePlayers()}
                            </tbody>
                        </table>
                        {this.state.isTooLateMessage &&
                            <div className="too-late-message d-flex flex-column justify-content-center align-items-center">
                                <span>All games for {this.context.selectedDay} already started...</span>
                                <span className="too-late-message-2"><i>pick players for next round... nothing is over till 15th September</i></span>
                            </div>
                        }
                        {this.state.gamesNotFinishedMessage &&
                            <div className="too-late-message d-flex flex-column justify-content-center align-items-center">
                                <span>Selection is unavailable till all participants are known</span>
                            </div>
                        }
                    </div>
                </section>
                {this.context.selectedPlayerForPlayerCardModal && this.context.showSelectPlayer &&
                    <Portal>
                        <PlayerCardModal />
                    </Portal>
                }
            </>
        )
    }
}

export default SelectPlayer