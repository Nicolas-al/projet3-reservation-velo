class CanvasObjet {
  constructor( ContainerCanvas ,canvas, BtnClear, BtnValidate) { //Paramètres du canvas
    this.canvasContainer = document.getElementById(ContainerCanvas);
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = "#AD0E16";
    this.ctx.lineWidth = 10;
    this.draw = false;
    this.mousePosition = {
      x: 0,
      y: 0
    };
    this.infosStationsElt = document.getElementById("infos_marqueurs");
    this.titreElt = document.getElementById("infos_station");
    this.divNomElt = document.getElementById("div_nom");
    this.divAdresseElt = document.getElementById("div_adresse");
    this.VeloDispoElt = document.getElementById("velos_dispo");
    this.placesDispoElt = document.getElementById("places_dispo");
    this.divVeloPlacesElt = document.createElement("div");
    this.nbVelosElt = document.getElementById("nombre_velos");
    this.nbPlacesElt = document.getElementById("nombre_places");
    this.clearButton = document.getElementById(BtnClear);
    this.validateButton = document.getElementById(BtnValidate);
    this.canvas.width = 200;
    this.canvas.height = 110;
    this.btnResa = document.getElementById("btn_resa");
  
  }
  init() { 
    this.btnResa.addEventListener("click", this.displayCanvas.bind(this));
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
    window.addEventListener("mouseup", this.mouseUp.bind(this));
    this.clearButton.addEventListener("click", this.clearCanvas.bind(this));
    this.validateButton.addEventListener("click", this.removeCanvas.bind(this));
  }
  // affichage de la section canvas 
  displayCanvas() {
       this.canvasContainer.style.opacity = "1";
       this.canvasContainer.style.marginTop = "-9px";
       this.titreElt.style.marginTop = "5px";
       this.divNomElt.style.marginTop = "-5px";
       this.divAdresseElt.style.marginTop = "5px";
       this.placesDispoElt.style.marginTop = "10px";
       this.VeloDispoElt.style.margin = "10px 40px 0px 95px"
       let titreInfosResaElt = document.getElementById("titre_resa");
       this.divVeloPlacesElt.style.display = "flex";
       this.nbVelosElt.style.color = "#372F23";
       this.nbVelosElt.style.marginLeft = "5px";
       this.nbPlacesElt.style.color = "#372F23";
       this.nbPlacesElt.style.marginLeft = "5px";


       this.infosStationsElt.removeChild(this.VeloDispoElt);
       this.infosStationsElt.removeChild(this.placesDispoElt);
       this.infosStationsElt.removeChild(this.btnResa);
       this.divVeloPlacesElt.appendChild(this.VeloDispoElt);
       this.divVeloPlacesElt.appendChild(this.placesDispoElt);
       this.canvasContainer.insertBefore(this.divVeloPlacesElt, titreInfosResaElt);
  }

  //---pression sur la souris dans le canvas---//
  mouseDown() {
    this.draw = true;
    this.mousePosition = this.getMousePos(event);
    this.ctx.beginPath();
    this.ctx.moveTo(this.mousePosition.x, this.mousePosition.y);
    if (this.mousePosition != 0) {
      this.validateButton.removeAttribute("disabled");
     
      console.log(this.validSign);
      console.log(this.mousePosition);
    }
  }
  //---deplacement de la souris dans le canvas---//
  mouseMove() {
    if (this.draw === true) {
    this.mousePosition = this.getMousePos(event);
    //let x = this.mousePosition.x;
    //let y = this.mousePosition.y;
    this.dessiner(this.mousePosition.x, this.mousePosition.y);

  }
}
//---relachement de la souris dans le canvas---//
  mouseUp() {   
    this.draw = false;
  }

//---Dessiner---//
  dessiner(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
//---Renvoie les coordonnées de la souris---// 
  getMousePos(event) {
      let oRect = this.canvas.getBoundingClientRect();
      console.log(oRect);
      return {
        x: event.clientX - oRect.left,
        y: event.clientY - oRect.top
      };
      
  }  
//---fonction de netoyage du canvas---//
  clearCanvas() {
    this.ctx.clearRect(0, 0, 300, 250);
    this.validateButton.setAttribute("disabled", "disabled");
  }
  //---suppression du canvas---//
  removeCanvas(){
        this.clearCanvas();
        let btnCancelResa = document.getElementById("btn_cancelResa");
        this.canvasContainer.style.opacity = "0";
        this.canvasContainer.style.marginTop = "-350px";
        this.divVeloPlacesElt.remove(this.VeloDispoElt);
        this.divVeloPlacesElt.remove(this.placesDispoElt);
        this.infosStationsElt.insertBefore(this.VeloDispoElt, this.canvasContainer);
        this.infosStationsElt.insertBefore(this.placesDispoElt, this.canvasContainer);
        this.infosStationsElt.insertBefore(this.btnResa, this.canvasContainer);
        this.infosStationsElt.insertBefore(btnCancelResa, this.canvasContainer)
        this.VeloDispoElt.style.margin = "30px 0px 0px 0px";
        this.placesDispoElt.style.marginTop = "30px";
        this.titreElt.style.marginTop = "25px";
        this.divNomElt.style.marginTop = "30px";
        this.divAdresseElt.style.marginTop = "30px";
        btnCancelResa.style.opacity = "1";
        btnCancelResa.style.right = "10%"
        this.btnResa.style.opacity = "0";
        this.nbVelosElt.style.color = "wheat";
        this.nbVelosElt.style.marginLeft = "20px"
        this.nbVelosElt.textContent = "";
        this.nbPlacesElt.style.color = "wheat";
        this.nbPlacesElt.style.marginLeft = "20px"
        this.nbPlacesElt.textContent = "";
  }
}

const canvas = new CanvasObjet("canvas_container", "canvas", "clear_button", "validate_button");
canvas.init();