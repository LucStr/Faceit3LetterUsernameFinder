const request = require('request');
const fs = require('fs');

const validChars = [..."abcdefghijklmnopqrstuvwxzy0123456789_-"];

const possible = [];

validChars.forEach(a => {
    validChars.forEach(b => {
        validChars.forEach(c => {
            possible.push(a + b + c);
        });
    });
});

function recursiveCall(index){
    if(index % 100 == 0){
        console.log('Reached ' + index);
    }
    if(index == possible.length){
        console.log('DONE!')
        return;
    }

    request('https://api.faceit.com/core/v1/nicknames?nickname=' + possible[index], function (error, response, body) {
        if(response.statusCode == 200){
            console.log('FREE ' + possible[index]);
            fs.appendFile('free.txt', possible[index] + '\n', function(err) {
                err && console.log(err);
            });

        } else if(response.statusCode != 202){
            console.log('ERROR ENCOUNTERD! EXITING');
        }

        recursiveCall(++index);
    });
}

recursiveCall(0);