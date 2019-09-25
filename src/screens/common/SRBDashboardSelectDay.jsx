import React from 'react';
import { AppContext } from '../../screens/_context/AppContext';

class SRBDashboardSelectDay extends React.Component {
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
                        <p className="stick-it"><i>Izaberi Rundu</i></p>
                        <div className="dashboard-select-day-list-wrapper d-md-flex flex-md-column justify-content-md-between ">
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>RUNDA 1<br /><i data-day-to-select="ROUND-1">Oktobar 3-4, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>RUNDA 2<br /><i data-day-to-select="ROUND-2">Oktobar 10-11, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>RUNDA 3<br /><i data-day-to-select="ROUND-3">Oktobar 17-18, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>RUNDA 4<br /><i data-day-to-select="ROUND-4">Oktobar 24-25, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>RUNDA 5<br /><i data-day-to-select="ROUND-5">Oktobar 29-30, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>RUNDA 6<br /><i data-day-to-select="ROUND-6">Oktobar 31 / Novembar 1, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>RUNDA 7<br /><i data-day-to-select="ROUND-7">Novembar 7-8, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>RUNDA 8<br /><i data-day-to-select="ROUND-8">Novembar 14-15, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>RUNDA 9<br /><i data-day-to-select="ROUND-9">Novembar 19-20, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>RUNDA 10<br /><i data-day-to-select="ROUND-10">Novembar 21-22, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-11" ? "is-selected" : ""}`} data-day-to-select="ROUND-11" onClick={this.depositSelectedDay}>RUNDA 11<br /><i data-day-to-select="ROUND-11">Novembar 28-29, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-12" ? "is-selected" : ""}`} data-day-to-select="ROUND-12" onClick={this.depositSelectedDay}>RUNDA 12<br /><i data-day-to-select="ROUND-12">Decembar 5-6, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-13" ? "is-selected" : ""}`} data-day-to-select="ROUND-13" onClick={this.depositSelectedDay}>RUNDA 13<br /><i data-day-to-select="ROUND-13">Decembar 12-13, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-14" ? "is-selected" : ""}`} data-day-to-select="ROUND-14" onClick={this.depositSelectedDay}>RUNDA 14<br /><i data-day-to-select="ROUND-14">Decembar 17-18, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-15" ? "is-selected" : ""}`} data-day-to-select="ROUND-15" onClick={this.depositSelectedDay}>RUNDA 15<br /><i data-day-to-select="ROUND-15">Decembar 19-20, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-16" ? "is-selected" : ""}`} data-day-to-select="ROUND-16" onClick={this.depositSelectedDay}>RUNDA 16<br /><i data-day-to-select="ROUND-16">Decembar 26-27, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-17" ? "is-selected" : ""}`} data-day-to-select="ROUND-17" onClick={this.depositSelectedDay}>RUNDA 17<br /><i data-day-to-select="ROUND-17">Januar 2-3, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-18" ? "is-selected" : ""}`} data-day-to-select="ROUND-18" onClick={this.depositSelectedDay}>RUNDA 18<br /><i data-day-to-select="ROUND-18">Januar 9-10, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-19" ? "is-selected" : ""}`} data-day-to-select="ROUND-19" onClick={this.depositSelectedDay}>RUNDA 19<br /><i data-day-to-select="ROUND-19">Januar 14-15, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-20" ? "is-selected" : ""}`} data-day-to-select="ROUND-20" onClick={this.depositSelectedDay}>RUNDA 20<br /><i data-day-to-select="ROUND-20">Januar 16-17, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-21" ? "is-selected" : ""}`} data-day-to-select="ROUND-21" onClick={this.depositSelectedDay}>RUNDA 21<br /><i data-day-to-select="ROUND-21">Januar 23-24, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-22" ? "is-selected" : ""}`} data-day-to-select="ROUND-22" onClick={this.depositSelectedDay}>RUNDA 22<br /><i data-day-to-select="ROUND-22">Januar 30-31, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-23" ? "is-selected" : ""}`} data-day-to-select="ROUND-23" onClick={this.depositSelectedDay}>RUNDA 23<br /><i data-day-to-select="ROUND-23">Februar 4-5, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-24" ? "is-selected" : ""}`} data-day-to-select="ROUND-24" onClick={this.depositSelectedDay}>RUNDA 24<br /><i data-day-to-select="ROUND-24">Februar 6-7, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-25" ? "is-selected" : ""}`} data-day-to-select="ROUND-25" onClick={this.depositSelectedDay}>RUNDA 25<br /><i data-day-to-select="ROUND-25">Februar 20-21, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-26" ? "is-selected" : ""}`} data-day-to-select="ROUND-26" onClick={this.depositSelectedDay}>RUNDA 26<br /><i data-day-to-select="ROUND-26">Februar 27-28, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-27" ? "is-selected" : ""}`} data-day-to-select="ROUND-27" onClick={this.depositSelectedDay}>RUNDA 27<br /><i data-day-to-select="ROUND-27">Mart 3-4, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-28" ? "is-selected" : ""}`} data-day-to-select="ROUND-28" onClick={this.depositSelectedDay}>RUNDA 28<br /><i data-day-to-select="ROUND-28">Mart 5-6, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-29" ? "is-selected" : ""}`} data-day-to-select="ROUND-29" onClick={this.depositSelectedDay}>RUNDA 29<br /><i data-day-to-select="ROUND-29">Mart 12-13, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-30" ? "is-selected" : ""}`} data-day-to-select="ROUND-30" onClick={this.depositSelectedDay}>RUNDA 30<br /><i data-day-to-select="ROUND-30">Mart 19-20, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-31" ? "is-selected" : ""}`} data-day-to-select="ROUND-31" onClick={this.depositSelectedDay}>RUNDA 31<br /><i data-day-to-select="ROUND-31">Mart 24-25, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-32" ? "is-selected" : ""}`} data-day-to-select="ROUND-32" onClick={this.depositSelectedDay}>RUNDA 32<br /><i data-day-to-select="ROUND-32">Mart 26-27, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-33" ? "is-selected" : ""}`} data-day-to-select="ROUND-33" onClick={this.depositSelectedDay}>RUNDA 33<br /><i data-day-to-select="ROUND-33">April 2-3, 2020</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-34" ? "is-selected" : ""}`} data-day-to-select="ROUND-34" onClick={this.depositSelectedDay}>RUNDA 34<br /><i data-day-to-select="ROUND-34">April 9-10, 2020</i></button>
                        </div>
                    </section>
                }


                {this.context.selectedLeague == "euroCup" &&
                    <section className={`dashboard-select-day-container d-flex flex-column justify align-items-center ${this.context.showSelectDayDashboard ? "show-selected-day" : ""}`}>
                        <p className="stick-it"><i>Select Round</i></p>
                        <div className="dashboard-select-day-list-wrapper d-md-flex flex-md-column justify-content-md-between ">
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-1" ? "is-selected" : ""}`} data-day-to-select="ROUND-1" onClick={this.depositSelectedDay}>RUNDA 1<br /><i data-day-to-select="ROUND-1">Oktobar 1-2, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-2" ? "is-selected" : ""}`} data-day-to-select="ROUND-2" onClick={this.depositSelectedDay}>RUNDA 2<br /><i data-day-to-select="ROUND-2">Oktobar 8-9, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-3" ? "is-selected" : ""}`} data-day-to-select="ROUND-3" onClick={this.depositSelectedDay}>RUNDA 3<br /><i data-day-to-select="ROUND-3">Oktobar 15-16, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-4" ? "is-selected" : ""}`} data-day-to-select="ROUND-4" onClick={this.depositSelectedDay}>RUNDA 4<br /><i data-day-to-select="ROUND-4">Oktobar 22-23, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-5" ? "is-selected" : ""}`} data-day-to-select="ROUND-5" onClick={this.depositSelectedDay}>RUNDA 5<br /><i data-day-to-select="ROUND-5">Oktobar 29-30, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-6" ? "is-selected" : ""}`} data-day-to-select="ROUND-6" onClick={this.depositSelectedDay}>RUNDA 6<br /><i data-day-to-select="ROUND-6">Novembar 5-6, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-7" ? "is-selected" : ""}`} data-day-to-select="ROUND-7" onClick={this.depositSelectedDay}>RUNDA 7<br /><i data-day-to-select="ROUND-7">Novembar 12-13, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-8" ? "is-selected" : ""}`} data-day-to-select="ROUND-8" onClick={this.depositSelectedDay}>RUNDA 8<br /><i data-day-to-select="ROUND-8">Novembar 19-20, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-9" ? "is-selected" : ""}`} data-day-to-select="ROUND-9" onClick={this.depositSelectedDay}>RUNDA 9<br /><i data-day-to-select="ROUND-9">Decembar 10-11, 2019</i></button>
                            <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "ROUND-10" ? "is-selected" : ""}`} data-day-to-select="ROUND-10" onClick={this.depositSelectedDay}>RUNDA 10<br /><i data-day-to-select="ROUND-10">Decembar 17-18, 2019</i></button>
                        </div>
                    </section>
                }
            </>
        )
    }
}

export default SRBDashboardSelectDay