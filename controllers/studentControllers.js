const Student = require("../models/student");
const student = [
    new Student('204001243', 'Robles', 'Mondragon', 'Luis'),
    new Student('204001255', 'Arjona', 'Robles', 'Daniel')
];


function createStudent(nc,nombres, ap_Paterno, ap_Materno, promedio) {
    const found = student.find(element => element.nc === nc);
    if(found !== undefined) return null;
    const newStudent = new Student(nc, nombres,ap_Paterno, ap_Materno, promedio);
    student.push(newStudent);
    return newStudent;
};

function updateStudent(nc, ap_Paterno, ap_Materno, nombres) {
    const index = student.findIndex(element => element.nc === nc);
    if (index === -1) return null;
    student.at(index).nc = nc;
    student.at(index).ap_Paterno = ap_Paterno;
    student.at(index).ap_Materno = ap_Materno;
    student.at(index).nombres = nombres;
    return student.at(index);
}

function deleteStudent(nc) {
    const index = student.findIndex(element => element.nc === nc);
    if (index === -1) return null;
    student.splice(index, 1);
    return `Target acquired: Student with nc ${nc} has deserted`;
}

function getAllStudents() {
    return student;
}

function getStudentByNC(nc) {
    return student.find(element => element.nc === nc);
}

module.exports = {
    createStudent,
    updateStudent,
    deleteStudent,
    getAllStudents,
    getStudentByNC
};
