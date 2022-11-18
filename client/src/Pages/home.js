import {useEffect, useState} from "react";
import axios from "axios";

function Home() {
    const[videos,setVideos]=useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/video')
            .then(response => {setVideos(response.data);});
    }, []);


    if (!videos) {
        return <h1>Aguarda resultados</h1>;
    }


    return <div>
        <h1> Bem-vindo(a) </h1>
        <h3>Ao seu perfil</h3>
        <h2>As minhas reservas</h2>
        <div>
            {
                videos.map(video=>{
                 return   <div>
                        {video.title && <h1>{video.title}</h1>}
                    </div>
                })
            }

        </div>


    </div>;
}

export default Home;