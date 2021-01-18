const sendController = {};
const nodemailer = require('nodemailer');
const pacientModel = require('../models/pacient')
const appointment = require('../models/appointment')
const user = require('../models/user')

sendController.send_Mail = (req, res) => {
    let requestBody = req.body 
    try {
        let pacient = await pacientModel.findOne({ where: { id_card_pacient: requestBody.id_card_pacient } });
        res.json(pacient)
        let appointmentTmp = await appointment.findOne({ where: { id: requestBody.idAppointment, state: true } })
        let userTmp = await appointment.findOne({ where: { id: appointmentTmp.id_user} })

        if (appointmentTmp != null) { 
            appointmentTmp.state = false
            await appointmentTmp.save() 
            res.send({ message: 1, infoAppointment: appointmentTmp });    
        } else {
            res.send({ message: 2});
        } 
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'dawap2020@gmail.com', // generated ethereal user
                pass: 'allan123AP'  // generated ethereal password
            },
            tls:{
            rejectUnauthorized:false
            }
        });
        
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"no-reply" <dawap2020@gmail.com>', // sender address
            to: `${pacient.email_pacient}`, // list of receivers
            subject: 'Cancelación de cita', // Subject line
            text: 'Cita Cancelada', // plain text body
            html: `
            <p>Cancelación de cita odontológica</p>
            <h3>Detalles</h3>
            <ul>  
                <li>Nombre: ${pacient.name_pacient} ${pacient.lastname_pacient} de cédula ${pacient.lastname_pacient}</li>
                <li>Email: ${pacient.email_pacient}</li>
                <li>Fecha: ${appointmentTmp.date}</li>
                <li>Odontólogo: ${userTmp.user_name}</li>
            </ul>
            <h3>Mensaje</h3>
            <p>Reagende su cita, puesto que por motivos de fuerza mayor el odontólogo suspendió su </p>
            ` // html body
        };
        
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            
            // res.redirect('http://localhost:4200/Contactanos');
            res.send(output);
      });
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
  }
module.exports = sendController;
