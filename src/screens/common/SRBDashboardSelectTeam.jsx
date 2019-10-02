import React from 'react';
import { AppContext } from '../..//screens/_context/AppContext';

class SRBDashboardSelectTeam extends React.Component {
    static contextType = AppContext;
    state = {
    }

    depositSelectedTeam = (event) => {
        const isClickable = event.target.getAttribute("data-is-clickable")
        const selectedTeam = event.target.getAttribute("data-selected-team")
        if (isClickable === "true") {
            this.context.changeSelectedTeam(selectedTeam)
        }
    }

    mapEligibleTeams = () => {
        const selectedDay = this.context.selectedDay
        const teamsByDay = this.context.teamsByDay
        const nowDateAndTime = this.context.nowDateAndTime
        const vector = ["ASSECO ARKA GDYNIA", "BUDUCNOST VOLI PODGORICA", "DARUSSAFAKA TEKFEN ISTANBUL", "DOLOMITI ENERGIA TRENTO", "EWE BASKETS OLDENBURG", "GALATASARAY DOGA SIGORTA ISTANBUL", "LIMOGES CSP", "LOKOMOTIV KUBAN KRASNODAR", "PARTIZAN NIS BELGRADE", "RATIOPHARM ULM", "ALBA BERLIN", "ANADOLU EFES ISTANBUL", "AX ARMANI EXCHANGE MILAN", "CRVENA ZVEZDA MTS BELGRADE", "CSKA MOSCOW", "FC BARCELONA", "FC BAYERN MUNICH", "FENERBAHCE BEKO ISTANBUL", "MACCABI FOX TEL AVIV", "OLYMPIACOS PIRAEUS", "PANATHINAIKOS OPAP ATHENS", "REAL MADRID", "VALENCIA BASKET", "ZALGIRIS KAUNAS", "ZENIT ST PETERSBURG"]
        const notVector = ["AS MONACO", "CEDEVITA OLIMPIJA LJUBLJANA", "GERMANI BRESCIA LEONESSA", "JOVENTUT BADALONA", "MACCABI RISHON LEZION", "MORABANC ANDORRA", "NANTERRE 92", "PROMITHEAS PATRAS", "RYTAS VILNIUS", "SEGAFREDO VIRTUS BOLOGNA", "TOFAS BURSA", "UMANA REYER VENICE", "UNICAJA MALAGA", "UNICS KAZAN", "KHIMKI MOSCOW REGION", "KIROLBET BASKONIA VITORIA-GASTEIZ", "LDLC ASVEL VILLEURBANNE"]
        if (Array.isArray(teamsByDay)) {
            const roundData = teamsByDay.filter((round) => {
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
                    const outputElements = []

                    roundData[0].day1.forEach((team) => {
                        outputElements.push(team)
                    })
                    roundData[0].day2.forEach((team) => {
                        outputElements.push(team)
                    })
                    return outputElements.map((team, index) => {
                        const isVector = vector.indexOf(team.name)
                        const isPng = notVector.indexOf(team.name)

                        return <button key={team.name + index} type="button" className={`btn d-flex align-items-center btn-outline-light ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`true`} onClick={this.depositSelectedTeam}>
                            <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`true`}>
                                {isVector !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.svg`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`true`} />
                                }
                                {isPng !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.png`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`true`} />
                                }
                            </span>
                            <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`true`}>
                                {team.name}
                            </span>
                        </button>
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
                    return outputElements.map((team, index) => {
                        const isVector = vector.indexOf(team.name)
                        const isPng = notVector.indexOf(team.name)

                        return <button key={team.name + index} type="button" className={`btn d-flex align-items-center btn-outline-light ${team.isEligible ? "btn-outline-light" : "btn-outline-dark"} ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} onClick={this.depositSelectedTeam}>
                            <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`}>
                                {isVector !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.svg`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} />
                                }
                                {isPng !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.png`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} />
                                }
                            </span>
                            <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`}>
                                {team.name}
                            </span>
                        </button>
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
                    return outputElements.map((team, index) => {
                        const isVector = vector.indexOf(team.name)
                        const isPng = notVector.indexOf(team.name)

                        return <button key={team.name + index} type="button" className={`btn d-flex align-items-center btn-outline-light ${team.isEligible ? "btn-outline-light" : "btn-outline-dark"} ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} onClick={this.depositSelectedTeam}>
                            <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`}>
                                {isVector !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.svg`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} />
                                }
                                {isPng !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.png`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} />
                                }
                            </span>
                            <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`}>
                                {team.name}
                            </span>
                        </button>
                    })
                } else {
                    const outputElements = []

                    roundData[0].day1.forEach((team) => {
                        outputElements.push(team)
                    })
                    roundData[0].day2.forEach((team) => {
                        outputElements.push(team)
                    })
                    return outputElements.map((team, index) => {
                        const isVector = vector.indexOf(team.name)
                        const isPng = notVector.indexOf(team.name)
                        return <button key={team.name + index} type="button" className={`btn d-flex align-items-center btn-outline-dark ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`false`} onClick={this.depositSelectedTeam}>
                            <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`false`}>
                                {isVector !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.svg`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`false`} />
                                }
                                {isPng !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.png`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`false`} />
                                }
                            </span>
                            <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`false`}>
                                {team.name}
                            </span>
                        </button>
                    })
                }
            } else {
                if (nowMonthIndex < roundMonthIndex) {
                    const outputElements = []

                    roundData[0].day1.forEach((team) => {
                        outputElements.push(team)
                    })
                    roundData[0].day2.forEach((team) => {
                        outputElements.push(team)
                    })
                    return outputElements.map((team, index) => {
                        const isVector = vector.indexOf(team.name)
                        const isPng = notVector.indexOf(team.name)

                        return <button key={team.name + index} type="button" className={`btn d-flex align-items-center btn-outline-light ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`true`} onClick={this.depositSelectedTeam}>
                            <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`true`}>
                                {isVector !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.svg`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`true`} />
                                }
                                {isPng !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.png`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`true`} />
                                }
                            </span>
                            <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`true`}>
                                {team.name}
                            </span>
                        </button>
                    })
                } else if (nowMonthIndex > roundMonthIndex) {
                    const outputElements = []

                    roundData[0].day1.forEach((team) => {
                        outputElements.push(team)
                    })
                    roundData[0].day2.forEach((team) => {
                        outputElements.push(team)
                    })
                    return outputElements.map((team, index) => {
                        const isVector = vector.indexOf(team.name)
                        const isPng = notVector.indexOf(team.name)
                        return <button key={team.name + index} type="button" className={`btn d-flex align-items-center btn-outline-dark ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`false`} onClick={this.depositSelectedTeam}>
                            <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`false`}>
                                {isVector !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.svg`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`false`} />
                                }
                                {isPng !== -1 &&
                                    <img className="img-fluid" src={require(`../../images/flags/${team.name}.png`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`false`} />
                                }
                            </span>
                            <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`false`}>
                                {team.name}
                            </span>
                        </button>
                    })
                } else if (nowMonthIndex == roundMonthIndex) {
                    if (parseInt(nowDay, 10) < parseInt(roundDays[0], 10)) {
                        const outputElements = []

                        roundData[0].day1.forEach((team) => {
                            outputElements.push(team)
                        })
                        roundData[0].day2.forEach((team) => {
                            outputElements.push(team)
                        })
                        return outputElements.map((team, index) => {
                            const isVector = vector.indexOf(team.name)
                            const isPng = notVector.indexOf(team.name)

                            return <button key={team.name + index} type="button" className={`btn d-flex align-items-center btn-outline-light ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`true`} onClick={this.depositSelectedTeam}>
                                <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`true`}>
                                    {isVector !== -1 &&
                                        <img className="img-fluid" src={require(`../../images/flags/${team.name}.svg`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`true`} />
                                    }
                                    {isPng !== -1 &&
                                        <img className="img-fluid" src={require(`../../images/flags/${team.name}.png`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`true`} />
                                    }
                                </span>
                                <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`true`}>
                                    {team.name}
                                </span>
                            </button>
                        })
                    } else if (parseInt(nowDay, 10) > parseInt(roundDays[1], 10)) {
                        const outputElements = []

                        roundData[0].day1.forEach((team) => {
                            outputElements.push(team)
                        })
                        roundData[0].day2.forEach((team) => {
                            outputElements.push(team)
                        })
                        return outputElements.map((team, index) => {
                            const isVector = vector.indexOf(team.name)
                            const isPng = notVector.indexOf(team.name)

                            return <button key={team.name + index} type="button" className={`btn d-flex align-items-center btn-outline-dark ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`false`} onClick={this.depositSelectedTeam}>
                                <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`false`}>
                                    {isVector !== -1 &&
                                        <img className="img-fluid" src={require(`../../images/flags/${team.name}.svg`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`false`} />
                                    }
                                    {isPng !== -1 &&
                                        <img className="img-fluid" src={require(`../../images/flags/${team.name}.png`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`false`} />
                                    }
                                </span>
                                <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`false`}>
                                    {team.name}
                                </span>
                            </button>
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
                        return outputElements.map((team, index) => {
                            const isVector = vector.indexOf(team.name)
                            const isPng = notVector.indexOf(team.name)

                            return <button key={team.name + index} type="button" className={`btn d-flex align-items-center btn-outline-light ${team.isEligible ? "btn-outline-light" : "btn-outline-dark"} ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} onClick={this.depositSelectedTeam}>
                                <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`}>
                                    {isVector !== -1 &&
                                        <img className="img-fluid" src={require(`../../images/flags/${team.name}.svg`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} />
                                    }
                                    {isPng !== -1 &&
                                        <img className="img-fluid" src={require(`../../images/flags/${team.name}.png`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} />
                                    }
                                </span>
                                <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`}>
                                    {team.name}
                                </span>
                            </button>
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
                        return outputElements.map((team, index) => {
                            const isVector = vector.indexOf(team.name)
                            const isPng = notVector.indexOf(team.name)

                            return <button key={team.name + index} type="button" className={`btn d-flex align-items-center btn-outline-light ${team.isEligible ? "btn-outline-light" : "btn-outline-dark"} ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} onClick={this.depositSelectedTeam}>
                                <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`}>
                                    {isVector !== -1 &&
                                        <img className="img-fluid" src={require(`../../images/flags/${team.name}.svg`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} />
                                    }
                                    {isPng !== -1 &&
                                        <img className="img-fluid" src={require(`../../images/flags/${team.name}.png`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`} />
                                    }
                                </span>
                                <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`${team.isEligible}`}>
                                    {team.name}
                                </span>
                            </button>
                        })
                    }
                }
            }
        }
    }
    sendSelectPlayerSearchValue = (event) => {
        const data = event.target.value
        this.context.depositSelectPlayerSearchValue(data)
    }
    render() {
        return (
            <section className={`dashboard-select-team-container d-flex flex-column justify align-items-start ${this.context.showSelectTeamDashboard ? "show-selected-team" : ""}`}>
                <button type="button" className={`btn btn-outline-light select-all ${this.context.teamSelected === "all-eligible-teams" ? "is-selected" : ""}`} data-selected-team="all-eligible-teams" data-is-clickable="true" onClick={this.depositSelectedTeam}><i data-selected-team="all-eligible-teams" data-is-clickable="true">Svi kvalifikovani košarkaši</i></button>
                <div className="dashboard-select-team-list-wrapper">
                <input value={this.context.selectPlayerSearchValue} onChange={this.sendSelectPlayerSearchValue} type="search" placeholder="Pretraži po imenu"/>
                    {this.mapEligibleTeams()}
                </div>
            </section>
        )
    }
}

export default SRBDashboardSelectTeam