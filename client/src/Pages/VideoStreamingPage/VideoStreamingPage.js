import {Link, useHistory, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'moment/locale/pt'
import "./VideoStreamingPage.scss"
import {UserContext} from "../../Providers/UserContext";
import ReactPlayer from "react-player";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import Description from "./Description/Description"
import LikeButton from "./LikeButton/LikeButton";
import CreateComment from "./CreateComment/CreateComment";
import DislikeButton from "./DislikeButton/DislikeButton";
import getDaySeen from "../../Utils/getDaySeen";
import ReportVideo from "./Report/Report";
import SubscribeButton from "./SubsribeButton/SubscribeButton";

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

    const [url, setUrl] = useState("");
    // An error message to display if there is an issue with loading the video
    const [errorMessage, setErrorMessage] = useState('');

    const [userFollowedId, setUserFollowedId] = useState(0);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    // Retrieve the 'id' path parameter from the URL
    const {id} = useParams();

    const {user} = React.useContext(UserContext);

    let userId = 0;

    if (user && user.user_id) {
        userId = user.user_id;
    }
    const {history} = useHistory();

    const [newComment, setNewComment] = useState('');

    const handleNewComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    useEffect(() => {
        if (!id) {
            console.log("id (video id from params) variable is empty, cannot make API call");
            return;
        }
        setIsLoading(true);
        axios
            .get(`${API}/video/videoinfocomment/${id}`)
            .then(async(response) => {
                // Update thevideoInfo state variable with the video data, !important data[0] so that it retrieves the array
                setVideos(response.data.video_info[0]);
                setComments(response.data.video_comments);
                setUrl(response.data.video_info[0].url_video);
                setUserFollowedId(response.data.video_info[0].user_id);
                //setUserFollowedId(response.data[0].user_id)
                //setIsLoading(false);
            })
            .catch((e) => {
                // Update the errorMessage state variable with the error message
                setErrorMessage('Unable to retrieve video data');
                setIsLoading(false);
            });
        setIsLoading(true);
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

    }, [id, videos?.user_id]);


    if (isLoading === true) {
        return <div className="App">Loading...</div>;
    }

    console.log("url: ", url)

    const newUrl = `${API}/videos/${videos.video_key}/${videos.video_key}.mp4`
    if (isLoading === false && userId){
        return (
            <div className={"streaming-wrapper"}>
                <Header/>
                <SideBar/>
                <div className="streaming">
                    <div className="streaming-container-1">
                        <div className={"streaming-video-details"}>
                            <div className={"video-player"}>
                                <video width="100%" controls>
                                    <source src={`${API}${url}`} type="video/mp4"/>
                                        Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className={"video-tags"}>
                                {tags && tags.map((tag, idx) => {
                                    return <p key={tag + "_" + idx} className={'tag'}>#{tag.name}</p>
                                })}
                            </div>
                            <div className={"video-info"}>
                                <div className={"video-info-1"}>
                                    <div className="video-title">
                                        {videos ? videos.title : 'Loading...'}
                                        {videos.title}</div>
                                    <div className={"report"}>
                                        <ReportVideo videoId={id} reporterId={userId}/>                                </div>
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
                            {userId && (
                                <div className={"new-comment"}>
                                    <div
                                        className={"new-comment-user-photo"}
                                        style={{backgroundImage: `url(${user.photo})`}}>
                                    </div>
                                    <CreateComment videoId={id} handleNewComment={handleNewComment}/>
                                </div>
                            )}
                            {!userId && "login para comentar"}
                            {comments && !isLoading && <div className={"video-comments"}>
                                {comments.map((comment, idx) => {
                                    return  <div key={idx} className={'video-comment'}>
                                        <div className={'user-comment-photo'} style={{backgroundImage: `url(${comment.photo})`}}></div>
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
                    <div className={"streaming-container-2"}>
                        Videos sugeridos
                    </div>
                </div>
            </div>
        );
    }
    if (isLoading === false && !userId){
        return (
            <div className={"streaming-wrapper"}>
                <Header/>
                <SideBar/>
                <div className="streaming">
                    <div className="streaming-container-1">
                        <div className={"streaming-video-details"}>
                            <div className={"video-player"}>
                                <video width="100%" controls>
                                    <source src={`${newUrl}`} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className={"video-tags"}>
                                {tags && tags.map((tag, idx) => {
                                    return <p key={tag + "_" + idx} className={'tag'}>#{tag.name}</p>
                                })}
                            </div>
                            <div className={"video-info"}>
                                <div className={"video-info-1"}>
                                    <div className="video-title">
                                        {videos ? videos.title : 'Loading...'}
                                        {videos.title}</div>
                                    <div className={"report"}>
                                        <ReportVideo videoId={id} reporterId={userId}/>                                </div>
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
                            {userId && (
                                <div className={"new-comment"}>
                                    <div
                                        className={"new-comment-user-photo"}
                                        style={{backgroundImage: `url(${user.photo})`}}>
                                    </div>
                                    <CreateComment videoId={id} handleNewComment={handleNewComment}/>
                                </div>
                            )}
                            {!userId && "login para comentar"}
                            {comments && !isLoading && <div className={"video-comments"}>
                                {comments.map((comment, idx) => {
                                    return  <div key={idx} className={'video-comment'}>
                                        <div className={'user-comment-photo'} style={{backgroundImage: `url(${comment.photo})`}}></div>
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
                    <div className={"streaming-container-2"}>
                        Videos sugeridos
                    </div>
                </div>
            </div>
        );
    }

}

export default VideoStreamingPage;