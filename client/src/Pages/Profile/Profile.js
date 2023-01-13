import React, {useContext, useState} from "react";
import axios from "axios";
import {Link, Redirect, useHistory} from 'react-router-dom';
import {UserContext} from "../../Providers/UserContext";
import SideBar from "../../Layout/SideBar";
import "./Profile.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faGear, faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import Header from "../../Layout/Header";


//localhost port for api
const API = process.env.REACT_APP_API;

function Profile() {
    const {user,setUser} = React.useContext(UserContext);
    const [updateUserName, setUpdateUserName] = useState(user?.name);
    const [updateUserUsername, setUpdateUserUsername] = useState(user?.username);
    const [updateUserPhoto, setUpdateUserPhoto] = useState();
    const [updateUserBio, setUpdateUserBio] = useState(user?.bio);
    const [updateUserHeader, setUpdateUserHeader] = useState(user?.header);
    const [updateUserBirthday, setUpdateUserBirthday] = useState(user?.birthday);
    const [photoName, setPhotoName] = useState("");
    const [headerName,setHeaderName] = useState("");
    const [bdayState, setBdaystate] = useState(false);

    const history = useHistory();


    if (!user) {
        return <h2>Awaiting user....</h2>
    }


    let handleSubmit = async (e) => {

        e.preventDefault();


        let newUser = {
            name: updateUserName,
            username: updateUserUsername,
            bio: updateUserBio,
            birthday: updateUserBirthday,
        }

        axios.post(`${API}/user/edit`, newUser, {
            withCredentials: true
        })
        .then((res) => {
            setUser(newUser);
        }).catch((error) => {
            //console.log(error.response.data, "nao fizeste edit profile");
            alert("error: "+ error.response.data)
            //  history.replace("/Register")
        });

        const formData = new FormData();
        formData.append("photo", updateUserPhoto);
        formData.append("photoName", photoName);

        axios.post(`${API}/user/edit/upload/avatar`,formData, {
            withCredentials: true
        })
            .then((res) => {

                console.log(res, "upload res");
            }).catch((error) => {
            //console.log(error.response.data, "nao editaste a photo");
            alert("error: "+ error.response.data)
            //  history.replace("/Register")
        });

        const formDataHead = new FormData();
        formDataHead.append("photo", updateUserHeader);
        formDataHead.append("photoName", headerName);

        axios.post(`${API}/user/edit/upload/header`,formDataHead, {
            withCredentials: true
        })
            .then((res) => {

            }).catch((error) => {
            //console.log(error.response.data, "nao editaste a photo");
            alert("error: "+ error.response.data)
            //  history.replace("/Register")
        });
        window.location.reload();

    }


    let date = new Date(user.birthday);
    let  year = date.getFullYear();
    let  month = date.getMonth()+1;
    let dt = date.getDate();
    let bday = year+'-' + month + '-'+dt;


    return <div className="Profile">
        <Header/>
        <SideBar/>
        <div className="container-profile">

            <div className="container">
                <h1> Editar a Conta </h1>
                <label className={"title"}>Name</label>
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <input type="text" onChange={e => setUpdateUserName(e.target.value)} value={updateUserName}
                               id="name"
                               name="name" placeholder={user.name}/>
                        <FontAwesomeIcon className="icons" icon={faUser}/>
                    </div>
                    <label className={"title"}>Username</label>
                    <div className="inputContainer">
                        <input type="text" onChange={e => setUpdateUserUsername(e.target.value)}
                               value={updateUserUsername} id="username"
                               name="username" placeholder={user.username || user.name}/>
                        <FontAwesomeIcon className="icons" icon={faUser}/>
                    </div>
                    <label className={"title"}>Bio</label>
                    <div className="inputContainer">
                        <input type="text" onChange={e => setUpdateUserBio(e.target.value)} value={updateUserBio}
                               id="bio" name="bio" placeholder={user.bio || "No Bio Available"}/>
                        <FontAwesomeIcon className="icons" icon={faKey}/>
                    </div>
                    <label className={"title"}>Choose a profile picture:</label>
                    <div className="inputContainer-photo" id="avatar" style={{backgroundImage: `url(${user.photo}`}}>
                        <input type="file" className="formButton" id="photo" name="photo" accept="image/png, image/jpeg"
                               onChange={e => setUpdateUserPhoto(e.target.files[0]) && setPhotoName(user.email)}/>
                    </div>
                    <label className={"title"}>Choose a header picture:</label>
                    <div className="inputContainer" id="uheader" style={{backgroundImage: `url(${user.header}`}}>
                        <input type="file" id="header" name="header" accept="image/png, image/jpeg"
                               onChange={e => setUpdateUserHeader(e.target.files[0]) && setHeaderName(user.email)}/>
                    </div>
                    <label className={"title"}>Birthday</label>
                    <div className="inputContainer" id="birthdate">
                        {!bdayState && <h2 onClick={() => setBdaystate(true)}>{bday} </h2>}
                        {bdayState && <input type="date" onChange={e => setUpdateUserBirthday(e.target.value)}
                                             id="birthday" name="birthday"/>}
                    </div>

                    <div className={"buttons"}>

                    </div>

                <button type="submit">Gravar Alterações</button>

                </form>
                <div className={"buttons"}>
                    <button type="submit" className={"save"}>Gravar Alterações</button>
                    <button className="password-button">
                        <Link to={"/RecoverPassword"}><p>Change your password</p></Link>
                    </button>
                    <button className={"delete"}>
                        <Link to={"/Delete"}><p>Tired of uptube? Delete your account</p></Link>
                    </button>
                </div>
            </div>
        </div>
    </div>;
}

export default Profile;