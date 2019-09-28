import React from 'react';
import { AppContext } from '../..//screens/_context/AppContext';

class DashboardSelectTeam extends React.Component {
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
        const teamsToRender = []
        const vector = ["ASSECO ARKA GDYNIA","BUDUCNOST VOLI PODGORICA", "DARUSSAFAKA TEKFEN ISTANBUL", "DOLOMITI ENERGIA TRENTO", "EWE BASKETS OLDENBURG", "GALATASARAY DOGA SIGORTA ISTANBUL", "LIMOGES CSP","LOKOMOTIV KUBAN KRASNODAR","PARTIZAN NIS BELGRADE","RATIOPHARM ULM", "ALBA BERLIN", "ANADOLU EFES ISTANBUL","AX ARMANI EXCHANGE MILAN","CRVENA ZVEZDA MTS BELGRADE","CSKA MOSCOW","FC BARCELONA","FC BAYERN MUNICH","FENERBAHCE BEKO ISTANBUL","MACCABI FOX TEL AVIV","OLYMPIACOS PIRAEUS","PANATHINAIKOS OPAP ATHENS","REAL MADRID","VALENCIA BASKET","ZALGIRIS KAUNAS","ZENIT ST PETERSBURG"] 
        if (Array.isArray(teamsByDay)) {
            const roundData = teamsByDay.filter((round) => {
                if (round.roundName == selectedDay) {
                    return round
                }
            })
            //izuzetak
            //euroLeague && "ROUND-6"
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


            if (this.context.selectedLeague == "euroLeague" && selectedDay == "ROUND-6") {
                // console.log("ROUND-6, EuroLeague")
            } else {

            }

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

                    return <button key={team.name + index} type="button" className={`btn d-flex align-items-center btn-outline-light ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`true`} onClick={this.depositSelectedTeam}>
                        <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`true`}>
                            <img className="img-fluid" src={require(`../../images/flags/${team.name}.${isVector !== -1?"svg":"png"}`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`true`} />
                        </span>
                        <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`true`}>
                            {team.name}
                        </span>
                    </button>
                })
            }



            // console.log(roundMonth, nowMonth, roundDays,nowDay)

            // console.log(roundData)
            // return roundData.map((team, index) => {
            //     let isEligible = true
            // if (selectedDay === this.context.nowDateAndTime.humanDate) {
            //     const teamHour = parseInt(team.gameStart.split(":")[0])
            //     const teamMinutes = parseInt(team.gameStart.split(":")[1])
            //     const nowHour = parseInt(this.context.nowDateAndTime.humanTime.split(":")[0])
            //     const nowMinutes = parseInt(this.context.nowDateAndTime.humanTime.split(":")[1])
            //     if (nowHour > teamHour) {
            //         isEligible = false
            //     } else if (nowHour === teamHour) {
            //         if (nowMinutes >= teamMinutes) {
            //             isEligible = false
            //         }
            //     }
            // } 
            // else {
            //     const possibleMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            //     if (possibleMonths.indexOf(selectedDay.split("-")[1]) < possibleMonths.indexOf(this.context.nowDateAndTime.humanDate.split("-")[1])) {
            //         isEligible = false
            //     } else if (possibleMonths.indexOf(selectedDay.split("-")[1]) === possibleMonths.indexOf(this.context.nowDateAndTime.humanDate.split("-")[1])) {
            //         if (selectedDay.split("-")[0].length < this.context.nowDateAndTime.humanDate.split("-")[0].length) {
            //             isEligible = false
            //         } else if (selectedDay.split("-")[0].length === this.context.nowDateAndTime.humanDate.split("-")[0].length && selectedDay.split("-")[0].length === 3) {
            //             if (selectedDay.split("-")[0][0] < this.context.nowDateAndTime.humanDate.split("-")[0][0]) {
            //                 isEligible = false
            //             }
            //         } else if (selectedDay.split("-")[0].length === this.context.nowDateAndTime.humanDate.split("-")[0].length && selectedDay.split("-")[0].length === 4) {
            //             let selectedDayNumber = parseInt(selectedDay.split("-")[0][0] + selectedDay.split("-")[0][1], 10)
            //             let nowDateNumber = parseInt(this.context.nowDateAndTime.humanDate.split("-")[0][0] + this.context.nowDateAndTime.humanDate.split("-")[0][1], 10)
            //             if (selectedDayNumber < nowDateNumber) {
            //                 isEligible = false
            //             }
            //         }
            //     }
            // }

            //         return <button key={team.name + index} type="button" className={`btn d-flex align-items-center ${isEligible ? "btn-outline-light" : "btn-outline-dark"} ${this.context.teamSelected === `${team.name}` ? "is-selected" : ""}`} data-selected-team={`${team.name}`} data-is-clickable={`${isEligible}`} onClick={this.depositSelectedTeam}>
            //             <span className="team-image-wrapper" data-selected-team={`${team.name}`} data-is-clickable={`${isEligible}`}>
            //                 {/* <img className="img-fluid" src={require(`../../images/flags/Flag of ${team.name}.png`)} alt={`${team.name}`} data-selected-team={`${team.name}`} data-is-clickable={`${isEligible}`} /> */}
            //             </span>
            //             <span className="team-title" data-selected-team={`${team.name}`} data-is-clickable={`${isEligible}`}>
            //                 {team.name}
            //             </span>
            //         </button>
            //     })
            // } else {
            //     return <div className="na-message">
            //         {teamsByDay[selectedDay]}
            //     </div>
        }
    }
    sendSelectPlayerSearchValue = (event) => {
        const data = event.target.value
        this.context.depositSelectPlayerSearchValue(data)
    }
    render() {
        return (
            <section className={`dashboard-select-team-container d-flex flex-column justify align-items-start ${this.context.showSelectTeamDashboard ? "show-selected-team" : ""}`}>
                <button type="button" className={`btn btn-outline-light select-all ${this.context.teamSelected === "all-eligible-teams" ? "is-selected" : ""}`} data-selected-team="all-eligible-teams" data-is-clickable="true" onClick={this.depositSelectedTeam}><i data-selected-team="all-eligible-teams" data-is-clickable="true">All eligible players</i></button>
                <div className="dashboard-select-team-list-wrapper">
                    <input value={this.context.selectPlayerSearchValue} onChange={this.sendSelectPlayerSearchValue} type="search" placeholder="Search player by name" />
                    {this.mapEligibleTeams()}
                </div>
            </section>
        )
    }
}

export default DashboardSelectTeam