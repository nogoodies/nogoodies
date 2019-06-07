const request = require('request');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else if (key.name === 'space') {
    console.log('thanks for your donation!!!!')

    request
      .post('https://app-46e1c372-b389-43b7-8c0f-ff83ca66f700.cleverapps.io/api/events-tap')
      .auth(null, null, true, 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU1OTkxODA2M30.FQ5pbnHsEASUFM0yUo4Fa-kgMtB0A-sbT5qbk43nk9mIrUna0Q_p9yaudhaa2k4TS3jtqIhi75Ev4OR0TSomJg')
  }
});
console.log('Press any key...');