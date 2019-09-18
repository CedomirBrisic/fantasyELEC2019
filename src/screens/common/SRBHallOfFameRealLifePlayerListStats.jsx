import React from 'react';
import { AppContext } from '../_context/AppContext';
import { Portal } from 'react-portal';
import eligibleDays from "../../services/eligibleDays";
import calculateBasketballPlayerTDFantasyGrandTotalPoints from "../../services/calculateBasketballPlayerTDFantasyGrandTotalPoints";
import calculateBasketballPlayerTDFantasyPoints from "../../services/calculateBasketballPlayerTDFantasyPoints";
import sortPlayersOnSelectScreen from "../../services/sortPlayersOnSelectScreen";
import serbischeNazivTima from "../../services/serbischeNazivTima";
import SRBPlayerCardModal from "../modals/SRBPlayerCardModal";



class SRBHallOfFamePlayerListStats extends React.Component {
    static contextType = AppContext;
    state = {
        sortFilterValue: "ptPerGame"
    }
    depositSortFilterValue = (event) => {
        const sortFilterValue = event.target.getAttribute("data-sort-filter-value")
        this.setState({
            sortFilterValue
        })
    }
    mapPlayers = () => {
        const basketballPlayers = this.context.basketballPlayers
        const selectedPlayersIds = []
        const outputPlayers = []

        if (this.context.hallOfFameSelectedDay === "all-days" && basketballPlayers !== null) {
            basketballPlayers.forEach((player, index) => {
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
                eligibleDays.forEach((day) => {
                    if (player[day].assists !== "n/a") {
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
                        <td data-player-name={player.name} data-player-team={player.team}>{` ${(calculateBasketballPlayerTDFantasyGrandTotalPoints(player)).toFixed(2)}`}</td>
                        <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.name}`}</td>
                        <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${serbischeNazivTima(player.team)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(assistsSum).toFixed(0) === "NaN" ? "n/a" : (assistsSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(reboundsSum).toFixed(0) === "NaN" ? "n/a" : (reboundsSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(blocksSum).toFixed(0) === "NaN" ? "n/a" : (blocksSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(stealsSum).toFixed(0) === "NaN" ? "n/a" : (stealsSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(turnoversSum).toFixed(0) === "NaN" ? "n/a" : (turnoversSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(freeThrowsScoredSum).toFixed(0) === "NaN" ? "n" : (freeThrowsScoredSum).toFixed(0)}/${(freeThrowsAttemptsSum).toFixed(0) === "NaN" ? "a" : (freeThrowsAttemptsSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(fieldGoalsScoredSum).toFixed(0) === "NaN" ? "n" : (fieldGoalsScoredSum).toFixed(0)}/${(fieldGoalsAttemptsSum).toFixed(0) === "NaN" ? "a" : (fieldGoalsAttemptsSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(threePointsScoredSum).toFixed(0) === "NaN" ? "n" : (threePointsScoredSum).toFixed(0)}/${(threePointsAttemptsSum).toFixed(0) === "NaN" ? "a" : (threePointsAttemptsSum).toFixed(0)}`}</td>
                    </tr>

                const indx = selectedPlayersIds.indexOf(player._id.$oid)
                if (indx === -1) {
                    outputPlayers.push(outputPlayer)
                }
            })
        }
        else if (basketballPlayers !== null) {
            basketballPlayers.forEach((player, index) => {
                let assists = 0;
                let rebounds = 0;
                let blocks = 0;
                let steals = 0;
                let turnovers = 0;
                let freeThrowsScored = 0;
                let freeThrowsAttempts = 0;
                let fieldGoalsScored = 0;
                let fieldGoalsAttempts = 0;
                let threePointsScored = 0;
                let threePointsAttempts = 0;
                let playerSummaSummarum = 0;
                if (player[this.context.hallOfFameSelectedDay].assists !== "n/a") {
                    assists = !isNaN(parseInt(player[this.context.hallOfFameSelectedDay].assists, 10)) ? assists + parseInt(player[this.context.hallOfFameSelectedDay].assists, 10) : assists
                    rebounds = !isNaN(parseInt(player[this.context.hallOfFameSelectedDay].rebounds, 10)) ? rebounds + parseInt(player[this.context.hallOfFameSelectedDay].rebounds, 10) : rebounds
                    blocks = !isNaN(parseInt(player[this.context.hallOfFameSelectedDay].blocks, 10)) ? blocks + parseInt(player[this.context.hallOfFameSelectedDay].blocks, 10) : blocks
                    steals = !isNaN(parseInt(player[this.context.hallOfFameSelectedDay].steals, 10)) ? steals + parseInt(player[this.context.hallOfFameSelectedDay].steals, 10) : steals
                    turnovers = !isNaN(parseInt(player[this.context.hallOfFameSelectedDay].turnovers, 10)) ? turnovers + parseInt(player[this.context.hallOfFameSelectedDay].turnovers, 10) : turnovers
                    freeThrowsScored = !isNaN(parseInt(player[this.context.hallOfFameSelectedDay].freeThrowScored, 10)) ? freeThrowsScored + parseInt(player[this.context.hallOfFameSelectedDay].freeThrowScored, 10) : freeThrowsScored
                    freeThrowsAttempts = !isNaN(parseInt(player[this.context.hallOfFameSelectedDay].freeThrowAttempts, 10)) ? freeThrowsAttempts + parseInt(player[this.context.hallOfFameSelectedDay].freeThrowAttempts, 10) : freeThrowsAttempts
                    fieldGoalsScored = !isNaN(parseInt(player[this.context.hallOfFameSelectedDay].fieldGoalsScored, 10)) ? fieldGoalsScored + parseInt(player[this.context.hallOfFameSelectedDay].fieldGoalsScored, 10) : fieldGoalsScored
                    fieldGoalsAttempts = !isNaN(parseInt(player[this.context.hallOfFameSelectedDay].fieldGoalsAttempts, 10)) ? fieldGoalsAttempts + parseInt(player[this.context.hallOfFameSelectedDay].fieldGoalsAttempts, 10) : fieldGoalsAttempts
                    threePointsScored = !isNaN(parseInt(player[this.context.hallOfFameSelectedDay].threePointsScored, 10)) ? threePointsScored + parseInt(player[this.context.hallOfFameSelectedDay].threePointsScored, 10) : threePointsScored
                    threePointsAttempts = !isNaN(parseInt(player[this.context.hallOfFameSelectedDay].threePointsAttempts, 10)) ? threePointsAttempts + parseInt(player[this.context.hallOfFameSelectedDay].threePointsAttempts, 10) : threePointsAttempts
                    playerSummaSummarum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).summaSummarum)) ? parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).summaSummarum) : playerSummaSummarum
                }
                const outputPlayer =
                    <tr key={player.name + index} className="single-player-item" data-player-name={player.name} data-player-team={player.team} onClick={this.context.showSinglePlayerModal}>
                        <td data-player-name={player.name} data-player-team={player.team}>{` ${playerSummaSummarum.toFixed(2)}`}</td>

                        <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.name}`}</td>
                        <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${serbischeNazivTima(player.team)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(assists).toFixed(0) === "NaN" ? "n/a" : (assists).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(rebounds).toFixed(0) === "NaN" ? "n/a" : (rebounds).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(blocks).toFixed(0) === "NaN" ? "n/a" : (blocks).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(steals).toFixed(0) === "NaN" ? "n/a" : (steals).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(turnovers).toFixed(0) === "NaN" ? "n/a" : (turnovers).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(freeThrowsScored).toFixed(0) === "NaN" ? "n" : (freeThrowsScored).toFixed(0)}/${(freeThrowsAttempts).toFixed(0) === "NaN" ? "a" : (freeThrowsAttempts).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(fieldGoalsScored).toFixed(0) === "NaN" ? "n" : (fieldGoalsScored).toFixed(0)}/${(fieldGoalsAttempts).toFixed(0) === "NaN" ? "a" : (fieldGoalsAttempts).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(threePointsScored).toFixed(0) === "NaN" ? "n" : (threePointsScored).toFixed(0)}/${(threePointsAttempts).toFixed(0) === "NaN" ? "a" : (threePointsAttempts).toFixed(0)}`}</td>
                    </tr>

                const indx = selectedPlayersIds.indexOf(player._id.$oid)
                if (indx === -1) {
                    outputPlayers.push(outputPlayer)
                }
            })
        }

        const sortedOutputPlayer = sortPlayersOnSelectScreen(outputPlayers, this.state.sortFilterValue, this.props.searchValue)
        return sortedOutputPlayer
    }

    componentDidMount() {
        this.props.clearSearchValue()
    }


    render() {

        return (
            <>
                <div className="hall-of-fame-player-list-stats-container">
                    <div className="hall-of-fame-player-list-stats-wrapper">
                        <div className="players-table-container">
                            <table className="w-100">
                                <thead className="w-100">
                                    <tr className="w-100">
                                        <th data-sort-filter-value="ptPerGame" onClick={this.depositSortFilterValue}><button data-sort-filter-value="ptPerGame" type="button" className={`btn ${this.state.sortFilterValue === "ptPerGame" ? "btn-success" : "btn-outline-dark"}`}>Fantazi poeni</button></th>
                                        <th className="not-centered">Ime</th>
                                        <th className="not-centered">Reprezentacija</th>
                                        <th data-sort-filter-value="assists" onClick={this.depositSortFilterValue}><button data-sort-filter-value="assists" type="button" className={`btn ${this.state.sortFilterValue === "assists" ? "btn-success" : "btn-outline-dark"}`}>Asistencije</button></th>
                                        <th data-sort-filter-value="rebounds" onClick={this.depositSortFilterValue}><button data-sort-filter-value="rebounds" type="button" className={`btn ${this.state.sortFilterValue === "rebounds" ? "btn-success" : "btn-outline-dark"}`}>Skokovi</button></th>
                                        <th data-sort-filter-value="blocks" onClick={this.depositSortFilterValue}><button data-sort-filter-value="blocks" type="button" className={`btn ${this.state.sortFilterValue === "blocks" ? "btn-success" : "btn-outline-dark"}`}>Blokade</button></th>
                                        <th data-sort-filter-value="steals" onClick={this.depositSortFilterValue}><button data-sort-filter-value="steals" type="button" className={`btn ${this.state.sortFilterValue === "steals" ? "btn-success" : "btn-outline-dark"}`}>Ukradene</button></th>
                                        <th data-sort-filter-value="turnovers" onClick={this.depositSortFilterValue}><button data-sort-filter-value="turnovers" type="button" className={`btn ${this.state.sortFilterValue === "turnovers" ? "btn-success" : "btn-outline-dark"}`}>Izgubljene</button></th>
                                        <th data-sort-filter-value="freeThrows" onClick={this.depositSortFilterValue}><button data-sort-filter-value="freeThrows" type="button" className={`btn ${this.state.sortFilterValue === "freeThrows" ? "btn-success" : "btn-outline-dark"}`}>Slobodna bacanja</button></th>
                                        <th data-sort-filter-value="twoPoints" onClick={this.depositSortFilterValue}><button data-sort-filter-value="twoPoints" type="button" className={`btn ${this.state.sortFilterValue === "twoPoints" ? "btn-success" : "btn-outline-dark"}`}>Za dva poena</button></th>
                                        <th data-sort-filter-value="threePoints" onClick={this.depositSortFilterValue}><button data-sort-filter-value="threePoints" type="button" className={`btn ${this.state.sortFilterValue === "threePoints" ? "btn-success" : "btn-outline-dark"}`}>Za tri poena</button></th>
                                    </tr>
                                </thead>
                                <tbody className="players-data-container">
                                    {this.mapPlayers()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {this.context.selectedPlayerForPlayerCardModal &&
                    <Portal>
                        <SRBPlayerCardModal />
                    </Portal>
                }
            </>
        )
    }
}

export default SRBHallOfFamePlayerListStats