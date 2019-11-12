const nodemailer=require('nodemailer')
module.exports = {
    mailer: (reciever, sub, txt, callback) => {
        var transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: "",//"me-pankaj@mobiloitte.com",
                    pass: ''//"pankaj66"
                }

            }

        );
        var mailOptions =
        {
            from: '',//'me-pankaj@mobiloitte.com',
            to: reciever,
            subject: sub,
            text: txt

        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);

            }
            else {
                console.log('Email sent:' + info.response);
            }
        });
    }
}
