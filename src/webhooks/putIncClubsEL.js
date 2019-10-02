const putIncClubsEL = (qwe) => {
    return fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/sportske-fantasy-elec2019-vvrgz/service/http/incoming_webhook/PUTincClubsEL?secret=${qwe}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export default putIncClubsEL;