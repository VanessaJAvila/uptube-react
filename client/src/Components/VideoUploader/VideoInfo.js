import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFingerprint, faPlus, faX} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import axios from "axios";
import "./VideoInfo.scss"
import img1 from "../../Assets/sample-thumbnails/ssh_1.png"
import img2 from "../../Assets/sample-thumbnails/ssh_2.png"
import img3 from "../../Assets/sample-thumbnails/ssh_3.png"
import img4 from "../../Assets/sample-thumbnails/ssh_4.png"

//localhost port for api
const API = process.env.REACT_APP_API;

export default function VideoInfo( {videoData}){
    const [thumbStyleOne, setThumbStyleOne] = useState('')
    const [tooltip, setTooltip] = useState(0)
    const [activeThumb, setActiveThumb] = useState('')
    const [thumbStyleTwo, setThumbStyleTwo] = useState('')
    const [thumbStyleThree, setThumbStyleThree] = useState('')
    const [thumbStyleFour, setThumbStyleFour] = useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [videoDescription, setVideoDescription] = useState('')
    const [videoTags, setVideoTags] = useState([])
    const [tagText, setTagText] = useState('')
    const [addTags, setAddTags] = useState(false)
    const [textLimit, setTextLimit] = useState(0)
    const [limitColor, setLimitColor] = useState('')


    const sendVideoData = () => {
        try{
            axios.post(`${API}/:video_key/update`, {
                title: videoTitle,
                thumbnail: activeThumb,
                description: videoDescription
            }, {
                withCredentials: true
            }).then(r =>{
                console.log(r.request.statusText)
            });
        }catch(e){
            console.log('err', e.response)
        }
    }

console.log("img1", img1)
    return(
        <div className={"video-details"}>
            <div className={'upload-video-details'}>
                <div className={'upload-video-details-container'}>
                    <div className={'upload-video-details-header'}>
                        <div className={'upload-video-details-header-left'}>
                            <h4>Escolher Thumbnail</h4>
                            <p>Neste passo deverá escolher uma thumbnail</p>
                            <p>para a capa do seu video</p>
                        </div>
                        <div className={'upload-video-details-header-right'}>
                            <div className={'upload-video-details-header-right-icon'}>
                                <FontAwesomeIcon icon={faFingerprint}/>
                            </div>
                            <p>Your video ID:</p>
                            <div className={'upload-video-details-header-right-id'}>
                                <p>{videoData.video_key}</p>
                            </div>
                        </div>
                    </div>

                    <div className={'upload-video-details-thumbs'}>
                        <div className={`upload-video-details-thumbs-thumb-container upload-video-details-thumbs-border-${thumbStyleOne}`} onMouseEnter={() => {
                            setTooltip(1)
                        }} onMouseLeave={() => {
                            setTooltip(0)
                        }}onClick={() => {
                            setActiveThumb('ssh_1.png')
                            setThumbStyleOne('active')
                            setThumbStyleTwo('')
                            setThumbStyleThree('')
                            setThumbStyleFour('')
                        }}>
                            {tooltip === 1 &&
                                <span className={'upload-video-details-thumbs-thumb-tooltip'}>Escolher como capa</span>}
                            {videoData.title && <div className={'upload-video-details-thumbs-thumb'}
                                              style={{backgroundImage: `url(${img1}`}}></div>}
                        </div>

                        <div className={`upload-video-details-thumbs-thumb-container upload-video-details-thumbs-border-${thumbStyleTwo}`} onMouseEnter={() => {
                            setTooltip(2)
                        }} onMouseLeave={() => {
                            setTooltip(0)
                        }} onClick={() => {
                            setActiveThumb('ssh_2.png')
                            setThumbStyleOne('')
                            setThumbStyleTwo('active')
                            setThumbStyleThree('')
                            setThumbStyleFour('')
                        }}>
                            {tooltip === 2 &&
                                <span className={'upload-video-details-thumbs-thumb-tooltip'}>Escolher como capa</span>}
                            <div className={'upload-video-details-thumbs-thumb'}
                                 style={{backgroundImage: `url(${img2})`}}></div>
                        </div>

                        <div className={`upload-video-details-thumbs-thumb-container upload-video-details-thumbs-border-${thumbStyleThree}`} onMouseEnter={() => {
                            setTooltip(3)
                        }} onMouseLeave={() => {
                            setTooltip(0)
                        }}onClick={() => {
                            setActiveThumb('ssh_3.png')
                            setThumbStyleOne('')
                            setThumbStyleTwo('')
                            setThumbStyleThree('active')
                            setThumbStyleFour('')
                        }}>
                            {tooltip === 3 &&
                                <span className={'upload-video-details-thumbs-thumb-tooltip'}>Escolher como capa</span>}
                            <div className={'upload-video-details-thumbs-thumb'}
                                 style={{backgroundImage: `url(${img3}`}}></div>
                        </div>

                        <div className={`upload-video-details-thumbs-thumb-container upload-video-details-thumbs-border-${thumbStyleFour}`} onMouseEnter={() => {
                            setTooltip(4)
                        }} onMouseLeave={() => {
                            setTooltip(0)
                        }}onClick={() => {
                            setActiveThumb('ssh_4.png')
                            setThumbStyleOne('')
                            setThumbStyleTwo('')
                            setThumbStyleThree('')
                            setThumbStyleFour('active')
                        }}>
                            {tooltip === 4 &&
                                <span className={'upload-video-details-thumbs-thumb-tooltip'}>Escolher como capa</span>}
                            <div className={'upload-video-details-thumbs-thumb'}
                                 style={{backgroundImage: `url(${img4}`}}></div>
                        </div>

                    </div>
                    <div className={'upload-video-details-data'}>
                        <div className={'upload-video-details-data-title'}>
                            <h4>Dados do vídeo</h4>
                        </div>

                        <div className={'upload-video-details-data-video-title'}>
                            <input type={'text'} placeholder={'Titulo do vídeo'} onChange={(e) => {
                                setVideoTitle(e.target.value)
                            }}/>
                        </div>

                        <div className={'upload-video-details-data-video-description'}>
                            <input type={'text'} placeholder={'Descrição do vídeo'} onChange={(e) => {
                                setTextLimit(e.target.value.length)
                                if (textLimit >= 500 && limitColor === '') setLimitColor('description-limit')
                                if (textLimit <= 500 && limitColor === 'description-limit') setLimitColor('')
                                if (textLimit <= 500) setVideoDescription(e.target.value)
                            }}/>
                        </div>

                        <div className={'upload-video-details-data-video-description-limit'}>
                            <div
                                className={`upload-video-details-data-video-description-limit-container ${limitColor}`}>
                                <p>{textLimit}/500</p>
                            </div>
                        </div>

                    </div>

                    <div className={'upload-video-details-tags'}>
                        <div className={'upload-video-details-tags-title'}>
                            <h4>Tags</h4>
                        </div>

                        <div className={'upload-video-details-tags-list'}>
                            {videoTags.map((l, idx) => {
                                return <div key={idx} className={'upload-video-details-tags-tag'}>
                                    <p>{l}</p>
                                </div>
                            })}

                            <div className={'upload-video-details-tags-list-plus'} onClick={() =>{setAddTags(true)}}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </div>
                        </div>
                    </div>
                    <div className={'upload-video-details-button'}>
                        <div className={'upload-video-details-button-container'}>
                            <input type={'button'} className={'upload-details-btn'} value={'Finalizar Upload'} onClick={sendVideoData}/>
                        </div>
                    </div>
                </div>
            </div>}

            {addTags && <div className={'video-upload-add-tag'}>
                <div className={'video-upload-add-tag-container'}>
                    <div className={'video-upload-add-tag-container-two'}>

                        <div className={'video-upload-add-tag-container-two-header'}>
                            <div className={'video-upload-add-tag-container-title'}>
                                <h4>Adiciona as tags</h4>
                            </div>
                        </div>

                        <div className={'video-upload-add-tag-container-leave'} onClick={() => {setAddTags(false)}}>
                            <FontAwesomeIcon icon={faX}/>
                        </div>

                        <div className={'video-upload-add-tag-container-tag-add'}>
                            <input type={'text'} className={'video-upload-add-tag-container-tag-add-text'} placeholder={'Adicionar Tag'} value={tagText} onChange={(e) =>{
                                setTagText(e.target.value)

                            }}/>
                            <div className={'video-upload-add-tag-container-tag-add-btn'}>
                                <input type={'button'} value={'Adicionar Tag'} onClick={() =>{
                                    setVideoTags([...videoTags, tagText])
                                    setTagText('')
                                }}/>
                            </div>
                        </div>

                        <div className={'video-upload-add-tag-container-tag-list'}>
                            <div className={'video-upload-add-tag-container-tag-list-title'}>
                                <h4>Tags:</h4>
                            </div>
                            <div className={'video-upload-add-tag-container-tags-list'}>
                                {videoTags.map((l, idx) =>{
                                    return <div key={idx} className={'video-upload-add-tag-container-tags-list-tag-container'}>
                                        <p className={'video-upload-add-tag-container-tags-list-tag'}>{l}</p>
                                        <FontAwesomeIcon icon={faX} onClick={() =>{
                                            setVideoTags([videoTags.splice(idx,1)])
                                        }}/>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
