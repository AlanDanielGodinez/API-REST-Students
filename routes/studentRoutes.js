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
        res.status(500).json({ Error: `Unexprected error ${error}`});        
    }
});

//EndPoint mejores promedios
router.get('/best', (req, res) => {
    try {
        const best = Utilities.getBestStudents();
        if(best === null){
            res.status(200).json({ Message: 'Sorry but there are not excellent students'});
        } else {
            res.status(200).json(best);
        }
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error ${error}`});
    }
});

//EndPoint reprobados
router.get('/faileds', (req, res) => {
    try {
        const faileds = Utilities.getFailedStudents();
        if(faileds === null){
            res.status(200).json({ Message: 'Congratulations! There are not failed students'});
        } else {
            res.status(200).json(faileds);
        }
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error ${error}`});
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
        res.status(500).json({ Error: `Unexprected error ${error}`});
    }
});

//EndPoint obtener el promedio de un alumno por su NC.
router.get('/avg/:nc', (req, res) =>{
    try {
        const {nc} = req.params;
        const avgScore = Utilities.getStudentAvg(nc);
        if(avgScore === null){
            res.status(404).json({ Message: 'Not found. Impossible to get an average score'});
        } else {
            res.status(200).json({ Message: `Student with NC ${nc} his or her average score is ${avgScore}`});
        }
    } catch (error) {
        res.status(500).json({ Error: `Unexpected error ${error}`});
    }
});

//EndPoint crear alumno
router.post('/', (req, res) => {
    try {
        const {nc, nombres, ap_Paterno, ap_Materno, calificaciones} = req.body;
        const newStudent = Utilities.createStudent(nc,nombres, ap_Paterno, ap_Materno, calificaciones);
        if (newStudent === null){
            res.status(200).json({ Message: "Already enroll" });
        } else {
            res.status(201).json(newStudent);
        }
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error ${error}`});
    }
});


//EndPoint actualizar alumno
router.put('/:nc', (req, res) => {
    try {
        const {nc} = req.params;
        const {ap_Paterno, ap_Materno, nombres, calificaciones} = req.body;
        const updatedStudent = Utilities.updateStudent(nc, ap_Paterno, ap_Materno, nombres, calificaciones);
        if(updatedStudent === null){
            res.status(404).json({ Message: "Not found. Impossible to update"});
        } else{
            res.status(202).json(updatedStudent);
        }
    } catch (error) {
        res.status(500).json({ Error: `Unexprected error ${error}`});
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
        res.status(500).json({ Error: `Unexprected error ${error}`});
    }
});

//exporta la constante router y todo su contenido
module.exports = router;