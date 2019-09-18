const sortPlayersOnSelectScreen = (playersForRender, sortFilterName, selectPlayerSearchValue) => {

    const playersFilterDataValuesForSorting = []
    const playersFilterDataValuesForNotSorting = []

    const goodShootersFilterDataValuesForSorting = []
    const goodShootersFilterDataValuesForNotSorting = []

    const outputSortedPlayers = []

    for (let i = 0; i < playersForRender.length; i++) {
        const singlePlayerFilterDataValue = {
            playerIndex: null,
            valueForSorting: null,
            playerName: null,
            shotScored: null,
        }
        switch (sortFilterName) {
            case 'playerTeam':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[2].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'assists':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[3].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'rebounds':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[4].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'blocks':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[5].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'steals':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[6].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'turnovers':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[7].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'freeThrows':
                singlePlayerFilterDataValue.playerIndex = i;
                const freeThrowsStringValue = playersForRender[i].props.children[8].props.children
                singlePlayerFilterDataValue.valueForSorting = freeThrowsStringValue.split("/")[0] / freeThrowsStringValue.split("/")[1]
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                singlePlayerFilterDataValue.shotScored = freeThrowsStringValue.split("/")[0]
                break;
            case 'twoPoints':
                singlePlayerFilterDataValue.playerIndex = i;
                const twoPointsStringValue = playersForRender[i].props.children[9].props.children
                singlePlayerFilterDataValue.valueForSorting = twoPointsStringValue.split("/")[0] / twoPointsStringValue.split("/")[1]
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                singlePlayerFilterDataValue.shotScored = twoPointsStringValue.split("/")[0]
                break;
            case 'threePoints':
                singlePlayerFilterDataValue.playerIndex = i;
                const threePointsStringValue = playersForRender[i].props.children[10].props.children
                singlePlayerFilterDataValue.valueForSorting = threePointsStringValue.split("/")[0] / threePointsStringValue.split("/")[1]
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                singlePlayerFilterDataValue.shotScored = threePointsStringValue.split("/")[0]
                break;
            case 'ptPerGame':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[0].props.children.split(" ")[1]
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'playerName':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[1].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'gamesWon':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[2].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'freeThrowsFantasy':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[8].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'twoPointsFantasy':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[9].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'threePointsFantasy':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[10].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'bonuses':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[11].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
            case 'penalties':
                singlePlayerFilterDataValue.playerIndex = i;
                singlePlayerFilterDataValue.valueForSorting = playersForRender[i].props.children[12].props.children
                singlePlayerFilterDataValue.playerName = playersForRender[i].props.children[1].props.children
                break;
        }

        if (isNaN(singlePlayerFilterDataValue.valueForSorting)) {
            playersFilterDataValuesForNotSorting.push(singlePlayerFilterDataValue)
        } else {
            playersFilterDataValuesForSorting.push(singlePlayerFilterDataValue)
        }
    }


    playersFilterDataValuesForSorting.sort(function (a, b) {
        return b.valueForSorting - a.valueForSorting
    })

    let playersFilterDataValuesSorted = playersFilterDataValuesForSorting.concat(playersFilterDataValuesForNotSorting)

    if (sortFilterName === "freeThrows" || sortFilterName === "twoPoints" || sortFilterName === "threePoints") {
        playersFilterDataValuesSorted.forEach((player) => {
            if (player.valueForSorting === 1) {
                goodShootersFilterDataValuesForSorting.push(player)
            } else {
                goodShootersFilterDataValuesForNotSorting.push(player)
            }
        })
        goodShootersFilterDataValuesForSorting.sort(function (a, b) {
            return b.shotScored - a.shotScored
        })

        playersFilterDataValuesSorted = goodShootersFilterDataValuesForSorting.concat(goodShootersFilterDataValuesForNotSorting)
    }

    if (selectPlayerSearchValue !== "") {
        playersFilterDataValuesSorted = playersFilterDataValuesSorted.filter((player) => {
            if (player.playerName.toLowerCase().includes(selectPlayerSearchValue.toLowerCase())) {
                return player
            }
        })
    }

    playersFilterDataValuesSorted.forEach((playerSortData) => {
        outputSortedPlayers.push(playersForRender[playerSortData.playerIndex])
    })


    return outputSortedPlayers
}

export default sortPlayersOnSelectScreen;