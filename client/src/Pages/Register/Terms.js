import "./Terms.scss";

export default function Terms({closeTerms}) {

    return (<div className={"popup"}>
        <div className={"popup-inner"}>
            <h2>Termos de uso do UpTube</h2>
            <h3>1. Acordo com os Termos</h3>
            <p>Ao visualizar ou usar este site, que pode ser acessado em www.uptube.com ou por meio de nosso aplicativo
                móvel UpTube, você concorda em cumprir todos os termos de uso deste site e concorda com todas as leis
                locais aplicáveis. Se você discordar de qualquer um destes termos, você está proibido de acessar este
                site ou usar o serviço. Todos os materiais deste site são protegidos pela lei de marcas registradas e
                direitos autorais.
                Para fins destes Termos de Uso, os termos “empresa”, “nós” e “nosso” referem-se à Empresa.</p>
            <h3>2.Política de privacidade</h3>
            <p>Aconselhamos que você leia nossa política de privacidade sobre nossa coleta de dados do usuário. Isso
                ajudará você a entender melhor nossas práticas.</p>
            <h3>3. Licença de Uso</h3>
            <p>A permissão é concedida para baixar temporariamente uma cópia dos materiais em nosso site apenas para
                visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma
                transferência de título, e sob esta licença você não pode:
                modificar ou copiar os materiais; usar os materiais para qualquer finalidade comercial ou exibição
                pública; tentar fazer engenharia reversa de qualquer software contido em nosso site; remover quaisquer
                direitos autorais ou outras notações de propriedade dos materiais; ou transferir os materiais para outra
                pessoa ou "espelhar" os materiais em qualquer outro servidor.
                Isso permitirá que a Empresa rescinda em caso de violação de qualquer uma dessas restrições. Após a
                rescisão, seu direito de visualização também será rescindido e você deve destruir todos os materiais
                baixados em sua posse, seja em formato eletrônico ou impresso.</p>
            <h3>4. Isenção de responsabilidade</h3>
            <p>Todos os materiais em nosso site são fornecidos "como estão". Você concorda que o uso do site será por
                sua conta e risco. Não oferecemos garantias, expressas ou implícitas, portanto, negamos todas as outras
                garantias. Além disso, a Empresa não faz nenhuma representação relativa à precisão ou confiabilidade do
                uso dos materiais em seu site ou de outra forma relacionada a tais materiais ou sites vinculados a este
                site.</p>
            <h3> 5. Limitações</h3>
            <p>Empresa ou seus fornecedores não serão responsabilizados por quaisquer danos que possam surgir com o uso
                ou incapacidade de usar os materiais em nosso Site, mesmo que nós ou um representante autorizado deste
                Site tenha sido notificado, oralmente ou por escrito, da possibilidade de tais danos. Algumas
                jurisdições não permitem limitações de garantias implícitas ou limitações de responsabilidade por danos
                incidentais; essas limitações podem não se aplicar a você.</p>
            <h3>6. Correções</h3>
            <p>Pode haver informações ou materiais aparecendo em nosso site que contenham erros técnicos, tipográficos
                ou fotográficos. Não prometemos que nenhum dos materiais deste site seja preciso, completo ou atual.
                Reservamo-nos o direito de alterar e atualizar os materiais contidos em seu site a qualquer momento sem
                aviso prévio.</p>
            <h3>7. Links</h3>
                <p>A UpTube não tem controle sobre todos os links fornecidos neste site e não é responsável pelo
                    conteúdo de nenhum desses sites vinculados. A presença de qualquer link não implica endosso do site
                    por UpTube. O uso de qualquer site vinculado é por sua conta e risco.</p>
                <h3>8. Modificação dos Termos de Uso</h3>
                <p>A Empresa pode revisar ou incluir termos suplementares nestes Termos de Uso em seu site de tempos em
                    tempos, sem aviso prévio. Certifique-se de verificar os Termos de Uso atuais sempre que usar o Site.
                    Ao usar este site, você concorda em ficar vinculado à versão atual destes Termos de Uso.</p>
                <h3>9. Lei aplicável</h3>
                <p>Qualquer reclamação relacionada ao nosso site será regida pelas leis de Portugal, independentemente
                    de conflitos de provisões legais.</p>
                <h3>10. Contato</h3>
                <p>Em caso de dúvidas ou solicitações, entre em contato conosco:</p>
                <h4>UpTube</h4>
                <p>uptubeproject@gmail.com</p>
            <button className={"terms"} onClick={closeTerms}>Aceito</button>
        </div>
    </div>)

}