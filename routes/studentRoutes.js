const express = require("express");
const router = express.Router();//Métodos http
//importación de los métodos en controladores
const Utilities = require("../controllers/studentControllers");

//------ EndPoints http://localhost:5050/student/ ----------

//EndPoint listado de alumnos
router.get('/', (req, res) => {
    try {
        res.status(200).json(Utilities.getAllStudents());
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
        const {nc} = req.params;
        const student = Utilities.getStudentByNC(nc);
        if(student === undefined){
            res.status(404).json({ Message: "Not found. Maybe he has deserted"});
        } else {
            res.status(200).json(Utilities.getStudentByNC(nc));
        }
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error: ${error}`});
    }
});

//EndPoint crear alumno
router.post('/', (req, res) => {
    try {
        const {nc, nombres, ap_Paterno, ap_Materno, promedio} = req.body;
        const newStudent = Utilities.createStudent(nc,nombres, ap_Paterno, ap_Materno, promedio);
        if (newStudent === null){
            res.status(200).json({ Message: "Already enroll" });
        } else {
            res.status(201).json(newStudent);
        }
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error: ${error}`});
    }
});


//EndPoint actualizar alumno
router.put('/:nc', (req, res) => {
    try {
        const {nc} = req.params;
        const {ap_Paterno, ap_Materno, nombres} = req.body;
        const updatedStudent = Utilities.updateStudent(nc, ap_Paterno, ap_Materno, nombres);
        if(updatedStudent === null){
            res.status(404).json({ Message: "Not found. Impossible to update"});
        } else{
            res.status(202).json(updatedStudent);
        }
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error: ${error}`});
    }
});

//EndPoint eliminar alumno
router.delete('/:nc', (req, res) => {
    try {
        const {nc} = req.params;
        const deletedStudent = Utilities.deleteStudent(nc);
        if(deletedStudent === null){
            res.status(404).json({ Message: "Not found. Impossible to acquired target"});
        } else {
            res.status(202).json(deletedStudent);
        }
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error: ${error}`});
    }
});

//exporta la constante router y todo su contenido
module.exports = router;