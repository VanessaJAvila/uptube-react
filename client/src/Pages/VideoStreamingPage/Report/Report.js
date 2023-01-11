import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag, faXmark} from "@fortawesome/free-solid-svg-icons";

import "./Report.scss"
import axios from "axios";

//localhost port for api
const API = process.env.REACT_APP_API;

const ReportVideo = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState('');
    const [comment, setComment] = useState('');
    const [serverError, setServerError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send the report data to the server here
        try {
            const response = await axios.post(`${API}/report/${props.videoId}/new`, {
                report_type_id: reason,
                details: comment,
                action: "None",
                reporter_id: props.reporterId,
                report_state: 1
            }, );
            setSuccess(response.data);
            setServerError(null);
        } catch (error) {
            setServerError(error);
        }
        console.log(`Reason: ${reason}, 
        Comment: ${comment}, 
        VideoID: ${props.videoId}, 
        Reporter: ${props.reporterId}`);
        setShowModal(false);
        setReason('');
        setComment('');

    };

    return (
        <div className={"report-window"}>
            <FontAwesomeIcon className={"icon"} icon={faFlag} onClick={() => setShowModal(true)}/>
            {showModal && (
                <div className="modal">
                    <form onSubmit={handleSubmit}>
                        <FontAwesomeIcon icon={faXmark} className={"close-window"} onClick={() => setShowModal(false)}/>
                        <label>
                            Motivo da denúncia
                            <select value={reason} onChange={(e) => setReason(e.target.value)}>
                                <option value="">Select a reason</option>
                                <option value="1">Inappropriate Content</option>
                                <option value="2">Violent or Graphic Content</option>
                                <option value="3">Hateful Speech</option>
                                <option value="4">Spam</option>
                                <option value="5">Other</option>
                            </select>
                        </label>
                        <label>
                            <textarea placeholder={"Detalhes da denúncia"} value={comment}
                                      onChange={(e) => setComment(e.target.value)}/> </label>
                        <input type="submit" value="Submit Report" onClick={handleSubmit}/>
                    </form>
                    {serverError && (
                        <div>
                            <p>An error occurred while submitting the report. Please try again later.</p>
                        </div>
                    )}
                    {success && (
                        <div>
                            <p>Successfully submitted the report</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default ReportVideo;