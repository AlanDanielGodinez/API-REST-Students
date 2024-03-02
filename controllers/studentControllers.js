const Student = require("../models/student");
const student = [
    { nc: "204001243", name: 'Luis', ap_Paterno: 'Robles', ap_materno:"Mondragon" },
    { nc: "204001255", name: 'Daniel', ap_Paterno: 'Robles', ap_materno: "Arjona" }
];


function createStudent(nc,nombres, ap_Paterno, ap_materno,promedio ) {
    const newStudent = new Student(nc, nombres,ap_Paterno, ap_materno, promedio);
    student.push(newStudent);
    return newStudent;
};

function updateStudent(nc, ap_Paterno, ap_materno, nombres) {
    const index = student.findIndex(student => student.nc === nc);
    if (index === -1) return null;
    const updatedStudent = { nc, ap_Paterno, ap_materno, nombres };
    studentList[index] = updatedStudent;
    return updatedStudent;
}

function deleteStudent(nc) {
    return student.filter(student => student.nc !== nc);
}

function getAllStudents() {
    return student;
}

function getStudentByNC(nc) {
    return student.find(student => student.nc === nc);
}

module.exports = {
    createStudent,
    updateStudent,
    deleteStudent,
    getAllStudents,
    getStudentByNC
};
