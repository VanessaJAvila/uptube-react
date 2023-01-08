import {Link, useHistory, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from "moment/moment";
import 'moment/locale/pt'
import "./VideoStreamingPage.scss"
import {UserContext} from "../../Providers/UserContext";

//localhost port for api
const API = process.env.REACT_APP_API;

const VideoStreamingPage = () => {
    // The video data
    const [videos, setVideos] = useState([]);
    // The video tags
    const [tags, setTags] = useState([]);

    const [subscribed, setSubscribed] = useState(false);
    // Existing video comments
    const [comments, setComments] = useState([])
    // New comment
    const [comment, setComment] = useState([]);

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


    const fetchSubscriptionStatus = async (videoInfo) => {


    };
    useEffect(() => {
        axios
            .get(`${API}/video/stream/${id}`, {withCredentials: true})
            .then(async(response) => {
                // Update the videos state variable with the video data
                setVideos(response.data);
                setIsLoading(false);
                const subres = await axios.get(`${API}/subscriptions/following/${response.data[0].user_id}`, {withCredentials: true});
                setSubscribed(subres.data.subscribed);
                console.log("response:", subres.data)
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
                console.log("comments:", response.data)
                setIsLoading(false);
            })
            .catch((e) => {
                // Update the errorMessage state variable with the error message
                setErrorMessage('Unable to retrieve video comments data');
                setIsLoading(false);
            });


    }, [id, videos?.user_id]);


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

    const handleSubscribe = async (user_following_id, user_followed_id) => {
        try {
            if (subscribed) {
                // Unsubscribe if user is already subscribed
                await axios.delete(`${API}/subscriptions/delete/${user_following_id}/${user_followed_id}`);
                setSubscribed(false);
                console.log('Successfully unsubscribed from channel');
            }
            else {
                console.log("entrei")
                // Subscribe if user is not already subscribed
                console.log("user_following_id", user_following_id)
                console.log("user_followed_id", user_followed_id)

                const response = await axios.post(`${API}/subscriptions/add`, { user_following_id, user_followed_id });
                if (response.data.success) {
                    setSubscribed(true);
                    console.log('Successfully subscribed to channel');
                } else {
                    console.log(response.data.error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

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

                <div>
                    {videos.map((video) => (
                        <div key={video.id}>
                            <video src={`${API}/${video.url_video}`} controls/>
                            <div className={"tags"}>
                                {tags.map((tag, idx) => {
                                    return <Link to="/video" key={tag + "_" + idx}>
                                        <button>#{tag.name}</button>
                                    </Link>
                                })}
                            </div>
                            <div className="title">{video.title}</div>
                            <div className="user-info">
                                <img className={"avatar"} src={""} alt={"user-photo"}/>
                                <div className="username">{video.username}</div>
                                <div className="subscribe">
                                    <button onClick={() => handleSubscribe(user.user_id, video.video_id)}>{subscribed ? 'Unsubscribe' : 'Subscribe'}</button>
                                </div>

                                <div className="views">{video.views} visualizações</div>
                            </div>

                            <div className="reaction-buttons">
                                <div className="likes-count">{video.likes} (likes)</div>
                                <div className="like-button">
                                    <button onClick={() => handleLike(user.user_id, video.video_id)}>Like</button>
                                    {like}
                                </div>
                                <div className="dislikes-count">{video.dislikes} (dislikes)</div>
                                <div className="dislike-button">
                                    <button onClick={() => handleDislike(user.user_id, video.video_id)}>Dislike</button>
                                    {dislike}
                                </div>
                            </div>
                            <div className="description">{video.description}</div>
                            <div className="new-comment">
                                <form>
                                    <label>
                                        Comment:
                                        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                                    </label>
                                </form>
                                <button type="submit" onClick={(e) => handleCommentSubmit(e)}>Submit Comment</button>
                            </div>
                            {comments.map((comment, idx) => {
                                return <div className="comments">
                                    <img className={"user-commenting- avatar"} src={comment.photo} alt={`Avatar do user ${comment.username}`}/>
                                    <div className="username-and-time">{comment.username} {moment(comment.timestamp).fromNow()}</div>
                                    <div className="comment">{comment.comment}</div>
                                </div>
                            })}
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default VideoStreamingPage;


// STREAMING FE
/*
import {Link, useHistory, useParams} from 'react-router-dom';

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from "moment/moment";
import 'moment/locale/pt'
import "./VideoStreamingPage.scss"
import {UserContext} from "../../Providers/UserContext";
import Header from "../../Layout/Header";
import ReactPlayer from "react-player"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../Layout/SideBar";

const VideoStreamingPage = () => {
    // The video data
    const [videoInfo, setVideoInfo] = useState([]);
    // The video tags
    const [tags, setTags] = useState([]);

    const [subscribed, setSubscribed] = useState(false);
    // Existing video comments
    const [comments, setComments] = useState([])
    // New comment
    const [comment, setComment] = useState([]);

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


    const fetchSubscriptionStatus = async (videoInfo) => {


    };
    useEffect(() => {
        axios
            .get(`${API}/video/stream/${id}`, {withCredentials: true})
            .then(async (response) => {
                // Update the videoInfo state variable with the video data
                setVideoInfo(response.data);
                setIsLoading(false);
                const subres = await axios.get(`${API}/subscriptions/following/${response.data[0].user_id}`, {withCredentials: true});
                setSubscribed(subres.data.subscribed);
                console.log("response:", response.data[0])
            })
        /*.catch((e) => {
            // Update the errorMessage state variable with the error message
            setErrorMessage('Unable to retrieve video data');
            setIsLoading(false);
        });*/
/*
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


    }, [id, videoInfo?.user_id]);


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

    const handleSubscribe = async (user_following_id, user_followed_id) => {
        try {
            if (subscribed) {
                // Unsubscribe if user is already subscribed
                await axios.delete(`${API}/subscriptions/delete/${user_following_id}/${user_followed_id}`);
                setSubscribed(false);
                console.log('Successfully unsubscribed from channel');
            } else {
                console.log("entrei")
                // Subscribe if user is not already subscribed
                console.log("user_following_id", user_following_id)
                console.log("user_followed_id", user_followed_id)

                const response = await axios.post(`${API}/subscriptions/add`, {
                    user_following_id,
                    user_followed_id
                });
                if (response.data.success) {
                    setSubscribed(true);
                    console.log('Successfully subscribed to channel');
                } else {
                    console.log(response.data.error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    async function handleCommentSubmit(e) {
        e.preventDefault();
        // todo: meter user logado

        try {
            // Make a POST request to the endpoint to create a new comment
            const response = await axios.post(`${API}/video/${id}/comments/create`, {
                comment
            });

            // If the comment was successfully created, add the new comment to the list of comments
            const {success, comment_id} = response.data;
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
            <Header/>
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
                                return <p key={tag + "_" + idx} className={'tag'}>#{tag.tag_name}tag</p>
                            })}
                        </div>
                        <div className={"video-info"}>
                            <div className={"video-info-1"}>
                                <div className="video-title"><p>title</p></div>
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
                                            <p className={"video-channel-username"}>username</p>
                                        </Link>
                                        <div className={"subscribe-button"}>
                                            <p> Subscrever</p>
                                        </div>
                                    </div>
                                    <div className="video-info-container-row-2">
                                        <p className={"views-days-posted"}>
                                            M visualizações | há 7 dias
                                        </p>
                                    </div>
                                </div>
                                    <div className={"reactions"}>
                                        <div className={"likes"}>
                                            <FontAwesomeIcon icon={faThumbsUp}/>
                                            <p className={"likes-count"}>10</p>
                                        </div>
                                        <div className={"dislikes"}>
                                            <FontAwesomeIcon icon={faThumbsDown}/>
                                            <p className={"dislikes-count"}>5</p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className={"description-container"}>
                        <p className={"description-text"}>description</p>
                    </div>
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
                                    />
                                    <button type={"submit"} className={"new-comment-button"}>
                                        Publicar
                                    </button>
                                </form>
                            </div>
                        )}
                        <div className={"comments"}>
                            {comments.map((comment) => {
                                return (
                                    <div className={"comment"} key={comment._id}>
                                        <div
                                            className={"comment-user-photo"}
                                            style={{}}
                                        ></div>
                                        <div className={"comment-text"}>
                                            <Link to={`/canal/${comment.username}`}>
                                                <p className={"comment-username"}>
                                                    {comment.username}
                                                </p>
                                            </Link>
                                            <p className={"comment-body"}>{comment.body}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
        </div>
    );
}


    export default VideoStreamingPage;
*/
