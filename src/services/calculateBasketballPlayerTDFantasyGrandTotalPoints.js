import eligibleDays from "./eligibleDays"

const calculateBasketballPlayerTDFantasyGrandTotalPoints = (inputPlayerData) => {

    let calculatedGrandFantasyTotal = 0

    eligibleDays.forEach((day) => {
        ////////////////////////////////////////////////////////////////////////
        if (inputPlayerData[day].teamWin == "yes") {
            calculatedGrandFantasyTotal += 4
        }

        ////////////////////////////////////////////////////////////////////////
        if (parseInt(inputPlayerData[day].assists, 10) > 0) {
            calculatedGrandFantasyTotal += parseInt(inputPlayerData[day].assists, 10)
        }

        ////////////////////////////////////////////////////////////////////////
        if (parseInt(inputPlayerData[day].rebounds, 10) > 0) {
            calculatedGrandFantasyTotal += parseInt(inputPlayerData[day].rebounds, 10)
        }

        ////////////////////////////////////////////////////////////////////////
        if (parseInt(inputPlayerData[day].blocks, 10) > 0) {
            calculatedGrandFantasyTotal += parseInt(inputPlayerData[day].blocks, 10)
        }

        ////////////////////////////////////////////////////////////////////////
        if (parseInt(inputPlayerData[day].steals, 10) > 0) {
            calculatedGrandFantasyTotal += parseInt(inputPlayerData[day].steals, 10)
        }

        ////////////////////////////////////////////////////////////////////////
        if (parseInt(inputPlayerData[day].turnovers, 10) > 0) {
            calculatedGrandFantasyTotal -= parseInt(inputPlayerData[day].turnovers, 10)
        }







        //          FRE THROWS     //
        ////////////////////////////////////////////////////////////////////////
        let freeThrowsScored = null
        let freeThrowsAttempts = null
        let freeThrowPercentage = null
        if (inputPlayerData[day].freeThrowAttempts !== "a") {
            freeThrowsScored = parseInt(inputPlayerData[day].freeThrowScored, 10)
            freeThrowsAttempts = parseInt(inputPlayerData[day].freeThrowAttempts, 10)
            if (freeThrowsAttempts !== 0) {
                freeThrowPercentage = freeThrowsScored / freeThrowsAttempts
            }
        }
        ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////
        if (freeThrowsScored !== null) {
            if (freeThrowPercentage !== 0 || freeThrowPercentage !== null) {
                calculatedGrandFantasyTotal += (freeThrowsScored * freeThrowPercentage)
            }

            ////  ////  ////  ////  ////  ////  ////  ////---  PENALTY ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
            if (freeThrowPercentage === 0 && freeThrowsAttempts > 2) {
                calculatedGrandFantasyTotal -= (freeThrowsAttempts - 2)
            }
            ////  ////  ////  ////  ////  ////  ////  ////--- BONUS  ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
            if (freeThrowPercentage === 1 && freeThrowsAttempts > 2) {
                calculatedGrandFantasyTotal += (freeThrowsAttempts * 0.25)
            }

        }



        //          TWO POINTS          //
        ////////////////////////////////////////////////////////////////////////
        let twoPointsScored = null
        let twoPointsAttempts = null
        let twoPointsPercentage = null
        if (inputPlayerData[day].fieldGoalsAttempts !== "a") {
            twoPointsScored = parseInt(inputPlayerData[day].fieldGoalsScored, 10)
            twoPointsAttempts = parseInt(inputPlayerData[day].fieldGoalsAttempts, 10)
            if (twoPointsAttempts !== 0) {
                twoPointsPercentage = twoPointsScored / twoPointsAttempts
            }
        }
        ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////
        if (twoPointsScored !== null) {
            if (twoPointsPercentage !== 0 || twoPointsPercentage !== null) {
                calculatedGrandFantasyTotal += (twoPointsScored * 2 * twoPointsPercentage)
            }

            ////  ////  ////  ////  ////  ////  ////  ////---  PENALTY ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
            if (twoPointsPercentage === 0 && twoPointsAttempts > 2) {
                calculatedGrandFantasyTotal -= (twoPointsAttempts - 1)
            }
            ////  ////  ////  ////  ////  ////  ////  ////--- BONUS  ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
            if (twoPointsPercentage === 1 && twoPointsAttempts > 2) {
                calculatedGrandFantasyTotal += (twoPointsAttempts * 2 * 0.5)
            }
        }






        //          THREE POINTS          //
        ////////////////////////////////////////////////////////////////////////
        let threePointsScored = null
        let threePointsAttempts = null
        let threePointsPercentage = null
        if (inputPlayerData[day].threePointsAttempts !== "a") {
            threePointsScored = parseInt(inputPlayerData[day].threePointsScored, 10)
            threePointsAttempts = parseInt(inputPlayerData[day].threePointsAttempts, 10)
            if (threePointsAttempts !== 0) {
                threePointsPercentage = threePointsScored / threePointsAttempts
            }
        }
        ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////  ////
        if (threePointsScored !== null) {
            if (threePointsPercentage !== 0 || threePointsPercentage !== null) {
                calculatedGrandFantasyTotal += (threePointsScored * 3 * threePointsPercentage)
            }

            ////  ////  ////  ////  ////  ////  ////  ////---  PENALTY ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
            if (threePointsPercentage === 0 && threePointsAttempts > 2) {
                calculatedGrandFantasyTotal -= (threePointsAttempts)
            }
            ////  ////  ////  ////  ////  ////  ////  ////--- BONUS  ---////  ////  ////  ////  ////  ////  ////  ////  ////  ////
            if (threePointsPercentage === 1 && threePointsAttempts > 2) {
                calculatedGrandFantasyTotal += (threePointsAttempts * 3)
            }
        }
    })
    return calculatedGrandFantasyTotal
}

export default calculateBasketballPlayerTDFantasyGrandTotalPoints;