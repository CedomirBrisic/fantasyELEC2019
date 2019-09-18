const calculateBasketballPlayerTDFantasyPoints = (inputPlayerData, cardSelectedDay) => {
    let calulatedGameWin = null
    let calulatedAssists = null
    let calulatedRebounds = null
    let calulatedBlocks = null
    let calulatedSteals = null
    let calulatedTurnovers = null

    let calulatedFreeThrows = null
    let calulatedFreePoints3ScoredWithoutMiss = null
    let calulatedFreeThrows3Miss = null

    let calulatedTwoPoints = null
    let calulatedTwoPoints3Miss = null
    let calulatedTwoPoints3ScoredWithoutMiss = null

    let calulatedThreePoints3Miss = null
    let calulatedThreePoints = null
    let calulatedThreePoints3ScoredWithoutMiss = null


    let calculatedSummaSummarum = null

    ////////////////////////////////////////////////////////////////////////
    if (inputPlayerData[cardSelectedDay].teamWin === "no") {
        calulatedGameWin = "0"
    } else if (inputPlayerData[cardSelectedDay].teamWin === "yes") {
        calulatedGameWin = "4"
        calculatedSummaSummarum += 4
    } else {
        calulatedGameWin = "n/a"
    }
    ////////////////////////////////////////////////////////////////////////
    if (inputPlayerData[cardSelectedDay].assists === "0") {
        calulatedAssists = "0"
    } else if (parseInt(inputPlayerData[cardSelectedDay].assists, 10) > 0) {
        calulatedAssists = `${inputPlayerData[cardSelectedDay].assists}`
        calculatedSummaSummarum += parseInt(inputPlayerData[cardSelectedDay].assists, 10)
    } else {
        calulatedAssists = "n/a"
    }

    ////////////////////////////////////////////////////////////////////////
    if (inputPlayerData[cardSelectedDay].rebounds === "0") {
        calulatedRebounds = "0"
    } else if (parseInt(inputPlayerData[cardSelectedDay].rebounds, 10) > 0) {
        calulatedRebounds = `${inputPlayerData[cardSelectedDay].rebounds}`
        calculatedSummaSummarum += parseInt(inputPlayerData[cardSelectedDay].rebounds, 10)
    } else {
        calulatedRebounds = "n/a"
    }

    ////////////////////////////////////////////////////////////////////////
    if (inputPlayerData[cardSelectedDay].blocks === "0") {
        calulatedBlocks = "0"
    } else if (parseInt(inputPlayerData[cardSelectedDay].blocks, 10) > 0) {
        calulatedBlocks = `${inputPlayerData[cardSelectedDay].blocks}`
        calculatedSummaSummarum += parseInt(inputPlayerData[cardSelectedDay].blocks, 10)
    } else {
        calulatedBlocks = "n/a"
    }

    ////////////////////////////////////////////////////////////////////////
    if (inputPlayerData[cardSelectedDay].steals === "0") {
        calulatedSteals = "0"
    } else if (parseInt(inputPlayerData[cardSelectedDay].steals, 10) > 0) {
        calulatedSteals = `${inputPlayerData[cardSelectedDay].steals}`
        calculatedSummaSummarum += parseInt(inputPlayerData[cardSelectedDay].steals, 10)
    } else {
        calulatedSteals = "n/a"
    }

    ////////////////////////////////////////////////////////////////////////
    if (inputPlayerData[cardSelectedDay].turnovers === "0") {
        calulatedTurnovers = "0"
    } else if (parseInt(inputPlayerData[cardSelectedDay].turnovers, 10) > 0) {
        calulatedTurnovers = `-${inputPlayerData[cardSelectedDay].turnovers}`
        calculatedSummaSummarum -= parseInt(inputPlayerData[cardSelectedDay].turnovers, 10)
    } else {
        calulatedTurnovers = "n/a"
    }







    //          FRE THROWS     //
    ////////////////////////////////////////////////////////////////////////
    let freeThrowsScored = null
    let freeThrowsAttempts = null
    let freeThrowPercentage = null
    if (inputPlayerData[cardSelectedDay].freeThrowAttempts !== "a") {
        freeThrowsScored = parseInt(inputPlayerData[cardSelectedDay].freeThrowScored, 10)
        freeThrowsAttempts = parseInt(inputPlayerData[cardSelectedDay].freeThrowAttempts, 10)
        if (freeThrowsAttempts !== 0) {
            freeThrowPercentage = freeThrowsScored / freeThrowsAttempts
        }
    }
    ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////
    if (freeThrowsScored === null) {
        calulatedFreeThrows = "n/a"
        calulatedFreePoints3ScoredWithoutMiss = "-"
        calulatedFreeThrows3Miss = "-"
    } else {
        if (freeThrowPercentage === 0 || freeThrowPercentage === null) {
            calulatedFreeThrows = "0"
        } else {
            calulatedFreeThrows = `${(freeThrowsScored * freeThrowPercentage).toFixed(2)}`
            calculatedSummaSummarum += (freeThrowsScored * freeThrowPercentage)
        }

        ////  ////  ////  ////  ////  ////  ////  ////---  PENALTY ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
        if (freeThrowPercentage === 0 && freeThrowsAttempts > 2) {
            calulatedFreeThrows3Miss = `-${freeThrowsAttempts-2}`
            calculatedSummaSummarum -= (freeThrowsAttempts - 2)
        } else {
            calulatedFreeThrows3Miss = "-"
        }

        ////  ////  ////  ////  ////  ////  ////  ////--- BONUS  ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
        if (freeThrowPercentage === 1 && freeThrowsAttempts > 2) {
            calulatedFreePoints3ScoredWithoutMiss = `+${(freeThrowsAttempts*0.25).toFixed(2)}`
            calculatedSummaSummarum += (freeThrowsAttempts * 0.25)
        } else {
            calulatedFreePoints3ScoredWithoutMiss = "-"
        }
    }





    //          TWO POINTS          //
    ////////////////////////////////////////////////////////////////////////
    let twoPointsScored = null
    let twoPointsAttempts = null
    let twoPointsPercentage = null
    if (inputPlayerData[cardSelectedDay].fieldGoalsAttempts !== "a") {
        twoPointsScored = parseInt(inputPlayerData[cardSelectedDay].fieldGoalsScored, 10)
        twoPointsAttempts = parseInt(inputPlayerData[cardSelectedDay].fieldGoalsAttempts, 10)
        if (twoPointsAttempts !== 0) {
            twoPointsPercentage = twoPointsScored / twoPointsAttempts
        }
    }
    ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////
    if (twoPointsScored === null) {
        calulatedTwoPoints = "n/a"
        calulatedTwoPoints3ScoredWithoutMiss = "-"
        calulatedTwoPoints3Miss = "-"
    } else {
        if (twoPointsPercentage === 0 || twoPointsPercentage === null) {
            calulatedTwoPoints = "0"
        } else {
            calulatedTwoPoints = `${(twoPointsScored * 2 * twoPointsPercentage).toFixed(2)}`
            calculatedSummaSummarum += (twoPointsScored * 2 * twoPointsPercentage)
        }

        ////  ////  ////  ////  ////  ////  ////  ////---  PENALTY ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
        if (twoPointsPercentage === 0 && twoPointsAttempts > 2) {
            calulatedTwoPoints3Miss = `-${twoPointsAttempts-1}`
            calculatedSummaSummarum -= (twoPointsAttempts - 1)
        } else {
            calulatedTwoPoints3Miss = "-"
        }
        ////  ////  ////  ////  ////  ////  ////  ////--- BONUS  ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
        if (twoPointsPercentage === 1 && twoPointsAttempts > 2) {
            calulatedTwoPoints3ScoredWithoutMiss = `+${(twoPointsAttempts * 2 * 0.5).toFixed(2)}`
            calculatedSummaSummarum += (twoPointsAttempts * 2 * 0.5)
        } else {
            calulatedTwoPoints3ScoredWithoutMiss = "-"
        }
    }






    //          THREE POINTS          //
    ////////////////////////////////////////////////////////////////////////
    let threePointsScored = null
    let threePointsAttempts = null
    let threePointsPercentage = null
    if (inputPlayerData[cardSelectedDay].threePointsAttempts !== "a") {
        threePointsScored = parseInt(inputPlayerData[cardSelectedDay].threePointsScored, 10)
        threePointsAttempts = parseInt(inputPlayerData[cardSelectedDay].threePointsAttempts, 10)
        if (threePointsAttempts !== 0) {
            threePointsPercentage = threePointsScored / threePointsAttempts
        }
    }
    ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////
    if (threePointsScored === null) {
        calulatedThreePoints = "n/a"
        calulatedThreePoints3ScoredWithoutMiss = "-"
        calulatedThreePoints3Miss = "-"
    } else {
        if (threePointsPercentage === 0 || threePointsPercentage === null) {
            calulatedThreePoints = "0"
        } else {
            calulatedThreePoints = `${(threePointsScored * 3 * threePointsPercentage).toFixed(2)}`
            calculatedSummaSummarum += (threePointsScored * 3 * threePointsPercentage)
        }

        ////  ////  ////  ////  ////  ////  ////  ////---  PENALTY ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
        if (threePointsPercentage === 0 && threePointsAttempts > 2) {
            calulatedThreePoints3Miss = `-${threePointsAttempts}`
            calculatedSummaSummarum -= (threePointsAttempts)
        } else {
            calulatedThreePoints3Miss = "-"
        }
        ////  ////  ////  ////  ////  ////  ////  ////--- BONUS  ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
        if (threePointsPercentage === 1 && threePointsAttempts > 2) {
            calulatedThreePoints3ScoredWithoutMiss = `+${(threePointsAttempts * 3).toFixed(2)}`
            calculatedSummaSummarum += (threePointsAttempts * 3)
        } else {
            calulatedThreePoints3ScoredWithoutMiss = "-"
        }
    }





    let checkedSummaSummarum = null
    if (calculatedSummaSummarum !== null) {
        checkedSummaSummarum = calculatedSummaSummarum.toFixed(2)
    } else if (calculatedSummaSummarum === null && calulatedAssists !== "n/a") {
        checkedSummaSummarum = "0"
    } else {
        checkedSummaSummarum = "N/A"
    }

    let calculatedBonusTotal = 0
    if (!isNaN(calulatedFreePoints3ScoredWithoutMiss)) {
        calculatedBonusTotal = calculatedBonusTotal + parseFloat(calulatedFreePoints3ScoredWithoutMiss)
    }
    if (!isNaN(calulatedTwoPoints3ScoredWithoutMiss)) {
        calculatedBonusTotal = calculatedBonusTotal + parseFloat(calulatedTwoPoints3ScoredWithoutMiss)
    }
    if (!isNaN(calulatedThreePoints3ScoredWithoutMiss)) {
        calculatedBonusTotal = calculatedBonusTotal + parseFloat(calulatedThreePoints3ScoredWithoutMiss)
    }


    let calculatedPenaltiesTotal = 0
    if (!isNaN(calulatedFreeThrows3Miss)) {
        calculatedPenaltiesTotal = calculatedPenaltiesTotal + parseFloat(calulatedFreeThrows3Miss)
    }
    if (!isNaN(calulatedTwoPoints3Miss)) {
        calculatedPenaltiesTotal = calculatedPenaltiesTotal + parseFloat(calulatedTwoPoints3Miss)
    }
    if (!isNaN(calulatedThreePoints3Miss)) {
        calculatedPenaltiesTotal = calculatedPenaltiesTotal + parseFloat(calulatedThreePoints3Miss)
    }

    const outputPlayerData = {
        gameWin: calulatedGameWin,
        assists: calulatedAssists,
        rebounds: calulatedRebounds,
        blocks: calulatedBlocks,
        steals: calulatedSteals,
        turnovers: calulatedTurnovers,
        freeThrowsPoints: calulatedFreeThrows,
        freeThrowsPointsBonus: calulatedFreePoints3ScoredWithoutMiss,
        freeThrowsPointsPenalty: calulatedFreeThrows3Miss,
        twoPoints: calulatedTwoPoints,
        twoPointsBonus: calulatedTwoPoints3ScoredWithoutMiss,
        twoPointsPenalty: calulatedTwoPoints3Miss,
        threePoints: calulatedThreePoints,
        threePointsBonus: calulatedThreePoints3ScoredWithoutMiss,
        threePointsPenalty: calulatedThreePoints3Miss,
        bonusesSummaSummarum: calculatedBonusTotal,
        penaltiesSummaSummarum: calculatedPenaltiesTotal,
        summaSummarum: checkedSummaSummarum,
    }
    return outputPlayerData
}

export default calculateBasketballPlayerTDFantasyPoints;