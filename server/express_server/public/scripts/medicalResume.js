let resume = {}

$("#searchMedicalResume").submit(async function (e) {
    e.preventDefault();
    postFetch("/user/medicalResume",{
        filterMedicalResume: $('#filterMedicalResume').val(),
    }).then((res) => {
        resume = res
        prueba()
    }).catch(function() {
        alert("Error contacte con administrador");
    });
});

function prueba(){
    //$("#medicalResumeTable").load( "ajax/test.html", function() {alert( "Load was performed." );});
}