import {Link, useHistory, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'moment/locale/pt'
import "./VideoStreamingPage.scss"
import {UserContext} from "../../Providers/UserContext";
import ReactPlayer from "react-player";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import Description from "./Description/Description"
import SubscribeButton from "./SubsribeButton/SubscribeButton";
import LikeButton from "./LikeButton/LikeButton";
import CreateComment from "./CreateComment/CreateComment";
import DislikeButton from "./DislikeButton/DislikeButton";
import getDaySeen from "../../Utils/getDaySeen";
import ReportVideo from "./Report/Report";

//localhost port for api
const API = process.env.REACT_APP_API;


const VideoStreamingPage = () => {
    // The video data
    const [videos, setVideos] = useState([]);
    // The video tags
    const [tags, setTags] = useState([]);
    // Existing video comments
    const [comments, setComments] = useState([])
    // New comment

    // Whether the component is currently loading the video
    const [isLoading, setIsLoading] = useState(true);

    // An error message to display if there is an issue with loading the video
    const [errorMessage, setErrorMessage] = useState('');

    const [userFollowedId, setUserFollowedId] = useState(0);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    // Retrieve the 'id' path parameter from the URL
    const {id} = useParams();

    const {user} = React.useContext(UserContext);
    const {history} = useHistory();

    useEffect(() => {
        axios
            .get(`${API}/video/stream/${id}`)
            .then(async(response) => {
                // Update thevideoInfo state variable with the video data, !important data[0] so that it retrieves the array
                setVideos(response.data[0]);
                setIsLoading(false);
            })
            .catch((e) => {
                // Update the errorMessage state variable with the error message
                setErrorMessage('Unable to retrieve video data');
                setIsLoading(false);
            });
        axios
            .get(`${API}/video/${id}/tags`)
            .then((response) => {
                // Update the tags state variable with the video tags data
                setTags(response.data);
                //console.log(tags)
                setIsLoading(false);
            })
            .catch((e) => {
                // Update the errorMessage state variable with the error message
                setErrorMessage('Unable to retrieve video tags data');
                setIsLoading(false);
            });
        axios
            .get(`${API}/video/${id}/comments`)
            .then((response) => {
                // Update the comments state variable with the video comments data
                setComments(response.data);
                //console.log("comments:", response.data)
                setIsLoading(false);
            })
            .catch((e) => {
                // Update the errorMessage state variable with the error message
                setErrorMessage('Unable to retrieve video comments data');
                setIsLoading(false);
            });
        axios
            .get(`${API}/video/${id}/user`)
            .then((response) => {
                setUserFollowedId(response.data[0].user_id)
            })
            .catch((e) => console.log(e));

    }, [id, videos?.user_id]);

    console.log("videos.photo", videos.photo)

    // Render the component
    return (
        <div className={"streaming-wrapper"}>
            <Header/>
            <SideBar/>
            <div className="streaming">
                <div className="streaming-container-1">
                    <div className={"streaming-video-details"}>
                        <div className={"video-player"}>
                            <ReactPlayer
                                className={"video-player-r"}
                                width={"100%"}
                                playing
                                controls
                                url={``}
                            />
                        </div>
                        <div className={"video-tags"}>
                            {tags.map((tag, idx) => {
                                return <p key={tag + "_" + idx} className={'tag'}>#{tag.name}</p>
                            })}
                        </div>
                        <div className={"video-info"}>
                            <div className={"video-info-1"}>
                                <div className="video-title">{videos.title}</div>
                                <div className={"report"}>
                                    <ReportVideo videoId={id} reporterId={user.user_id}/>                                </div>
                            </div>
                            <div className={"channel-info-1"}>
                                <div className="channel-info-1-a">
                                    <Link to={"/canal"}>
                                        <div
                                            className={"avatar"}
                                            style={{backgroundImage: `url(${videos.photo})`}}></div>
                                    </Link>
                                </div>
                                <div className="video-info-container">
                                    <div className="video-info-container-row-1">
                                        <Link to={"/canal"}>
                                            <p className={"video-channel-username"}>{videos.username}</p>
                                        </Link>
                                    </div>
                                    <div className="video-info-container-row-2">
                                        <p className={"views-days-posted"}>
                                            {videos.views} visualizações | {getDaySeen(videos.date)}
                                        </p>
                                    </div>
                                </div>
                                <div className={"reactions"}>
                                    <LikeButton videoId={id} likeCount={videos.likes}/>
                                    <DislikeButton videoId={id} dislikeCount={videos.dislikes}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Description id={id} description={videos.description} />
                    <div className={"comments-container"}>
                        {user && (
                            <div className={"new-comment"}>
                                <div
                                    className={"new-comment-user-photo"}
                                    style={{backgroundImage: `url(${user.photo})`}}>
                                </div>
                                <CreateComment videoId={id}/>
                            </div>
                        )}
                        {!user && "login para comentar"}
                        {comments && !isLoading && <div className={"video-comments"}>
                            {comments.map((comment, idx) => {
                                return  <div key={idx} className={'video-comment'}>
                                    <div className={'user-comment-photo'} style={{backgroundImage: `url(http://localhost:3001/avatar/photo-4.jpg)`}}></div>
                                    <div className={'user-comment-inner-container'}>
                                        <div className={'user-comment-content'}>
                                            <p className={'user-comment-username'}>{comment.name}</p>
                                            <p className={'comment-time-from-now'}>{getDaySeen(comment.timestamp)}</p>
                                        </div>
                                        <div className={'comment-text'}>
                                            <p>{comment.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoStreamingPage;
