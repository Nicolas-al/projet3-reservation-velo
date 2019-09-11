class Signature {
  constructor(ContainerCanvas, canvas, BtnClear, BtnValidate) { //Paramètres du canvas
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
    this.nameElt = document.getElementById("name");
    this.firstNameElt = document.getElementById("firstName");
    this.clearButton = document.getElementById(BtnClear);
    this.validateButton = document.getElementById(BtnValidate);
    this.canvas.width = 210;
    this.canvas.height = 125;
    this.btnResa = document.getElementById("btn_resa");
  }
  init() {
    this.btnResa.addEventListener("click", this.displayCanvas.bind(this));
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
    window.addEventListener("mouseup", this.mouseUp.bind(this));
    this.clearButton.addEventListener("click", this.clearCanvas.bind(this));
    this.validateButton.addEventListener("click", this.removeCanvas.bind(this));
    this.validateButton.addEventListener("click", this.saveNameFirstName.bind(this));
  }
  //---affichage de la section canvas---// 
  displayCanvas() {
    this.canvasContainer.removeAttribute("id");
    this.canvasContainer.classList.add("canvasContainer");
    this.infosStationsElt.removeAttribute("id");
    this.infosStationsElt.classList.add("infosMarqueurs");
    let titreInfosResaElt = document.getElementById("titre_resa");
    this.divVeloPlacesElt.classList.add("VelosPlacesDispo");
    this.infosStationsElt.removeChild(this.VeloDispoElt);
    this.infosStationsElt.removeChild(this.placesDispoElt);
    this.infosStationsElt.removeChild(this.btnResa);
    this.btnResa.style.opacity = "0";
    this.divVeloPlacesElt.appendChild(this.VeloDispoElt);
    this.divVeloPlacesElt.appendChild(this.placesDispoElt);
    this.canvasContainer.insertBefore(this.divVeloPlacesElt, titreInfosResaElt);
  }

  //---pression sur la souris dans le canvas---//
  mouseDown() {
    if (this.nameElt.value != "" && this.firstNameElt.value != "") {
      this.draw = true;
      this.mousePosition = this.getMousePos(event);
      this.ctx.beginPath();
      this.ctx.moveTo(this.mousePosition.x, this.mousePosition.y);
      this.validateButton.removeAttribute("disabled");
    } else {
      this.draw = false;
      /*--On ajoute une information dans le Dom quand l'utilisateur clique 
      dans le canvas si jamais les inputs de nom et Prénom sont vides--*/
      let conditionSign = document.createElement("p");
      conditionSign.textContent = "veuillez remplir les champs de Nom et Prénom";
      conditionSign.setAttribute("id", "cdt_sign");
      this.canvasContainer.appendChild(conditionSign);
      setTimeout(function () {
        canvas.canvasContainer.removeChild(conditionSign);
      }, 4000)
    }
  }
  //---deplacement de la souris dans le canvas---//
  mouseMove() {
    if (this.draw === true) {
      this.mousePosition = this.getMousePos(event);
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
  removeCanvas() {
    this.clearCanvas();
    let btnCancelResa = document.getElementById("btn_cancelResa");
    btnCancelResa.style.opacity = "1";
    btnCancelResa.style.right = "6%";
    this.infosStationsElt.setAttribute("id", "infos_marqueurs");
    this.infosStationsElt.classList.remove("infosMarqueurs");
    this.validateButton.setAttribute("disabled", "disabled");
    this.canvasContainer.setAttribute("id", "canvas_container");
    this.canvasContainer.classList.remove("canvasContainer");
    this.divVeloPlacesElt.classList.remove("VelosPlacesDispo");
    this.divVeloPlacesElt.remove(this.VeloDispoElt);
    this.divVeloPlacesElt.remove(this.placesDispoElt);
    this.infosStationsElt.insertBefore(this.VeloDispoElt, this.canvasContainer);
    this.infosStationsElt.insertBefore(this.placesDispoElt, this.canvasContainer);
    this.infosStationsElt.insertBefore(this.btnResa, this.canvasContainer);
    this.infosStationsElt.insertBefore(btnCancelResa, this.canvasContainer)
    this.btnResa.style.opacity = "0";
    this.nbVelosElt.textContent = "";
    this.nbPlacesElt.textContent = "";
  }
  saveNameFirstName() {
    localStorage.setItem("name", this.nameElt.value);
    localStorage.setItem("firstName", this.firstNameElt.value);
    this.nameElt.value = "";
    this.firstNameElt.value = "";
  }
}

const canvas = new Signature("canvas_container", "canvas", "clear_button", "validate_button");
canvas.init();