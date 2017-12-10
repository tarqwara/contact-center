const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();
const PORT = process.env.PORT || 5000;

app
  .post('/voice', (req, res) => {
    const message = new VoiceResponse();
    message.say("Thank you for calling us, please leave a message after the beep");

    res.type('text/xml');
    res.send(message.toString());
  })
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
