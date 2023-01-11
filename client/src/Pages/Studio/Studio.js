import {useRef, useState} from "react";
import axios from "axios";
import {VideoUploader} from "../../Components/VideoUploader/VideoUploader";
import "./Studio.scss"
import VideoInfo from "../../Components/VideoUploader/VideoInfo";
import SideBar from "../../Layout/SideBar";
import Header from "../../Layout/Header";

//localhost port for api
const API = process.env.REACT_APP_API;

// This component is a form that allows the user to select a file and upload it to a server.
// It uses state variables to keep track of the form's state.
export default function Studio() {
    const [isFileSubmitted, setIsFileSubmitted] = useState(false);
    const [submitData, setSubmitData] = useState(null)

    const onSubmit = (data) => {
        setIsFileSubmitted(true)
        setSubmitData(data)
    }

    console.log("submitData", submitData)
    const mockData = {
        video_id: 1,
        video_key: "Q-SzVbsb9",
        user_id: 61,
        thumbnail: "thumbnail",
        title: "Y2Mate.is - 2 Second Video-TK4N5W22Gts-480p-1655596635602.mp4",
        description: "description",
        duration: "00:02",
        url_video: "videos/Q-SzVbsb9/Q-SzVbsb9.mp4"
    }

    /*{ !isFileSubmitted && <VideoUploader onSubmit={onSubmit} /> }
            <VideoInfo videoData={submitData}/>*/

    return (
        <div className={"app-wrapper"}>
            <Header/>
            <SideBar/>
            <div className={"container-wrapper"}>

                <div className={"upload-title"}>Upload de um novo vídeo</div>

                { isFileSubmitted ? <VideoInfo videoData={submitData} /> : < VideoUploader onSubmit={onSubmit} /> }

            </div>
        </div>

    )
}