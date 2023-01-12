import {useRef, useState} from "react";
import axios from "axios";
import {VideoUploader} from "../../Components/VideoUploader/VideoUploader";
import "./Studio.scss"
import VideoInfo from "../../Components/VideoUploader/VideoInfo";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";

//localhost port for api
const API = process.env.REACT_APP_API;

// This component is a form that allows the user to select a file and upload it to a server.
// It uses state variables to keep track of the form's state.
export default function Studio() {
    const [isFileSubmitted, setIsFileSubmitted] = useState(false);
    const [submitData, setSubmitData] = useState(null);

    const onSubmit = (data) => {
        setIsFileSubmitted(true)
        setSubmitData(data)
    }

    /*
        useEffect(() => {
        handleThumbnailsLoading();
    }, []); // this empty array ensures that the effect only runs once on mount

    const handleThumbnailsLoading = async (data) => {
        try {
            const response = await axios.get(`${API}/video/${data.video_key}/tn_1.png`, {
                withCredentials: true
            });
            if(response.data.success){
                setLoading(false);
            }
        } catch (e) {
            console.error("erro a ler thumbnails")
        }
    }


    const onSubmit = (data) => {
        if (!loading) {
            handleThumbnailsLoading(data);
            setIsFileSubmitted(true)
            setSubmitData(data)
        }
    }
    */
console.log("submitData: Studio  ", submitData)
    return (
        <div>
            <div>
                <Header/>
                <SideBar/>
            </div>
            <div className={"container-wrapper"}>
                { isFileSubmitted ? <div className={"upload-title"}>Edite os daodos do vídeo</div> : <div className={"upload-title"}>Upload de um novo vídeo</div> }
                { isFileSubmitted ? <VideoInfo videoData={submitData} /> : < VideoUploader onSubmit={onSubmit} /> }
            </div>
        </div>

    )
}