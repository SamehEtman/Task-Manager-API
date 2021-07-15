const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_GRID_APIKey)

const myEmail = 'samehothman20162017@gmail.com'

const sendWelcomeEmail =( email , name)=>{ sgMail.send({
    to : email,
    from : myEmail,
    subject : 'Thanks for joining in',
    text : `Thanks , ${name} for reaching to us `
})
}
const sendFarewellEmail = (email , name)=> {
    sgMail.send({
        to : email,
        from : myEmail,
        subject : 'Farewell message',
        text : `It was good as it lasted thanks for your time with us ${name} farewell`,
        html : `<p>Feel free to cantact us to improve our service</p>`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendFarewellEmail
}