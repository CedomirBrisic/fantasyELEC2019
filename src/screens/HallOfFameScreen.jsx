import React from 'react';
import { AppContext } from '../screens/_context/AppContext';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
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
                                            <i>Made by</i> <a href="https://sportske.net/?utm_source=Sportske%20Fantasy&utm_medium=banner&utm_campaign=Fantasy" target="_blank" rel="noopener noreferrer"><img src={require("../images/logo-sportske.png")} alt="Belgrade Institute of Technology"/></a>
                                        </div>
                                        <div className="bit d-flex justify-content-between align-items-end">
                                           <i>Powered by</i> <a href="https://www.bgit.rs/en/" target="_blank" rel="noopener noreferrer"><img src={require("../images/logo-bit.png")} alt="Belgrade Institute of Technology"/></a>
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
                                    <p><i>Select Round</i></p>
                                    <div className="dashboard-select-day-list-wrapper d-md-flex flex-md-column justify-content-md-between">
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "all-days" ? "is-selected" : ""}`} data-day-to-select="all-days" onClick={this.depositSelectedDay}>All rounds - Total</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "31st-August" ? "is-selected" : ""}`} data-day-to-select="31st-August" onClick={this.depositSelectedDay}>31st<br className="d-block d-md-none" />August</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "1st-September" ? "is-selected" : ""}`} data-day-to-select="1st-September" onClick={this.depositSelectedDay}>1st September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "2nd-September" ? "is-selected" : ""}`} data-day-to-select="2nd-September" onClick={this.depositSelectedDay}>2nd September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "3rd-September" ? "is-selected" : ""}`} data-day-to-select="3rd-September" onClick={this.depositSelectedDay}>3rd September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "4th-September" ? "is-selected" : ""}`} data-day-to-select="4th-September" onClick={this.depositSelectedDay}>4th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "5th-September" ? "is-selected" : ""}`} data-day-to-select="5th-September" onClick={this.depositSelectedDay}>5th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "6th-September" ? "is-selected" : ""}`} data-day-to-select="6th-September" onClick={this.depositSelectedDay}>6th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "7th-September" ? "is-selected" : ""}`} data-day-to-select="7th-September" onClick={this.depositSelectedDay}>7th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "8th-September" ? "is-selected" : ""}`} data-day-to-select="8th-September" onClick={this.depositSelectedDay}>8th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "9th-September" ? "is-selected" : ""}`} data-day-to-select="9th-September" onClick={this.depositSelectedDay}>9th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "10th-September" ? "is-selected" : ""}`} data-day-to-select="10th-September" onClick={this.depositSelectedDay}>10th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "11th-September" ? "is-selected" : ""}`} data-day-to-select="11th-September" onClick={this.depositSelectedDay}>11th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "12th-September" ? "is-selected" : ""}`} data-day-to-select="12th-September" onClick={this.depositSelectedDay}>12th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "13th-September" ? "is-selected" : ""}`} data-day-to-select="13th-September" onClick={this.depositSelectedDay}>13th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "14th-September" ? "is-selected" : ""}`} data-day-to-select="14th-September" onClick={this.depositSelectedDay}>14th September</button>
                                        <button type="button" className={`btn btn-outline-light ${this.context.hallOfFameSelectedDay === "15th-September" ? "is-selected" : ""}`} data-day-to-select="15th-September" onClick={this.depositSelectedDay}>15th September</button>
                                    </div>
                                </div>}

                            {!this.context.isInitialLoading &&
                                <div className="lists-container">
                                    <Link to={`user-screen`}>
                                        <button type="button" className="btn  btn-danger back-button">Back to User screen</button>
                                    </Link>
                                    <div className="hall-of-fame-links-wrapper d-flex justify-content-around">
                                        {/* <button className="btn btn-outline-dark" disabled>(it's calculating now...)</button>
                                        <button className="btn btn-outline-dark" disabled>(it's calculating now...)</button> */}
                                          <button type="button" className={`btn btn-outline-dark ${this.state.listView === "leagues" ? "active" : ""}`} data-view="leagues" onClick={this.depositSelectedList}>Leagues</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "round-points" ? "active" : ""}`} data-view="round-points" onClick={this.depositSelectedList}>Global League</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "basketball-players-fantasy-points" ? "active" : ""}`} data-view="basketball-players-fantasy-points" onClick={this.depositSelectedList}>Players - Fantasy points</button>
                                        <button type="button" className={`btn btn-outline-dark ${this.state.listView === "basketball-players-real-life-stats" ? "active" : ""}`} data-view="basketball-players-real-life-stats" onClick={this.depositSelectedList}>Players - Real Life stats</button>
                                        <input type="search" placeholder={this.state.searchPlaceholder} value={this.state.searchValue} onChange={this.depositSearchValue} onKeyDown={this.checkBlur}/>
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