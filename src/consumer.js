require('dotenv').config();
const amqp = require('amqplib');
const MailSender = require('./MailSender');
const PlaylistsService = require('./PlaylistsService');
const Listener = require('./listener');

const init = async () => {
  const playlistsService = new PlaylistsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('exports:playlist', { durable: true });
  channel.consume('exports:playlist', listener.listen, { noAck: true });
  console.log('rabbitmq start listening');
};

init();
