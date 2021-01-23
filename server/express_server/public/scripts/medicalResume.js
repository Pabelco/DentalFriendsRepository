let resume = {}

$("#searchMedicalResume").submit(async function (e) {
    e.preventDefault();
    let resume = await postFetch("/user/medicalResume",{
        filterMedicalResume: $('#filterMedicalResume').val(),
    }).then((res) => {
        return res
    }).catch(function() {
        alert("Error contacte con administrador");
    });
    console.log(resume)
    let htmlSelect = `<tr> <th>Id</th> <th>Fecha</th> <th>Paciente</th> <th>Detalles</th></tr>`
    resume.forEach(element => {
        htmlSelect += `<tr><td>${element.id}</td><td>${element.date}</td><td>${element.nombrePaciente}</td><td><button type="button" id=${element.id} class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Detalles</button></td></tr>`
    })
    $('#medicalResumeTable').html(htmlSelect);
});

function prueba(){
    //$("#medicalResumeTable").load( "ajax/test.html", function() {alert( "Load was performed." );});
}