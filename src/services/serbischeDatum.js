const serbischeDatum = (date) => {
    if (date == "all-days") {
        return "sve runde"
    } else {
        let datum = ""
        let dateSplit = date.split("-")
        const month = dateSplit[1]
        let dan = ""
        let mesec = ""

        if (dateSplit[0].length === 4) {
            dan = dateSplit[0][0] + dateSplit[0][1]
        } else if (dateSplit[0].length === 3) {
            dan = dateSplit[0][0]
        }
        switch (month) {
            case 'January':
                mesec = "Januar"
                break;
            case 'February':
                mesec = "Februar"
                break;
            case 'March':
                mesec = "Mart"
                break;
            case 'April':
                mesec = "April"
                break;
            case 'May':
                mesec = "Maj"
                break;
            case 'June':
                mesec = "Jun"
                break;
            case 'July':
                mesec = "Jul"
                break;
            case 'August':
                mesec = "Avgust"
                break;
            case 'September':
                mesec = "Septembar"
                break;
            case 'October':
                mesec = "Oktobar"
                break;
            case 'November':
                mesec = "Novembar"
                break;
            case 'December':
                mesec = "Decembar"
                break;
        }

        return datum = `${dan} - ${mesec}`
    }
}

export default serbischeDatum