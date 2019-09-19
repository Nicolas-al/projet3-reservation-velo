class Resa {
    constructor() {
        this.timeMin = "";
        this.timeSec = "";
        this.time = 1200;
        this.validateButton = document.getElementById("validate_button");
        this.validResa = false;
        this.heure = "";
        this.finResaSec = "";
        this.finResaMin = "";
        this.finResaHours = "";
        this.infosResaElt = document.getElementById("p_resa");
        this.infosResaElt2 = document.getElementById("p2_resa");
        this.cancelResaElt = document.getElementById("btn_cancel_resa");
        this.timer = "";
        this.noneResa = document.getElementById("none_resa");
    }
    init() {
        let evenement = this.validateButton.addEventListener("click", this.eventButtonValidate.bind(this))
        this.cancelResaElt.addEventListener("click", this.endResa.bind(this));
        window.addEventListener("load", this.loadWindow.bind(this));
    }

    //---enregistre les informations de reservation d'un velo---//
    saveInfosStationResa() {
        const adresseElt = document.getElementById("adresse");
        const nomStationElt = document.getElementById("nom");
        sessionStorage.setItem("adresse", adresseElt.textContent);
        sessionStorage.setItem("nom", nomStationElt.textContent);
    }
    eventButtonValidate() {
        this.time = 1200;
        this.createHeureFinResa();
        this.saveInfosStationResa();
        this.recoversInfosResa();
        this.startTimer();
    }
    //---création de l'heure de fin de resa---//
    createHeureFinResa() {
        /*--définition de l'heure actuelle--*/
        this.heure = new Date();
        this.finResaSec = this.heure.getSeconds();
        /*--la div qui accueille l'heure de fin de resa devient visible--*/
        const sectionResaElt = document.getElementById("resa");
        sectionResaElt.style.opacity = 1;
        /*--conditions pour établir l'heure de fin de réservation--*/
        this.calculateEndTime();        
        /*--on enregistre l'heure de fin de réservation dans la session--*/
        sessionStorage.setItem("finResaMin", this.finResaMin);
        sessionStorage.setItem("finResaSec", this.finResaSec);
        sessionStorage.setItem("finResaHours", this.finResaHours);
    };
    calculateEndTime(){
        if (this.heure.getMinutes() > 39) {
            this.finResaMin = this.heure.getMinutes() - 40;
            this.finResaHours = this.heure.getHours() + 1;
        } else {
            this.finResaMin = this.heure.getMinutes() + 20
            this.finResaHours = this.heure.getHours();
        }
        if (this.heure.getHours() > 23 && this.heure.getMinutes() > 39) {
            this.finResaHours = this.heure.getHours() - 24;
        }
    }
    //---on affiche les infos de fin de resa enregistrer dans la session---// 
    recoversInfosResa() {
        this.saveInfosStationResa();
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
        this.saveDataTimer()
        this.recoversInfosTimer();
    }
    saveDataTimer(){ 
        /*--on enregistre les données du timer--*/
        sessionStorage.setItem("time", this.time);
        sessionStorage.setItem("min", this.timeMin);
        sessionStorage.setItem("sec", this.timeSec);
    }
    recoversInfosTimer(){ 
        /*--on récupère les données du timer--*/
        let getTimeMin = sessionStorage.getItem("min");
        let getTimeSec = sessionStorage.getItem("sec");
        this.timerElt = document.getElementById("timer");
        if (this.time === 0) {
            this.validResa = false;
            this.time = 1200;
            this.endResa();
        }
        if (this.time > 0 && this.time < 1200) {
            this.validResa = true;
            sessionStorage.setItem("validResa", this.validResa)
            this.timerElt.textContent = getTimeMin + " min " + getTimeSec + " sec";
            this.infosResaElt2.style.opacity = "1";
            this.cancelResaElt.style.opacity = "1";
            this.cancelResaElt.style.right = "6%";
        } else {
            this.stopTimer();
        }
    };
    endResa() {
        this.stopTimer();
        sessionStorage.clear();
        this.removeInfosResa();
        this.btnResa = document.getElementById("btn_resa");
        sessionStorage.removeItem("canvasContainer");
        this.cancelResaElt.style.opacity = "0";
        this.cancelResaElt.style.right = "-20%";
        this.infosResaElt2.style.opacity = "0";
        this.noneResa.textContent = "Aucune Réservation en cours !";
    }

    startTimer() {
        this.timer = setInterval(this.createTimer.bind(this), 1000);
        this.validResa = true;
    }
    stopTimer() {
        clearInterval(this.timer);
    }
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
        sessionStorage.removeItem("canvasContainer");

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