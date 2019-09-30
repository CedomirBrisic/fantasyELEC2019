import React, { Component } from 'react';
import { AppContext } from "./screens/_context/AppContext";
import getFantasyData from "./webhooks/getFantasyData";
import humanReadDateAndTime from "./services/humanReadDateAndTime";
import eligibleDays from "./services/eligibleDays";
import checkEligibilityForPickTeam from "./services/checkEligibilityForPickTeam";
import calculateNowRound from "./services/calculateNowRound";

export default class AppStore extends Component {
    state = {
        selectedLeague: "",
        basketballPlayers: null,
        teamsByDay: null,
        fantasyUsers: null,
        euroLeagueData: {
            basketballPlayers: null,
            fantasyUsers: null,
            teamsByDay: null
        },
        euroCupData: {
            basketballPlayers: null,
            fantasyUsers: null,
            teamsByDay: null
        },
        bitrulez: null,
        bitrulez2: null,

        showSelectDayDashboard: true,
        showSelectTeamDashboard: false,
        selectPlayerSearchValue: "",

        selectedDay: null,
        teamSelected: "all-eligible-teams",
        nowDateAndTime: humanReadDateAndTime(),

        selectedPlayerForPlayerCardModal: null,
        showPlayerCardModal: false,

        choosePlayerPosition: null,
        showSelectPlayer: false,
        showTeam: true,
        teamPickData: {
            Player1Id: null,
            Player2Id: null,
            Player3Id: null,
            Player4Id: null,
            Player5Id: null,
            Player6Id: null,
            Player7Id: null,
            isSubmitted: false
        },
        teamPickLockData: {
            Player1Id: null,
            Player2Id: null,
            Player3Id: null,
            Player4Id: null,
            Player5Id: null,
            Player6Id: null,
            Player7Id: null,
        },
        calculatedFirstFiveRealLifeStatsTotals: {
            gameWinsCounter: 0,
            assists: 0,
            rebounds: 0,
            blocks: 0,
            steals: 0,
            turnovers: 0,
            freeThrows: 0,
            twoPoints: 0,
            threePoints: 0,
        },
        calculatedFirstFiveFantasyPointsStatsTotals: {
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
        },
        teamPickDayTotal: null,

        userTotalRoundPoints: 0,
        userAvgRoundPointsPerGame: 0,

        isInitialLoading: true,
        isLandscape: false,

        hallOfFameSelectedDay: "all-days",
        isSerbische: false,
        isSerbischeFromChildren: false,
    }
    changeIsSerbische = (event) => {
        const lang = event.target.getAttribute("data-language")
        if (lang === "serbische") {
            this.setState({
                isSerbische: true
            })
        } else {
            this.setState({
                isSerbische: false
            })
        }
    }
    depositSelectedLeague = (data) => {
        this.setState({
            selectedLeague: data,
        })
    }
    depositIsHallOfFame = () => {
        this.setState({
            isHallOfFame: true
        })
    }
    depositIsNotHallOfFame = () => {
        this.setState({
            isHallOfFame: false
        })
    }
    depositHallOfFameSelectedDay = (dayToDeposit) => {
        if (dayToDeposit !== "all-days") {
            this.setState({
                hallOfFameSelectedDay: dayToDeposit,
                selectedDay: dayToDeposit
            })
        } else {
            this.setState({
                hallOfFameSelectedDay: dayToDeposit,
                selectedDay: "ROUND-1"
            })

        }
    }

    depositSelectPlayerSearchValue = (data) => {
        this.setState({
            selectPlayerSearchValue: data,
            teamSelected: "all-eligible-teams"
        })
    }
    teamPickIsSubmitted = () => {
        window.location.reload();
    }

    choosePlayerForTeam = (position) => {
        this.setState({
            choosePlayerPosition: position,
            showTeam: false,
            showSelectPlayer: true,
            showSelectDayDashboard: false,
            showSelectTeamDashboard: true
        })
    }

    changeSelectedDay = (data) => {
        this.setState({
            selectedDay: data,
            teamSelected: "all-eligible-teams"
        })
    }

    depositUserKey = (data, data2) => {
        this.setState({
            bitrulez: data,
            bitrulez2: data2
        })
        sessionStorage.setItem("bitrulez", data)
        sessionStorage.setItem("bitrulez2", data2)
    }

    getFantasyDataContext = () => {
        getFantasyData("neKaRendOMSiFRaOdbAsaliBasbAsDostaKARAkterA123plusMarsicNemaPojma").then((response) => {
            this.setState({
                euroLeagueData: {
                    basketballPlayers: response.basketballPlayersEL,
                    fantasyUsers: response.fantasyUsersEL,
                    teamsByDay: response.teamsByRoundEL
                },
                euroCupData: {
                    basketballPlayers: response.basketballPlayersEC,
                    fantasyUsers: response.fantasyUsersEC,
                    teamsByDay: response.teamsByRoundEC
                },
                isInitialLoading: false,
            })
            this.checkPlayersOnField()
        })
    }

    toggleShowSelectDayDashboard = () => {
        this.setState({
            showSelectDayDashboard: !this.state.showSelectDayDashboard,
        })
    }
    goBackToTeamView = () => {
        this.setState({
            choosePlayerPosition: null,
            showTeam: true,
            showSelectPlayer: false,
            showSelectDayDashboard: true,
            showSelectTeamDashboard: false,
            teamSelected: "all-eligible-teams",
        })
    }
    pickPlayerForTeam = (inputPlayerPosition, playerId) => {
        let playerPosition = inputPlayerPosition.split(" ").join("") + "Id"
        this.setState(prevState => ({
            teamPickData: {
                ...prevState.teamPickData,
                [playerPosition]: playerId,
                ["isSubmitted"]: false
            }
        }))
        this.goBackToTeamView()
        this.closeSinglePlayerModal()
    }

    showSinglePlayerModal = (event) => {
        const playerName = event.target.getAttribute("data-player-name")
        const playerTeam = event.target.getAttribute("data-player-team")
        const selectedPlayer = this.state.basketballPlayers.filter((player) => {
            if (player.name === playerName && player.team === playerTeam) {
                return player
            }
        })
        if (playerName !== null && playerTeam !== null) {
            this.setState({
                selectedPlayerForPlayerCardModal: selectedPlayer[0],
                showPlayerCardModal: true
            })
        }
    }
    closeSinglePlayerModal = () => {
        this.setState({
            selectedPlayerForPlayerCardModal: null,
            showPlayerCardModal: false
        })
    }


    calculateUsersRoundPoints = () => {
        let roundsPlayed = null
        // const dayIndex = eligibleDays.indexOf(this.state.nowDateAndTime.humanDate)
        // if (dayIndex === -1 && this.state.nowDateAndTime.humanDate.split("-")[1] !== "August") {
        //     roundsPlayed = 16
        // } else {
        //     roundsPlayed = eligibleDays.indexOf(this.state.nowDateAndTime.humanDate) + 1
        // }

        let userTotalRoundPoints = 0;
        for (let i = 0; i < roundsPlayed; i++) {
            userTotalRoundPoints += parseFloat(checkEligibilityForPickTeam(this.state.selectedLeague, this.state.fantasyUsers, this.state.bitrulez, eligibleDays[i], this.state.nowDateAndTime, this.state.dropdowns[0].teamsByDay, this.state.basketballPlayers).totalSummaSummarum)
        }
        this.setState({
            userTotalRoundPoints,
            userAvgRoundPointsPerGame: "XXX"
        })
    }

    componentDidMount() {
        let data = sessionStorage.getItem("bitrulez")
        let data2 = sessionStorage.getItem("bitrulez2")
        let data3 = sessionStorage.getItem("bitrulez3")

        const nowDate = humanReadDateAndTime().humanDate
        const nowRound = calculateNowRound(nowDate, data3)

        this.setState({
            bitrulez: data,
            bitrulez2: data2,
            selectedDay: nowRound,
            selectedLeague: data3,
            hallOfFameSelectedDay: nowRound
        })

        this.checkLandscape()

        this.interval = setInterval(
            () => this.clocify(),
            12000
        );
    }

    clocify() {
        this.setState({
            nowDateAndTime: humanReadDateAndTime()
        });
    }

    checkPlayersOnField = () => {
        if (this.state.selectedLeague == "euroLeague") {
            const calculatedPickData = checkEligibilityForPickTeam(this.state.selectedLeague, this.state.euroLeagueData.fantasyUsers, this.state.bitrulez, this.state.selectedDay, this.state.nowDateAndTime, this.state.euroLeagueData.teamsByDay, this.state.euroLeagueData.basketballPlayers)
            this.setState({
                teamPickData: calculatedPickData.teamPickData,
                teamPickLockData: calculatedPickData.teamPickLockData,
                teamPickDayTotal: calculatedPickData.totalSummaSummarum,
                calculatedFirstFiveRealLifeStatsTotals: calculatedPickData.calculatedFirstFiveRealLifeStatsTotals,
                calculatedFirstFiveFantasyPointsStatsTotals: calculatedPickData.calculatedFirstFiveFantasyPointsStatsTotals,
            })
        } else if (this.state.selectedLeague == "euroCup") {
            const calculatedPickData = checkEligibilityForPickTeam(this.state.selectedLeague, this.state.euroCupData.fantasyUsers, this.state.bitrulez, this.state.selectedDay, this.state.nowDateAndTime, this.state.euroCupData.teamsByDay, this.state.euroCupData.basketballPlayers)
            this.setState({
                teamPickData: calculatedPickData.teamPickData,
                teamPickLockData: calculatedPickData.teamPickLockData,
                teamPickDayTotal: calculatedPickData.totalSummaSummarum,
                calculatedFirstFiveRealLifeStatsTotals: calculatedPickData.calculatedFirstFiveRealLifeStatsTotals,
                calculatedFirstFiveFantasyPointsStatsTotals: calculatedPickData.calculatedFirstFiveFantasyPointsStatsTotals,
            })
        }

    }
    changeGameData = () => {
        if (this.state.selectedLeague == "euroLeague") {
            this.setState({
                basketballPlayers: this.state.euroLeagueData.basketballPlayers,
                teamsByDay: this.state.euroLeagueData.teamsByDay,
                fantasyUsers: this.state.euroLeagueData.fantasyUsers,
                teamPickData: {
                    Player1Id: null,
                    Player2Id: null,
                    Player3Id: null,
                    Player4Id: null,
                    Player5Id: null,
                    Player6Id: null,
                    Player7Id: null,
                    isSubmitted: false
                },
                teamPickLockData: {
                    Player1Id: null,
                    Player2Id: null,
                    Player3Id: null,
                    Player4Id: null,
                    Player5Id: null,
                    Player6Id: null,
                    Player7Id: null,
                },
                teamPickDayTotal: null,
                userTotalRoundPoints: 0,
                userAvgRoundPointsPerGame: 0,
            })
        } else if (this.state.selectedLeague == "euroCup") {
            this.setState({
                basketballPlayers: this.state.euroCupData.basketballPlayers,
                teamsByDay: this.state.euroCupData.teamsByDay,
                fantasyUsers: this.state.euroCupData.fantasyUsers,
                teamPickData: {
                    Player1Id: null,
                    Player2Id: null,
                    Player3Id: null,
                    Player4Id: null,
                    Player5Id: null,
                    Player6Id: null,
                    Player7Id: null,
                    isSubmitted: false
                },
                teamPickLockData: {
                    Player1Id: null,
                    Player2Id: null,
                    Player3Id: null,
                    Player4Id: null,
                    Player5Id: null,
                    Player6Id: null,
                    Player7Id: null,
                },
                teamPickDayTotal: null,
                userTotalRoundPoints: 0,
                userAvgRoundPointsPerGame: 0,
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedDay !== this.state.selectedDay && this.state.showTeam && !this.state.isInitialLoading) {
            this.checkPlayersOnField()
        }
        // if (prevState.dropdowns === null && this.state.dropdowns !== null) {
        //     this.calculateUsersRoundPoints()
        // }
        this.checkLandscape()

        if (prevState.selectedLeague !== this.state.selectedLeague) {
            let data3 = this.state.selectedLeague
            const nowDate = humanReadDateAndTime().humanDate
            const nowRound = calculateNowRound(nowDate, data3)
            this.setState({
                selectedDay: nowRound
            })
            this.changeGameData()
        }
        if (prevState.isInitialLoading && !this.state.isInitialLoading) {
            this.changeGameData()
        }
        if (prevState.basketballPlayers !== this.state.basketballPlayers) {
            this.checkPlayersOnField()
        }
    }
    checkLandscape = () => {
        if (this.state.isLandscape) {
            if (window.innerHeight > window.innerWidth) {
                this.setState({
                    isLandscape: false,
                })
            }
        } else {
            if (window.innerHeight < window.innerWidth) {
                this.setState({
                    isLandscape: true,
                })
            }
        }
    }
    changeSelectedTeam = (data) => {
        this.setState({
            teamSelected: data,
            selectPlayerSearchValue: ""
        })
    }

    render() {
        return (
            <>
                {this.state.isLandscape &&
                    <>
                        <AppContext.Provider value={{
                            ...this.state,
                            getFantasyDataContext: this.getFantasyDataContext,
                            toggleShowSelectDayDashboard: this.toggleShowSelectDayDashboard,
                            goBackToTeamView: this.goBackToTeamView,
                            changeSelectedDay: this.changeSelectedDay,
                            changeSelectedTeam: this.changeSelectedTeam,
                            showSinglePlayerModal: this.showSinglePlayerModal,
                            closeSinglePlayerModal: this.closeSinglePlayerModal,
                            choosePlayerForTeam: this.choosePlayerForTeam,
                            pickPlayerForTeam: this.pickPlayerForTeam,
                            depositUserKey: this.depositUserKey,
                            teamPickIsSubmitted: this.teamPickIsSubmitted,
                            depositSelectPlayerSearchValue: this.depositSelectPlayerSearchValue,
                            depositHallOfFameSelectedDay: this.depositHallOfFameSelectedDay,
                            depositIsHallOfFame: this.depositIsHallOfFame,
                            depositIsNotHallOfFame: this.depositIsNotHallOfFame,
                            depositSelectedLeague: this.depositSelectedLeague
                        }}>

                            {this.props.children}
                        </AppContext.Provider >
                    </>
                }
                {!this.state.isLandscape &&
                    !this.state.isSerbische &&
                    <div className="landscape-message">
                        <h3>Sportske Fantasy advises you:</h3>
                        <h1>Rotate your phone<br />
                            to LANDSCAPE mode
                            <br />
                            <br />
                            <i>or even better <br />
                                play it on normal computer</i>

                        </h1>
                        <button type="button" className="btn btn-outline-danger" data-language="serbische" onClick={this.changeIsSerbische}>Daj na srpskom</button>
                    </div>}

                {!this.state.isLandscape &&
                    this.state.isSerbische &&
                    <div className="landscape-message">
                        <h3>Sportske Fantazi <br /> te savetuju:</h3>
                        <h1>Rotiraj svoj telefon<br />
                            da bude u "LANDSCAPE" modu
                            <br />
                            <br />
                            <i> ili još bolje, <br />
                                da ugođaj bude potpun<br />
                                igraj na računaru</i>
                        </h1>
                        <button type="button" className="btn btn-outline-danger" data-language="english" onClick={this.changeIsSerbische}>English please</button>
                    </div>}
            </>
        )
    }
}