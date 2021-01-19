let resume = {}

$("#searchMedicalResume").submit(async function (e) {
    e.preventDefault();
    postFetch("/user/medicalResume",{
        id_card_pacient: $('#id_card_pacient').val(),
    }).then((res) => {
        resume = res
        prueba()
        //document.getElementById("medicalResumeTable").table.location.reload(true);
        //location.reload();
    })
});

function prueba(){
    console.log(resume)
}