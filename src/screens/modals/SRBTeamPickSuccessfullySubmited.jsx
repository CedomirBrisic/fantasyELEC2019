import React from 'react';
import Modal from 'react-bootstrap4-modal';

class SRBTeamPickSuccessfullySubmited extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.showTeamPickSuccessfullySubmited && this.props.showTeamPickSuccessfullySubmited) {
            setTimeout(function () {
                this.props.closeTeamPickSuccessfullySubmitedModal()
            }.bind(this)
                , 2400);
        }
    }
    render() {
        return (
            <Modal className="team-pick-modal-successfully-submited-container" visible={this.props.showTeamPickSuccessfullySubmited} onClickBackdrop={this.props.closeTeamPickSuccessfullySubmitedModal}>
                <div className="d-flex align-items-center message">
                    <h3>Bravo!!! <br />
                        Uspešno si prijavio ekipu</h3>
                    <div className="check-mark-wrapper" onClick={this.props.closeTeamPickSuccessfullySubmitedModal}>
                        &#10004;
                    </div>
                </div>
            </Modal>
        )
    }
}

export default SRBTeamPickSuccessfullySubmited