$(document).ready(function () {
    startCalendar();
});

var appointmentAvaliable

function startCalendar() {
    appointmentAvaliable = getAvaliablesAppointment();
    var calendar = new FullCalendar.Calendar(document.getElementById('calendarElement'), {
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
            start: Date.now()
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
            $('#modalAppointment').modal('toggle');
            calendar.addEvent({
                title: 'Agendada',
                start: arg.start,
                end: arg.end,
                allDay: arg.allDay
            });
            calendar.unselect();
        },
        eventClick: function (arg) {
            alertify.confirm('Eliminar cita', 'Esta seguro que desea borrar la cita?', function () {
                arg.event.remove();
                alertify.success('Cita cancelada');
            }, function () { });
        },
        customButtons: {
            prev: {
                text: 'Prev',
                click: function () { 
                    calendar.prev(); 
                    console.log('1');
                }
            },
            next: {
                text: 'Next',
                click: function () { 
                    calendar.next(); 
                    console.log('1');
                }
            },
        },
        editable: true,
        dayMaxEvents: true,
        events: []
    });
    calendar.render();
    fillCalendar(appointmentAvaliable, calendar);
}

function fillCalendar(appointmentAvaliable, calendar) {
    appointmentAvaliable.forEach(element => {
        calendar.addEvent({
            title: `${element.state}`,
            start: element.start,
            end: element.end
        });
    });
}

function getAvaliablesAppointment() {
    var appointmentAvaliable = new Map();
    appointmentAvaliable.set(Date.now(), {
        state: 1,
        start: Date.now(),
        end: Date.now() + 900000
    });
    return appointmentAvaliable;
}

async function loadDoctors() {
    let listDoctors = await getFetch('/user/allAppoinment')
    let htmlSelect = ``
    listDoctors.forEach(element => {
        htmlSelect += `<option value=${element.id}>${element.user_name}</option>`
    })
    $('#selectDoctor').html(htmlSelect);
}

$('#selectDoctor').change(function (e) {
});

$('button.fc-prev-button').click(function (e) {
    console.log(1);
});

$('button.fc-next-button').click(function (e) {
    console.log(2);
});

function initPage() {
    loadDoctors()
}

initPage()