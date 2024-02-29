const express = require("express");
const router = express.Router();//Métodos http
//importación de los métodos en controladores
const Utilities = require("../controllers");

//------ EndPoints http://localhost:5050/student/ ----------

//EndPoint listado de alumnos
router.get('/', (req, res) => {
    try {
        res.status(200).json(Utilities.listar());
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error: ${error}`});        
    }
});

//EndPoint mejores promedios
router.get('/superior', (req, res) => {
    try {
        res.status(200).json(Utilities.bestProm());
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error: ${error}`});
    }
});

//EndPoint reprobados
router.get('/fails', (req, res) => {
    try {
        res.status(200).json(Utilities.fails());
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error: ${error}`});
    }
});

//EndPoint obtener alumno específico
router.get('/:nc', (req, res) => {
    try {
        const nc = req.params;
        res.status(200).json(Utilities.alumno());
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error: ${error}`});
    }
});

//EndPoint crear alumno
router.post('/', (req, res) => {
    try {
        const {nc, ap_Paterno, ap_Materno, nombres, promedio} = req.body;
        res.status(201).json(Utilities.create(nc,ap_Paterno,ap_Materno,nombres,promedio));
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error: ${error}`});
    }
});


//EndPoint actualizar alumno
router.put('/:nc', (req, res) => {
    try {
        const nc = req.params;
        res.status(202).json(Utilities.update());
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error: ${error}`});
    }
});

//EndPoint eliminar alumno
router.delete('/:nc', (req, res) => {
    try {
        const nc = req.params;
        res.status(202).json(Utilities.delete());
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error: ${error}`});
    }
});

//exporta la constante router y todo su contenido
module.exports = router;