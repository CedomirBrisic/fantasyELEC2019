import calculateBasketballPlayerTDFantasyPoints from "./calculateBasketballPlayerTDFantasyPoints";
const possiblePlayerIds = ["Player1Id", "Player2Id", "Player3Id", "Player4Id", "Player5Id", "Player6Id", "Player7Id"]

const checkEligibilityForPickTeam = (selectedLeague, fantasyUsers, username, selectedDay, nowDateAndTime, teamsByDay, basketballPlayers) => {
    const userData = fantasyUsers.filter((user) => {
        if (user.username === username) {
            return user
        }
    })
    const teamPickData = {
        Player1Id: userData[0][selectedDay].Player1Id,
        Player2Id: userData[0][selectedDay].Player2Id,
        Player3Id: userData[0][selectedDay].Player3Id,
        Player4Id: userData[0][selectedDay].Player4Id,
        Player5Id: userData[0][selectedDay].Player5Id,
        Player6Id: userData[0][selectedDay].Player6Id,
        Player7Id: userData[0][selectedDay].Player7Id,
        isSubmitted: userData[0][selectedDay].isSubmitted,
    }

    const teamPickDataByPoints = [{
            playerObjectKey: "Player1Id",
            id: userData[0][selectedDay].Player1Id,
            summaSummarum: null
        },
        {
            playerObjectKey: "Player2Id",
            id: userData[0][selectedDay].Player2Id,
            summaSummarum: null
        },
        {
            playerObjectKey: "Player3Id",
            id: userData[0][selectedDay].Player3Id,
            summaSummarum: null
        },
        {
            playerObjectKey: "Player4Id",
            id: userData[0][selectedDay].Player4Id,
            summaSummarum: null
        },
        {
            playerObjectKey: "Player5Id",
            id: userData[0][selectedDay].Player5Id,
            summaSummarum: null
        },
        {
            playerObjectKey: "Player6Id",
            id: userData[0][selectedDay].Player6Id,
            summaSummarum: null
        },
        {
            playerObjectKey: "Player7Id",
            id: userData[0][selectedDay].Player7Id,
            summaSummarum: null
        },
    ]

    const teamPickLockData = {
        Player1Id: null,
        Player2Id: null,
        Player3Id: null,
        Player4Id: null,
        Player5Id: null,
        Player6Id: null,
        Player7Id: null,
    }

    if (teamPickData.isSubmitted) {
        possiblePlayerIds.forEach((playerId, index) => {
            const playerData = basketballPlayers.filter((player) => {
                if (player._id.$oid === teamPickData[playerId]) {
                    return player
                }
            })
            teamPickDataByPoints[index].summaSummarum = parseFloat(calculateBasketballPlayerTDFantasyPoints(playerData[0], selectedDay).summaSummarum)
            const playerTeam = playerData[0].team







            // const teamData = teamsByDay[selectedDay].filter((team, index) => {
            //     if (team.name === playerTeam) {
            //         return team
            //     }
            // })
            let roundData = null
            teamsByDay.forEach((round) => {
                if (round.roundName == selectedDay) {
                    roundData = round
                }
            })


            let teamGameStartData = null
            let teamGameStartMonth = null
            let teamGameStartDay = null
            let teamGameStartHour = null
            let teamGameStartMinute = null
            roundData.day1.forEach((team) => {
                if (team.name == playerTeam) {
                    teamGameStartData = team
                    teamGameStartMonth = roundData.date.split(" ")[0]
                    teamGameStartDay = roundData.date.split(" ")[1].split("-")[0]
                    teamGameStartHour = teamGameStartData.gameStart.split(":")[0]
                    teamGameStartMinute = teamGameStartData.gameStart.split(":")[1]
                }
            })
            roundData.day2.forEach((team) => {
                if (team.name == playerTeam) {
                    teamGameStartData = team
                    teamGameStartMonth = roundData.date.split(" ")[0]
                    teamGameStartDay = roundData.date.split(" ")[1].split("-")[1]
                    teamGameStartHour = teamGameStartData.gameStart.split(":")[0]
                    teamGameStartMinute = teamGameStartData.gameStart.split(":")[1]
                }
            })


            const possibleMonths = ["October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August", "September"]
            const nowMonth = nowDateAndTime.humanDate.split("-")[1]
            const nowDayRaw = nowDateAndTime.humanDate.split("-")[0]
            const nowHour = parseInt(nowDateAndTime.humanTime.split(":")[0], 10)
            const nowMinutes = parseInt(nowDateAndTime.humanTime.split(":")[1], 10)
            let nowDay = ""
            if (nowDayRaw.length == 3) {
                nowDay = nowDayRaw[0]
            } else if (nowDayRaw.length == 4) {
                nowDay = nowDayRaw[0] + nowDayRaw[1]
            }

            const teamMonthIndex = possibleMonths.indexOf(teamGameStartMonth)
            const nowMonthIndex = possibleMonths.indexOf(nowMonth)

            if (selectedDay == "ROUND-6" && selectedLeague == "euroLeague") {
                if (nowMonth == "October" && nowDay !== "31") {
                    teamPickLockData[playerId] = false
                } else if (nowMonth == "October" && nowDay == "31") {
                    if (nowHour < teamGameStartHour) {
                        teamPickLockData[playerId] = false
                    } else if (nowHour > teamGameStartHour) {
                        teamPickLockData[playerId] = true
                    } else if (nowHour == teamGameStartHour) {
                        if (nowMinutes < teamGameStartMinute) {
                            teamPickLockData[playerId] = false
                        } else {
                            teamPickLockData[playerId] = true
                        }
                    }
                } else if (nowMonth == "November" && nowDay == "1") {
                    if (nowHour < teamGameStartHour) {
                        teamPickLockData[playerId] = false
                    } else if (nowHour > teamGameStartHour) {
                        teamPickLockData[playerId] = true
                    } else if (nowHour == teamGameStartHour) {
                        if (nowMinutes < teamGameStartMinute) {
                            teamPickLockData[playerId] = false
                        } else {
                            teamPickLockData[playerId] = true
                        }
                    }
                } else {
                    teamPickLockData[playerId] = true
                }


            } else {
                if (nowMonthIndex < teamMonthIndex) {
                    teamPickLockData[playerId] = false
                } else if (nowMonthIndex > teamMonthIndex) {
                    teamPickLockData[playerId] = true
                } else if (nowMonthIndex == teamMonthIndex) {
                    if (parseInt(nowDay, 10) < parseInt(teamGameStartDay, 10)) {
                        teamPickLockData[playerId] = false
                    } else if (parseInt(nowDay, 10) > parseInt(teamGameStartDay, 10)) {
                        teamPickLockData[playerId] = true
                    } else if (parseInt(nowDay, 10) == parseInt(teamGameStartDay, 10)) {
                        if (nowHour < teamGameStartHour) {
                            teamPickLockData[playerId] = false
                        } else if (nowHour > teamGameStartHour) {
                            teamPickLockData[playerId] = true
                        } else if (nowHour == teamGameStartHour) {
                            if (nowMinutes < teamGameStartMinute) {
                                teamPickLockData[playerId] = false
                            } else {
                                teamPickLockData[playerId] = true
                            }
                        }
                    }
                }
            }
        })
    }



    const teamPickDataByPointsIds = []
    teamPickDataByPoints.forEach((player) => {
        if (!!player.summaSummarum) {
            teamPickDataByPointsIds.push(player)
        }
    })
    teamPickDataByPoints.forEach((player) => {
        if (!player.summaSummarum) {
            teamPickDataByPointsIds.push(player)
        }
    })
    teamPickDataByPointsIds.sort(function (a, b) {
        return b.summaSummarum - a.summaSummarum
    })





    const outputTeamPickData = {
        Player1Id: teamPickDataByPointsIds[0].id,
        Player2Id: teamPickDataByPointsIds[1].id,
        Player3Id: teamPickDataByPointsIds[2].id,
        Player4Id: teamPickDataByPointsIds[3].id,
        Player5Id: teamPickDataByPointsIds[4].id,
        Player6Id: teamPickDataByPointsIds[5].id,
        Player7Id: teamPickDataByPointsIds[6].id,
        isSubmitted: teamPickData.isSubmitted,
    }

    const outputTeamPickLockData = {
        Player1Id: teamPickLockData[teamPickDataByPointsIds[0].playerObjectKey],
        Player2Id: teamPickLockData[teamPickDataByPointsIds[1].playerObjectKey],
        Player3Id: teamPickLockData[teamPickDataByPointsIds[2].playerObjectKey],
        Player4Id: teamPickLockData[teamPickDataByPointsIds[3].playerObjectKey],
        Player5Id: teamPickLockData[teamPickDataByPointsIds[4].playerObjectKey],
        Player6Id: teamPickLockData[teamPickDataByPointsIds[5].playerObjectKey],
        Player7Id: teamPickLockData[teamPickDataByPointsIds[6].playerObjectKey],
    }


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
        // freeThrowsAttempts:0,
        // freeThrowsScored:0,
        // twoPointsAttempts:0,
        // twoPointsScored:0,
        // threePointsAttempts:0,
        // threePointsScored:0
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

    let totalSummaSummarum = 0;
    for (let i = 1; i < 6; i++) {
        const playerData = basketballPlayers.filter((player) => {
            if (player._id.$oid === outputTeamPickData[`Player${i}Id`]) {
                return player
            }
        })
        if (playerData[0]) {
            //FANTASY POINTS STATS
            const playerFantasyPointsData = calculateBasketballPlayerTDFantasyPoints(playerData[0], selectedDay)
            if (playerFantasyPointsData.gameWin !== "n/a") {
                calculatedFirstFiveFantasyPointsStatsTotals.gameWins += parseFloat(playerFantasyPointsData.gameWin)
            }
            if (playerFantasyPointsData.assists !== "n/a") {
                calculatedFirstFiveFantasyPointsStatsTotals.assists += parseFloat(playerFantasyPointsData.assists)
            }
            if (playerFantasyPointsData.rebounds !== "n/a") {
                calculatedFirstFiveFantasyPointsStatsTotals.rebounds += parseFloat(playerFantasyPointsData.rebounds)
            }
            if (playerFantasyPointsData.blocks !== "n/a") {
                calculatedFirstFiveFantasyPointsStatsTotals.blocks += parseFloat(playerFantasyPointsData.blocks)
            }
            if (playerFantasyPointsData.steals !== "n/a") {
                calculatedFirstFiveFantasyPointsStatsTotals.steals += parseFloat(playerFantasyPointsData.steals)
            }
            if (playerFantasyPointsData.turnovers !== "n/a") {
                calculatedFirstFiveFantasyPointsStatsTotals.turnovers += parseFloat(playerFantasyPointsData.turnovers)
            }
            if (playerFantasyPointsData.freeThrowsPoints !== "n/a") {
                calculatedFirstFiveFantasyPointsStatsTotals.freeThrows += parseFloat(playerFantasyPointsData.freeThrowsPoints)
            }
            if (playerFantasyPointsData.freeThrowsPointsBonus !== "-") {
                calculatedFirstFiveFantasyPointsStatsTotals.freeThrowsBonuses += parseFloat(playerFantasyPointsData.freeThrowsPointsBonus)
            }
            if (playerFantasyPointsData.freeThrowsPointsPenalty !== "-") {
                calculatedFirstFiveFantasyPointsStatsTotals.freeThrowsPenalties += parseFloat(playerFantasyPointsData.freeThrowsPointsPenalty)
            }
            if (playerFantasyPointsData.twoPoints !== "n/a") {
                calculatedFirstFiveFantasyPointsStatsTotals.twoPoints += parseFloat(playerFantasyPointsData.twoPoints)
            }
            if (playerFantasyPointsData.twoPointsBonus !== "-") {
                calculatedFirstFiveFantasyPointsStatsTotals.twoPointsBonuses += parseFloat(playerFantasyPointsData.twoPointsBonus)
            }
            if (playerFantasyPointsData.twoPointsPenalty !== "-") {
                calculatedFirstFiveFantasyPointsStatsTotals.twoPointsPenalties += parseFloat(playerFantasyPointsData.twoPointsPenalty)
            }
            if (playerFantasyPointsData.threePoints !== "n/a") {
                calculatedFirstFiveFantasyPointsStatsTotals.threePoints += parseFloat(playerFantasyPointsData.threePoints)
            }
            if (playerFantasyPointsData.threePointsBonus !== "-") {
                calculatedFirstFiveFantasyPointsStatsTotals.threePointsBonuses += parseFloat(playerFantasyPointsData.threePointsBonus)
            }
            if (playerFantasyPointsData.threePointsPenalty !== "-") {
                calculatedFirstFiveFantasyPointsStatsTotals.threePointsPenalties += parseFloat(playerFantasyPointsData.threePointsPenalty)
            }
            if (playerFantasyPointsData.summaSummarum !== "N/A") {
                totalSummaSummarum += parseFloat(playerFantasyPointsData.summaSummarum)
            }


            // REAL LIFE STATS
            if (playerData[0][selectedDay].assists !== "n/a") {
                calculatedFirstFiveRealLifeStatsTotals.assists += parseInt(playerData[0][selectedDay].assists, 10)
            }
            if (playerData[0][selectedDay].rebounds !== "n/a") {
                calculatedFirstFiveRealLifeStatsTotals.rebounds += parseInt(playerData[0][selectedDay].rebounds, 10)
            }
            if (playerData[0][selectedDay].blocks !== "n/a") {
                calculatedFirstFiveRealLifeStatsTotals.blocks += parseInt(playerData[0][selectedDay].blocks, 10)
            }
            if (playerData[0][selectedDay].steals !== "n/a") {
                calculatedFirstFiveRealLifeStatsTotals.steals += parseInt(playerData[0][selectedDay].steals, 10)
            }
            if (playerData[0][selectedDay].turnovers !== "n/a") {
                calculatedFirstFiveRealLifeStatsTotals.turnovers += parseInt(playerData[0][selectedDay].turnovers, 10)
            }
            if (playerData[0][selectedDay].freeThrowScored !== "n") {
                calculatedFirstFiveRealLifeStatsTotals.freeThrows += parseInt(playerData[0][selectedDay].freeThrowScored, 10)
            }
            // if (playerData[0][selectedDay].freeThrowAttempts !== "a") {
            //     calculatedFirstFiveRealLifeStatsTotals.freeThrowsAttempts += parseInt(playerData[0][selectedDay].freeThrowAttempts, 10)
            // }
            // if (playerData[0][selectedDay].freeThrowScored !== "n") {
            //     calculatedFirstFiveRealLifeStatsTotals.freeThrowsScored += parseInt(playerData[0][selectedDay].freeThrowScored, 10)
            // }

            if (playerData[0][selectedDay].fieldGoalsScored !== "n") {
                calculatedFirstFiveRealLifeStatsTotals.twoPoints += parseInt(playerData[0][selectedDay].fieldGoalsScored, 10) * 2
            }
            // if (playerData[0][selectedDay].fieldGoalsAttempts !== "a") {
            //     calculatedFirstFiveRealLifeStatsTotals.twoPointsAttempts += parseInt(playerData[0][selectedDay].fieldGoalsAttempts, 10)
            // }
            // if (playerData[0][selectedDay].fieldGoalsScored !== "n") {
            //     calculatedFirstFiveRealLifeStatsTotals.twoPointsScored += parseInt(playerData[0][selectedDay].fieldGoalsScored, 10)
            // }
            if (playerData[0][selectedDay].threePointsScored !== "n") {
                calculatedFirstFiveRealLifeStatsTotals.threePoints += parseInt(playerData[0][selectedDay].threePointsScored, 10) * 3
            }
            // if (playerData[0][selectedDay].threePointsAttempts !== "a") {
            //     calculatedFirstFiveRealLifeStatsTotals.threePointsAttempts += parseInt(playerData[0][selectedDay].threePointsAttempts, 10)
            // }
            // if (playerData[0][selectedDay].threePointsScored !== "n") {
            //     calculatedFirstFiveRealLifeStatsTotals.threePointsScored += parseInt(playerData[0][selectedDay].threePointsScored, 10)
            // }
            if (playerData[0][selectedDay].teamWin === "yes") {
                calculatedFirstFiveRealLifeStatsTotals.gameWinsCounter++
            }
        }
    }

    const outputObject = {
        teamPickData: outputTeamPickData,
        teamPickLockData: outputTeamPickLockData,
        calculatedFirstFiveRealLifeStatsTotals,
        calculatedFirstFiveFantasyPointsStatsTotals,
        totalSummaSummarum: totalSummaSummarum.toFixed(2)
    }
    return outputObject
}

export default checkEligibilityForPickTeam;