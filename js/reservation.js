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
        this.infosResaElt = document.getElementById("infos_resa");
        this.timer = "";
    }
    init() {
        this.valideResa();
        console.log(canvas.validSign) 
        let evenement = this.validateButton.addEventListener("click", this.eventButtonValidate.bind(this))
        window.addEventListener("load", this.loadWindow.bind(this));

        
    }
    valideResa(){ 
        console.log(canvas.mousePosition)
        if (canvas.validSign === true){
            //alert("vous de devez signez dans le cadre réservé");
            console.log("salut");  
        }
      
        else {
        }
    }
    // enregistre les informations de reservation d'un velo
    InfosStationResa() {
        sessionStorage.setItem("adresse", this.adresseElt.textContent);
        sessionStorage.setItem("nom", this.nomStationElt.textContent);
        if (sessionStorage.length != 0) {
        }
    }
    eventButtonValidate() {
        this.time = 1200;
        this.InfosStationResa();
        this.heureFinResa();
        this.recoversInfosResa();
        this.startTimer();
        //this.validateButton.setAttribute("disabled", "disabled");
    }
    // création de l'heure de fin de resa
    heureFinResa() {
        //définition de l'heure actuelle
        this.heure = new Date();
        this.finResaSec = this.heure.getSeconds();
        //la div qui accueille l'heure devient visible
        this.sectionResaElt.style.opacity = 1;
        //conditions pour établir l'heure de fin de réservation
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
        // on enregistre l'heure de fin de réservation dans la session
        sessionStorage.setItem("finResaMin", this.finResaMin);
        sessionStorage.setItem("finResaSec", this.finResaSec);
        sessionStorage.setItem("finResaHours", this.finResaHours);
    };
    //on affiche les infos de fin de resa enregistrer dans la session 
    recoversInfosResa() {
        let dataNom = sessionStorage.getItem("nom");
        let dataAdresse = sessionStorage.getItem("adresse");
        let finResaSec = sessionStorage.getItem("finResaSec");
        let finResaMin = sessionStorage.getItem("finResaMin");
        let finResaHours = sessionStorage.getItem("finResaHours");
        this.infosResaElt.textContent = "vous avez réservé un velo à la station " + dataNom + " : veuillez vous rendre a(u)" + dataAdresse + " avant " + finResaHours + " h " + finResaMin + " min " + finResaSec + " s !! " + "il sera réservé pendant les 20 prochaines minutes..";
    }
    // construction du Timer
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
        sessionStorage.setItem("time", this.time);
        sessionStorage.setItem("min", this.timeMin);
        sessionStorage.setItem("sec", this.timeSec);

        let getTimeMin = sessionStorage.getItem("min");
        let getTimeSec = sessionStorage.getItem("sec");
        this.timerElt = document.getElementById("timer");

        if (this.time === 1190) {
            this.validResa = false;
            this.stopTimer();
            sessionStorage.clear();
            this.time = 1200;
            this.timerElt.textContent = "";
            this.infosResaElt.textContent = "";
        }
        if (this.time > 0 && this.time < 1200) {
            this.timerElt.textContent = getTimeMin + "min" + getTimeSec + "sec";
            this.recoversInfosResa();
        } else {
            this.stopTimer();
        }
    };
    // Lance le timer
    startTimer() {
        this.timer = setInterval(this.createTimer.bind(this), 1000);
    }
    stopTimer() {
        clearInterval(this.timer);
    }
    loadWindow() {
        if (sessionStorage != 0) {
            this.time = sessionStorage.getItem("time");
            maResa.startTimer();
            //maResa.recoversInfosResa();
                }
    }

}


let maResa = new Resa();
maResa.init();