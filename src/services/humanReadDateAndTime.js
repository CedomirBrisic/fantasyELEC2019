const humanReadDateAndTime = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date()
    const dd = date.getUTCDate();
    const mm = months[date.getUTCMonth()];
    const hh = date.getUTCHours();
    const min = date.getUTCMinutes()
    const sec = date.getUTCSeconds()


    const ddth = (function () {
        if (dd == "1" || dd == "21" || dd == "31") {
            return "st"
        } else if (dd == "2" || dd == "22") {
            return "nd"
        } else if (dd == "3" || dd == "23") {
            return "rd"
        } else {
            return "th"
        }
    })();

    const sec00 = (function () {
        const secStringify = sec.toString()
        if (secStringify.length == 1) {
            return "0"+secStringify
        } else {
            return secStringify
        }
    })();

    const min00 = (function () {
        const minStringify = min.toString()
        if (minStringify.length == 1) {
            return "0"+minStringify
        } else {
            return minStringify
        }
    })();


    const outputDate = `${dd}${ddth}-${mm}`
    const outputTime = `${hh}:${min00}:${sec00}`
    const humanDateAndTime = {
        humanDate: outputDate,
        humanTime: outputTime
    }
    return humanDateAndTime
}

export default humanReadDateAndTime;