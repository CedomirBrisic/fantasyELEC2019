const postRegisterNewUser = (data, qwe) => {
    return fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/basketball-fantasy-gpizn/service/http/incoming_webhook/POSTregisterNewUser?secret=${qwe}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data
        })
    }).then((response) => {
        if (response.ok) {
            return response
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

export default postRegisterNewUser;