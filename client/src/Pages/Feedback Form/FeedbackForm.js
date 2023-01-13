import { faXmark} from "@fortawesome/free-solid-svg-icons";
import "./FeedbackForm.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import React, {useState} from "react";


export default function FeedbackForm() {


    const [close, setClose] = useState(true);
    const [form, setForm] = useState(false);

    const toggleForm = () => {
        setForm(!form)
    }


    return (
        !form && <div className={"container-feedback"}>
            {close &&  <div className={"container-form"}>
                <FontAwesomeIcon className={"close-icon"} icon={faXmark} onClick={toggleForm}/>
                <h2>Envia-nos o teu feedback </h2>
                <p>Descreve a tua questão ou sugestão</p>
                <input name="Message" type="text"
                       placeholder="Diz-nos como pudemos melhorar a tua experiência"/>
                <label htmlFor="" class="custom-checkbox">
                    <input className={"radio"} type="checkbox"/>
                        <span>Autorizas o envio de emails com informações sobre os nossos updates?</span>
                </label>
                 <div className={"send"} onClick={toggleForm}>Enviar</div>


            </div>}
        </div>
    )
}