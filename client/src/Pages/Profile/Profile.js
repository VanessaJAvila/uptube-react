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
    console.log(user, "user Profile");


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

        console.log(formData, "formdata");
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
                //console.log(res, "upload res");
            }).catch((error) => {
            //console.log(error.response.data, "nao editaste a photo");
            alert("error: "+ error.response.data)
            //  history.replace("/Register")
        });

    }


    let date = new Date(user.birthday);
    let  year = date.getFullYear();
    let  month = date.getMonth()+1;
    let dt = date.getDate();
    let bday = year+'-' + month + '-'+dt;


    return <div className="Profile">
        <Header/>
        <SideBar/>
        <div className="container-profile" >

        <div className="container">
            <h1> Editar a Conta </h1>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label>Name</label>
                    <input type="text" onChange={e => setUpdateUserName(e.target.value)} value={updateUserName} id="name"
                           name="name" placeholder={user.name}/>
                    <FontAwesomeIcon className="icons" icon={faUser}/>
                </div>
                <div className="inputContainer">
                    <label>Username</label>
                    <input type="text" onChange={e => setUpdateUserUsername(e.target.value)} value={updateUserUsername} id="username"
                           name="username" placeholder={user.username || user.name}/>
                    <FontAwesomeIcon className="icons" icon={faUser}/>
                </div>

                <div className="inputContainer">
                    <label>Bio</label>
                    <input type="text" onChange={e => setUpdateUserBio(e.target.value)} value={updateUserBio}
                           id="bio" name="bio" placeholder={user.bio || "No Bio Available"}/>
                    <FontAwesomeIcon className="icons" icon={faKey}/>
                </div>

                <div className="inputContainer" id="avatar">
                    <img alt="profile photo" src={user.photo} />
                    <label>Choose a profile picture:</label>
                    <input type="file" id="photo" name="photo" accept="image/png, image/jpeg" onChange={e =>  setUpdateUserPhoto(e.target.files[0]) && setPhotoName(user.email)}/>
                </div>


                <div className="inputContainer" id="uheader" >
                    <img alt="header" src={user.header} />
                    <label>Choose a header picture:</label>
                    <input type="file" id="header" name="header" accept="image/png, image/jpeg" onChange={e =>  setUpdateUserHeader(e.target.files[0]) && setHeaderName(user.email)}/>
                </div>

                <div className="inputContainer" id="birthdate">
                    <label>Birthday</label>
                    {!bdayState&&<h2 onClick={() => setBdaystate(true)}>{bday} </h2>}
                    {bdayState&&<input type="date" onChange={e => setUpdateUserBirthday(e.target.value)}
                           id="birthday" name="birthday" />}

                </div>

                <button type="submit">Gravar Alterações</button>

            </form>
            <Link to={"/RecoverPassword"}><p>Change your password</p></Link>

            <Link to={"/Delete"}><p>Tired of uptube? Delete your account?</p></Link>
        </div>
        </div>
    </div>;
}

export default Profile;