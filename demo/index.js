var cardreader = require('card-reader');
var iso7816 = require('../lib/iso7816');

cardreader.on('device-activated', function (reader) {
    console.info('Device activated', reader);
});
cardreader.on('device-deactivated', function (reader) {
    console.info('Device deactivated', reader);
});
cardreader.on('card-removed', function (reader) {
    console.info('Card removed', reader);
});
cardreader.on('data-received', function (data) {
    console.info('Data received', data.toString());
});
cardreader.on('error', function (error) {
    console.info('Error', error);
});




cardreader.on('card-inserted', function (reader, status) {
    console.info('Card inserted', reader, status, this);
    explore();
});

function stringToByteArray(str) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i++) {
        var hex = str.charCodeAt(i);
        arr.push(hex);
    }
    return arr;
}


function explore() {

    iso7816(cardreader)
        .selectFile(stringToByteArray('1PAY.SYS.DDF01'))
        .then(function (response) {
            console.info('selectFile: data-received', response.toString('hex'));
        }).catch(function (error) {
            console.error('selectFile: error', error);
        });
}
