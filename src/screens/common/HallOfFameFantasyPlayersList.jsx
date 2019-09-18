import React from 'react';
import { AppContext } from '../_context/AppContext';
import { Portal } from 'react-portal';
import eligibleDays from "../../services/eligibleDays";
import calculateBasketballPlayerTDFantasyGrandTotalPoints from "../../services/calculateBasketballPlayerTDFantasyGrandTotalPoints";
import calculateBasketballPlayerTDFantasyPoints from "../../services/calculateBasketballPlayerTDFantasyPoints";
import sortPlayersOnSelectScreen from "../../services/sortPlayersOnSelectScreen";
import PlayerCardModal from "../modals/PlayerCardModal";



class HallOfFameFantasyPlayersList extends React.Component {
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

                let gameWinSum = 0;
                let assistsSum = 0;
                let reboundsSum = 0;
                let blocksSum = 0;
                let stealsSum = 0;
                let turnoversSum = 0;
                let freeThrowsSum = 0;
                let twoPointsSum = 0;
                let threePointsSum = 0;
                let bonusesSum = 0;
                let penaltiesSum = 0;

                eligibleDays.forEach((day) => {
                    if (player[day].assists !== "n/a") {
                        gameWinSum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).gameWin)) ? gameWinSum + parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).gameWin) : gameWinSum
                        assistsSum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).assists)) ? assistsSum + parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).assists) : assistsSum
                        reboundsSum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).rebounds)) ? reboundsSum + parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).rebounds) : reboundsSum
                        blocksSum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).blocks)) ? blocksSum + parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).blocks) : blocksSum
                        stealsSum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).steals)) ? stealsSum + parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).steals) : stealsSum
                        turnoversSum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).turnovers)) ? turnoversSum + parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).turnovers) : turnoversSum
                        freeThrowsSum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).freeThrowsPoints)) ? freeThrowsSum + parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).freeThrowsPoints) : freeThrowsSum
                        twoPointsSum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).twoPoints)) ? twoPointsSum + parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).twoPoints) : twoPointsSum
                        threePointsSum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).threePoints)) ? threePointsSum + parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).threePoints) : threePointsSum
                        bonusesSum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).bonusesSummaSummarum)) ? bonusesSum + parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).bonusesSummaSummarum) : bonusesSum
                        penaltiesSum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).penaltiesSummaSummarum)) ? penaltiesSum + parseFloat(calculateBasketballPlayerTDFantasyPoints(player, day).penaltiesSummaSummarum) : penaltiesSum
                    }
                })

                const outputPlayer =
                    <tr key={player.name + index} className="single-player-item" data-player-name={player.name} data-player-team={player.team} onClick={this.context.showSinglePlayerModal}>
                        <td data-player-name={player.name} data-player-team={player.team}>{` ${(calculateBasketballPlayerTDFantasyGrandTotalPoints(player)).toFixed(2)}`}</td>
                        <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.name}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(gameWinSum).toFixed(0) === "NaN" ? "n/a" : (gameWinSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(assistsSum).toFixed(0) === "NaN" ? "n/a" : (assistsSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(reboundsSum).toFixed(0) === "NaN" ? "n/a" : (reboundsSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(blocksSum).toFixed(0) === "NaN" ? "n/a" : (blocksSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(stealsSum).toFixed(0) === "NaN" ? "n/a" : (stealsSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(turnoversSum).toFixed(0) === "NaN" ? "n/a" : (turnoversSum).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(freeThrowsSum).toFixed(2) === "NaN" ? "n/a" : (freeThrowsSum).toFixed(2)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(twoPointsSum).toFixed(2) === "NaN" ? "n/a" : (twoPointsSum).toFixed(2)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(threePointsSum).toFixed(2) === "NaN" ? "n/a" : (threePointsSum).toFixed(2)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(bonusesSum).toFixed(2) === "NaN" ? "n/a" : (bonusesSum).toFixed(2)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(penaltiesSum).toFixed(2) === "NaN" ? "n/a" : (penaltiesSum).toFixed(2)}`}</td>
                    </tr>

                const indx = selectedPlayersIds.indexOf(player._id.$oid)
                if (indx === -1) {
                    outputPlayers.push(outputPlayer)
                }
            })
        }
        else if (basketballPlayers !== null) {
            basketballPlayers.forEach((player, index) => {

                let gameWin = 0;
                let assists = 0;
                let rebounds = 0;
                let blocks = 0;
                let steals = 0;
                let turnovers = 0;
                let freeThrows = 0;
                let twoPoints = 0;
                let threePoints = 0;
                let bonuses = 0;
                let penalties = 0;
                let playerSummaSummarum = 0;


                if (player[this.context.hallOfFameSelectedDay].assists !== "n/a") {
                    gameWin = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).gameWin)) ? parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).gameWin) : gameWin
                    assists = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).assists)) ? assists = parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).assists) : assists
                    rebounds = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).rebounds)) ? rebounds = parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).rebounds) : rebounds
                    blocks = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).blocks)) ? blocks = parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).blocks) : blocks
                    steals = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).steals)) ? steals = parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).steals) : steals
                    turnovers = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).turnovers)) ? turnovers = parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).turnovers) : turnovers
                    freeThrows = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).freeThrowsPoints)) ? freeThrows = parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).freeThrowsPoints) : freeThrows
                    twoPoints = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).twoPoints)) ? twoPoints = parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).twoPoints) : twoPoints
                    threePoints = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).threePoints)) ? threePoints = parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).threePoints) : threePoints
                    bonuses = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).bonusesSummaSummarum)) ? bonuses = parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).bonusesSummaSummarum) : bonuses
                    penalties = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).penaltiesSummaSummarum)) ? penalties = parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).penaltiesSummaSummarum) : penalties
                    playerSummaSummarum = !isNaN(parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).summaSummarum)) ? parseFloat(calculateBasketballPlayerTDFantasyPoints(player, this.context.hallOfFameSelectedDay).summaSummarum) : playerSummaSummarum
                }
                const outputPlayer =
                    <tr key={player.name + index} className="single-player-item" data-player-name={player.name} data-player-team={player.team} onClick={this.context.showSinglePlayerModal}>
                        <td data-player-name={player.name} data-player-team={player.team}>{` ${playerSummaSummarum.toFixed(2)}`}</td>
                        <td className="not-centered" data-player-name={player.name} data-player-team={player.team}>{`${player.name}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(gameWin).toFixed(0) === "NaN" ? "n/a" : (gameWin).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(assists).toFixed(0) === "NaN" ? "n/a" : (assists).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(rebounds).toFixed(0) === "NaN" ? "n/a" : (rebounds).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(blocks).toFixed(0) === "NaN" ? "n/a" : (blocks).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(steals).toFixed(0) === "NaN" ? "n/a" : (steals).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(turnovers).toFixed(0) === "NaN" ? "n/a" : (turnovers).toFixed(0)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(freeThrows).toFixed(2) === "NaN" ? "n/a" : (freeThrows).toFixed(2)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(twoPoints).toFixed(2) === "NaN" ? "n/a" : (twoPoints).toFixed(2)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(threePoints).toFixed(2) === "NaN" ? "n/a" : (threePoints).toFixed(2)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(bonuses).toFixed(2) === "NaN" ? "n/a" : (bonuses).toFixed(2)}`}</td>
                        <td data-player-name={player.name} data-player-team={player.team}>{`${(penalties).toFixed(2) === "NaN" ? "n/a" : (penalties).toFixed(2)}`}</td>
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
                                        <th data-sort-filter-value="ptPerGame" onClick={this.depositSortFilterValue}><button data-sort-filter-value="ptPerGame" type="button" className={`btn ${this.state.sortFilterValue === "ptPerGame" ? "btn-success" : "btn-outline-dark"}`}>Fantasy points</button></th>
                                        <th className="not-centered">Player name</th>
                                        {/* <th className="not-centered">Team</th> */}
                                        <th data-sort-filter-value="gamesWon" onClick={this.depositSortFilterValue}><button data-sort-filter-value="gamesWon" type="button" className={`btn ${this.state.sortFilterValue === "gamesWon" ? "btn-success" : "btn-outline-dark"}`}>Game wins</button></th>
                                        <th data-sort-filter-value="assists" onClick={this.depositSortFilterValue}><button data-sort-filter-value="assists" type="button" className={`btn ${this.state.sortFilterValue === "assists" ? "btn-success" : "btn-outline-dark"}`}>Assists</button></th>
                                        <th data-sort-filter-value="rebounds" onClick={this.depositSortFilterValue}><button data-sort-filter-value="rebounds" type="button" className={`btn ${this.state.sortFilterValue === "rebounds" ? "btn-success" : "btn-outline-dark"}`}>Rebounds</button></th>
                                        <th data-sort-filter-value="blocks" onClick={this.depositSortFilterValue}><button data-sort-filter-value="blocks" type="button" className={`btn ${this.state.sortFilterValue === "blocks" ? "btn-success" : "btn-outline-dark"}`}>Blocks</button></th>
                                        <th data-sort-filter-value="steals" onClick={this.depositSortFilterValue}><button data-sort-filter-value="steals" type="button" className={`btn ${this.state.sortFilterValue === "steals" ? "btn-success" : "btn-outline-dark"}`}>Steals</button></th>
                                        <th data-sort-filter-value="turnovers" onClick={this.depositSortFilterValue}><button data-sort-filter-value="turnovers" type="button" className={`btn ${this.state.sortFilterValue === "turnovers" ? "btn-success" : "btn-outline-dark"}`}>Turnovers</button></th>
                                        <th data-sort-filter-value="freeThrowsFantasy" onClick={this.depositSortFilterValue}><button data-sort-filter-value="freeThrowsFantasy" type="button" className={`btn ${this.state.sortFilterValue === "freeThrowsFantasy" ? "btn-success" : "btn-outline-dark"}`}>Free throws</button></th>
                                        <th data-sort-filter-value="twoPointsFantasy" onClick={this.depositSortFilterValue}><button data-sort-filter-value="twoPointsFantasy" type="button" className={`btn ${this.state.sortFilterValue === "twoPointsFantasy" ? "btn-success" : "btn-outline-dark"}`}>Two points</button></th>
                                        <th data-sort-filter-value="threePointsFantasy" onClick={this.depositSortFilterValue}><button data-sort-filter-value="threePointsFantasy" type="button" className={`btn ${this.state.sortFilterValue === "threePointsFantasy" ? "btn-success" : "btn-outline-dark"}`}>Three points</button></th>
                                        <th data-sort-filter-value="bonuses" onClick={this.depositSortFilterValue}><button data-sort-filter-value="bonuses" type="button" className={`btn p-0 ${this.state.sortFilterValue === "bonuses" ? "btn-success" : "btn-outline-dark"}`}>Bonuses</button></th>
                                        <th data-sort-filter-value="penalties" onClick={this.depositSortFilterValue}><button data-sort-filter-value="penalties" type="button" className={`btn p-0 ${this.state.sortFilterValue === "penalties" ? "btn-success" : "btn-outline-dark"}`}>Penalties</button></th>
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
                        <PlayerCardModal />
                    </Portal>
                }
            </>
        )
    }
}

export default HallOfFameFantasyPlayersList