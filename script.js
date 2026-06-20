const form=document.getElementById("studentForm");
form.addEventListener("submit",function(e){
e.preventDefault();
let data=new FormData();
data.append("name",document.getElementById("name").value);
data.append("roll",document.getElementById("roll").value);
data.append("dept",document.getElementById("dept").value);
data.append("year",document.getElementById("year").value);
fetch("add_student.php",{method:"POST",body:data})
.then(response=>response.text())
.then(result=>{
alert(result);
loadStudents();
form.reset();
});
});
function loadStudents(){
fetch("fetch_students.php")
.then(response=>response.json())
.then(data=>{
let output="";
data.forEach(student=>{
output+=`
<tr>
<td>${student.student_id}</td>
<td>${student.student_name}</td>
<td>${student.roll_no}</td>
<td>${student.department}</td>
<td>${student.year}</td>
<td>
<button class="delete" onclick="deleteStudent(${student.student_id})">Delete</button>
</td>
</tr>`;
});
document.getElementById("studentList").innerHTML=output;
});
}
function deleteStudent(id){
let data=new FormData();
data.append("id",id);
fetch("delete_student.php",{method:"POST",body:data})
.then(response=>response.text())
.then(result=>{
alert(result);
loadStudents();
});
}
loadStudents();
