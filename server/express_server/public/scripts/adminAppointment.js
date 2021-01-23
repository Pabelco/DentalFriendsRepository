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
            // guardar en base
            console.log('select');   
        },
        eventClick: function (arg) {            
            const startDate = dateToInt(arg.event.start);
            const appointment = appointmentAvaliable.has(startDate);  
            console.log('eventClick');   
            if (appointment) {
                if (appointmentAvaliable.get(startDate).state == 0) {
                    $('#modalAppointment').modal('toggle');
                    $('#idAppointment').val(appointmentAvaliable.get(startDate).id)
                } else {
                    alertify.confirm('Agendar cita', 'Desea atender una cita a esa hora?', function () {
                        // grabar en base
                        alertify.success('Cita agendada exitosamente')
                        fillCalendar()
                    }, function () {
                        alertify.error('Error inesperado, vuelva a intentar')
                    });
                }
            }  
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
