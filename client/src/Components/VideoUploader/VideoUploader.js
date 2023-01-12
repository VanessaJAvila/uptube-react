import './VideoUploader.scss';
import LoadingSpinner from '../Spinner/Spinner';
import ProgressBar from '../ProgressBar/ProgressBar';
import {useRef, useState} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';


import SideBar from "../../Layout/SideBar";
import {Redirect} from "react-router-dom";

//localhost port for api
const API = process.env.REACT_APP_API;

// This component is a form that allows the user to select a file and upload it to a server.
// It uses state variables to keep track of the form's state.
export const VideoUploader = ({onSubmit}) => {
    // The file that the user has selected for upload
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);


    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);
    const [fileName, setFileName] = useState('')


    const uploadFile = async (file) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            await axios.post(`${API}/studio/upload`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true,
                onUploadProgress: ({progress}) => {
                    setUploadPercentage(Math.floor(progress * 100));
                }
            }).then((res) => {
                console.log("response from vid  upload:",res.data.data)
                onSubmit(res.data.data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    console.log("onSubmit", onSubmit)
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
        if (e.type === "dragleave") setDragActive(false);
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    const handleClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.files && e.target.files[0]) {
            await uploadFile(e.target.files[0]);
            setIsLoading(true);
        }
    };

    const handleDrop = async (e) => { // triggered by drop
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files[0] > 1) throw "please drag only one file at a time.";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await uploadFile(e.dataTransfer.files[0])
            setIsLoading(true);
        }
    };

    const loadingContainer = () => {
        return (
            <div className="progress-container">
                <CircularProgressbar className={'progress-circular-bar'}
                                     value={uploadPercentage}
                                     styles={buildStyles({
                                         rotation: 0.15,
                                         strokeLinecap: 'round',
                                         textSize: '12px',
                                         trailColor: 'rgba(19, 19, 26)',
                                         backgroundColor: 'rgba(19, 19, 26)',
                                     })}
                />
                <div className={'progress-container-progress-bar'}>
                    <div className={'progress-bar-text'}><p>{uploadPercentage}%</p></div>
                    <div className="progress-container-bar">
                                            <span className="progress-bar-fill"
                                                  style={{width: uploadPercentage + "%"}}></span>
                    </div>
                </div>

                <div className="loading-video-text">
                    <p>A carregar o seu vídeo,</p>
                    <p>por favor aguarde...</p>
                </div>
            </div>
        )
    }

    const formContainer = () => {
        if (isLoading) {
            return loadingContainer()
        }

        return (
            <>
                <div className={"drag-container-info"}>
                    <div className={'drag-container-info-icon'}>
                        <FontAwesomeIcon icon={faUpload}/>
                    </div>
                    <div className={"drag-container-info-text-container"}>
                        <p className={"drag-container-info-text"}>Arraste para aqui o vídeo ou
                            clique</p>
                        <p className={"drag-container-info-text"}>para escolher o ficheiro</p>
                    </div>
                    <button className={"drag-container-info-upload-button"}
                            onClick={onButtonClick}></button>
                </div>
                {dragActive &&
                    <div id="drag-area" onDragEnter={handleDrag} onDragLeave={handleDrag}
                         onDragOver={handleDrag} onDrop={handleDrop}></div>
                }
            </>
        )
    }

    // Render the form
    return (
        <div className='upload'>
            <div className='upload-container'>
                    <form className={"upload-drag-video"} onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                        <input ref={inputRef} type={"file"} id={"input-video-upload"} multiple={false}
                                         onChange={handleClick}/>
                        <label id={"label-file-upload"} htmlFor={"input-file-upload"}
                               className={dragActive ? "active" : ""}>
                            <div className={"drag-container"}>
                                {formContainer()}
                            </div>
                        </label>
                    </form>
            </div>
        </div>
    );
};