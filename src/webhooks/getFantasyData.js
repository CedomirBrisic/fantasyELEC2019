const getFantasyData = (qwe) => {
    return fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/basketball-fantasy-gpizn/service/http/incoming_webhook/GETfantasyData?secret=${qwe}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        const result = response.json()
        if (response.ok) {
            return result
        } else {
            // alert(`ACHTUNG !!!
            // Došlo je do neke greške pri povezivanju sa serverom...
            // Pokušaj malko kasnije opet :-)`)
            alert (`Too many players online right now...
                    server can't handle it...
                    try again a little bit later`)
        }
    })
}

export default getFantasyData;