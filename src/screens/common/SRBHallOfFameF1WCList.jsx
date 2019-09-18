import React from 'react';
import { AppContext } from '../_context/AppContext';
import { Portal } from 'react-portal';
import checkEligibilityForPickTeam from "../../services/checkEligibilityForPickTeam";
import eligibleDays from "../../services/eligibleDays";
import HallOfFameUserStatsModal from "../modals/HallOfFameUserStatsModal";
import serbischeDatum from "../../services/serbischeDatum";

class SRBHallOfFameF1WCList extends React.Component {
    static contextType = AppContext;
    state = {
        fantasyF1WCUsersSorted: null,
        showUserModal: false,
        fantasyUserForModalData: null,
        isCalculating: true
    }


    sortF1WCUsers = () => {
        let outputCalculated = []
        const fantasyUsers = this.context.fantasyUsers
        const nowDateAndTime = this.context.nowDateAndTime
        const teamsByDay = this.context.dropdowns[0].teamsByDay
        const basketballPlayers = this.context.basketballPlayers
        eligibleDays.forEach((day) => {
            const fantasyUsersF1WCforOneDay = []
            fantasyUsers.forEach((user) => {
                const calculatedData = checkEligibilityForPickTeam(fantasyUsers, user.username, day, nowDateAndTime, teamsByDay, basketballPlayers)
                const userData = {
                    username: user.username,
                    summaSummarum: calculatedData.totalSummaSummarum,
                    teamPickIds: calculatedData.teamPickData,
                }
                fantasyUsersF1WCforOneDay.push(userData)
            })
            if (fantasyUsersF1WCforOneDay !== null) {
                fantasyUsersF1WCforOneDay.sort(function (a, b) {
                    return b.summaSummarum - a.summaSummarum
                })
                for (let i = 0; i < 10; i++) {
                    if (fantasyUsersF1WCforOneDay[i].summaSummarum != 0) {

                        switch (i) {
                            case 0:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 25
                                break;
                            case 1:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 18
                                break;
                            case 2:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 15
                                break;
                            case 3:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 12
                                break;
                            case 4:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 10
                                break;
                            case 5:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 8
                                break;
                            case 6:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 6
                                break;
                            case 7:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 4
                                break;
                            case 8:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 2
                                break;
                            case 9:
                                fantasyUsersF1WCforOneDay[i]["f1wcPoints"] = 1
                                break;
                        }
                        outputCalculated.push(fantasyUsersF1WCforOneDay[i])
                    }
                }

            }
        })

        const outputCalculatedSummedUp = []
        const outputUsernames = []
        outputCalculated.forEach((user) => {
            if (outputUsernames.indexOf(user.username) === -1) {
                outputUsernames.push(user.username)
            }
        })

        outputUsernames.forEach((username) => {
            let f1WCgrandTotal = 0
            let summedUpUser = null
            outputCalculated.forEach((user) => {
                if (username === user.username) {
                    f1WCgrandTotal += user.f1wcPoints
                    summedUpUser = user
                    summedUpUser["f1WCgrandTotal"] = f1WCgrandTotal
                    summedUpUser["summaSummarum"] = null
                }
            })
            outputCalculatedSummedUp.push(summedUpUser)
        })

        outputCalculatedSummedUp.sort(function (a, b) {
            return b.f1WCgrandTotal - a.f1WCgrandTotal
        })
        this.setState({
            fantasyF1WCUsersSorted: outputCalculatedSummedUp,
            isCalculating: false
        })
    }

    mapChosenOnes = () => {
        const output = []
        const fantasyUsers = this.state.fantasyF1WCUsersSorted
        for (let i = 3; i < fantasyUsers.length; i++) {
            const elementForRender =
                <div key={fantasyUsers[i].username} className="chosen-one-container">
                    <div className="image-wrapper" >
                        <img className="img-fluid" src={require("../../images/boysmall.png")} alt="triumph" data-fantasy-user-sorted-index={i} onClick={this.depositUserDataForModal} />
                    </div>
                    <div className="info-wrapper d-flex">
                        <div className="position-no">
                            {i + 1}.
                        </div>
                        <div className="titles-wrapper d-flex flex-column justify-content-between">
                            <div className="top">
                                {fantasyUsers[i].username}
                            </div>
                            <div className="bottom">
                                {fantasyUsers[i].f1WCgrandTotal} <sup>p</sup>
                            </div>
                        </div>
                    </div>
                    <div className="title">
                        {/* PITAJ DA LI JE POSLEDNJI */}
                        <i>{`${i === fantasyUsers.length - 1 ? "Ale Aleee i ja !" : "Ale Aleee . . ."}`}</i>
                    </div>
                </div>

            output.push(elementForRender)
        }

        return output
    }





    mapSearched = () => {
        const output = []
        const fantasyUsers = this.state.fantasyF1WCUsersSorted
        const searchValue = this.props.searchValue.toLowerCase()
        for (let i = 0; i < fantasyUsers.length; i++) {
            if (fantasyUsers[i].username.toLowerCase().includes(searchValue)) {
                const outputElement =
                    <tr key={fantasyUsers[i].username + i} data-fantasy-user-sorted-index={i} onClick={this.depositUserDataForModal}>
                        <td className="orer-no" data-fantasy-user-sorted-index={i}>{i + 1}</td>
                        <td data-fantasy-user-sorted-index={i}>{fantasyUsers[i].username}</td>
                        <td data-fantasy-user-sorted-index={i}>{fantasyUsers[i].f1WCgrandTotal}</td>
                    </tr>
                output.push(outputElement)
            }
        }
        return output
    }




    closeUserModal = () => {
        this.setState({
            showUserModal: false
        })
    }

    depositUserDataForModal = (event) => {
        const index = event.target.getAttribute("data-fantasy-user-sorted-index")
        const data = this.state.fantasyF1WCUsersSorted[index]
        this.setState({
            showUserModal: true,
            fantasyUserForModalData: data
        })
    }



    componentDidMount() {
        this.props.clearSearchValue()
        setTimeout(() => {
            this.sortF1WCUsers()
        }, 100);
    }


    render() {
        return (
            <>

                {this.state.isCalculating &&
                    <div className="loader-container-calculating d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-column align-items-center">
                            <h1>Računanje TD poena {this.context.fantasyUsers.length} korisnika</h1>
                            <div className="crveno d-flex">
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div className="made-in"><i>Iskliktano u zemlji košarke</i></div>
                            <div className="credits-container w-100 d-flex flex-column">
                                <i>Zahvaljujemo se PIXABAY-u što nam je omogućio da pozajmimo neke od njihovih slika</i>
                                <i>POSEBNO SE ZAHVALJUJEMO:</i>
                                <i className="credits">David Mark iz Pixabay-a</i>
                                <i className="credits">Dimitris Vetsikas iz Pixabay-a</i>
                                <i className="credits">Pexels iz Pixabay-a</i>
                                <i className="credits">Clker-Free-Vector-Images iz Pixabay-a</i>
                                <i className="credits">mohamed Hassan iz Pixabay-a</i>
                                <i className="credits">BedexpStock iz Pixabay-a</i>
                                <i className="credits">OpenClipart-Vectors iz Pixabay-a </i>
                            </div>
                        </div>
                    </div>
                }

                {this.state.fantasyF1WCUsersSorted !== null &&
                    this.state.fantasyF1WCUsersSorted.length > 0 &&
                    !this.state.isCalculating &&
                    this.props.searchValue === "" &&
                    <div className="hall-of-fame-f1wc-list-container">
                        <div className="hall-of-fame-f1wc-list-wrapper">
                            {/* --------FIRST PLACE-------- */}
                            <div className="first-place-container">
                                <div className="image-wrapper">
                                    <img className="img-fluid" src={require("../../images/winner.png")} alt="triumph" data-fantasy-user-sorted-index={0} onClick={this.depositUserDataForModal} />
                                </div>
                                <div className="info-wrapper d-flex">
                                    <div className="position-no">
                                        &#8544;
                                    </div>
                                    <div className="titles-wrapper d-flex flex-column justify-content-between">
                                        <div className="top">
                                            {this.state.fantasyF1WCUsersSorted[0].username}
                                        </div>
                                        <div className="bottom">
                                            {this.state.fantasyF1WCUsersSorted[0].f1WCgrandTotal} <sup>p</sup>
                                        </div>
                                    </div>
                                </div>
                                <div className="title">
                                    Velemajstor ove igre
                            </div>
                            </div>



                            <div className="d-flex second-third-container">
                                {/* --------SECOND PLACE-------- */}
                                <div className="second-place-container">
                                    <div className="image-wrapper">
                                        <img className="img-fluid" src={require("../../images/boybig.png")} alt="triumph" data-fantasy-user-sorted-index={1} onClick={this.depositUserDataForModal} />
                                    </div>
                                    <div className="info-wrapper d-flex">
                                        <div className="position-no">
                                            &#8545;
                                        </div>
                                        <div className="titles-wrapper d-flex flex-column justify-content-between">
                                            <div className="top">
                                                {this.state.fantasyF1WCUsersSorted[1].username}
                                            </div>
                                            <div className="bottom">
                                                {this.state.fantasyF1WCUsersSorted[1].f1WCgrandTotal} <sup>p</sup>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="title">
                                        Tlačitelj površnih
                                    </div>
                                </div>


                                {/* --------THIRD PLACE-------- */}
                                <div className="third-place-container" >
                                    <div className="image-wrapper">
                                        <img className="img-fluid" src={require("../../images/boybig.png")} alt="triumph" data-fantasy-user-sorted-index={2} onClick={this.depositUserDataForModal} />
                                    </div>
                                    <div className="info-wrapper d-flex">
                                        <div className="position-no" >
                                            &#8546;
                                        </div>
                                        <div className="titles-wrapper d-flex flex-column justify-content-between">
                                            <div className="top">
                                                {this.state.fantasyF1WCUsersSorted[2].username}
                                            </div>
                                            <div className="bottom">
                                                {this.state.fantasyF1WCUsersSorted[2].f1WCgrandTotal} <sup>p</sup>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="title">
                                        Egzekutor tikvana
                                    </div>
                                </div>
                            </div>


                            <div className="chosen-few-container row w-100 m-0">
                                {this.mapChosenOnes()}
                            </div>

                            {/* <div>The chosen few</div> */}
                        </div>
                    </div>
                }
                {this.state.fantasyF1WCUsersSorted !== null &&
                    this.state.fantasyF1WCUsersSorted.length > 0 &&
                    this.props.searchValue !== "" &&
                    <div className="hall-of-fame-f1wc-points-list-wrapper d-flex flex-column align-items-center">
                        <div className="plebs-container d-flex flex-column align-items-center">
                            <div className="plebse-title">------------------------- REZULTAT PRETRAGE -------------------------</div>
                            <table>
                                <thead className="w-100">
                                    <tr className="w-100">
                                        <th className="orer-no">Pozicija</th>
                                        <th>Korisnik</th>
                                        <th className="td-points">TD poeni - ukupno</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.mapSearched()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }




                {this.state.fantasyF1WCUsersSorted !== null &&
                    this.state.fantasyF1WCUsersSorted.length == 0 &&
                    <div className="hall-of-fame-f1wc-list-container">
                        <div className="hall-of-fame-f1wc-list-wrapper">
                            <div className="first-place-container">
                                <div className="image-wrapper">
                                    <img className="img-fluid" src={require("../../images/winner.png")} alt="triumph" />
                                </div>
                                <div className="info-wrapper d-flex">
                                    <div className="position-no">
                                        &#8544;
                                    </div>
                                    <div className="titles-wrapper d-flex flex-column justify-content-between">
                                        <div className="top">
                                            Rezervisano za tebe
                                        </div>
                                        <div className="bottom">
                                            442 <sup>p</sup>
                                        </div>
                                    </div>
                                </div>
                                <div className="title">
                                    Velemajstor ove igre
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Portal>
                    <HallOfFameUserStatsModal isShowing={this.state.showUserModal} closeModal={this.closeUserModal} userData={this.state.fantasyUserForModalData} />

                </Portal>
            </>

        )
    }
}

export default SRBHallOfFameF1WCList