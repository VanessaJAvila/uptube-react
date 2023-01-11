
import "./FeedbackForm.scss";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";


export default function FeedbackForm() {

    return (
        <div className={"container-feedback"}>
            <Header/>
            <SideBar/>
            <div className={"container-form"}>
                <h2>Envia-nos o teu feedback </h2>
                <p>Descreve a tua questão ou sugestão</p>
                <input name="Message" type="text"
                       placeholder="Diz-nos como pudemos melhorar a tua experiência"/>
                <label htmlFor="" class="custom-checkbox">
                    <input type="checkbox"/>
                        <span>Autorizas o envio de emails com informações sobre os nossos updates?</span>
                </label>
                <button type="submit" value="Submit">Enviar</button>


            </div>
        </div>
    )
}