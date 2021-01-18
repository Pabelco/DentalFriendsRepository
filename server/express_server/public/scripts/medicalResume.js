$("#searchMedicalResume").submit(function (e) {
    e.preventDefault();
    postFetch("/user/medicalResume",{
        id_card_pacient: $('#id_card_pacient').val(),
    }).then((res) => {
        console.log(res > 0)
        console.log(res)
        //location.reload();
    })
});