var appointmentSelect = -1;
var appointmentAvaliable = new Map()
var calendar

$(document).ready(function () {
    startCalendar();
    fillCalendar()
});

function startCalendar() {
    calendar = new FullCalendar.Calendar(document.getElementById('calendarElement'), {
        initialView: 'timeGridWeek',
        allDaySlot: false,
        locale: 'es',
        nowIndicator: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        validRange: {
            start: Date.now(),
            end: modificateActualTime('day', new Date(), 15)
        },
        slotLabelFormat: {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short'
        },
        slotDuration: '00:15',
        initialDate: Date.now(),
        slotMinTime: '00:00',
        slotMaxTime: '20:00',
        navLinks: true,
        selectable: true,
        selectMirror: true,
        select: function (arg) {
            console.log('123123');
        },
        dateClick: function (info) {
            alertify.confirm('Agendar cita', 'Desea agendar una cita?', function () {
                alertify.success('Cita agendada exitosamente')
                createAppointment(info.dateStr)
                fillCalendar();
            }, noActionAllert).set(aceptOrNot);
        },
        eventClick: function (arg) {
            let dateStart = arg.event.start
            deleteAppointment(dateStart);
        },
        customButtons: {
            prev: {
                text: 'Prev',
                click: function () {
                    calendar.prev();
                    fillCalendar()
                }
            },
            next: {
                text: 'Next',
                click: function () {
                    calendar.next();
                    fillCalendar()
                }
            },
        },
        editable: true,
        dayMaxEvents: true,
        events: []
    });
    calendar.render();
}

function deleteAppointment(startDate = '') {
    let startDateTmp = dateToInt(startDate);
    if (appointmentAvaliable.has(startDateTmp)) {
        let appointmentSelect = appointmentAvaliable.get(startDateTmp);
        alertify.confirm('Eliminar cita', `Desea eliminar esta cita? <br>${printUserDetails(appointmentSelect)}`, function () {
            deleteFetch(`/appointment/delete`, { id: appointmentSelect.id }).then((res) => {
                alertify.success('Cita eliminada correctamente');
                fillCalendar();
            })  
        }, noActionAllert).set(aceptOrNot);
    }
}

/*
    let startDateTmp = dateToInt(startDate);    
    if (appointmentAvaliable.has(startDateTmp)) {
        let appointmentSelect = appointmentAvaliable.get(startDateTmp);
        console.log(appointmentSelect);
        if (appointmentSelect.state == 0) {
            alertify.confirm('Agendar cita', 'Desea agendar una cita?', function () {
                alertify.success('Cita agendada exitosamente')
                createAppointment(startDate.toISOString())
                fillCalendar();
            }, noActionAllert).set(aceptOrNot);
        } else {
            alertify.confirm('Eliminar cita', `Desea eliminar esta cita? <br>${printUserDetails(appointmentSelect)}`, function () {
                alertify.success('Cita eliminada correctamente');
                fillCalendar();
            }, noActionAllert ).set(aceptOrNot);
        }
    }
*/

function printUserDetails(userDetails = {}) {
    if (userDetails.pacient) {
        return `
        <br> 
        <table class="table table-sm table-bordered table-hover">        
            <tr>
                <td>Cedula</td>
                <td>${userDetails.pacient.id_card_pacient} </td>
            </tr>
            <tr>
                <td>Celular</td>
                <td>${userDetails.pacient.phone_pacient}</td>
            </tr>
            <tr>
                <td>Correo</td>
                <td>${userDetails.pacient.email_pacient}</td>
            </tr>
        </table> 
            `
    }
    return ``
}

function createAppointment(dateIso = '') {
    postFetch(`/appointment/insert`, { id_user: sessionStorage.getItem('idUser'), date: dateIso }).then((res) => {
        fillCalendar();
    })
}

function fillCalendar() {
    clearCalendar()
    getAvaliablesAppointment()
}

function clearCalendar() {
    calendar.getEvents().forEach(element => {
        element.remove();
    });
}

function getAvaliablesAppointment() {
    appointmentAvaliable = new Map()
    getFetch(`/appointment/byUser/${sessionStorage.getItem('idUser')}`).then((res) => {
        res.forEach(element => {
            appointmentAvaliable.set(new Date(element.date).getTime(), element)
        })
        addEventsCalendar();
    })
}

function addEventsCalendar() {
    appointmentAvaliable.forEach(element => {
        calendar.addEvent({
            start: element.date,
            end: modificateActualTime('minute', element.date, 15),
            backgroundColor: element.state == 1 ? 'red' : 'blue',
        });
    });
}

$('#modalForm').submit(function (e) {
    e.preventDefault()
    postFetch(`/appointment/setAppointment`, objectifyForm($(this).serializeArray())).then((res) => {
        if (res.message == 1) {
            alertify.success('Cita reservada exitosamente');
            getAvaliablesAppointment()
            $('#modalAppointment').modal('toggle');
        }
    })
});

$('button.fc-next-button').click(function (e) {
    console.log(2);
});

$('button.fc-prev-button').click(function (e) {
    console.log(1);
});


/* alertify.confirm('Eliminar cita', 'Esta seguro que desea borrar la cita?', function () {
    arg.event.remove();
    alertify.success('Cita cancelada');
}, function () { }); */
