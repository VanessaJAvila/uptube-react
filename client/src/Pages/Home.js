//export default defaultBackendURL = ´localhost:4000´
//export default videosURL = defaultBackendURL + ´video´
// fazer um file se possivel com todos os endpoints vindos da base de dados e chamar depois nos files necessarios
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Header from "../Layout/Header";
import {Redirect, useHistory} from "react-router-dom";
import {UserContext} from "../Providers/UserContext";


function Home() {
    const {user, setUser} = React.useContext(UserContext);
    const history = useHistory();
    const [videos, setVideos] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    //const[public, setPublic] =useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/video')
            .then(response => {
                setVideos(response.data);
            });
        axios.get('http://localhost:5000/suggested/50popular')
            .then(response => {
                console.log('rsp', response)
                setRecommendations(response.data);
            }).catch(e => console.log(e)) ;
    }, []);


    let handleSubmit = async (e) => {
        //history.push vai para pagina nova
        //history.replace nao permite voltar para a pagina anterior
        e.preventDefault();
        axios.post('http://localhost:5000/user/Logout', true, {
            withCredentials: true
        })
            .then((res) => {
                setUser(null);
                history.replace("/Login");
            }).catch((error) => {
            console.log(error)
            history.replace("/Home");
        });
    }

    /*if (!videos) {
        //Header();
        return <h1>Aguarda resultados</h1>;
    }

    if (!user) {
        return <Redirect to={"/Login"}/>;
    }*/

    console.log(recommendations)
    //todo: <h2>{user?.name}</h2> crasha a página
    return <div>
        <h1> Bem-vindo(a) </h1>
        <h3>Ao seu perfil</h3>
        <h2>{user?.name}</h2>

        <div>
            {
                recommendations.map(video => {
                    return <div>
                        {video.title && <h1>{video.title}</h1>}
                    </div>
                })
            }

            <input type="button" onClick={handleSubmit} value="Logout"/>

        </div>

    </div>;
}

export default Home;