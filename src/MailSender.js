const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      prot: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music API',
      to: targetEmail,
      subject: 'Terlampir hasil ekspor playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this._transport.sendMail(message);
  }
}

module.exports = MailSender;
