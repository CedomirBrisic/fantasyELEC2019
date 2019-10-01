import React from 'react';
import { AppContext } from '../screens/_context/AppContext';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import calculateNowRound from "../services/calculateNowRound";
import humanReadDateAndTime from "../services/humanReadDateAndTime";
import SRBHallOfFameRealLifePlayerListStats from "./common/SRBHallOfFameRealLifePlayerListStats";
import SRBHallOfFameFantasyPlayersList from "./common/SRBHallOfFameFantasyPlayersList";
// import SRBHallOfFameF1WCList from './common/SRBHallOfFameF1WCList';
import SRBHallOfFameTotalPointsList from './common/SRBHallOfFameTotalPointsList';




class SRBHallOfFameScreen extends React.Component {
    static contextType = AppContext;
    state = {
        listView: "basketball-players-real-life-stats",
        searchPlaceholder: "Potraži po imenu",
        searchValue: "",
        redirect: false
    }

    depositSelectedDay = (event) => {
        const selectedDay = event.target.getAttribute("data-day-to-select")
        this.context.depositHallOfFameSelectedDay(selectedDay)
    }

    depositSelectedList = (event) => {
        const listView = event.target.getAttribute("data-view")
        let searchPlaceholder = ""

        if (listView === "basketball-players-real-life-stats" || listView === "basketball-players-fantasy-points") {
            searchPlaceholder = "Potraži po imenu"
        } else {
            searchPlaceholder = "Potraži po imenu"
        }
        this.setState({
            listView,
            searchPlaceholder
        })
    }
    depositSearchValue = (event) => {
        const searchValue = event.target.value
        this.setState({
            searchValue
        })
    }
    clearSearchValue = () => {
        this.setState({
            searchValue: ""
        })
    }

    checkBlur = (event) => {
        if (event.keyCode === 13) {
            event.target.blur()
        }
    }

    componentDidMount() {
        let data = sessionStorage.getItem("bitrulez")
        let data2 = sessionStorage.getItem("bitrulez2")
        let data3 = sessionStorage.getItem("bitrulez3")
        if (data === null && data2 === null) {
            this.setState({
                redirect: true,
            })
        } else {
            this.setState({
                redirect: false,
            })
            if (this.context.isInitialLoading) {
                this.context.getFantasyDataContext()
            }
            this.context.depositIsHallOfFame()
        }


        const nowDate = humanReadDateAndTime().humanDate
        const nowRound = calculateNowRound(nowDate, data3)
        this.context.depositHallOfFameSelectedDay(nowRound)


        this.trivia()
        this.interval = setInterval(
            () => this.trivia(),
            7900
        );
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
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            <>
                {this.context.isInitialLoading &&
                    <div className="loader-container d-flex justify-content-center align-items-start">
                        <div className="d-flex flex-column align-items-center">
                            <div className="d-flex align-items-center">
                                <h1>Postavljanje igre u toku <i>( molimo vas budite strpljivi )</i></h1>
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
                            <div className="club-logos-container d-flex flex-column justify-content-around">
                                <div className="d-flex justify-content-around h-25 w-100">
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=BER&seasoncode=E2?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/Alba_Berlin_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=IST&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/Anadolu_Efes_SK_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=MCO&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/AS_Monaco_Basket_Logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=SOP&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Arka_Gdynia_(basketball)_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=MIL&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/Pallacanestro_Olimpia_Milano_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=BUD&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/KK_Budućnost_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=LJU&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Cedevita_Olimpija_Ljubljana_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=RED&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/KK_Crvena_zvezda_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=CSK&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/PBC_CSKA_Moscow_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=DAR&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Darüşşafaka_SK_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around h-25 w-100">
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=TRN&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Aquila_Basket_Trento_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=OLD&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/EWE_Baskets_Oldenburg_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=BAR&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/FC_Barcelona_Bàsquet_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=MUN&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/FC_Bayern_Munich_(basketball)_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=ULK&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/Fenerbahçe_Men's_Basketball_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=GAL&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Galatasaray_SK_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=BRE&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Basket_Brescia_Leonessa_Logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=JOV&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Joventut_Badalona_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=KHI&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/BC_Khimki_2016_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=BAS&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/Saski_Baskonia.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=ASV&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/LDLC_ASVEL_Basket_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around h-25 w-100">
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=LMG&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Logo_CSP_Limoges_1929.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=TIV&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/PBC_Lokomotiv-Kuban_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=TEL&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/Maccabi_Tel_Aviv_BC_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=RIS&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Maccabi_Rishon_logo_2017.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=ANR&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/MoraBanc_Andorra_2018.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=NTR&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Nanterre_92_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=OLY&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/Olympiacos_BC_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=PAN&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/Panathinaikos_BC_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=PAR&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/KK_Partizan_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=PAT&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Promitheas_Patras_BC_primary_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around h-25 w-100">
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=ULM&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Ratiopharm_Ulm_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=MAD&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/Real_Madrid_Baloncesto_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=LIE&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/BC_Rytas_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=VIR&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Virtus_Bologna_Logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=BUR&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Tofas_2016_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=VNC&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/Reyer_Venezia_logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=MAL&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/CB_Unicaja_Logo.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.eurocupbasketball.com/eurocup/competition/teams/showteam?clubcode=UNK&seasoncode=U2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroCup/UNICS_logo_2014.png")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=PAM&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/Valencia_Basket_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=ZAL&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/BC_Žalgiris_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="https://www.euroleague.net/competition/teams/showteam?clubcode=DYR&seasoncode=E2019?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer">
                                            <img src={require("../images/logos/euroLeague/BC_Zenit_Saint_Petersburg_logo.svg")} alt="teamLogo" />
                                        </a>
                                    </div>

                                </div>
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
                                            <i>Napravili</i> <a href="https://sportske.net/?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer"><img src={require("../images/logo-sportske.png")} alt="Belgrade Institute of Technology" /></a>
                                        </div>
                                        <div className="bit d-flex justify-content-between align-items-end">
                                            <i>Powered by</i> <a href="https://www.bgit.rs/en/" target="_blank" rel="noopener noreferrer"><img src={require("../images/logo-bit.png")} alt="Belgrade Institute of Technology" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {!this.context.isInitialLoading &&
                    <div className="hall-of-fame-screen-container d-flex flex-column">
                        <div className="d-flex">
                            {this.state.listView !== "f1wc" &&
                                <div className="dashboard-select-day-container move-it-down d-flex flex-column justify align-items-center show-selected-day">
                                    {this.context.selectedLeague == "euroLeague" &&
                                        <section className={`dashboard-select-day-container d-flex flex-column justify align-items-center ${this.context.showSelectDayDashboard ? "show-selected-day" : ""}`}>
                                            <p className="stick-it"><i>Izaberi Rundu</i></p>
                                            <div className="dashboard-select-day-list-wrapper d-md-flex flex-md-column justify-content-md-between ">
                                                <button type="button" className={`btn btn-outline-light pt-4 pb-4 ${this.context.hallOfFameSelectedDay === "all-days" ? "is-selected" : ""}`} data-day-to-select="all-days" onClick={this.depositSelectedDay}>SVE RUNDE</button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>RUNDA 1<br /><i data-day-to-select="ROUND-1">Oktobar 3-4, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>RUNDA 2<br /><i data-day-to-select="ROUND-2">Oktobar 10-11, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>RUNDA 3<br /><i data-day-to-select="ROUND-3">Oktobar 17-18, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>RUNDA 4<br /><i data-day-to-select="ROUND-4">Oktobar 24-25, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>RUNDA 5<br /><i data-day-to-select="ROUND-5">Oktobar 29-30, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>RUNDA 6<br /><i data-day-to-select="ROUND-6">Oktobar 31 / Novembar 1, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>RUNDA 7<br /><i data-day-to-select="ROUND-7">Novembar 7-8, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>RUNDA 8<br /><i data-day-to-select="ROUND-8">Novembar 14-15, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>RUNDA 9<br /><i data-day-to-select="ROUND-9">Novembar 19-20, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>RUNDA 10<br /><i data-day-to-select="ROUND-10">Novembar 21-22, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-11" ? "is-selected" : ""}`} data-day-to-select="ROUND-11" onClick={this.depositSelectedDay}>RUNDA 11<br /><i data-day-to-select="ROUND-11">Novembar 28-29, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-12" ? "is-selected" : ""}`} data-day-to-select="ROUND-12" onClick={this.depositSelectedDay}>RUNDA 12<br /><i data-day-to-select="ROUND-12">Decembar 5-6, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-13" ? "is-selected" : ""}`} data-day-to-select="ROUND-13" onClick={this.depositSelectedDay}>RUNDA 13<br /><i data-day-to-select="ROUND-13">Decembar 12-13, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-14" ? "is-selected" : ""}`} data-day-to-select="ROUND-14" onClick={this.depositSelectedDay}>RUNDA 14<br /><i data-day-to-select="ROUND-14">Decembar 17-18, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-15" ? "is-selected" : ""}`} data-day-to-select="ROUND-15" onClick={this.depositSelectedDay}>RUNDA 15<br /><i data-day-to-select="ROUND-15">Decembar 19-20, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-16" ? "is-selected" : ""}`} data-day-to-select="ROUND-16" onClick={this.depositSelectedDay}>RUNDA 16<br /><i data-day-to-select="ROUND-16">Decembar 26-27, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-17" ? "is-selected" : ""}`} data-day-to-select="ROUND-17" onClick={this.depositSelectedDay}>RUNDA 17<br /><i data-day-to-select="ROUND-17">Januar 2-3, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-18" ? "is-selected" : ""}`} data-day-to-select="ROUND-18" onClick={this.depositSelectedDay}>RUNDA 18<br /><i data-day-to-select="ROUND-18">Januar 9-10, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-19" ? "is-selected" : ""}`} data-day-to-select="ROUND-19" onClick={this.depositSelectedDay}>RUNDA 19<br /><i data-day-to-select="ROUND-19">Januar 14-15, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-20" ? "is-selected" : ""}`} data-day-to-select="ROUND-20" onClick={this.depositSelectedDay}>RUNDA 20<br /><i data-day-to-select="ROUND-20">Januar 16-17, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-21" ? "is-selected" : ""}`} data-day-to-select="ROUND-21" onClick={this.depositSelectedDay}>RUNDA 21<br /><i data-day-to-select="ROUND-21">Januar 23-24, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-22" ? "is-selected" : ""}`} data-day-to-select="ROUND-22" onClick={this.depositSelectedDay}>RUNDA 22<br /><i data-day-to-select="ROUND-22">Januar 30-31, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-23" ? "is-selected" : ""}`} data-day-to-select="ROUND-23" onClick={this.depositSelectedDay}>RUNDA 23<br /><i data-day-to-select="ROUND-23">Februar 4-5, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-24" ? "is-selected" : ""}`} data-day-to-select="ROUND-24" onClick={this.depositSelectedDay}>RUNDA 24<br /><i data-day-to-select="ROUND-24">Februar 6-7, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-25" ? "is-selected" : ""}`} data-day-to-select="ROUND-25" onClick={this.depositSelectedDay}>RUNDA 25<br /><i data-day-to-select="ROUND-25">Februar 20-21, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-26" ? "is-selected" : ""}`} data-day-to-select="ROUND-26" onClick={this.depositSelectedDay}>RUNDA 26<br /><i data-day-to-select="ROUND-26">Februar 27-28, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-27" ? "is-selected" : ""}`} data-day-to-select="ROUND-27" onClick={this.depositSelectedDay}>RUNDA 27<br /><i data-day-to-select="ROUND-27">Mart 3-4, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-28" ? "is-selected" : ""}`} data-day-to-select="ROUND-28" onClick={this.depositSelectedDay}>RUNDA 28<br /><i data-day-to-select="ROUND-28">Mart 5-6, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-29" ? "is-selected" : ""}`} data-day-to-select="ROUND-29" onClick={this.depositSelectedDay}>RUNDA 29<br /><i data-day-to-select="ROUND-29">Mart 12-13, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-30" ? "is-selected" : ""}`} data-day-to-select="ROUND-30" onClick={this.depositSelectedDay}>RUNDA 30<br /><i data-day-to-select="ROUND-30">Mart 19-20, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-31" ? "is-selected" : ""}`} data-day-to-select="ROUND-31" onClick={this.depositSelectedDay}>RUNDA 31<br /><i data-day-to-select="ROUND-31">Mart 24-25, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-32" ? "is-selected" : ""}`} data-day-to-select="ROUND-32" onClick={this.depositSelectedDay}>RUNDA 32<br /><i data-day-to-select="ROUND-32">Mart 26-27, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-33" ? "is-selected" : ""}`} data-day-to-select="ROUND-33" onClick={this.depositSelectedDay}>RUNDA 33<br /><i data-day-to-select="ROUND-33">April 2-3, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-34" ? "is-selected" : ""}`} data-day-to-select="ROUND-34" onClick={this.depositSelectedDay}>RUNDA 34<br /><i data-day-to-select="ROUND-34">April 9-10, 2020</i></button>
                                            </div>
                                        </section>
                                    }


                                    {this.context.selectedLeague == "euroCup" &&
                                        <section className={`dashboard-select-day-container d-flex flex-column justify align-items-center ${this.context.showSelectDayDashboard ? "show-selected-day" : ""}`}>
                                            <p className="stick-it"><i>Select Round</i></p>
                                            <div className="dashboard-select-day-list-wrapper d-md-flex flex-md-column justify-content-md-between ">
                                                <button type="button" className={`btn btn-outline-light pt-4 pb-4 ${this.context.hallOfFameSelectedDay === "all-days" ? "is-selected" : ""}`} data-day-to-select="all-days" onClick={this.depositSelectedDay}>SVE RUNDE</button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>RUNDA 1<br /><i data-day-to-select="ROUND-1">Oktobar 1-2, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>RUNDA 2<br /><i data-day-to-select="ROUND-2">Oktobar 8-9, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>RUNDA 3<br /><i data-day-to-select="ROUND-3">Oktobar 15-16, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>RUNDA 4<br /><i data-day-to-select="ROUND-4">Oktobar 22-23, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>RUNDA 5<br /><i data-day-to-select="ROUND-5">Oktobar 29-30, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>RUNDA 6<br /><i data-day-to-select="ROUND-6">Novembar 5-6, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>RUNDA 7<br /><i data-day-to-select="ROUND-7">Novembar 12-13, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>RUNDA 8<br /><i data-day-to-select="ROUND-8">Novembar 19-20, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>RUNDA 9<br /><i data-day-to-select="ROUND-9">Decembar 10-11, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>RUNDA 10<br /><i data-day-to-select="ROUND-10">Decembar 17-18, 2019</i></button>
                                            </div>
                                        </section>
                                    }
                                </div>}

                            {!this.context.isInitialLoading &&
                                <div className="lists-container">
                                    <Link to={`user-screen`}>
                                        <button type="button" className="btn  btn-danger back-button">Povratak nazad</button>
                                    </Link>
                                    <div className="hall-of-fame-links-wrapper d-flex justify-content-around">
                                        {/* <button className="btn btn-outline-dark" disabled>(računa se, biće...)</button>
                                        <button className="btn btn-outline-dark" disabled>(računa se, biće...)</button> */}
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "leagues" ? "active" : ""}`} disabled data-view="leagues" onClick={this.depositSelectedList}>Lige (uskoro...)</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "round-points" ? "active" : ""}`} data-view="round-points" onClick={this.depositSelectedList}>Globalna liga</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "basketball-players-fantasy-points" ? "active" : ""}`} data-view="basketball-players-fantasy-points" onClick={this.depositSelectedList}>Košarkaši - fantazi poeni</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "basketball-players-real-life-stats" ? "active" : ""}`} data-view="basketball-players-real-life-stats" onClick={this.depositSelectedList}>Košarkaši - statistika u stvarnosti</button>
                                        <input type="search" placeholder={this.state.searchPlaceholder} value={this.state.searchValue} onChange={this.depositSearchValue} onKeyDown={this.checkBlur} />
                                    </div>
                                    {/* {this.state.listView === "f1wc" &&
                                        <SRBHallOfFameF1WCList searchValue={this.state.searchValue} clearSearchValue={this.clearSearchValue} />
                                    } */}
                                    {/* <HallOfFameUserStats /> */}

                                    {this.state.listView === "round-points" &&
                                        <SRBHallOfFameTotalPointsList searchValue={this.state.searchValue} selectedDay={this.context.hallOfFameSelectedDay} clearSearchValue={this.clearSearchValue} />
                                    }
                                    {this.state.listView === "basketball-players-fantasy-points" &&
                                        <SRBHallOfFameFantasyPlayersList searchValue={this.state.searchValue} clearSearchValue={this.clearSearchValue} />
                                    }
                                    {this.state.listView === "basketball-players-real-life-stats" &&
                                        <SRBHallOfFameRealLifePlayerListStats searchValue={this.state.searchValue} clearSearchValue={this.clearSearchValue} />
                                    }
                                </div>
                            }

                        </div>
                        <Link to={`user-screen`}>
                            <div className="go-back-button">Povratak na selektovanje ekipe</div>
                        </Link>
                    </div>
                }
            </>
        )
    }
}

export default SRBHallOfFameScreen