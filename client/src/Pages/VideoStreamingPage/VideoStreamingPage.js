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
    const [comment, setComment] = useState([]);
    const [inputCommentValue, setInputCommentValue] = useState("");

    const [like, setLike] = useState([]);
    const [dislike, setDislike] = useState([]);

    // Whether the component is currently loading the video
    const [isLoading, setIsLoading] = useState(true);

    // An error message to display if there is an issue with loading the video
    const [errorMessage, setErrorMessage] = useState('');


    // Retrieve the 'id' path parameter from the URL
    const {id} = useParams();

    const {user} = React.useContext(UserContext);
    const {history} = useHistory();

    useEffect(() => {
        axios
            .get(`${API}/video/stream/${id}`, {withCredentials: true})
            .then(async(response) => {
                // Update thevideoInfo state variable with the video data
                setVideos(response.data);
                setIsLoading(false);
                const subres = await axios.get(`${API}/subscriptions/following/${response.data[0].user_id}`, {withCredentials: true});
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
            .get(`${API}/video/${id}/comments/userinfo`)
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


    }, [id, videos?.user_id]);

    console.log("comments", comments)

    const handleLike = (user_id, video_id) => {
        axios.get(`${API}/reaction/like/${video_id}/${user_id}`)
            .then((res) => {
                const liked = res.data.liked;
                if (liked === false) {
                    // The video is already liked, so we will send a DELETE request to remove the like
                    axios.delete(`${API}/reaction/${video_id}/${user_id}/delete`)
                        .then((res) => {
                            setLike(res.data);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                } else {
                    // The video is not liked, so we will send a POST request to add the like
                    axios.post(`${API}/reaction/new`, {
                        user_id,
                        video_id,
                        reaction_type_id: 1,
                    })
                        .then((res) => {
                            setLike(res.data);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const handleDislike = (userId, videoId) => {
        axios.post(`${API}/reaction/new`, {
            userId,
            videoId,
            reactionTypeId: 2,
        })
            .then((res) => {
                setDislike(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    async function handleCommentSubmit(e) {
        e.preventDefault();
        // todo: meter user logado

        try {
            // Make a POST request to the endpoint to create a new comment
            const response = await axios.post(`${API}/video/${id}/comments/create`, {
                comment
            });

            // If the comment was successfully created, add the new comment to the list of comments
            const { success, comment_id } = response.data;
            if (success) {
                setComments([...comments, {
                    id: comment_id,
                    comment,
                    timestamp: new Date(),
                }]);
                // Clear the form
                setComment('');
            }
        } catch (error) {
            // If there was an error creating the comment, display an error message
            setErrorMessage('Error creating comment');
        }
    }

    // Render the component
    return (
        <div className="streaming">
            <SideBar/>
            <div className="streaming-container-1">
                <div className={"streaming-video-details"}>
                    <div className={"video-player"}>
                        <ReactPlayer
                            className={"video-player-r"}
                            width={"100%"}
                            playing
                            controls
                            url={`${API}/`}
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
                                <FontAwesomeIcon icon={faFlag}/>
                            </div>
                        </div>
                        <div className={"channel-info-1"}>
                            <div className="channel-info-1-a">
                                <Link to={"/canal"}>
                                    <div
                                        className={"avatar"}
                                        style={{

                                        }}
                                    ></div>
                                </Link>
                            </div>
                            <div className="video-info-container">
                                <div className="video-info-container-row-1">
                                    <Link to={"/canal"}>
                                        <p className={"video-channel-username"}>{videos.username}</p>
                                    </Link>
                                    <SubscribeButton/>
                                </div>
                                <div className="video-info-container-row-2">
                                    <p className={"views-days-posted"}>
                                        {videos.views} | há 7 dias
                                    </p>
                                </div>
                            </div>
                            <div className={"reactions"}>
                                <div className={"likes"}>
                                    <LikeButton/>
                                    <p className={"likes-count"}>{videos.likes}</p>
                                </div>
                                <div className={"dislikes"}>
                                    <FontAwesomeIcon icon={faThumbsDown}/>
                                    <p className={"dislikes-count"}>{videos.dislikes}</p>
                                </div>
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
                                style={{
                                }}
                            ></div>
                            <form>
                                <input
                                    type={"text"}
                                    placeholder={"Comentar"}
                                    className={"new-comment-input"}
                                    value={inputCommentValue}
                                    onChange={(e) => setInputCommentValue(e.target.value)}
                                />
                                {inputCommentValue && (
                                <button type={"submit"} className={"new-comment-button"}>
                                    Publicar
                                </button>)}
                            </form>
                        </div>
                    )}
                    {!user && "login para comentar"}
                    <div className={"comments"}>
                        {comments.map((comment, idx) => {
                            return  <div key={idx} className={'video-comment'}>

                                    <div className={'user-comment-photo'} style={{backgroundImage: `url(${comment.photo})`}}></div>
                                    <div className={'user-comment-inner-container'}>
                                        <div className={'user-comment-content'}>
                                            <p className={'user-comment-username'}>{comment.name}</p>
                                            <p className={'comment-time-from-now'}>há {comment.timestamp}</p>
                                        </div>
                                        <div className={'comment-text'}>
                                            <p>{comment.comment}</p>
                                        </div>
                                    </div>

                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoStreamingPage;
