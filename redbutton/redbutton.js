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
      .post('https://pierre.eu.ngrok.io/api/events-tap')
      .auth(null, null, true, 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU1OTkxMzM3N30.6Ray2-vkNFad3apLKBWYsxtiaDJEYFc_HMhBxLm867jVWO99VqcDWdZrMeLgzzrTIfisD7AHaLoJSZbAJAB7Lw')
  } 
});
console.log('Press any key...');          