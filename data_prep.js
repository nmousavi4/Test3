const fs = require('fs');
var students = [];

exports.prepare = function () {
    return new Promise(function (resolve, reject) {
        fs.readFile('./students.json', (err, data_std) => {

            if (err) {
                reject('unable to read file');
            }
            else {

                students = JSON.parse(data_std);

                resolve('Operation was successful');
            }
        });
    })
}
// exports.getCPA = function () {
//     return new Promise(function (resolve, reject) {
//         if (students.length == 0) {
//             reject('no results returned');
//         }
//         else {
//             const CPA_std = [];
//             for (let i = 0; i < students.length; i++) {
//                 if (students[i].program == "CPA") {
//                     CPA_std.push(students[i]);
//                 }
//             }
//             resolve(CPA_std);
//         }
//     });
// }
exports.highGPA = function () {
    return new Promise(function (resolve, reject) {
        if (students.length == 0) {
            reject('Failed finding the student with the highest GPA');
        }
        else {
            let max = 0;
            let max_std = null;
            for (let i = 0; i < students.length; i++) {
                if (students[i].gpa > max) {
                    max = students[i].gpa;
                    max_std = students[i];
                }
            }
            resolve(max_std);
        }
    });
}
exports.allStudents = function(){
    return new Promise(function(resolve, reject){
        if(students.length == 0){
            reject("No student results returned")
        }else{
            
            resolve(students)
            
        }
    })
}

exports.bsdStudents = function() {
    return new Promise(function(resolve, reject){
        if(students.length == 0){
            reject("No student results returned")
        }else{
            var bsdStd = [];
            for(var i = 0; i < students.length; i++){
                if(students[i].program == "BSD"){
                    bsdStd.push(students[i])
                }
            }
            if(bsdStd.length == 0){
                reject("No BSD student results returned")
            }else{
                resolve(bsdStd)
            }
        }
    })
}
