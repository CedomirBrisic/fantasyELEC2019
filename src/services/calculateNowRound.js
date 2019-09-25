const calculateNowRound = (nowDate, selectedLeague) => {
    const date = nowDate;
    const league = selectedLeague
    let outputRound = ""
    const splitDate = date.split("-")
    const month = splitDate[1]
    let day = ""



    if (splitDate[0].length == 3) {
        day = splitDate[0][0]
    } else if (splitDate[0].length == 4) {
        day = splitDate[0][0] + splitDate[0][1]
    }




    if (league == "euroLeague") {
        if (month == "October") {
            if (day == "1" || day == "2" || day == "3" || day == "4") {
                outputRound = "ROUND-1"
            } else if (day == "5" || day == "6" || day == "7" || day == "8" || day == "9" || day == "10" || day == "11"){
                outputRound = "ROUND-2"
            } else if (day == "12" || day == "13" || day == "14" || day == "15" || day == "16" || day == "17" || day == "18"){
                outputRound = "ROUND-3"
            } else if (day == "19" || day == "20" || day == "21" || day == "22" || day == "23" || day == "24" || day == "25"){
                outputRound = "ROUND-4"
            } else if (day == "26" || day == "27" || day == "28" || day == "29" || day == "30"){
                outputRound = "ROUND-5"
            } else if (day == "31"){
                outputRound = "ROUND-6"
            }
        } else if (month == "November"){
            if (day == "1"){
                outputRound = "ROUND-6"
            }else if (day == "2" || day == "3" || day == "4" || day == "5" || day == "6" || day == "7" || day == "8"){
                outputRound = "ROUND-7"
            } else if (day == "9" || day == "10" || day == "11" || day == "12" || day == "13" || day == "14" || day == "15"){
                outputRound = "ROUND-8"
            } else if (day == "16" || day == "17" || day == "18" || day == "19" || day == "20"){
                outputRound = "ROUND-9"
            } else if (day == "21" || day == "22"){
                outputRound = "ROUND-10"
            } else if (day == "23" || day == "24" || day == "25" || day == "26" || day == "27" || day == "28" || day == "29"){
                outputRound = "ROUND-11"
            } else if (day == "30"){
                outputRound = "ROUND-12"
            }
        } else if (month == "December"){
            if (day == "1" || day == "2" || day == "3" || day == "4" || day == "5" || day == "6"){
                outputRound = "ROUND-12"
            } else if (day == "7" || day == "8" || day == "9" || day == "10" || day == "11" || day == "12" || day == "13"){
                outputRound = "ROUND-13"
            } else if (day == "14" || day == "15" || day == "16" || day == "17" || day == "18"){
                outputRound = "ROUND-14"
            } else if (day == "19" || day == "20"){
                outputRound = "ROUND-15"
            }  else if (day == "21" || day == "22" || day == "23" || day == "24" || day == "25" || day == "26" || day == "27"){
                outputRound = "ROUND-16"
            } else if (day == "28" || day == "29" || day == "30" || day == "31"){
                outputRound = "ROUND-17"
            }
        } else if (month == "January"){
            if (day == "1" || day == "2" || day == "3"){
                outputRound = "ROUND-17"
            } else if (day == "4" || day == "5" || day == "6" || day == "7" || day == "8" || day == "9" || day == "10"){
                outputRound = "ROUND-18"
            } else if (day == "11" || day == "12" || day == "13" || day == "14" || day == "15"){
                outputRound = "ROUND-19"
            } else if (day == "16" || day == "17"){
                outputRound = "ROUND-20"
            } else if (day == "18" || day == "19" || day == "20" || day == "21" || day == "22" || day == "23" || day == "24"){
                outputRound = "ROUND-21"
            } else if (day == "25" || day == "26" || day == "27" || day == "28" || day == "29" || day == "30" || day == "31"){
                outputRound = "ROUND-22"
            }
        } else if (month == "February"){
             if (day == "1" || day == "2" || day == "3" || day == "4" || day == "5"){
                outputRound = "ROUND-23"
            }  else if (day == "6" || day == "7"){
                outputRound = "ROUND-24"
            }  else if (day == "8" || day == "9" || day == "10" || day == "11" || day == "12" || day == "13" || day == "14" || day == "15" || day == "16" || day == "17" || day == "18" || day == "19" || day == "20" || day == "21"){
                outputRound = "ROUND-25"
            } else if (day == "22" || day == "23" || day == "24" || day == "25" || day == "26" || day == "27" || day == "28"){
                outputRound = "ROUND-26"
            }
        } else if (month == "March"){
            if (day == "1" || day == "2" || day == "3" || day == "4"){
                outputRound = "ROUND-27"
            }  else if (day == "5" || day == "6"){
                outputRound = "ROUND-28"
            } else if (day == "7" || day == "8" || day == "9" || day == "10" || day == "11" || day == "12" || day == "13"){
                outputRound = "ROUND-29"
            } else if (day == "14" || day == "15" || day == "16" || day == "17" || day == "18" || day == "19" || day == "20"){
                outputRound = "ROUND-30"
            } else if (day == "21" || day == "22" || day == "23" || day == "24" || day == "25"){
                outputRound = "ROUND-31"
            } else if (day == "26" || day == "27"){
                outputRound = "ROUND-32"
            } else if (day == "28" || day == "29" || day == "30" || day == "31"){
                outputRound = "ROUND-33"
            }
        }else if (month == "April"){
            if (day == "1" || day == "2" || day == "3"){
                outputRound = "ROUND-33"
            }  else if (day == "4" || day == "5" || day == "6" || day == "7" || day == "8" || day == "11" || day == "10"){
                outputRound = "ROUND-34"
            }
        } else {
            outputRound = "ROUND-1"
        }


    } else if (league == "euroCup") {
        if (month == "October") {
            if (day == "1" || day == "2") {
                outputRound = "ROUND-1"
            } else if (day == "3" || day == "4" || day == "5" || day == "6" || day == "7" || day == "8" || day == "9"){
                outputRound = "ROUND-2"
            } else if (day == "10" || day == "11" || day == "12" || day == "13" || day == "14" || day == "15" || day == "16"){
                outputRound = "ROUND-3"
            } else if (day == "17" || day == "18" || day == "19" || day == "20" || day == "21" || day == "22" || day == "23"){
                outputRound = "ROUND-4"
            } else if (day == "24" || day == "25" || day == "26" || day == "27" || day == "28" || day == "29" || day == "30"){
                outputRound = "ROUND-5"
            } else if (day == "31"){
                outputRound = "ROUND-6"
            }
        } else if (month == "November"){
            if (day == "1" || day == "2" || day == "3" || day == "4" || day == "5" || day == "6"){
                outputRound = "ROUND-6"
            }else if (day == "7" || day == "8" || day == "9" || day == "10" || day == "11" || day == "12" || day == "13"){
                outputRound = "ROUND-7"
            } else if ( day == "14" || day == "15" || day == "16" || day == "17" || day == "18" || day == "19" || day == "20"){
                outputRound = "ROUND-8"
            } else if (day == "21" || day == "22" || day == "23" || day == "24" || day == "25" || day == "26" || day == "27" || day == "28" || day == "29" || day == "30"){
                outputRound = "ROUND-9"
            }
        } else if (month == "December"){
            if (day == "1" || day == "2" || day == "3" || day == "4" || day == "5" || day == "6" || day == "7" || day == "8" || day == "9" || day == "10" || day == "11"){
                outputRound = "ROUND-9"
            } else if ( day == "12" || day == "13" || day == "14" || day == "15" || day == "16" || day == "17" || day == "18"){
                outputRound = "ROUND-10"
            }
        }
        else {
            outputRound = "ROUND-1"
        }
    }

    return outputRound
}

export default calculateNowRound