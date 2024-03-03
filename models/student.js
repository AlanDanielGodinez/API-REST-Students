const Score = require("./score");//importación de la clase score (calificación)
module.exports = class Student {
    constructor(nc, ap_Paterno,ap_Materno, nombres, promedio=new Score(sc1, sc2, sc3, sc4)){
        this.nc = nc;
        this.ap_Paterno = ap_Paterno;
        this.ap_Materno = ap_Materno;
        this.nombres = nombres;
        this.promedio = promedio;//Aquí recibe una instancia de la clase Score
    }
}