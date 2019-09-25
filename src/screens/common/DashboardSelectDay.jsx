import React from 'react';
import { AppContext } from '../../screens/_context/AppContext';

class DashboardSelectDay extends React.Component {
    static contextType = AppContext;
    showSelectDay = () => {
        this.setState({
            showSelectDay: !this.state.showSelectDay
        })
    }
    depositSelectedDay = (event) => {
        const selectedDay = event.target.getAttribute("data-day-to-select")
        this.context.changeSelectedDay(selectedDay)
    }
    render() {
        return (
            <>
                {this.context.selectedLeague == "euroLeague" &&
                    <section className={`dashboard-select-day-container d-flex flex-column justify align-items-center ${this.context.showSelectDayDashboard ? "show-selected-day" : ""}`}>
                        <p className="stick-it"><i>Select Round</i></p>
                        <div className="dashboard-select-day-list-wrapper d-md-flex flex-md-column justify-content-md-between ">
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>ROUND 1<br /><i data-day-to-select="ROUND-1">October 3-4, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>ROUND 2<br /><i data-day-to-select="ROUND-2">October 10-11, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>ROUND 3<br /><i data-day-to-select="ROUND-3">October 17-18, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>ROUND 4<br /><i data-day-to-select="ROUND-4">October 24-25, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>ROUND 5<br /><i data-day-to-select="ROUND-5">October 29-30, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>ROUND 6<br /><i data-day-to-select="ROUND-6">October 31 / November 1, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>ROUND 7<br /><i data-day-to-select="ROUND-7">November 7-8, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>ROUND 8<br /><i data-day-to-select="ROUND-8">November 14-15, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>ROUND 9<br /><i data-day-to-select="ROUND-9">November 19-20, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>ROUND 10<br /><i data-day-to-select="ROUND-10">November 21-22, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-11" ? "is-selected" : ""}`} data-day-to-select="ROUND-11" onClick={this.depositSelectedDay}>ROUND 11<br /><i data-day-to-select="ROUND-11">November 28-29, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-12" ? "is-selected" : ""}`} data-day-to-select="ROUND-12" onClick={this.depositSelectedDay}>ROUND 12<br /><i data-day-to-select="ROUND-12">December 5-6, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-13" ? "is-selected" : ""}`} data-day-to-select="ROUND-13" onClick={this.depositSelectedDay}>ROUND 13<br /><i data-day-to-select="ROUND-13">December 12-13, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-14" ? "is-selected" : ""}`} data-day-to-select="ROUND-14" onClick={this.depositSelectedDay}>ROUND 14<br /><i data-day-to-select="ROUND-14">December 17-18, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-15" ? "is-selected" : ""}`} data-day-to-select="ROUND-15" onClick={this.depositSelectedDay}>ROUND 15<br /><i data-day-to-select="ROUND-15">December 19-20, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-16" ? "is-selected" : ""}`} data-day-to-select="ROUND-16" onClick={this.depositSelectedDay}>ROUND 16<br /><i data-day-to-select="ROUND-16">December 26-27, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-17" ? "is-selected" : ""}`} data-day-to-select="ROUND-17" onClick={this.depositSelectedDay}>ROUND 17<br /><i data-day-to-select="ROUND-17">January 2-3, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-18" ? "is-selected" : ""}`} data-day-to-select="ROUND-18" onClick={this.depositSelectedDay}>ROUND 18<br /><i data-day-to-select="ROUND-18">January 9-10, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-19" ? "is-selected" : ""}`} data-day-to-select="ROUND-19" onClick={this.depositSelectedDay}>ROUND 19<br /><i data-day-to-select="ROUND-19">January 14-15, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-20" ? "is-selected" : ""}`} data-day-to-select="ROUND-20" onClick={this.depositSelectedDay}>ROUND 20<br /><i data-day-to-select="ROUND-20">January 16-17, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-21" ? "is-selected" : ""}`} data-day-to-select="ROUND-21" onClick={this.depositSelectedDay}>ROUND 21<br /><i data-day-to-select="ROUND-21">January 23-24, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-22" ? "is-selected" : ""}`} data-day-to-select="ROUND-22" onClick={this.depositSelectedDay}>ROUND 22<br /><i data-day-to-select="ROUND-22">January 30-31, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-23" ? "is-selected" : ""}`} data-day-to-select="ROUND-23" onClick={this.depositSelectedDay}>ROUND 23<br /><i data-day-to-select="ROUND-23">February 4-5, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-24" ? "is-selected" : ""}`} data-day-to-select="ROUND-24" onClick={this.depositSelectedDay}>ROUND 24<br /><i data-day-to-select="ROUND-24">February 6-7, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-25" ? "is-selected" : ""}`} data-day-to-select="ROUND-25" onClick={this.depositSelectedDay}>ROUND 25<br /><i data-day-to-select="ROUND-25">February 20-21, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-26" ? "is-selected" : ""}`} data-day-to-select="ROUND-26" onClick={this.depositSelectedDay}>ROUND 26<br /><i data-day-to-select="ROUND-26">February 27-28, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-27" ? "is-selected" : ""}`} data-day-to-select="ROUND-27" onClick={this.depositSelectedDay}>ROUND 27<br /><i data-day-to-select="ROUND-27">March 3-4, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-28" ? "is-selected" : ""}`} data-day-to-select="ROUND-28" onClick={this.depositSelectedDay}>ROUND 28<br /><i data-day-to-select="ROUND-28">March 5-6, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-29" ? "is-selected" : ""}`} data-day-to-select="ROUND-29" onClick={this.depositSelectedDay}>ROUND 29<br /><i data-day-to-select="ROUND-29">March 12-13, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-30" ? "is-selected" : ""}`} data-day-to-select="ROUND-30" onClick={this.depositSelectedDay}>ROUND 30<br /><i data-day-to-select="ROUND-30">March 19-20, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-31" ? "is-selected" : ""}`} data-day-to-select="ROUND-31" onClick={this.depositSelectedDay}>ROUND 31<br /><i data-day-to-select="ROUND-31">March 24-25, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-32" ? "is-selected" : ""}`} data-day-to-select="ROUND-32" onClick={this.depositSelectedDay}>ROUND 32<br /><i data-day-to-select="ROUND-32">March 26-27, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-33" ? "is-selected" : ""}`} data-day-to-select="ROUND-33" onClick={this.depositSelectedDay}>ROUND 33<br /><i data-day-to-select="ROUND-33">April 2-3, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-34" ? "is-selected" : ""}`} data-day-to-select="ROUND-34" onClick={this.depositSelectedDay}>ROUND 34<br /><i data-day-to-select="ROUND-34">April 9-10, 2020</i></button>
                        </div>
                    </section>
                }


                {this.context.selectedLeague == "euroCup" &&
                    <section className={`dashboard-select-day-container d-flex flex-column justify align-items-center ${this.context.showSelectDayDashboard ? "show-selected-day" : ""}`}>
                        <p className="stick-it"><i>Select Round</i></p>
                        <div className="dashboard-select-day-list-wrapper d-md-flex flex-md-column justify-content-md-between ">
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>ROUND 1<br /><i data-day-to-select="ROUND-1">October 1-2, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>ROUND 2<br /><i data-day-to-select="ROUND-2">October 8-9, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>ROUND 3<br /><i data-day-to-select="ROUND-3">October 15-16, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>ROUND 4<br /><i data-day-to-select="ROUND-4">October 22-23, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>ROUND 5<br /><i data-day-to-select="ROUND-5">October 29-30, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>ROUND 6<br /><i data-day-to-select="ROUND-6">November 5-6, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>ROUND 7<br /><i data-day-to-select="ROUND-7">November 12-13, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>ROUND 8<br /><i data-day-to-select="ROUND-8">November 19-20, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>ROUND 9<br /><i data-day-to-select="ROUND-9">December 10-11, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>ROUND 10<br /><i data-day-to-select="ROUND-10">December 17-18, 2019</i></button>
                        </div>
                    </section>
                }
            </>
        )
    }
}

export default DashboardSelectDay