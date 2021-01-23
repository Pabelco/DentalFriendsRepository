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
        htmlSelect += `<tr><td>${element.id}</td><td>${element.date}</td><td>${element.nombrePaciente}</td><td><button type="button" id=${element.id} onclick="mostrarDetalles(this.id,event)" class="btn btn-primary" data-toggle="modal" data-target="#modalMedicalResume">Detalles</button></td></tr>`
    })
    $('#medicalResumeTable').html(htmlSelect);
});

async function mostrarDetalles(id,e){
    e.preventDefault();
    let detalles = await postFetch('/user/medicalResume/details',{
        idAppointment: id, 
    }).then((res) => {
        return res
    }).catch(function() {
        alert("Error en detalles contacte con administrador");
    });
    console.log(detalles)
    let htmlSelect = `<p>No existen detalles de la cita</p>`
    if(detalles.details!=null){
        htmlSelect = `<p>Detalles en implementacion</p>`
    }
    $('#modalBodyMedicalResume').html(htmlSelect);

}