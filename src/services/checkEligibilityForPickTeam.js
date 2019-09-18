import calculateBasketballPlayerTDFantasyPoints from "./calculateBasketballPlayerTDFantasyPoints";
const possiblePlayerIds = ["Player1Id", "Player2Id", "Player3Id", "Player4Id", "Player5Id", "Player6Id", "Player7Id"]

const checkEligibilityForPickTeam = (fantasyUsers, username, selectedDay, nowDateAndTime, teamsByDay, basketballPlayers) => {
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
            const teamData = teamsByDay[selectedDay].filter((team, index) => {
                if (team.name === playerTeam) {
                    return team
                }
            })
            if (teamData[0]){
                // console.log("dobro je")

            const nowHour = parseInt(nowDateAndTime.humanTime.split(":")[0], 10)
            const nowMinutes = parseInt(nowDateAndTime.humanTime.split(":")[1], 10)
            const teamGameStartHour = parseInt(teamData[0].gameStart.split(":")[0], 10)
            const teamGameStartMinutes = parseInt(teamData[0].gameStart.split(":")[1], 10)


            if (selectedDay == nowDateAndTime.humanDate) {
                if (nowHour > teamGameStartHour) {
                    teamPickLockData[playerId] = true
                } else if (nowHour == teamGameStartHour && nowMinutes >= teamGameStartMinutes) {
                    teamPickLockData[playerId] = true
                } else {
                    teamPickLockData[playerId] = false
                }
            } else {
                const possibleMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                if (possibleMonths.indexOf(selectedDay.split("-")[1]) < possibleMonths.indexOf(nowDateAndTime.humanDate.split("-")[1])) {
                    teamPickLockData[playerId] = true
                } else if (possibleMonths.indexOf(selectedDay.split("-")[1]) === possibleMonths.indexOf(nowDateAndTime.humanDate.split("-")[1])) {
                    if (selectedDay.split("-")[0].length < nowDateAndTime.humanDate.split("-")[0].length) {
                        teamPickLockData[playerId] = true
                    } else if (selectedDay.split("-")[0].length === nowDateAndTime.humanDate.split("-")[0].length && selectedDay.split("-")[0].length === 3) {
                        if (selectedDay.split("-")[0][0] < nowDateAndTime.humanDate.split("-")[0][0]) {
                            teamPickLockData[playerId] = true
                        }
                    } else if (selectedDay.split("-")[0].length === nowDateAndTime.humanDate.split("-")[0].length && selectedDay.split("-")[0].length === 4) {
                        let selectedDayNumber = parseInt(selectedDay.split("-")[0][0] + selectedDay.split("-")[0][1], 10)
                        let nowDateNumber = parseInt(nowDateAndTime.humanDate.split("-")[0][0] + nowDateAndTime.humanDate.split("-")[0][1], 10)
                        if (selectedDayNumber < nowDateNumber) {
                            teamPickLockData[playerId] = true
                        }
                    }
                }
            }
        }
            else {
                // console.log("puklo",username)
                teamPickLockData[playerId] = true
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
                calculatedFirstFiveRealLifeStatsTotals.twoPoints += parseInt(playerData[0][selectedDay].fieldGoalsScored, 10)*2
            }
            // if (playerData[0][selectedDay].fieldGoalsAttempts !== "a") {
            //     calculatedFirstFiveRealLifeStatsTotals.twoPointsAttempts += parseInt(playerData[0][selectedDay].fieldGoalsAttempts, 10)
            // }
            // if (playerData[0][selectedDay].fieldGoalsScored !== "n") {
            //     calculatedFirstFiveRealLifeStatsTotals.twoPointsScored += parseInt(playerData[0][selectedDay].fieldGoalsScored, 10)
            // }
            if (playerData[0][selectedDay].threePointsScored !== "n") {
                calculatedFirstFiveRealLifeStatsTotals.threePoints += parseInt(playerData[0][selectedDay].threePointsScored, 10)*3
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