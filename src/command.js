'use strict';

import hexify from 'hexify';


function createCommandApdu(obj) {

    var size = obj.size;
    var cla = obj.cla;
    var ins = obj.ins;
    var p1 = obj.p1;
    var p2 = obj.p2;
    var data = obj.data;
    var le = obj.le || 0;
    var lc;


    // case 1
    if (!size && !data && !le) {
        //le = -1;
        //console.info('case 1');
        size = 4;
    }
    // case 2
    else if (!size && !data) {
        //console.info('case 2');
        size = 4 + 2;
    }

    // case 3
    else if (!size && !le) {
        //console.info('case 3');
        size = data.length + 5 + 4;
        //le = -1;
    }

    // case 4
    else if (!size) {
        //console.info('case 4');
        size = data.length + 5 + 4;
    }

    // set data
    if (data) {
        lc = data.length;
    } else {
        //lc = 0;
    }

    var bytes = [];
    bytes.push(cla);
    bytes.push(ins);
    bytes.push(p1);
    bytes.push(p2);

    if (data) {
        bytes.push(lc);
        bytes = bytes.concat(data);
    }
    bytes.push(le);

    return {
        toString: function () {
            return hexify.toHexString(bytes);
        },

        toByteArray: function () {
            return bytes;
        },

        toBuffer: function () {
            return new Buffer(bytes);
        },

        setLe: function(le) {
            bytes.pop();
            bytes.push(le);
        }

    }
}


module.exports = createCommandApdu;

