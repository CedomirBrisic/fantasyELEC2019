const putCheckIsUsername = (data, qwe) => {
    return fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/sportske-fantasy-elec2019-vvrgz/service/http/incoming_webhook/PUTcheckUsername?secret=${qwe}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data
        })
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

export default putCheckIsUsername;