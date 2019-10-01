import React from 'react';
import Modal from 'react-bootstrap4-modal';
import { AppContext } from '../../screens/_context/AppContext';
import serbischeDatum from "../../services/serbischeDatum";
import serbischeNazivTima from "../../services/serbischeNazivTima";
import calculateBasketballPlayerTDFantasyPoints from "../../services/calculateBasketballPlayerTDFantasyPoints";
import calculateBasketballPlayerTDFantasyGrandTotalPoints from "../../services/calculateBasketballPlayerTDFantasyGrandTotalPoints";
import eligibleDays from "../../services/eligibleDays";
import calculateTeamHref from "../../services/calculateTeamHref";


class SRBPlayerCardModal extends React.Component {
    static contextType = AppContext;
    state = {
        selectedDay: this.context.selectedDay,
        tdFantasyPoints: null,
        hoveredElement: "",
    }


    depositSelectedDay = (event) => {
        const selectedDay = event.target.getAttribute("data-day-to-select")
        this.setState({
            selectedDay
        })
        this.depositTdFantasyPoints(this.context.selectedPlayerForPlayerCardModal, selectedDay)
    }

    depositTdFantasyPoints = (playerData, selectedDay) => {
        const tdFantasyPoints = calculateBasketballPlayerTDFantasyPoints(playerData, selectedDay)
        this.setState({
            tdFantasyPoints
        })
    }
    depositHoveredElement = (event) => {
        const hoveredElement = event.target.getAttribute("data-stats-element")
        this.setState({
            hoveredElement
        })
    }
    removeHoveredElement = () => {
        this.setState({
            hoveredElement: ""
        })
    }
    pickThisPlayerForTeam = (event) => {
        const pickedPlayerId = event.target.getAttribute("data-picked-player-id")
        this.context.pickPlayerForTeam(this.context.choosePlayerPosition, pickedPlayerId)
    }
    checkGameWin = () => {
        if (this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].teamWin === "no") {
            return "ne"
        } else if (this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].teamWin === "yes") {
            return "da"
        } else return this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].teamWin
    }

    componentDidMount() {
        this.depositTdFantasyPoints(this.context.selectedPlayerForPlayerCardModal, this.state.selectedDay)
    }

    render() {
        return (
            <Modal className="player-card-modal-container" visible={this.context.showPlayerCardModal} onClickBackdrop={this.context.closeSinglePlayerModal}>
                <div className="close" onClick={this.context.closeSinglePlayerModal}>&times;</div>
                <div className="player-general-info-container d-flex justify-content-between align-items-center">
                    <span><i>Košarkaš:</i> {this.context.selectedPlayerForPlayerCardModal.name}</span>
                    <a href={calculateTeamHref(this.context.selectedPlayerForPlayerCardModal.team, this.context.selectedLeague)} target="_blank" rel="noopener noreferrer" className="fiba-player-link">Proveri zvaničnu statistiku</a>
                    <span><i>Ekipa:</i> {serbischeNazivTima(this.context.selectedPlayerForPlayerCardModal.team)}</span>
                </div>
                <div className="selected-day-info">Statistika za {serbischeDatum(this.state.selectedDay)}</div>

                <div className="stats-tabs-container d-flex">
                    {this.context.selectedLeague == "euroLeague" &&
                        <div className="select-days-container d-flex flex-column justify-conten-around align-items-center">
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>ROUND 1<br /><i data-day-to-select="ROUND-1">October 3-4, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>ROUND 2<br /><i data-day-to-select="ROUND-2">October 10-11, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>ROUND 3<br /><i data-day-to-select="ROUND-3">October 17-18, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>ROUND 4<br /><i data-day-to-select="ROUND-4">October 24-25, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>ROUND 5<br /><i data-day-to-select="ROUND-5">October 29-30, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>ROUND 6<br /><i data-day-to-select="ROUND-6">October 31 -<br /> November 1, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>ROUND 7<br /><i data-day-to-select="ROUND-7">November 7-8, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>ROUND 8<br /><i data-day-to-select="ROUND-8">November 14-15, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>ROUND 9<br /><i data-day-to-select="ROUND-9">November 19-20, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>ROUND 10<br /><i data-day-to-select="ROUND-10">November 21-22, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-11" ? "is-selected" : ""}`} data-day-to-select="ROUND-11" onClick={this.depositSelectedDay}>ROUND 11<br /><i data-day-to-select="ROUND-11">November 28-29, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-12" ? "is-selected" : ""}`} data-day-to-select="ROUND-12" onClick={this.depositSelectedDay}>ROUND 12<br /><i data-day-to-select="ROUND-12">December 5-6, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-13" ? "is-selected" : ""}`} data-day-to-select="ROUND-13" onClick={this.depositSelectedDay}>ROUND 13<br /><i data-day-to-select="ROUND-13">December 12-13, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-14" ? "is-selected" : ""}`} data-day-to-select="ROUND-14" onClick={this.depositSelectedDay}>ROUND 14<br /><i data-day-to-select="ROUND-14">December 17-18, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-15" ? "is-selected" : ""}`} data-day-to-select="ROUND-15" onClick={this.depositSelectedDay}>ROUND 15<br /><i data-day-to-select="ROUND-15">December 19-20, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-16" ? "is-selected" : ""}`} data-day-to-select="ROUND-16" onClick={this.depositSelectedDay}>ROUND 16<br /><i data-day-to-select="ROUND-16">December 26-27, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-17" ? "is-selected" : ""}`} data-day-to-select="ROUND-17" onClick={this.depositSelectedDay}>ROUND 17<br /><i data-day-to-select="ROUND-17">January 2-3, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-18" ? "is-selected" : ""}`} data-day-to-select="ROUND-18" onClick={this.depositSelectedDay}>ROUND 18<br /><i data-day-to-select="ROUND-18">January 9-10, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-19" ? "is-selected" : ""}`} data-day-to-select="ROUND-19" onClick={this.depositSelectedDay}>ROUND 19<br /><i data-day-to-select="ROUND-19">January 14-15, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-20" ? "is-selected" : ""}`} data-day-to-select="ROUND-20" onClick={this.depositSelectedDay}>ROUND 20<br /><i data-day-to-select="ROUND-20">January 16-17, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-21" ? "is-selected" : ""}`} data-day-to-select="ROUND-21" onClick={this.depositSelectedDay}>ROUND 21<br /><i data-day-to-select="ROUND-21">January 23-24, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-22" ? "is-selected" : ""}`} data-day-to-select="ROUND-22" onClick={this.depositSelectedDay}>ROUND 22<br /><i data-day-to-select="ROUND-22">January 30-31, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-23" ? "is-selected" : ""}`} data-day-to-select="ROUND-23" onClick={this.depositSelectedDay}>ROUND 23<br /><i data-day-to-select="ROUND-23">February 4-5, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-24" ? "is-selected" : ""}`} data-day-to-select="ROUND-24" onClick={this.depositSelectedDay}>ROUND 24<br /><i data-day-to-select="ROUND-24">February 6-7, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-25" ? "is-selected" : ""}`} data-day-to-select="ROUND-25" onClick={this.depositSelectedDay}>ROUND 25<br /><i data-day-to-select="ROUND-25">February 20-21, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-26" ? "is-selected" : ""}`} data-day-to-select="ROUND-26" onClick={this.depositSelectedDay}>ROUND 26<br /><i data-day-to-select="ROUND-26">February 27-28, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-27" ? "is-selected" : ""}`} data-day-to-select="ROUND-27" onClick={this.depositSelectedDay}>ROUND 27<br /><i data-day-to-select="ROUND-27">March 3-4, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-28" ? "is-selected" : ""}`} data-day-to-select="ROUND-28" onClick={this.depositSelectedDay}>ROUND 28<br /><i data-day-to-select="ROUND-28">March 5-6, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-29" ? "is-selected" : ""}`} data-day-to-select="ROUND-29" onClick={this.depositSelectedDay}>ROUND 29<br /><i data-day-to-select="ROUND-29">March 12-13, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-30" ? "is-selected" : ""}`} data-day-to-select="ROUND-30" onClick={this.depositSelectedDay}>ROUND 30<br /><i data-day-to-select="ROUND-30">March 19-20, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-31" ? "is-selected" : ""}`} data-day-to-select="ROUND-31" onClick={this.depositSelectedDay}>ROUND 31<br /><i data-day-to-select="ROUND-31">March 24-25, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-32" ? "is-selected" : ""}`} data-day-to-select="ROUND-32" onClick={this.depositSelectedDay}>ROUND 32<br /><i data-day-to-select="ROUND-32">March 26-27, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-33" ? "is-selected" : ""}`} data-day-to-select="ROUND-33" onClick={this.depositSelectedDay}>ROUND 33<br /><i data-day-to-select="ROUND-33">April 2-3, 2020</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-34" ? "is-selected" : ""}`} data-day-to-select="ROUND-34" onClick={this.depositSelectedDay}>ROUND 34<br /><i data-day-to-select="ROUND-34">April 9-10, 2020</i></button>
                        </div>
                    }


                    {this.context.selectedLeague == "euroCup" &&
                        <div className="select-days-container d-flex flex-column justify-conten-around align-items-center">
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>ROUND 1<br /><i data-day-to-select="ROUND-1">October 1-2, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>ROUND 2<br /><i data-day-to-select="ROUND-2">October 8-9, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>ROUND 3<br /><i data-day-to-select="ROUND-3">October 15-16, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>ROUND 4<br /><i data-day-to-select="ROUND-4">October 22-23, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>ROUND 5<br /><i data-day-to-select="ROUND-5">October 29-30, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>ROUND 6<br /><i data-day-to-select="ROUND-6">November 5-6, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>ROUND 7<br /><i data-day-to-select="ROUND-7">November 12-13, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>ROUND 8<br /><i data-day-to-select="ROUND-8">November 19-20, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>ROUND 9<br /><i data-day-to-select="ROUND-9">December 10-11, 2019</i></button>
                            <button type="button" className={`btn btn-outline-dark ${this.context.selectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>ROUND 10<br /><i data-day-to-select="ROUND-10">December 17-18, 2019</i></button>
                        </div>
                    }

                    <div className="stats-container d-flex justify-content-between">
                        <div className="real-life-stats-list d-flex flex-column justify-content-between">
                            <div className="title"><i>Statistika u stvarnosti</i></div>
                            <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "game-win-wrapper" ? "isHovered" : ""}`} data-stats-element="game-win-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                <span className="label" data-stats-element="game-win-wrapper">
                                    Pobeda:
                                </span>
                                <span className="data" data-stats-element="game-win-wrapper">
                                    {this.checkGameWin()}
                                </span>
                            </div>
                            <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "assists-wrapper" ? "isHovered" : ""}`} data-stats-element="assists-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                <span className="label" data-stats-element="assists-wrapper">
                                    Asistencije:
                                </span>
                                <span className="data" data-stats-element="assists-wrapper">
                                    {this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].assists}
                                </span>
                            </div>
                            <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "rebounds-wrapper" ? "isHovered" : ""}`} data-stats-element="rebounds-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                <span className="label" data-stats-element="rebounds-wrapper">
                                    Skokovi:
                                </span>
                                <span className="data" data-stats-element="rebounds-wrapper">
                                    {this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].rebounds}
                                </span>
                            </div>
                            <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "blocks-wrapper" ? "isHovered" : ""}`} data-stats-element="blocks-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                <span className="label" data-stats-element="blocks-wrapper">
                                    Blokade:
                                </span>
                                <span className="data" data-stats-element="blocks-wrapper">
                                    {this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].blocks}
                                </span>
                            </div>
                            <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "steals-wrapper" ? "isHovered" : ""}`} data-stats-element="steals-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                <span className="label" data-stats-element="steals-wrapper">
                                    Ukradene lopte:
                                </span>
                                <span className="data" data-stats-element="steals-wrapper">
                                    {this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].steals}
                                </span>
                            </div>
                            <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "turnovers-wrapper" ? "isHovered" : ""}`} data-stats-element="turnovers-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                <span className="label" data-stats-element="turnovers-wrapper">
                                    Izgubljene lopte:
                                </span>
                                <span className="data" data-stats-element="turnovers-wrapper">
                                    {this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].turnovers}
                                </span>
                            </div>
                            <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "free-throws-wrapper" ? "isHovered" : ""}`} data-stats-element="free-throws-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                <span className="label" data-stats-element="free-throws-wrapper">
                                    Slobodna bacanja:
                                </span>
                                <span className="data" data-stats-element="free-throws-wrapper">
                                    {this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].freeThrowScored}/{this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].freeThrowAttempts}
                                </span>
                            </div>
                            <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "two-points-wrapper" ? "isHovered" : ""}`} data-stats-element="two-points-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                <span className="label" data-stats-element="two-points-wrapper">
                                    Za dva poena:
                                </span>
                                <span className="data" data-stats-element="two-points-wrapper">
                                    {this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].fieldGoalsScored}/{this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].fieldGoalsAttempts}
                                </span>
                            </div>
                            <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "three-points-wrapper" ? "isHovered" : ""}`} data-stats-element="three-points-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                <span className="label" data-stats-element="three-points-wrapper">
                                    Za tri poena:
                                </span>
                                <span className="data" data-stats-element="three-points-wrapper">
                                    {this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].threePointsScored}/{this.context.selectedPlayerForPlayerCardModal[this.state.selectedDay].threePointsAttempts}
                                </span>
                            </div>
                        </div>





                        {/*--------------------------------------- FANTASY POINTS --------------------- */}
                        {this.state.tdFantasyPoints !== null &&
                            <div className="calculated-td-fantasy-stats-list d-flex flex-column justify-content-between">
                                <div className="title"><i>Sportske Fantazi poeni</i></div>
                                <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "game-win-wrapper" ? "isHovered" : ""}`} data-stats-element="game-win-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                    <span className="label" data-stats-element="game-win-wrapper">
                                        Pobeda:
                                </span>
                                    <span className="data" data-stats-element="game-win-wrapper">
                                        {this.state.tdFantasyPoints.gameWin}

                                    </span>
                                </div>
                                <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "assists-wrapper" ? "isHovered" : ""}`} data-stats-element="assists-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                    <span className="label" data-stats-element="assists-wrapper">
                                        Asistencije:
                                </span>
                                    <span className="data" data-stats-element="assists-wrapper">
                                        {this.state.tdFantasyPoints.assists}
                                    </span>
                                </div>
                                <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "rebounds-wrapper" ? "isHovered" : ""}`} data-stats-element="rebounds-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                    <span className="label" data-stats-element="rebounds-wrapper">
                                        Skokovi:
                                </span>
                                    <span className="data" data-stats-element="rebounds-wrapper">
                                        {this.state.tdFantasyPoints.rebounds}
                                    </span>
                                </div>
                                <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "blocks-wrapper" ? "isHovered" : ""}`} data-stats-element="blocks-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                    <span className="label" data-stats-element="blocks-wrapper">
                                        Blokade:
                                </span>
                                    <span className="data" data-stats-element="blocks-wrapper">
                                        {this.state.tdFantasyPoints.blocks}
                                    </span>
                                </div>
                                <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "steals-wrapper" ? "isHovered" : ""}`} data-stats-element="steals-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                    <span className="label" data-stats-element="steals-wrapper">
                                        Ukradene lopte:
                                </span>
                                    <span className="data" data-stats-element="steals-wrapper">
                                        {this.state.tdFantasyPoints.steals}
                                    </span>
                                </div>
                                <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "turnovers-wrapper" ? "isHovered" : ""}`} data-stats-element="turnovers-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement}>
                                    <span className="label" data-stats-element="turnovers-wrapper">
                                        Izgubljene lopte:
                                </span>
                                    <span className={`data ${this.state.tdFantasyPoints.turnovers < 0 ? "text-danger" : ""}`} data-stats-element="turnovers-wrapper">
                                        {this.state.tdFantasyPoints.turnovers}
                                    </span>
                                </div>


                                <div>
                                    <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "free-throws-wrapper" ? "isHovered" : ""}`} data-stats-element="free-throws-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement} data-toggle="tooltip" data-placement="top" title=" All free throw shots scored by player are multiplied by free throws shot percentage">
                                        <span className="label" data-stats-element="free-throws-wrapper">
                                            Slobodna bacanja:
                                        </span>
                                        <span className="data" data-stats-element="free-throws-wrapper">
                                            {this.state.tdFantasyPoints.freeThrowsPoints}
                                        </span>
                                    </div>
                                    <div className={`single-item-bonus-wrapper d-flex justify-content-between ${this.state.hoveredElement === "free-throws-wrapper" ? "isHovered" : ""}`} data-stats-element="free-throws-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement} data-toggle="tooltip" data-placement="top" title="When player shoots free throws without miss (but 3 or more shots !!!) he is rewarded with bonus - 25%">
                                        <span className="label" data-stats-element="free-throws-wrapper">
                                            Slobodna bacanja - bonusi:
                                        </span>
                                        <span className={`data ${this.state.tdFantasyPoints.freeThrowsPointsBonus > 0 ? "text-success" : ""}`} data-stats-element="free-throws-wrapper">
                                            {this.state.tdFantasyPoints.freeThrowsPointsBonus}
                                        </span>
                                    </div>
                                    <div className={`single-item-penalty-wrapper d-flex justify-content-between ${this.state.hoveredElement === "free-throws-wrapper" ? "isHovered" : ""}`} data-stats-element="free-throws-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement} data-toggle="tooltip" data-placement="top" title="When player shoots free throws without scoring (but 3 or more shots !!!) he is penalized with negative points (first three misses are -1pt and every next miss is -1pt)">
                                        <span className="label" data-stats-element="free-throws-wrapper">
                                            Slobodna bacanja - penali:
                                        </span>
                                        <span className={`data ${this.state.tdFantasyPoints.freeThrowsPointsPenalty < 0 ? "text-danger" : ""}`} data-stats-element="free-throws-wrapper">
                                            {this.state.tdFantasyPoints.freeThrowsPointsPenalty}
                                        </span>
                                    </div>
                                </div>



                                <div>
                                    <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "two-points-wrapper" ? "isHovered" : ""}`} data-stats-element="two-points-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement} data-toggle="tooltip" data-placement="top" title="All two point shots scored by player are multiplied by two points shot percentage">
                                        <span className="label" data-stats-element="two-points-wrapper">
                                            Za dva poena:
                                    </span>
                                        <span className="data" data-stats-element="two-points-wrapper">
                                            {this.state.tdFantasyPoints.twoPoints}
                                        </span>
                                    </div>
                                    <div className={`single-item-bonus-wrapper d-flex justify-content-between ${this.state.hoveredElement === "two-points-wrapper" ? "isHovered" : ""}`} data-stats-element="two-points-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement} data-toggle="tooltip" data-placement="top" title="When player shoots two point shots without miss (but 3 or more shots !!!) he is rewarded with bonus - 50%">
                                        <span className="label" data-stats-element="two-points-wrapper">
                                            Za dva poena - bonusi:
                                    </span>
                                        <span className={`data ${this.state.tdFantasyPoints.twoPointsBonus > 0 ? "text-success" : ""}`} data-stats-element="two-points-wrapper">
                                            {this.state.tdFantasyPoints.twoPointsBonus}
                                        </span>
                                    </div>
                                    <div className={`single-item-penalty-wrapper d-flex justify-content-between ${this.state.hoveredElement === "two-points-wrapper" ? "isHovered" : ""}`} data-stats-element="two-points-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement} data-toggle="tooltip" data-placement="top" title="When player shoots two point shots without scoring (but 3 or more shots !!!) he is penalized with negative points (first three misses are -2pt and every next miss is -1pt)">
                                        <span className="label" data-stats-element="two-points-wrapper">
                                            Za dva poena - penali:
                                    </span>
                                        <span className={`data ${this.state.tdFantasyPoints.twoPointsPenalty < 0 ? "text-danger" : ""}`} data-stats-element="two-points-wrapper">
                                            {this.state.tdFantasyPoints.twoPointsPenalty}
                                        </span>
                                    </div>
                                </div>



                                <div>
                                    <div className={`single-item-wrapper d-flex justify-content-between ${this.state.hoveredElement === "three-points-wrapper" ? "isHovered" : ""}`} data-stats-element="three-points-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement} data-toggle="tooltip" data-placement="top" title=" All three point shots scored by player are multiplied by three points shot percentage">
                                        <span className="label" data-stats-element="three-points-wrapper">
                                            Za tri poena:
                                        </span>
                                        <span className="data" data-stats-element="three-points-wrapper">
                                            {this.state.tdFantasyPoints.threePoints}
                                        </span>
                                    </div>
                                    <div className={`single-item-bonus-wrapper d-flex justify-content-between ${this.state.hoveredElement === "three-points-wrapper" ? "isHovered" : ""}`} data-stats-element="three-points-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement} data-toggle="tooltip" data-placement="top" title="When player shoots three point shots without miss (but 3 or more shots !!!) he is rewarded with bonus - 100%">
                                        <span className="label" data-stats-element="three-points-wrapper">
                                            Za tri poena - bonusi:
                                        </span>
                                        <span className={`data ${this.state.tdFantasyPoints.threePointsBonus > 0 ? "text-success" : ""}`} data-stats-element="three-points-wrapper">
                                            {this.state.tdFantasyPoints.threePointsBonus}
                                        </span>
                                    </div>
                                    <div className={`single-item-penalty-wrapper d-flex justify-content-between ${this.state.hoveredElement === "three-points-wrapper" ? "isHovered" : ""}`} data-stats-element="three-points-wrapper" onMouseEnter={this.depositHoveredElement} onMouseLeave={this.removeHoveredElement} data-toggle="tooltip" data-placement="top" title="When player shoots three points shots without scoring (but 3 or more shots !!!) he is penalized with negative points (first three misses are -3pt and every next miss is -1pt)">
                                        <span className="label" data-stats-element="three-points-wrapper">
                                            Za tri poena - penali:
                                        </span>
                                        <span className={`data ${this.state.tdFantasyPoints.threePointsPenalty < 0 ? "text-danger" : ""}`} data-stats-element="three-points-wrapper">
                                            {this.state.tdFantasyPoints.threePointsPenalty}
                                        </span>
                                    </div>
                                </div>
                                <div className="summa-summarum-fantasy-points d-flex justify-content-between">
                                    <span className="label">
                                        Summa Summarum:
                                    </span>
                                    <span className="data">
                                        {this.state.tdFantasyPoints.summaSummarum}
                                    </span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="bottom-container d-flex justify-content-between">
                        <div className="grand-total-wrapper d-flex justify-content-between align-items-center">
                            <div className="label">
                                Ukupan zbir Sportske Fantazi poena za sada:
                        </div>
                            {this.context.selectedLeague == "euroLeague" &&
                                <div className="data">
                                    {calculateBasketballPlayerTDFantasyGrandTotalPoints(this.context.selectedPlayerForPlayerCardModal, eligibleDays.euroLeague).toFixed(2)} Points
                                </div>
                            }
                            {this.context.selectedLeague == "euroCup" &&
                                <div className="data">
                                    {calculateBasketballPlayerTDFantasyGrandTotalPoints(this.context.selectedPlayerForPlayerCardModal, eligibleDays.euroCup).toFixed(2)} Points
                                </div>
                            }
                        </div>
                        {this.context.showSelectPlayer && !this.context.isHallOfFame &&
                            <button type="button" className="btn btn-success" data-picked-player-id={`${this.context.selectedPlayerForPlayerCardModal._id.$oid}`} onClick={this.pickThisPlayerForTeam}>Želim ovog igrača u svojoj ekipi za rundu {serbischeDatum(this.context.selectedDay)}</button>
                        }
                    </div>
                    <span className="rounding-notification">
                        *Zbog zaokruživanja ukupan zbir se može ne slagati za decimalu ili dve
                    </span>
                </div>
            </Modal>
        )
    }
}

export default SRBPlayerCardModal