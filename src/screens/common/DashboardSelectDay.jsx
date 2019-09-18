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
            <section className={`dashboard-select-day-container d-flex flex-column justify align-items-center ${this.context.showSelectDayDashboard ? "show-selected-day" : ""}`}>
                <p><i>Select Round</i></p>
                <div className="dashboard-select-day-list-wrapper d-md-flex flex-md-column justify-content-md-between ">
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "31st-August" ? "is-selected" : ""}`} data-day-to-select="31st-August" onClick={this.depositSelectedDay}>31st August</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "1st-September" ? "is-selected" : ""}`} data-day-to-select="1st-September" onClick={this.depositSelectedDay}>1st September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "2nd-September" ? "is-selected" : ""}`} data-day-to-select="2nd-September" onClick={this.depositSelectedDay}>2nd September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "3rd-September" ? "is-selected" : ""}`} data-day-to-select="3rd-September" onClick={this.depositSelectedDay}>3rd September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "4th-September" ? "is-selected" : ""}`} data-day-to-select="4th-September" onClick={this.depositSelectedDay}>4th September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "5th-September" ? "is-selected" : ""}`} data-day-to-select="5th-September" onClick={this.depositSelectedDay}>5th September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "6th-September" ? "is-selected" : ""}`} data-day-to-select="6th-September" onClick={this.depositSelectedDay}>6th September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "7th-September" ? "is-selected" : ""}`} data-day-to-select="7th-September" onClick={this.depositSelectedDay}>7th September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "8th-September" ? "is-selected" : ""}`} data-day-to-select="8th-September" onClick={this.depositSelectedDay}>8th September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "9th-September" ? "is-selected" : ""}`} data-day-to-select="9th-September" onClick={this.depositSelectedDay}>9th September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "10th-September" ? "is-selected" : ""}`} data-day-to-select="10th-September" onClick={this.depositSelectedDay}>10th September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "11th-September" ? "is-selected" : ""}`} data-day-to-select="11th-September" onClick={this.depositSelectedDay}>11th September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "12th-September" ? "is-selected" : ""}`} data-day-to-select="12th-September" onClick={this.depositSelectedDay}>12th September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "13th-September" ? "is-selected" : ""}`} data-day-to-select="13th-September" onClick={this.depositSelectedDay}>13th September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "14th-September" ? "is-selected" : ""}`} data-day-to-select="14th-September" onClick={this.depositSelectedDay}>14th September</button>
                    <button type="button" className={`btn btn-outline-light ${this.context.selectedDay === "15th-September" ? "is-selected" : ""}`} data-day-to-select="15th-September" onClick={this.depositSelectedDay}>15th September</button>
                </div>
            </section>
        )
    }
}

export default DashboardSelectDay