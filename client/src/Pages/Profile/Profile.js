import React, {useContext, useState} from "react";
import axios from "axios";
import {Redirect, useHistory} from 'react-router-dom';
import {UserContext} from "../../Providers/UserContext";
//import login from "../Login";
import logo from "../../Layout/logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faKey, faUser} from "@fortawesome/free-solid-svg-icons";


function Profile() {
    const {user,setUser} = React.useContext(UserContext);
    const [updateUserName, setUpdateUserName] = useState(user?.name);
    const [updateUserUsername, setUpdateUserUsername] = useState(user?.username);
    const [updateUserPhoto, setUpdateUserPhoto] = useState();
    const [updateUserBio, setUpdateUserBio] = useState(user?.bio);
    const [updateUserHeader, setUpdateUserHeader] = useState(user?.header);
    const [updateUserBirthday, setUpdateUserBirthday] = useState(user?.birthday);
    const [photoName, setPhotoName] = useState("");


   // const {isLoading,setIsLoading} = React.useContext(UserContext);
    const history = useHistory();
    console.log(user, "user Profile");


    if (!user) {
        return <h2>Awaiting user....</h2>
    }




    let handleSubmit = async (e) => {

        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();


        let newUser = {
            name: updateUserName,
            username: updateUserUsername,
            bio: updateUserBio,
            header: updateUserHeader,
            birthday: updateUserBirthday,
        }

        axios.post('http://localhost:5000/user/'+user.user_id+'/edit', newUser, {
            withCredentials: true
        })
            .then((res) => {
                setUser(newUser);
                history.replace("/Profile")
            }).catch((error) => {
            console.log(error.response.data, "nao fizeste edit profile");
            alert("error: "+ error.response.data)
            //  history.replace("/Register")
        });

        const formData = new FormData();
        formData.append("photo", updateUserPhoto);
        formData.append("photoName", photoName);


        axios.post('http://localhost:5000/user/'+user.user_id+'/edit/upload',formData, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res, "upload res");

                history.replace("/Profile")
            }).catch((error) => {
            console.log(error.response.data, "nao editaste a photo");
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
        <div className="container">
            <div className={"logo"}>
                <img src={logo} alt ="logo UpTube"/>
            </div>
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

                <div className="inputContainer">
                    <img alt="profile photo" src={user.photo} />
                    <label>Choose a profile picture:</label>
                    <input type="file" id="photo" name="photo" accept="image/png, image/jpeg" onChange={e =>  setUpdateUserPhoto(e.target.files[0]) && setPhotoName(e.target.files[0].name)}/>
                    <h2>{console.log(updateUserPhoto)}</h2>
                    <img alt="profile photo" src={updateUserPhoto} />
                </div>


                <div className="inputContainer">
                    <img alt="header" src={user.header} />
                    <label>Choose a header picture:</label>
                    <input type="file" id="header" name="header" accept="image/png, image/jpeg" onChange={e => setUpdateUserHeader(e.target.value)}/>
                </div>

                <div className="inputContainer">
                    <label>Birthday</label>
                    <input type="date" onChange={e => setUpdateUserBirthday(e.target.value)} value={bday}
                           id="birthday" name="birthday" />
                    <FontAwesomeIcon className="icons" icon={faKey}/>
                </div>


                <button type="submit">Gravar Alterações</button>


            </form>

        </div>
    </div>;
}

export default Profile;