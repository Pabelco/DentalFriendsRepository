$("#formProfile").submit(function(e){
    e.preventDefault();
    postFetch("/user/formProfile", {
        idCard: $("#id_card").val(),
        picture: $("#picture-url"),
        address: $("#address"),
        degree: $("#degree"),

        birth: $("#birth").val(), 
        age: $("#age").val(), 
        phone: $("#phone").val(),
        recog: $("#recognitions").val(),
        school: $("#school"),
        phrase: $("#phrase"),
        
        id_: $("#id"),
    }).then((res) => {
        if (res.message == 1) {
            alertify.success('Datos Guardados Satisfactoriamente');
        } else {
            alertify.error('Hubo un error al guardar los datos!!');
        }
    })
});