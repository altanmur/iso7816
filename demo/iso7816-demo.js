var devices = require('card-reader');
var iso7816 = require('../lib/iso7816-application');


devices.on('device-activated', function (event) {
    console.log(`Device '${event.reader.name}' activated, devices: ${devices.listDevices()}`);
});

devices.on('device-deactivated', function (event) {
    console.log(`Device '${event.reader.name}' deactivated, devices: ${devices.listDevices()}`);
});

devices.on('card-removed', function (event) {
    console.log(`Card removed from '${event.reader.name}' `);
});

devices.on('command-issued', function (event) {
    console.log(`Command '${event.command}' issued to '${event.reader.name}' `);
});

devices.on('response-received', function (event) {
    console.log(`Response '${event.response}' received from '${event.reader.name}' in response to '${event.command}'`);
});

devices.on('error', function (event) {
    console.log(`Error '${event.error}' received`);
});

devices.on('card-inserted', function (event) {

    console.log(`List devices: ${devices.listDevices()}`);

    var reader = event.reader;
    console.log(`Card inserted into '${reader.name}', atr: '${event.status.atr.toString('hex')}'`);

    var application = iso7816(devices, reader);
    application
        .selectFile([0x31, 0x50, 0x41, 0x59, 0x2E, 0x53, 0x59, 0x53, 0x2E, 0x44, 0x44, 0x46, 0x30, 0x31])
        .then(function (response) {
            console.info(`Select PSE Response: '${response}'`);
        }).catch(function (error) {
            console.error('Error:', error, error.stack);
        });

});
