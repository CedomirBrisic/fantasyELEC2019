import React from 'react';
import { AppContext } from '../../screens/_context/AppContext';
import { Portal } from 'react-portal';
import eligibleDays from "../../services/eligibleDays";
import checkEligibilityForPickTeam from "../../services/checkEligibilityForPickTeam";
import HallOfFameUserStatsModal from "../modals/HallOfFameUserStatsModal";
import serbischeDatum from "../../services/serbischeDatum";



class SRBHallOfFameTotalPointsList extends React.Component {
    static contextType = AppContext;
    state = {
        fantasyUsersSorted: null,
        showUserModal: false,
        fantasyUserForModalData: null,
        isCalculating: true
    }
    calculateAllUsers = () => {
        let output = null
        const fantasyUsers = this.context.fantasyUsers
        const hallOfFameSelectedDay = this.context.hallOfFameSelectedDay
        const nowDateAndTime = this.context.nowDateAndTime
        const teamsByDay = this.context.dropdowns[0].teamsByDay
        const basketballPlayers = this.context.basketballPlayers
        if (hallOfFameSelectedDay !== "all-days") {
            const fantasyUsersCalculatedPointsForOneDay = []
            fantasyUsers.forEach((user) => {
                const calculatedData = checkEligibilityForPickTeam(fantasyUsers, user.username, hallOfFameSelectedDay, nowDateAndTime, teamsByDay, basketballPlayers)
                const userData = {
                    username: user.username,
                    summaSummarum: calculatedData.totalSummaSummarum,
                    teamPickIds: calculatedData.teamPickData
                }
                fantasyUsersCalculatedPointsForOneDay.push(userData)
            })
            output = fantasyUsersCalculatedPointsForOneDay
            if (output !== null) {
                output.sort(function (a, b) {
                    return b.summaSummarum - a.summaSummarum
                })
            }
        } else {
            const fantasyUsersCalculatedPointsForAllDays = []
            fantasyUsers.forEach((user) => {
                const calculatedPointsForOneUser = {
                    username: user.username,
                    summaSummarum: 0,
                    data: []
                }
                eligibleDays.forEach((day) => {
                    const calculatedData = checkEligibilityForPickTeam(fantasyUsers, user.username, day, nowDateAndTime, teamsByDay, basketballPlayers)
                    const userData = {
                        roundDate: day,
                        totalDaySummaSummarum: calculatedData.totalSummaSummarum,
                        teamPickIds: calculatedData.teamPickData
                    }
                    calculatedPointsForOneUser.data.push(userData)
                    calculatedPointsForOneUser.summaSummarum = !isNaN(parseFloat(calculatedData.totalSummaSummarum)) ? calculatedPointsForOneUser.summaSummarum + parseFloat(calculatedData.totalSummaSummarum) : calculatedPointsForOneUser.summaSummarum
                })
                fantasyUsersCalculatedPointsForAllDays.push(calculatedPointsForOneUser)
            })
            output = fantasyUsersCalculatedPointsForAllDays
            if (output !== null) {
                output.sort(function (a, b) {
                    return b.summaSummarum - a.summaSummarum
                })
            }
        }
        this.setState({
            fantasyUsersSorted: output,
            isCalculating: false
        })
    }



    mapPlebs = () => {
        const output = []
        const fantasyUsers = this.state.fantasyUsersSorted
        for (let i = 10; i < fantasyUsers.length; i++) {
            const outputElement =
                <tr key={fantasyUsers[i].username + i} data-fantasy-user-sorted-index={i} onClick={this.depositUserDataForModal}>
                    <td className="orer-no" data-fantasy-user-sorted-index={i}>{i + 1}</td>
                    <td data-fantasy-user-sorted-index={i}>{fantasyUsers[i].username}</td>
                    <td data-fantasy-user-sorted-index={i}>{typeof (fantasyUsers[i].summaSummarum) == "string" ? parseFloat(fantasyUsers[i].summaSummarum).toFixed(2) : fantasyUsers[i].summaSummarum.toFixed(2)}</td>
                </tr>

            output.push(outputElement)
        }
        return output
    }

    mapSearched = () => {
        const output = []
        const fantasyUsers = this.state.fantasyUsersSorted
        const searchValue = this.props.searchValue.toLowerCase()
        for (let i = 0; i < fantasyUsers.length; i++) {
            if (fantasyUsers[i].username.toLowerCase().includes(searchValue)) {
                const outputElement =
                    <tr key={fantasyUsers[i].username + i} data-fantasy-user-sorted-index={i} onClick={this.depositUserDataForModal}>
                        <td className="orer-no" data-fantasy-user-sorted-index={i}>{i + 1}</td>
                        <td data-fantasy-user-sorted-index={i}>{fantasyUsers[i].username}</td>
                        <td data-fantasy-user-sorted-index={i}>{typeof (fantasyUsers[i].summaSummarum) == "string" ? parseFloat(fantasyUsers[i].summaSummarum).toFixed(2) : fantasyUsers[i].summaSummarum.toFixed(2)}</td>
                    </tr>
                output.push(outputElement)
            }
        }
        return output
    }

    checkIsPlebseView = () => {
        return this.state.fantasyUsersSorted[10].summaSummarum == 0 ? false : true
    }

    closeUserModal = () => {
        this.setState({
            showUserModal: false
        })
    }

    depositUserDataForModal = (event) => {
        const index = event.target.getAttribute("data-fantasy-user-sorted-index")
        const data = this.state.fantasyUsersSorted[index]
        this.setState({
            showUserModal: true,
            fantasyUserForModalData: data
        })
    }
    componentDidMount() {
        this.props.clearSearchValue()
        setTimeout(() => {
            this.calculateAllUsers()
        }, 240);
        this.trivia()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.selectedDay !== this.props.selectedDay) {
            this.setState({
                isCalculating: true,
            })
            setTimeout(() => {
                this.calculateAllUsers()
            }, 100);
        }
    }
    trivia() {
        const triviaContainer = [
            "Prvi “koševi” su zapravo bile korpe za breskve dok su prve table bile napravljene od žice",
            "Košarka je postala zvanična kao Olimpijski sport na letnjim Olimpijskim igrama u Berlinu u Nemčkoj 1936 godine",
            "Kareem Abdul-Jabbar, koji je odigrao 20 sezona u NBA, drži rekord sa najviše postignutih poena u karijeri - 38,387.",
            "2. Marta 1962 godine, Filadelfijin centar Wilt Chamberlain postigao je 100 poena na jednoj utakmici i ujedno je to rekord za jednog igrača. Bilo je to protiv New York-a.",
            "Nejsmitova kuća slavnih se nalazi u Springfildu- Masačusets, a Sportske Fantasy kuća slavnih je u gornjem desnom uglu ;-)",
            "Košarka se do 1929. godine igrala loptom za fudbal",
            "U periodu od 1967 do 1976 godine, u NCAA ligi zakucavanje je bilo zabranjeno",
            "Nejsmitovo originalno pravilo #1 - Lopta se može baciti u bilo kom pravcu koristeći jednu ili obe šake.",
            "Nejsmitovo originalno pravilo #2 - Lopta se može tapkati u bilo kom pravcu koristeći jednu ili obe šake.",
            "Nejsmitovo originalno pravilo #3 - Igrač ne može trčati sa loptom u naručju, igrač je mora baciti sa mesta na kojem ju je uhvatio, izuzetak se može napraviti za igrača koji je u trenutku hvatanja lopte trčao značajnom brzinom.",
            "Nejsmitovo originalno pravilo #4 - Lopta se mora držati jednom ili sa obe šake, ruke ili telo se ne smeju koristiti prilikom držanja.",
            "Nejsmitovo originalno pravilo #5 - Hvatanje za ramena, držanje, guranje, saplitanje ili udaranje protivničkog igrača, u bilo kom smislu nije dopušteno. Prvi prekršaj ovog pravila od strane bilo kog igrača će se karakterisati kao faul, drugi prekršaj će ga diskvalifikovati dok se ne postigne sledeći pogodak, ili ako je očigledna namera da se povredi protivnički igrač, za celu utakmicu, bez prava na izmenu.",
            "Nejsmitovo originalno pravilo #6 - Prekršaj je udaranje lopte pesnicom, kršenje pravila #3 i #4, i kao što je opisano u pravilu #5.",
            "Nejsmitovo originalno pravilo #7 - Ako bilo koja strana napravi 3 uzastopna prekršaja računaće se kao pogodak za protivničku ekipu.",
            "Nejsmitovo originalno pravilo #8 - Pogodak se računa ukoliko je lopta bačena ili udarena sa zemlje u korpu gde je i ostala. Ukoliko se lopta zadrži na ivici korpe i protivnički igrač pomeri korpu takođe se računa kao pogodak.",
            "Nejsmitovo originalno pravilo #9 - Kada lopta izađe van granice terena biće bačena nazad u teren i iskorišćena od strane prvog igrača koji je dodirne. U slučaju rasprave, posrednik će je baciti pravo u teren. Onaj koji je ubacuje nazad u teren ima 5 sekundi za to. Ukoliko je zadrži duže od toga lopta će pripasti drugoj ekipi. Ukoliko bilo koja strana bude uporna u zadržavanju igre, posrednik će svirati prekršaj.",
            "Nejsmitovo originalno pravilo #10 - Posrednik će biti sudija igračima i beležiće prekršaje, i obaveštavati arbitra kada su počinjena 3 uzastopna prekršaja.",
            "Nejsmitovo originalno pravilo #11 - Arbitar će biti sudija zadužen za loptu i odlučivaće kada je lopta u igri, i kojoj strani pripada, i meriće vreme. On će odlučivati kada je postignut pogodak i vodiće računa o rezultatu kao što će i biti zadužen za sve ostale aktivnosti koje inače obavlja arbitar.",
            "Nejsmitovo originalno pravilo #12 - Vreme će biti 15-minutne polovine, sa 5-minutnom pauzom za odmor između.",
            "Nejsmitovo originalno pravilo #13 - Strana koja postigne najviše pogodaka se proglašava pobednikom. U slučaju nerešenog rezultata, igra se može, dogovorom kapitena, nastaviti dok se ne postigne sledeći pogodak.",
            "Prva košarkaška utakmica se odigrala 1892. godine, teren je bio polovina današnjih dimenzija. Meč je trajao 30 minuta, i postignut je samo jedan poen.",
            "Razlog za uvođenje table iza obruča je taj što se publika na balkonu mešala (posredovala) u igru dodirivajući loptu.",
            "Prvi koševi su bili korpe i svaki put kada bi bio postignut pogodak, arbitar bi se penjao na merdevine kako bi dohvatio loptu."
        ]
        const index = Math.floor(Math.random() * Math.floor(23));
        const trivia = triviaContainer[index]
        this.setState({
            trivia
        });
    }
    render() {
        return (
            <>
                {this.state.isCalculating &&
                    <div className="loader-container-calculating d-flex justify-content-center align-items-start">
                        <div className="d-flex flex-column align-items-center">
                            <div className="d-flex align-items-center">
                                <h1>Računanje Sportske Fantazi poena {this.context.fantasyUsers.length} korisnika za {serbischeDatum(this.context.hallOfFameSelectedDay)}</h1>
                                <div className="spinner-grow text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div className="spinner-grow text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div className="club-logos-container calc-logos">

                            </div>
                            <div className="d-flex justify-content-between w-100">
                                <div className="credits-container w-100 d-flex flex-column">
                                    <a href="https://www.inta.org/TrademarkBasics/FactSheets/Pages/Fair-Use-of-TrademarksNL.aspx" target="_blank" rel="noopener noreferrer"><b>Fair Use</b> of teams' logos.</a>
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
                                <div className="right-container d-flex flex-column justify-content-between">
                                    <div className="trivia">
                                        {this.state.trivia}
                                    </div>
                                    <div className="powered-by-wrapper d-flex justify-content-between">
                                        <div className="sportske d-flex justify-content-between align-items-end">
                                            <i>Napravili</i> <a href="https://sportske.net/?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer"><img src={require("../../images/logo-sportske.png")} alt="Belgrade Institute of Technology" /></a>
                                        </div>
                                        <div className="bit d-flex justify-content-between align-items-end">
                                            <i>Powered by</i> <a href="https://www.bgit.rs/en/" target="_blank" rel="noopener noreferrer"><img src={require("../../images/logo-bit.png")} alt="Belgrade Institute of Technology" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {this.state.fantasyUsersSorted &&
                    this.props.searchValue === "" &&
                    <div className="hall-of-fame-total-points-list-container">
                        <div className="hall-of-fame-total-points-list-wrapper d-flex flex-column align-items-center">
                            {/* {this.context.hallOfFameSelectedDay !== "all-days" &&
                                this.state.fantasyUsersSorted[0].summaSummarum != 0 &&
                                <div className="made-it-trough"><i>Korisnici koji su se probili<br />u bitci za TD poene</i></div>
                            } */}
                            <div className="first-place-wrapper d-flex align-items-center" data-fantasy-user-sorted-index={0} onClick={this.depositUserDataForModal}>
                                <div className="user-order-no" data-fantasy-user-sorted-index={0}>
                                    1.
                                </div>
                                <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={0}>
                                    <div className="top" data-fantasy-user-sorted-index={0}>
                                        <i data-fantasy-user-sorted-index={0}>Korisničko ime:</i> {this.state.fantasyUsersSorted[0].summaSummarum == 0 ? `Rezervisano za tebe` : this.state.fantasyUsersSorted[0].username}
                                    </div>
                                    <div className="bottom" data-fantasy-user-sorted-index={0}>
                                        <i data-fantasy-user-sorted-index={0}>Sportske Fantazi poeni:</i> {this.state.fantasyUsersSorted[0].summaSummarum == 0 ? "1,000,000" : parseFloat(this.state.fantasyUsersSorted[0].summaSummarum).toFixed(2)} <sup data-fantasy-user-sorted-index={0}>p</sup>
                                    </div>
                                    {this.context.hallOfFameSelectedDay !== "all-days" &&
                                        <div className="bottom-bottom serbische-td-poeni" data-fantasy-user-sorted-index={0}>
                                            <i data-fantasy-user-sorted-index={0}>TD Poeni:</i>25 <sup data-fantasy-user-sorted-index={0}>p</sup>
                                        </div>
                                    }
                                </div>
                                <div className="silhouette-wrapper" data-fantasy-user-sorted-index={0}>
                                    <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={0} />
                                </div>
                            </div>


                            <div className=" d-flex justify-content-between align-items-center w-100" >

                                <div className="not-first-place-wrapper d-flex align-items-center second-to-show" data-fantasy-user-sorted-index={1} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={1}>
                                        2.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={1}>
                                        <div className="top" data-fantasy-user-sorted-index={1}>
                                            {this.state.fantasyUsersSorted[1].summaSummarum == 0 ? "Rezervisano za ortake" : this.state.fantasyUsersSorted[1].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={1}>
                                            {parseFloat(this.state.fantasyUsersSorted[1].summaSummarum).toFixed(2)} <sup data-fantasy-user-sorted-index={1}>p</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={1}>
                                                18 <sup data-fantasy-user-sorted-index={1}>p</sup>
                                            </div>}
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={1}>
                                        {this.state.fantasyUsersSorted[1].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={1} />}
                                    </div>
                                </div>


                                <div className="not-first-place-wrapper d-flex align-items-center third-to-show" data-fantasy-user-sorted-index={2} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={2}>
                                        3.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={2}>
                                        <div className="top" data-fantasy-user-sorted-index={2}>
                                            {this.state.fantasyUsersSorted[2].summaSummarum == 0 ? "Rezervisano za ortake" : this.state.fantasyUsersSorted[2].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={2}>
                                            {parseFloat(this.state.fantasyUsersSorted[2].summaSummarum).toFixed(2)} <sup data-fantasy-user-sorted-index={2}>p</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={2}>
                                                15 <sup data-fantasy-user-sorted-index={2}>p</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={2}>
                                        {this.state.fantasyUsersSorted[2].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={2} />}
                                    </div>
                                </div>



                                <div className="not-first-place-wrapper d-flex align-items-center fourth-to-show" data-fantasy-user-sorted-index={3} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={3}>
                                        4.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={3}>
                                        <div className="top" data-fantasy-user-sorted-index={3}>
                                            {this.state.fantasyUsersSorted[3].summaSummarum == 0 ? "Rezervisano za ortake" : this.state.fantasyUsersSorted[3].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={3}>
                                            {parseFloat(this.state.fantasyUsersSorted[3].summaSummarum).toFixed(2)} <sup data-fantasy-user-sorted-index={3}>p</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={3}>
                                                12 <sup data-fantasy-user-sorted-index={3}>p</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={3}>
                                        {this.state.fantasyUsersSorted[3].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={3} />}
                                    </div>
                                </div>
                            </div>



                            <div className=" d-flex justify-content-between align-items-center w-100">
                                <div className="not-first-place-wrapper d-flex align-items-center fifth-to-show" data-fantasy-user-sorted-index={4} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={4}>
                                        5.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={4}>
                                        <div className="top" data-fantasy-user-sorted-index={4}>
                                            {this.state.fantasyUsersSorted[4].summaSummarum == 0 ? "Rezervisano za ortake" : this.state.fantasyUsersSorted[4].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={4}>
                                            {parseFloat(this.state.fantasyUsersSorted[4].summaSummarum).toFixed(2)} <sup data-fantasy-user-sorted-index={4}>p</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={4}>
                                                10 <sup data-fantasy-user-sorted-index={4}>p</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={4}>
                                        {this.state.fantasyUsersSorted[4].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={4} />}
                                    </div>
                                </div>



                                <div className="not-first-place-wrapper d-flex align-items-center sixth-to-show" data-fantasy-user-sorted-index={5} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={5}>
                                        6.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={5}>
                                        <div className="top" data-fantasy-user-sorted-index={5}>
                                            {this.state.fantasyUsersSorted[5].summaSummarum == 0 ? "Rezervisano za ortake" : this.state.fantasyUsersSorted[5].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={5}>
                                            {parseFloat(this.state.fantasyUsersSorted[5].summaSummarum).toFixed(2)} <sup data-fantasy-user-sorted-index={5}>p</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={5}>
                                                8 <sup data-fantasy-user-sorted-index={5}>p</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={5}>
                                        {this.state.fantasyUsersSorted[5].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={5} />}
                                    </div>
                                </div>

                                <div className="not-first-place-wrapper d-flex align-items-center seventh-to-show" data-fantasy-user-sorted-index={6} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={6}>
                                        7.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={6}>
                                        <div className="top" data-fantasy-user-sorted-index={6}>
                                            {this.state.fantasyUsersSorted[6].summaSummarum == 0 ? "Rezervisano za ortake" : this.state.fantasyUsersSorted[6].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={6}>
                                            {parseFloat(this.state.fantasyUsersSorted[6].summaSummarum).toFixed(2)} <sup data-fantasy-user-sorted-index={6}>p</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={6}>
                                                6 <sup data-fantasy-user-sorted-index={6}>p</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper">
                                        {this.state.fantasyUsersSorted[6].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={6} />}
                                    </div>
                                </div>
                            </div>


                            <div className=" d-flex justify-content-between align-items-center w-100">
                                <div className="not-first-place-wrapper d-flex align-items-center eight-to-show" data-fantasy-user-sorted-index={7} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={7}>
                                        8.
                                </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={7}>
                                        <div className="top" data-fantasy-user-sorted-index={7}>
                                            {this.state.fantasyUsersSorted[7].summaSummarum == 0 ? "Rezervisano za ortake" : this.state.fantasyUsersSorted[7].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={7}>
                                            {parseFloat(this.state.fantasyUsersSorted[7].summaSummarum).toFixed(2)} <sup data-fantasy-user-sorted-index={7}>p</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={7}>
                                                4 <sup data-fantasy-user-sorted-index={7}>p</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={7}>
                                        {this.state.fantasyUsersSorted[7].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={7} />}
                                    </div>
                                </div>

                                <div className="not-first-place-wrapper d-flex align-items-center ninth-to-show" data-fantasy-user-sorted-index={8} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={8}>
                                        9.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={8}>
                                        <div className="top" data-fantasy-user-sorted-index={8}>
                                            {this.state.fantasyUsersSorted[8].summaSummarum == 0 ? "Rezervisano za ortake" : this.state.fantasyUsersSorted[8].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={8}>
                                            {parseFloat(this.state.fantasyUsersSorted[8].summaSummarum).toFixed(2)} <sup data-fantasy-user-sorted-index={8}>p</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={8}>
                                                2 <sup data-fantasy-user-sorted-index={8}>p</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={8}>
                                        {this.state.fantasyUsersSorted[8].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" data-fantasy-user-sorted-index={8} />}
                                    </div>
                                </div>


                                <div className="not-first-place-wrapper d-flex align-items-center tenth-to-show" data-fantasy-user-sorted-index={9} onClick={this.depositUserDataForModal}>
                                    <div className="user-order-no" data-fantasy-user-sorted-index={9}>
                                        10.
                                    </div>
                                    <div className="d-flex flex-column justify-content-between" data-fantasy-user-sorted-index={9}>
                                        <div className="top" data-fantasy-user-sorted-index={9}>
                                            {this.state.fantasyUsersSorted[9].summaSummarum == 0 ? "Rezervisano za ortake" : this.state.fantasyUsersSorted[9].username}
                                        </div>
                                        <div className="bottom" data-fantasy-user-sorted-index={9}>
                                            {parseFloat(this.state.fantasyUsersSorted[9].summaSummarum).toFixed(2)} <sup data-fantasy-user-sorted-index={9}>p</sup>
                                        </div>
                                        {this.context.hallOfFameSelectedDay !== "all-days" &&
                                            <div className="bottom-bottom" data-fantasy-user-sorted-index={9}>
                                                1 <sup data-fantasy-user-sorted-index={9}>p</sup>
                                            </div>
                                        }
                                    </div>
                                    <div className="silhouette-wrapper" data-fantasy-user-sorted-index={9}>
                                        {this.state.fantasyUsersSorted[9].summaSummarum == 0 ? "" : <img className="img-fluid" src={require("../../images/runnwinner.png")} alt="triumph" />}
                                    </div>
                                </div>
                            </div>

                            {this.checkIsPlebseView() &&
                                this.props.searchValue === "" &&
                                <div className="plebs-container">
                                    <div className="plebse-title">------------------------- SKROLUJ DOLE ZA OSTATAK EKIPE -------------------------</div>

                                    <table>
                                        <thead className="w-100">
                                            <tr className="w-100">
                                                <th className="orer-no">Pozicija</th>
                                                <th>Korisnik</th>
                                                <th className="td-points">Sportske Fantazi poeni</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.mapPlebs()}
                                        </tbody>
                                    </table>
                                </div>
                            }

                            {!this.checkIsPlebseView() &&
                                this.props.searchValue === "" &&
                                <div className="plebs-container">
                                    <div className="plebse-title">------------------------- JOŠ UVEK NEMA PODATAKA -------------------------</div>
                                </div>
                            }

                        </div>
                    </div>
                }
                {this.state.fantasyUsersSorted &&
                    this.props.searchValue !== "" &&
                    <div className="hall-of-fame-total-points-list-container">
                        <div className="hall-of-fame-total-points-list-wrapper d-flex flex-column align-items-center">
                            <div className="plebs-container-searched">
                                <div className="plebse-title">------------------------- REZULTAT PRETRAGE -------------------------</div>
                                <table>
                                    <thead className="w-100">
                                        <tr className="w-100">
                                            <th className="orer-no">Pozicija</th>
                                            <th>Korisnik</th>
                                            <th className="td-points">Sportske Fantazi poeni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.mapSearched()}
                                    </tbody>
                                </table>
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

export default SRBHallOfFameTotalPointsList