const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();
const PORT = process.env.PORT || 5000;

app
  .post('/voice', (req, res) => {
    const twiml = new VoiceResponse();
    twiml.say("Thank you for calling us, please leave a message after the beep");
    twiml.record();
    twiml.hangup();

    res.type('text/xml');
    res.send(twiml.toString());
  })
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
