import React from 'react';
import { AppContext } from '../screens/_context/AppContext';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import calculateNowRound from "../services/calculateNowRound";
import humanReadDateAndTime from "../services/humanReadDateAndTime";
import HallOfFameRealLifePlayerListStats from "./common/HallOfFameRealLifePlayerListStats";
import HallOfFameFantasyPlayersList from "./common/HallOfFameFantasyPlayersList";
// import HallOfFameF1WCList from './common/HallOfFameF1WCList';
import HallOfFameTotalPointsList from './common/HallOfFameTotalPointsList';




class HallOfFameScreen extends React.Component {
    static contextType = AppContext;
    state = {
        listView: "basketball-players-real-life-stats",
        searchPlaceholder: "Search user by name",
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
            searchPlaceholder = "Search player by name"
        } else {
            searchPlaceholder = "Search user by name"
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
            "The first “hoops” were actually just peach baskets and the first backboards were made of wire.",
            "The Basketball game became an official Olympic event at the Summer Games in Berlin, Germany in 1936.",
            "Kareem Abdul-Jabbar, who played 20 seasons in the NBA, holds the record for most points scored in a career with 38,387.",
            "On March 2, 1962, Philadelphia center Wilt Chamberlain scored 100 points in one game against New York. That is the most one player has ever scored in one game.",
            "The Naismith Memorial Basketball Hall of Fame is located in Springfield, Mass. And Sportske Fantasy Hall of Fame is at right top corner ;-)",
            "Basketball was played by using a soccer ball until 1929.",
            "When a team shoots the ball into the basket, a goal is scored.",
            "Dunking was banned in the NCAA from 1967 to 1976.",
            "Naismith's original rule #1 - The ball may be thrown in any direction with one or both hands.",
            "Naismith's original rule #2 - The ball may be batted in any direction with one or both hands.",
            "Naismith's original rule #3 - A player cannot run with the ball, the player must throw it from the spot on which he catches it, allowance to be made for a man who catches the ball when running at good speed.",
            "Naismith's original rule #4 - The ball must be held in or between the hands, the arms or body must not be used for holding it.",
            "Naismith's original rule #5 - No shouldering, holding, pushing, tripping or striking in any way the person of an opponent shall be allowed. The first infringement of this rule by any person shall count as a foul, the second shall disqualify him until the next goal is made, or if there was evident intent to injure the person, for the whole of the game, no substitute.",
            "Naismith's original rule #6 - A foul is striking the ball with the fist, violation of rules 3 and 4, and such as described in rule 5.",
            "Naismith's original rule #7 - If either side makes three consecutive fouls it shall count a goal for opponents.",
            "Naismith's original rule #8 - A goal shall be made when the ball is thrown or batted from grounds into the basket and stays there. If the ball rests on the edge and the opponent moves the basket it shall count as a goal.",
            "Naismith's original rule #9 - When the ball goes out of bounds it shall be thrown into the field and played by the person first touching it. In case of a dispute, the umpire shall throw it straight into the field. The \"thrower-in\" is allowed five seconds. If he holds it longer it shall go to the opponent. If any side persists in delaying the game, the umpire shall call a foul on them.",
            "Naismith's original rule #10 - The umpire shall be the judge of the men and shall note the fouls, and notify the referee when three consecutive fouls have been made.",
            "Naismith's original rule #11 - The referee shall be the judge of the ball and shall decide when the ball is in play, in-bounds, and to which side it belongs, and shall keep the time. He shall decide when a goal has been made and keep account of the goals with any other duties that are usually performed by a referee.",
            "Naismith's original rule #12 - The time shall be fifteen-minute halves, with five-minute rests between.",
            "Naismith's original rule #13 - The side making the most goals in that time shall be declared the winner. In the case of a draw, the game may, by agreement of the captains, be continued until another goal is made.",
            "The first basketball game took place in 1892, where the court was half the size of today's courts. The game was played for 30 minutes, and only one point was scored in the match.",
            "The reason a backboard was added is because the audience in the balcony used to interfere in the game by handling the ball.",
            "The first hoop was like a peach with a bottom and every time team scores, the referee would climb a ladder to get the ball."
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
                                <h1>Game is Setting Up <i>( please be patient )</i></h1>
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
                                <div className="credits-container d-flex flex-column">
                                    <a href="https://www.inta.org/TrademarkBasics/FactSheets/Pages/Fair-Use-of-TrademarksNL.aspx" target="_blank" rel="noopener noreferrer"><b>Fair Use</b> of teams' logos.</a>
                                    <i>We thank to Pixabay for letting us borrow some of theirs images</i>
                                    <i>SPECIAL THANKS TO:</i>
                                    <i className="credits">David Mark from Pixabay</i>
                                    <i className="credits">Dimitris Vetsikas from Pixabay</i>
                                    <i className="credits">Pexels from Pixabay</i>
                                    <i className="credits">Clker-Free-Vector-Images from Pixabay</i>
                                    <i className="credits">mohamed Hassan from Pixabay</i>
                                    <i className="credits">BedexpStock from Pixabay</i>
                                    <i className="credits">OpenClipart-Vectors from Pixabay </i>
                                </div>
                                <div className="right-container d-flex flex-column justify-content-between">
                                    <div className="trivia">
                                        {this.state.trivia}
                                    </div>
                                    <div className="powered-by-wrapper d-flex justify-content-between">
                                        <div className="sportske d-flex justify-content-between align-items-end">
                                            <i>Made by</i> <a href="https://sportske.net/?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer"><img src={require("../images/logo-sportske.png")} alt="Belgrade Institute of Technology" /></a>
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
                                            <p className="stick-it"><i>Select Round</i></p>
                                            <div className="dashboard-select-day-list-wrapper d-md-flex flex-md-column justify-content-md-between ">
                                                <button type="button" className={`btn btn-outline-light pt-4 pb-4 ${this.context.hallOfFameSelectedDay === "all-days" ? "is-selected" : ""}`} data-day-to-select="all-days" onClick={this.depositSelectedDay}>ALL ROUNDS</button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>ROUND 1<br /><i data-day-to-select="ROUND-1">October 3-4, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>ROUND 2<br /><i data-day-to-select="ROUND-2">October 10-11, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>ROUND 3<br /><i data-day-to-select="ROUND-3">October 17-18, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>ROUND 4<br /><i data-day-to-select="ROUND-4">October 24-25, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>ROUND 5<br /><i data-day-to-select="ROUND-5">October 29-30, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>ROUND 6<br /><i data-day-to-select="ROUND-6">October 31 / November 1, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>ROUND 7<br /><i data-day-to-select="ROUND-7">November 7-8, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>ROUND 8<br /><i data-day-to-select="ROUND-8">November 14-15, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>ROUND 9<br /><i data-day-to-select="ROUND-9">November 19-20, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>ROUND 10<br /><i data-day-to-select="ROUND-10">November 21-22, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-11" ? "is-selected" : ""}`} data-day-to-select="ROUND-11" onClick={this.depositSelectedDay}>ROUND 11<br /><i data-day-to-select="ROUND-11">November 28-29, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-12" ? "is-selected" : ""}`} data-day-to-select="ROUND-12" onClick={this.depositSelectedDay}>ROUND 12<br /><i data-day-to-select="ROUND-12">December 5-6, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-13" ? "is-selected" : ""}`} data-day-to-select="ROUND-13" onClick={this.depositSelectedDay}>ROUND 13<br /><i data-day-to-select="ROUND-13">December 12-13, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-14" ? "is-selected" : ""}`} data-day-to-select="ROUND-14" onClick={this.depositSelectedDay}>ROUND 14<br /><i data-day-to-select="ROUND-14">December 17-18, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-15" ? "is-selected" : ""}`} data-day-to-select="ROUND-15" onClick={this.depositSelectedDay}>ROUND 15<br /><i data-day-to-select="ROUND-15">December 19-20, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-16" ? "is-selected" : ""}`} data-day-to-select="ROUND-16" onClick={this.depositSelectedDay}>ROUND 16<br /><i data-day-to-select="ROUND-16">December 26-27, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-17" ? "is-selected" : ""}`} data-day-to-select="ROUND-17" onClick={this.depositSelectedDay}>ROUND 17<br /><i data-day-to-select="ROUND-17">January 2-3, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-18" ? "is-selected" : ""}`} data-day-to-select="ROUND-18" onClick={this.depositSelectedDay}>ROUND 18<br /><i data-day-to-select="ROUND-18">January 9-10, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-19" ? "is-selected" : ""}`} data-day-to-select="ROUND-19" onClick={this.depositSelectedDay}>ROUND 19<br /><i data-day-to-select="ROUND-19">January 14-15, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-20" ? "is-selected" : ""}`} data-day-to-select="ROUND-20" onClick={this.depositSelectedDay}>ROUND 20<br /><i data-day-to-select="ROUND-20">January 16-17, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-21" ? "is-selected" : ""}`} data-day-to-select="ROUND-21" onClick={this.depositSelectedDay}>ROUND 21<br /><i data-day-to-select="ROUND-21">January 23-24, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-22" ? "is-selected" : ""}`} data-day-to-select="ROUND-22" onClick={this.depositSelectedDay}>ROUND 22<br /><i data-day-to-select="ROUND-22">January 30-31, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-23" ? "is-selected" : ""}`} data-day-to-select="ROUND-23" onClick={this.depositSelectedDay}>ROUND 23<br /><i data-day-to-select="ROUND-23">February 4-5, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-24" ? "is-selected" : ""}`} data-day-to-select="ROUND-24" onClick={this.depositSelectedDay}>ROUND 24<br /><i data-day-to-select="ROUND-24">February 6-7, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-25" ? "is-selected" : ""}`} data-day-to-select="ROUND-25" onClick={this.depositSelectedDay}>ROUND 25<br /><i data-day-to-select="ROUND-25">February 20-21, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-26" ? "is-selected" : ""}`} data-day-to-select="ROUND-26" onClick={this.depositSelectedDay}>ROUND 26<br /><i data-day-to-select="ROUND-26">February 27-28, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-27" ? "is-selected" : ""}`} data-day-to-select="ROUND-27" onClick={this.depositSelectedDay}>ROUND 27<br /><i data-day-to-select="ROUND-27">March 3-4, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-28" ? "is-selected" : ""}`} data-day-to-select="ROUND-28" onClick={this.depositSelectedDay}>ROUND 28<br /><i data-day-to-select="ROUND-28">March 5-6, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-29" ? "is-selected" : ""}`} data-day-to-select="ROUND-29" onClick={this.depositSelectedDay}>ROUND 29<br /><i data-day-to-select="ROUND-29">March 12-13, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-30" ? "is-selected" : ""}`} data-day-to-select="ROUND-30" onClick={this.depositSelectedDay}>ROUND 30<br /><i data-day-to-select="ROUND-30">March 19-20, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-31" ? "is-selected" : ""}`} data-day-to-select="ROUND-31" onClick={this.depositSelectedDay}>ROUND 31<br /><i data-day-to-select="ROUND-31">March 24-25, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-32" ? "is-selected" : ""}`} data-day-to-select="ROUND-32" onClick={this.depositSelectedDay}>ROUND 32<br /><i data-day-to-select="ROUND-32">March 26-27, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-33" ? "is-selected" : ""}`} data-day-to-select="ROUND-33" onClick={this.depositSelectedDay}>ROUND 33<br /><i data-day-to-select="ROUND-33">April 2-3, 2020</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-34" ? "is-selected" : ""}`} data-day-to-select="ROUND-34" onClick={this.depositSelectedDay}>ROUND 34<br /><i data-day-to-select="ROUND-34">April 9-10, 2020</i></button>
                                            </div>
                                        </section>
                                    }


                                    {this.context.selectedLeague == "euroCup" &&
                                        <section className={`dashboard-select-day-container d-flex flex-column justify align-items-center ${this.context.showSelectDayDashboard ? "show-selected-day" : ""}`}>
                                            <p className="stick-it"><i>Select Round</i></p>
                                            <div className="dashboard-select-day-list-wrapper d-md-flex flex-md-column justify-content-md-between ">
                                                <button type="button" className={`btn btn-outline-light pt-4 pb-4 ${this.context.hallOfFameSelectedDay === "all-days" ? "is-selected" : ""}`} data-day-to-select="all-days" onClick={this.depositSelectedDay}>ALL ROUNDS</button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>ROUND 1<br /><i data-day-to-select="ROUND-1">October 1-2, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>ROUND 2<br /><i data-day-to-select="ROUND-2">October 8-9, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>ROUND 3<br /><i data-day-to-select="ROUND-3">October 15-16, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>ROUND 4<br /><i data-day-to-select="ROUND-4">October 22-23, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>ROUND 5<br /><i data-day-to-select="ROUND-5">October 29-30, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>ROUND 6<br /><i data-day-to-select="ROUND-6">November 5-6, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>ROUND 7<br /><i data-day-to-select="ROUND-7">November 12-13, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>ROUND 8<br /><i data-day-to-select="ROUND-8">November 19-20, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>ROUND 9<br /><i data-day-to-select="ROUND-9">December 10-11, 2019</i></button>
                                                <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>ROUND 10<br /><i data-day-to-select="ROUND-10">December 17-18, 2019</i></button>
                                            </div>
                                        </section>
                                    }
                                </div>}

                            {!this.context.isInitialLoading &&
                                <div className="lists-container">
                                    <Link to={`user-screen`}>
                                        <button type="button" className="btn  btn-danger back-button">Back to User screen</button>
                                    </Link>
                                    <div className="hall-of-fame-links-wrapper d-flex justify-content-around">
                                        {/* <button className="btn btn-outline-dark" disabled>(it's calculating now...)</button>
                                        <button className="btn btn-outline-dark" disabled>(it's calculating now...)</button> */}
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "leagues" ? "active" : ""}`} disabled data-view="leagues" onClick={this.depositSelectedList}>Custom Leagues (coming soon...)</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "round-points" ? "active" : ""}`} data-view="round-points" onClick={this.depositSelectedList}>Global League</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "basketball-players-fantasy-points" ? "active" : ""}`} data-view="basketball-players-fantasy-points" onClick={this.depositSelectedList}>Players - Fantasy points</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "basketball-players-real-life-stats" ? "active" : ""}`} data-view="basketball-players-real-life-stats" onClick={this.depositSelectedList}>Players - Real Life stats</button>
                                        <input type="search" placeholder={this.state.searchPlaceholder} value={this.state.searchValue} onChange={this.depositSearchValue} onKeyDown={this.checkBlur} />
                                    </div>
                                    {/* {this.state.listView === "f1wc" &&
                                        <HallOfFameF1WCList searchValue={this.state.searchValue} clearSearchValue={this.clearSearchValue} />
                                    } */}
                                    {/* <HallOfFameUserStats /> */}

                                    {this.state.listView === "round-points" &&
                                        <HallOfFameTotalPointsList searchValue={this.state.searchValue} selectedDay={this.context.hallOfFameSelectedDay} clearSearchValue={this.clearSearchValue} />
                                    }
                                    {this.state.listView === "basketball-players-fantasy-points" &&
                                        <HallOfFameFantasyPlayersList searchValue={this.state.searchValue} clearSearchValue={this.clearSearchValue} />
                                    }
                                    {this.state.listView === "basketball-players-real-life-stats" &&
                                        <HallOfFameRealLifePlayerListStats searchValue={this.state.searchValue} clearSearchValue={this.clearSearchValue} />
                                    }
                                </div>
                            }

                        </div>
                        <Link to={`user-screen`}>
                            <div className="go-back-button">Click here to go back to User screen</div>
                        </Link>
                    </div>
                }
            </>
        )
    }
}

export default HallOfFameScreen