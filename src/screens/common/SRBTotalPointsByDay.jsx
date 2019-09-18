import React from 'react';
import { AppContext } from "../_context/AppContext";


class SRBTotalPointsByDay extends React.Component {
    static contextType = AppContext;




    render() {
        return (
            <div className="total-points-by-day-container d-flex justify-content-between align-items-center">
                {!isNaN(this.context.userAvgRoundPointsPerGame) &&
                    <div className="d-flex">
                        Prosečan broj poena po rundi:
                    <span >
                            {this.context.userAvgRoundPointsPerGame.toFixed(2)}
                        </span>
                    </div>
                }
                <div className="d-none d-md-flex">
                    Ukupno Sportske fantazi poena:
                    <span>
                        {this.context.userTotalRoundPoints.toFixed(2)}
                    </span>
                </div>
            </div>
        )
    }
}

export default SRBTotalPointsByDay