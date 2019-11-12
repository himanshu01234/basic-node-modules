const nodemailer = require("nodemailer")
module.exports={
    mailer: (reciever, sub, txt, callback) => {
        var transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user:"getisha5@gmail.com ",//"me-pankaj@mobiloitte.com",
                    pass: "gorakhpur11#"
                }

            }

        );
        var mailOptions =
        {
            from: "getisha5@gmail.com",//'me-pankaj@mobiloitte.com',
            to: reciever,
            subject: sub,
            text: txt

        };
        transporter.sendMail(mailOptions, (error, info) =>{
            if (error) {
                callback(error.null);

            }
            else {
                callback(null,info);
            }
        });
    }

}