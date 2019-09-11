class Resa {
    constructor() {
        this.timeMin = "";
        this.timeSec = "";
        this.time = 1200;
        this.validateButton = document.getElementById("validate_button");
        this.validResa = false;
        this.nomStationElt = document.getElementById("nom");
        this.adresseElt = document.getElementById("adresse");
        this.heure = "";
        this.finResaSec = "";
        this.finResaMin = "";
        this.finResaHours = "";
        this.sectionResaElt = document.getElementById("resa");
        this.infosResaElt = document.getElementById("p_resa");
        this.infosResaElt2 = document.getElementById("p2_resa");
        this.cancelResaElt = document.getElementById("btn_cancelResa");
        this.timer = "";
        this.noneResa = document.getElementById("none_resa");
        this.titreResaElt = document.getElementById("titre");
    }
    init() {
        let evenement = this.validateButton.addEventListener("click", this.eventButtonValidate.bind(this))
        this.cancelResaElt.addEventListener("click", this.endResa.bind(this));
        window.addEventListener("load", this.loadWindow.bind(this));
    }

    //---enregistre les informations de reservation d'un velo---//
    InfosStationResa() {

        sessionStorage.setItem("adresse", this.adresseElt.textContent);
        sessionStorage.setItem("nom", this.nomStationElt.textContent);
    }
    eventButtonValidate() {
        this.time = 1200;
        this.heureFinResa();
        this.InfosStationResa();
        this.recoversInfosResa();
        this.startTimer();
    }
    //---création de l'heure de fin de resa---//
    heureFinResa() {
        /*--définition de l'heure actuelle--*/
        this.heure = new Date();
        this.finResaSec = this.heure.getSeconds();
        /*--la div qui accueille l'heure devient visible--*/
        this.sectionResaElt.style.opacity = 1;
        /*--conditions pour établir l'heure de fin de réservation--*/
        if (this.heure.getMinutes() > 39) {
            this.finResaMin = this.heure.getMinutes() - 40;
            this.finResaHours = this.heure.getHours() + 1;
            console.log(this.finResaHours);
        } else {
            this.finResaMin = this.heure.getMinutes() + 20
            this.finResaHours = this.heure.getHours();
        }
        if (this.heure.getHours() > 23 && this.heure.getMinutes() > 39) {
            this.finResaHours = this.heure.getHours() - 24;
        }
        /*--on enregistre l'heure de fin de réservation dans la session--*/
        sessionStorage.setItem("finResaMin", this.finResaMin);
        sessionStorage.setItem("finResaSec", this.finResaSec);
        sessionStorage.setItem("finResaHours", this.finResaHours);
    };
    //---on affiche les infos de fin de resa enregistrer dans la session---// 
    recoversInfosResa() {
        this.InfosStationResa();
        let dataNom = sessionStorage.getItem("nom");
        let dataAdresse = sessionStorage.getItem("adresse");
        let finResaSec = sessionStorage.getItem("finResaSec");
        let finResaMin = sessionStorage.getItem("finResaMin");
        let finResaHours = sessionStorage.getItem("finResaHours");
        this.infosResaElt.textContent = "Vous avez réservé un velo à la station " + dataNom + " : veuillez vous rendre a(u)" + dataAdresse + " avant " + finResaHours + " h " + finResaMin + " min \n";
        this.noneResa.textContent = "";
    }
    //---construction du Timer---//
    createTimer() {
        this.timeMin = Math.floor(this.time / 60);
        this.timeSec = this.time - this.timeMin * 60;
        this.time--;

        if (this.timeSec < 10) {
            this.timeSec = "0" + this.timeSec;
        }
        if (this.timeMin < 10) {
            this.timeMin = "0" + this.timeMin;
        }
        /*--on enregistre les données du timer--*/
        sessionStorage.setItem("time", this.time);
        sessionStorage.setItem("min", this.timeMin);
        sessionStorage.setItem("sec", this.timeSec);
        /*--on récupère les données du timer--*/
        let getTimeMin = sessionStorage.getItem("min");
        let getTimeSec = sessionStorage.getItem("sec");
        this.timerElt = document.getElementById("timer");
        if (this.time === 900) {
            this.validResa = false;
            this.time = 1200;
            this.endResa();
        }
        if (this.time > 0 && this.time < 1200) {
            this.validResa = true;
            sessionStorage.setItem("validResa", this.validResa)
            this.timerElt.textContent = getTimeMin + "min" + getTimeSec + "sec";
            this.infosResaElt2.style.opacity = "1";
            this.titreResaElt.textContent = "Réservation (1)";
        } else {
            this.stopTimer();
        }
    };
    endResa() {
        this.stopTimer();
        sessionStorage.clear();
        this.removeInfosResa();
        this.btnResa = document.getElementById("btn_resa");
        this.cancelResaElt = document.getElementById("btn_cancelResa")
        this.cancelResaElt.style.opacity = "0";
        this.cancelResaElt.style.right = "-20%";
        this.infosResaElt2.style.opacity = "0";
        this.titreResaElt.textContent = "Réservation (0)"
        this.noneResa.textContent = "Aucune Réservation en cours !";
    }
    //---Lance le timer---//
    startTimer() {
        this.timer = setInterval(this.createTimer.bind(this), 1000);
        this.validResa = true;
    }
    stopTimer() {
        clearInterval(this.timer);
        console.log("salut");
    }
    //--vider les infos de réservations--//
    removeInfosResa() {
        this.timerElt.textContent = "";
        this.infosResaElt.textContent = "";
    }
    //---récupére les infos de resa après rechargement de la page---//    
    loadWindow() {
        let dataNom = sessionStorage.getItem("nom");
        let dataAdresse = sessionStorage.getItem("adresse");
        let finResaSec = sessionStorage.getItem("finResaSec");
        let finResaMin = sessionStorage.getItem("finResaMin");
        let finResaHours = sessionStorage.getItem("finResaHours");
        if (this.validResa === false) {
            this.infosResaElt.textContent = "";
        }
        if (sessionStorage.getItem("validResa") === "true") {
            this.time = sessionStorage.getItem("time");
            this.cancelResaElt.style.opacity = "1";
            this.cancelResaElt.style.right = "6%";
            maResa.startTimer();
            this.noneResa.textContent = "";
            this.infosResaElt.textContent = "Vous avez réservé un velo à la station " + dataNom + " : veuillez vous rendre a(u)" + dataAdresse + " avant " + finResaHours + " h " + finResaMin + " min .";
        }
    }
}
let maResa = new Resa();
maResa.init();