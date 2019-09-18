import React from 'react';
import { AppContext } from '../_context/AppContext';
import { Portal } from 'react-portal';
import calculateBasketballPlayerTDFantasyPoints from "../../services/calculateBasketballPlayerTDFantasyPoints";
import putCheckUsernameAndPassword from "../../webhooks/putCheckUsernameAndPassword";
import putTeamPickForDay from "../../webhooks/putTeamPickForDay";
import TeamPickSuccessfullySubmited from "../modals/TeamPickSuccessfullySubmited";
import PlayerCardModal from "../modals/PlayerCardModal";

class PlayersOnField extends React.Component {
    static contextType = AppContext;
    state = {
        showTeamPickSuccessfullySubmited: false
    }

    choosePlayer = (event) => {
        const playerPosition = event.target.getAttribute("data-player-position")
        this.context.choosePlayerForTeam(playerPosition)
    }

    calculatePlayerRoundPoints = (inputPlayerData) => {
        const calculatedPlayerData = calculateBasketballPlayerTDFantasyPoints(inputPlayerData, this.context.selectedDay)
        return calculatedPlayerData.summaSummarum
    }


    mapPlayer1OnField = () => {
        if (this.context.teamPickData.Player1Id !== null) {
            const playerId = this.context.teamPickData.Player1Id
            const playerData = this.context.basketballPlayers.filter((player) => playerId === player._id.$oid)
            return <div key={playerData[0].shirtNumber + playerData[0].team} className={`first-five-player-wrapper-selected d-flex flex-column justify-content-between align-items-center ${this.context.showSelectDayDashboard ? "" : "glow"}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} onClick={this.context.showSinglePlayerModal}>
                <div className="shirt-number d-flex" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {this.calculatePlayerRoundPoints(playerData[0])}
                    <span className="pt" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>pt</span>
                </div>
                <div className="player-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {playerData[0].name}
                </div>
                <div className="player-team-wrapper d-flex align-items-center" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    <span className="team-image-wrapper" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        <img className="img-fluid" src={require(`../../images/flags/Flag of ${playerData[0].team}.png`)} alt={`${playerData[0].team}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} />
                    </span>
                    <span className="team-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        {playerData[0].team}
                    </span>
                </div>
                {!this.context.teamPickLockData.Player1Id &&
                    <button type="button" className="btn btn-outline-dark change-player" data-player-position="Player 1" onClick={this.choosePlayer}>Change player</button>
                }
            </div>
        }
    }

    mapPlayer2OnField = () => {
        if (this.context.teamPickData.Player2Id !== null) {
            const playerId = this.context.teamPickData.Player2Id
            const playerData = this.context.basketballPlayers.filter((player) => playerId === player._id.$oid)
            return <div key={playerData[0].shirtNumber + playerData[0].team} className={`first-five-player-wrapper-selected d-flex flex-column justify-content-between align-items-center ${this.context.showSelectDayDashboard ? "" : "glow"}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} onClick={this.context.showSinglePlayerModal}>
                <div className="shirt-number d-flex" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {this.calculatePlayerRoundPoints(playerData[0])}
                    <span className="pt" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>pt</span>
                </div>
                <div className="player-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {playerData[0].name}
                </div>
                <div className="player-team-wrapper d-flex align-items-center" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    <span className="team-image-wrapper" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        <img className="img-fluid" src={require(`../../images/flags/Flag of ${playerData[0].team}.png`)} alt={`${playerData[0].team}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} />
                    </span>
                    <span className="team-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        {playerData[0].team}
                    </span>
                </div>
                {!this.context.teamPickLockData.Player2Id &&
                    <button type="button" className="btn btn-outline-dark change-player" data-player-position="Player 2" onClick={this.choosePlayer}>Change player</button>
                }
            </div>
        }
    }

    mapPlayer3OnField = () => {
        if (this.context.teamPickData.Player3Id !== null) {
            const playerId = this.context.teamPickData.Player3Id
            const playerData = this.context.basketballPlayers.filter((player) => playerId === player._id.$oid)
            return <div key={playerData[0].shirtNumber + playerData[0].team} className={`first-five-player-wrapper-selected d-flex flex-column justify-content-between align-items-center ${this.context.showSelectDayDashboard ? "" : "glow"}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} onClick={this.context.showSinglePlayerModal}>
                <div className="shirt-number d-flex" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {this.calculatePlayerRoundPoints(playerData[0])}
                    <span className="pt" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>pt</span>
                </div>
                <div className="player-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {playerData[0].name}
                </div>
                <div className="player-team-wrapper d-flex align-items-center" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    <span className="team-image-wrapper" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        <img className="img-fluid" src={require(`../../images/flags/Flag of ${playerData[0].team}.png`)} alt={`${playerData[0].team}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} />
                    </span>
                    <span className="team-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        {playerData[0].team}
                    </span>
                </div>
                {!this.context.teamPickLockData.Player3Id &&
                    <button type="button" className="btn btn-outline-dark change-player" data-player-position="Player 3" onClick={this.choosePlayer}>Change player</button>
                }
            </div>
        }
    }

    mapPlayer4OnField = () => {
        if (this.context.teamPickData.Player4Id !== null) {
            const playerId = this.context.teamPickData.Player4Id
            const playerData = this.context.basketballPlayers.filter((player) => playerId === player._id.$oid)
            return <div key={playerData[0].shirtNumber + playerData[0].team} className={`first-five-player-wrapper-selected d-flex flex-column justify-content-between align-items-center ${this.context.showSelectDayDashboard ? "" : "glow"}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} onClick={this.context.showSinglePlayerModal}>
                <div className="shirt-number d-flex" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {this.calculatePlayerRoundPoints(playerData[0])}
                    <span className="pt" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>pt</span>
                </div>
                <div className="player-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {playerData[0].name}
                </div>
                <div className="player-team-wrapper d-flex align-items-center" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    <span className="team-image-wrapper" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        <img className="img-fluid" src={require(`../../images/flags/Flag of ${playerData[0].team}.png`)} alt={`${playerData[0].team}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} />
                    </span>
                    <span className="team-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        {playerData[0].team}
                    </span>
                </div>
                {!this.context.teamPickLockData.Player4Id &&
                    <button type="button" className="btn btn-outline-dark change-player" data-player-position="Player 4" onClick={this.choosePlayer}>Change player</button>
                }
            </div>
        }
    }

    mapPlayer5OnField = () => {
        if (this.context.teamPickData.Player5Id !== null) {
            const playerId = this.context.teamPickData.Player5Id
            const playerData = this.context.basketballPlayers.filter((player) => playerId === player._id.$oid)
            return <div key={playerData[0].shirtNumber + playerData[0].team} className={`first-five-player-wrapper-selected d-flex flex-column justify-content-between align-items-center ${this.context.showSelectDayDashboard ? "" : "glow"}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} onClick={this.context.showSinglePlayerModal}>
                <div className="shirt-number d-flex" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {this.calculatePlayerRoundPoints(playerData[0])}
                    <span className="pt" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>pt</span>
                </div>
                <div className="player-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {playerData[0].name}
                </div>
                <div className="player-team-wrapper d-flex align-items-center" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    <span className="team-image-wrapper" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        <img className="img-fluid" src={require(`../../images/flags/Flag of ${playerData[0].team}.png`)} alt={`${playerData[0].team}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} />
                    </span>
                    <span className="team-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        {playerData[0].team}
                    </span>
                </div>
                {!this.context.teamPickLockData.Player5Id &&
                    <button type="button" className="btn btn-outline-dark change-player" data-player-position="Player 5" onClick={this.choosePlayer}>Change player</button>
                }
            </div>
        }
    }

    mapPlayer6OnField = () => {
        if (this.context.teamPickData.Player6Id !== null) {
            const playerId = this.context.teamPickData.Player6Id
            const playerData = this.context.basketballPlayers.filter((player) => playerId === player._id.$oid)
            return <div key={playerData[0].shirtNumber + playerData[0].team} className={`bench-player-wrapper-selected d-flex flex-column justify-content-between align-items-center ${this.context.showSelectDayDashboard ? "" : "glow"}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} onClick={this.context.showSinglePlayerModal}>
                <div className="shirt-number d-flex" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {this.calculatePlayerRoundPoints(playerData[0])}
                    <span className="pt" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>pt</span>
                </div>
                <div className="player-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {playerData[0].name}
                </div>
                <div className="player-team-wrapper d-flex align-items-center" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    <span className="team-image-wrapper" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        <img className="img-fluid" src={require(`../../images/flags/Flag of ${playerData[0].team}.png`)} alt={`${playerData[0].team}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} />
                    </span>
                    <span className="team-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        {playerData[0].team}
                    </span>
                </div>
                {!this.context.teamPickLockData.Player6Id &&
                    <button type="button" className="btn btn-outline-dark change-player" data-player-position="Player 6" onClick={this.choosePlayer}>Change player</button>
                }
            </div>
        }
    }

    mapPlayer7OnField = () => {
        if (this.context.teamPickData.Player7Id !== null) {
            const playerId = this.context.teamPickData.Player7Id
            const playerData = this.context.basketballPlayers.filter((player) => playerId === player._id.$oid)
            return <div key={playerData[0].shirtNumber + playerData[0].team} className={`bench-player-wrapper-selected d-flex flex-column justify-content-between align-items-center ${this.context.showSelectDayDashboard ? "" : "glow"}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} onClick={this.context.showSinglePlayerModal}>
                <div className="shirt-number d-flex" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {this.calculatePlayerRoundPoints(playerData[0])}
                    <span className="pt" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>pt</span>
                </div>
                <div className="player-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    {playerData[0].name}
                </div>
                <div className="player-team-wrapper d-flex align-items-center" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                    <span className="team-image-wrapper" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        <img className="img-fluid" src={require(`../../images/flags/Flag of ${playerData[0].team}.png`)} alt={`${playerData[0].team}`} data-player-name={playerData[0].name} data-player-team={playerData[0].team} />
                    </span>
                    <span className="team-name" data-player-name={playerData[0].name} data-player-team={playerData[0].team}>
                        {playerData[0].team}
                    </span>
                </div>
                {!this.context.teamPickLockData.Player7Id &&
                    <button type="button" className="btn btn-outline-dark change-player" data-player-position="Player 7" onClick={this.choosePlayer}>Change player</button>
                }
            </div>
        }
    }

    sendTeamPick = () => {
        const teamPickData = {
            ...this.context.teamPickData,
            ["isSubmitted"]: true
        }
        const data = {
            username: this.context.bitrulez,
            password: this.context.bitrulez2,
            selectedDay: this.context.selectedDay,
            teamPickData,
        }
        const data2 = {
            username: this.context.bitrulez,
            password: this.context.bitrulez2
        }

        putCheckUsernameAndPassword(data2, "nekArendomSifrAOdDostaKArakTerA123").then((response) => {
            if (response.length === 0) {
                alert(`Too many players online right now...
                server can't handle it...
                try again a little bit later`)
            } else {
                putTeamPickForDay(data, "opETBasNekaDugaCkaSIfraOdmnogOKARAkterAMalaIVelikaSlovaSve").then((response) => {
                    this.setState({
                        showTeamPickSuccessfullySubmited: true
                    })
                })
            }
        })



    }

    checkItsReadyButton = () => {
        const teamPickData = this.context.teamPickData
        const pickPlayerPosition = ["Player1Id", "Player2Id", "Player3Id", "Player4Id", "Player5Id", "Player6Id", "Player7Id"]
        let pickCounter = 0
        pickPlayerPosition.forEach((pickPlayer) => {
            if (teamPickData[pickPlayer] !== null) {
                pickCounter++
            }
        })
        if (this.context.teamPickData.isSubmitted) {
            return ""
        } else if (pickCounter === 7) {
            return <button type="button" className="btn btn-success align-self-end" onClick={this.sendTeamPick}>That's it! I'm ready to go</button>
        } else {
            return <button type="button" className="btn btn-light align-self-end" disabled>Choose all 7 players before submitting</button>
        }
    }

    closeTeamPickSuccessfullySubmitedModal = () => {
        this.setState({
            showTeamPickSuccessfullySubmited: false
        })
        this.context.teamPickIsSubmitted()
    }
    render() {
        return (
            <>
                <div className="show-players-on-field-container d-flex flex-column justify-content-between">
                    <div className="screen-title d-flex justify-content-between align-items-center">
                        <div>{this.context.bitrulez}'s Team for {this.context.selectedDay}</div>
                        <div>Round points total: <span className="round-points">{isNaN(this.context.teamPickDayTotal) ? "0.00" : this.context.teamPickDayTotal}</span></div>
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
                    <section className="picked-players-container d-flex flex-column justify-content-between">
                        <div className="three-players-container d-flex justify-content-around">


                            {/* PLAYER 1 */}
                            {this.context.teamPickData.Player1Id === null &&
                                <div className="first-five-player-wrapper" data-player-position="Player 1" onClick={this.choosePlayer}>
                                    <div className="not-selected-player" data-player-position="Player 1">
                                        <img className="img-fluid" src={require("../../images/basketballPlayers/basketball-player-1.png")} alt="player 1" data-player-position="Player 1" />
                                        <div className="pick-player-title" data-player-position="Player 1">Pick player 1</div>
                                    </div>
                                </div>
                            }
                            {this.context.teamPickData.Player1Id !== null &&
                                this.mapPlayer1OnField()}


                            {/* PLAYER 2 */}
                            {this.context.teamPickData.Player2Id === null &&
                                <div className="first-five-player-wrapper" data-player-position="Player 2" onClick={this.choosePlayer}>
                                    <div className="not-selected-player" data-player-position="Player 2">
                                        <img className="img-fluid" src={require("../../images/basketballPlayers/basketball-player-2.png")} alt="player 1" data-player-position="Player 2" />
                                        <div className="pick-player-title" data-player-position="Player 2">Pick player 2</div>
                                    </div>
                                </div>}
                            {this.context.teamPickData.Player2Id !== null &&
                                this.mapPlayer2OnField()}



                            {/* PLAYER 3 */}
                            {this.context.teamPickData.Player3Id === null &&
                                <div className="first-five-player-wrapper" data-player-position="Player 3" onClick={this.choosePlayer}>
                                    <div className="not-selected-player" data-player-position="Player 3">
                                        <img className="img-fluid" src={require("../../images/basketballPlayers/basketball-player-3.png")} alt="player 1" data-player-position="Player 3" />
                                        <div className="pick-player-title" data-player-position="Player 3">Pick player 3</div>
                                    </div>
                                </div>}
                            {this.context.teamPickData.Player3Id !== null &&
                                this.mapPlayer3OnField()}
                        </div>


                        <div className="two-players-container d-flex justify-content-around">
                            {/* PLAYER 4 */}
                            {this.context.teamPickData.Player4Id === null &&
                                <div className="first-five-player-wrapper" data-player-position="Player 4" onClick={this.choosePlayer}>
                                    <div className="not-selected-player" data-player-position="Player 4">
                                        <img className="img-fluid" src={require("../../images/basketballPlayers/basketball-player-4.png")} alt="player 1" data-player-position="Player 4" />
                                        <div className="pick-player-title" data-player-position="Player 4">Pick player 4</div>
                                    </div>
                                </div>}
                            {this.context.teamPickData.Player4Id !== null &&
                                this.mapPlayer4OnField()}


                            {/* PLAYER 5 */}
                            {this.context.teamPickData.Player5Id === null &&
                                <div className="first-five-player-wrapper" data-player-position="Player 5" onClick={this.choosePlayer}>
                                    <div className="not-selected-player" data-player-position="Player 5">
                                        <img className="img-fluid" src={require("../../images/basketballPlayers/basketball-player-5.png")} alt="player 1" data-player-position="Player 5" />
                                        <div className="pick-player-title" data-player-position="Player 5">Pick player 5</div>
                                    </div>
                                </div>}
                            {this.context.teamPickData.Player5Id !== null &&
                                this.mapPlayer5OnField()}
                        </div>
                        <div className="bench-players-container d-flex justify-content-between">
                            <div className="d-flex">

                                {/* PLAYER 6 */}
                                {this.context.teamPickData.Player6Id === null &&
                                    <div className="bench-player-wrapper" data-player-position="Player 6" onClick={this.choosePlayer}>
                                        <div className="not-selected-player-b-1" data-player-position="Player 6">
                                            <img className="img-fluid" src={require("../../images/basketballPlayers/basketball-player-6.png")} alt="player 1" data-player-position="Player 6" />
                                            <div className="pick-player-title" data-player-position="Player 6">Pick player 6</div>
                                        </div>
                                    </div>}
                                {this.context.teamPickData.Player6Id !== null &&
                                    this.mapPlayer6OnField()}


                                {/* PLAYER 7 */}
                                {this.context.teamPickData.Player7Id === null &&
                                    <div className="bench-player-wrapper" data-player-position="Player 7" onClick={this.choosePlayer}>
                                        <div className="not-selected-player-b-2" data-player-position="Player 7">
                                            <img className="img-fluid" src={require("../../images/basketballPlayers/basketball-player-7.png")} alt="player 1" data-player-position="Player 7" />
                                            <div className="pick-player-title" data-player-position="Player 7">Pick player 7</div>
                                        </div>
                                    </div>}
                                {this.context.teamPickData.Player7Id !== null &&
                                    this.mapPlayer7OnField()}
                            </div>
                            {this.checkItsReadyButton()}
                        </div>
                    </section>
                    <table className="points-container">
                        <thead>
                            <tr className="">
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
                        <tbody className="players-data-container">
                            <tr>
                                <th>
                                    Real life (qty)
                                </th>
                                <td>{this.context.calculatedFirstFiveRealLifeStatsTotals.gameWinsCounter}</td>
                                <td>{isNaN(this.context.calculatedFirstFiveRealLifeStatsTotals.assists) ? "0" : this.context.calculatedFirstFiveRealLifeStatsTotals.assists}</td>
                                <td>{isNaN(this.context.calculatedFirstFiveRealLifeStatsTotals.rebounds) ? "0" : this.context.calculatedFirstFiveRealLifeStatsTotals.rebounds}</td>
                                <td>{isNaN(this.context.calculatedFirstFiveRealLifeStatsTotals.blocks) ? "0" : this.context.calculatedFirstFiveRealLifeStatsTotals.blocks}</td>
                                <td>{isNaN(this.context.calculatedFirstFiveRealLifeStatsTotals.steals) ? "0" : this.context.calculatedFirstFiveRealLifeStatsTotals.steals}</td>
                                <td>{isNaN(this.context.calculatedFirstFiveRealLifeStatsTotals.turnovers) ? "0" : this.context.calculatedFirstFiveRealLifeStatsTotals.turnovers}</td>
                                <td>{isNaN(this.context.calculatedFirstFiveRealLifeStatsTotals.freeThrows) ? "0" : this.context.calculatedFirstFiveRealLifeStatsTotals.freeThrows}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{isNaN(this.context.calculatedFirstFiveRealLifeStatsTotals.twoPoints) ? "0" : this.context.calculatedFirstFiveRealLifeStatsTotals.twoPoints}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{isNaN(this.context.calculatedFirstFiveRealLifeStatsTotals.threePoints) ? "0" : this.context.calculatedFirstFiveRealLifeStatsTotals.threePoints}</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>

                            <tr>
                                <th>
                                    Fantasy points
                          </th>
                                <td className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.gameWins > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.gameWins.toFixed(2)}</td>
                                <td className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.assists > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.assists.toFixed(2)}</td>
                                <td className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.rebounds > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.rebounds.toFixed(2)}</td>
                                <td className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.blocks > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.blocks.toFixed(2)}</td>
                                <td className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.steals > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.steals.toFixed(2)}</td>
                                <td className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.turnovers > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.turnovers.toFixed(2)}</td>
                                <td data-toggle="tooltip" data-placement="top" title="Points are calculated for each player from first five separately and then summed up here" className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.freeThrows > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.freeThrows.toFixed(2)}</td>
                                <td data-toggle="tooltip" data-placement="top" title="Points are calculated for each player from first five separately and then summed up here" className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.freeThrowsBonuses > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.freeThrowsBonuses.toFixed(2)}</td>
                                <td data-toggle="tooltip" data-placement="top" title="Points are calculated for each player from first five separately and then summed up here" className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.freeThrowsPenalties >= 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.freeThrowsPenalties.toFixed(2)}</td>
                                <td data-toggle="tooltip" data-placement="top" title="Points are calculated for each player from first five separately and then summed up here" className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.twoPoints > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.twoPoints.toFixed(2)}</td>
                                <td data-toggle="tooltip" data-placement="top" title="Points are calculated for each player from first five separately and then summed up here" className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.twoPointsBonuses > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.twoPointsBonuses.toFixed(2)}</td>
                                <td data-toggle="tooltip" data-placement="top" title="Points are calculated for each player from first five separately and then summed up here" className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.twoPointsPenalties >= 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.twoPointsPenalties.toFixed(2)}</td>
                                <td data-toggle="tooltip" data-placement="top" title="Points are calculated for each player from first five separately and then summed up here" className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.threePoints > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.threePoints.toFixed(2)}</td>
                                <td data-toggle="tooltip" data-placement="top" title="Points are calculated for each player from first five separately and then summed up here" className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.threePointsBonuses > 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.threePointsBonuses.toFixed(2)}</td>
                                <td data-toggle="tooltip" data-placement="top" title="Points are calculated for each player from first five separately and then summed up here" className={`${this.context.calculatedFirstFiveFantasyPointsStatsTotals.threePointsPenalties >= 0 ? "points-good" : "points-not-good"}`}>{this.context.calculatedFirstFiveFantasyPointsStatsTotals.threePointsPenalties.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {this.context.selectedPlayerForPlayerCardModal && this.context.showTeam &&
                    <Portal>
                        <PlayerCardModal />
                    </Portal>
                }
                <Portal>
                    <TeamPickSuccessfullySubmited showTeamPickSuccessfullySubmited={this.state.showTeamPickSuccessfullySubmited} closeTeamPickSuccessfullySubmitedModal={this.closeTeamPickSuccessfullySubmitedModal} />
                </Portal>
            </>
        )
    }
}

export default PlayersOnField