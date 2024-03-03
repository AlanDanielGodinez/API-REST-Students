const Student = require("../models/student");//importación de la clase student
const Score = require("../models/score");//importación de la clase score
const student = [
    new Student('204001243', 'Robles', 'Mondragon', 'Luis',//instansiación de la clase student 
                new Score(70,60,87,95)),//instansiación de la clase score
    new Student('204001255', 'Arjona', 'Robles', 'Daniel', 
                new Score(67,71,78,0))
];

function createStudent(nc,nombres, ap_Paterno, ap_Materno, promedio) {
    const found = student.find(element => element.nc === nc);
    if(found !== undefined) return null;
    const newStudent = new Student(nc, nombres,ap_Paterno, ap_Materno, promedio);
    student.push(newStudent);
    return newStudent;
};

function updateStudent(nc, ap_Paterno, ap_Materno, nombres, promedio) {
    const index = student.findIndex(element => element.nc === nc);
    if (index === -1) return null;//devuelve un nulo si no encuentra el índice
    student.at(index).nc = nc;
    student.at(index).ap_Paterno = ap_Paterno;
    student.at(index).ap_Materno = ap_Materno;
    student.at(index).nombres = nombres;
    student.at(index).promedio = promedio;
    return student.at(index);
}

function deleteStudent(nc) {
    const index = student.findIndex(element => element.nc === nc);
    if (index === -1) return null;//devuelve un nulo si no encuentra el índice
    student.splice(index, 1);
    return `Target acquired: Student with nc ${nc} has deserted`;
}

function getAllStudents() {
    return student;
}

function getStudentByNC(nc) {
    return student.find(element => element.nc === nc);
}

function getStudentAvg(nc){
    var avg = 0;//promedio
    const index = student.findIndex(element => element.nc === nc);
    if(index === -1) return null;//devuelve un nulo si no encuentra el índice
    avg += student.at(index).promedio.cal1;
    avg += student.at(index).promedio.cal2;
    avg += student.at(index).promedio.cal3;
    avg += student.at(index).promedio.cal4;
    return avg/4;
}

function getFailedStudents(){
    let Fails = [];//arreglo de estudiantes reprobados
    let avg = 0;
    student.forEach(function (element){
        avg = getStudentAvg(element.nc);
        if(avg < 70){
            Fails.push(new Student(element.nc, element.ap_Paterno, element.ap_Materno, element.nombres, avg));
        }
    });
    if(Fails.length > 0) return Fails;//devuelve el arreglo si su longitud es mayor a 0
    return null;//devuelve nulo si la longitud del arreglo es 0
}

function getBestStudents(){
    let Best = [];//arreglo de estudiantes sobresalientes
    let avgGroup = 0;//Promedio del grupo
    let avg = 0;//promedio de un estudiante
    student.forEach(function (element){
        avgGroup += getStudentAvg(element.nc);
    });
    avgGroup = avgGroup/student.length;//calcula el promedio del grupo
    student.forEach(function (element){
        avg = getStudentAvg(element.nc);
        if(avg > avgGroup){
            Best.push(new Student(element.nc, element.ap_Paterno, element.ap_Materno, element.nombres, avg));
        }
    });
    if(Best.length > 0) return Best;//devuelve el arreglo si su longitud es mayor a 0
    return null;//devuelve nulo si la longitud del arreglo es 0
}

module.exports = {
    createStudent,
    updateStudent,
    deleteStudent,
    getAllStudents,
    getStudentByNC,
    getStudentAvg,
    getFailedStudents,
    getBestStudents
};
