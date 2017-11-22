const gpg = require('./lib/gpg');

gpg.encryptAndSign('This is an elaborate test', ['-r alex@johnsonwebware.com'], (err, encrypted) => {
    if (err) console.error(err);
    console.log(encrypted);
    gpg.decrypt(encrypted, [], (err2, decrypted) => {
        if (err2) console.error(err2);
        console.log(decrypted.toString());
    });
});

gpg.clearsign('This is not an elaborate test', ['-r alex@johnsonwebware.com'], (err, signed) => {
    if(err) console.error(err);
    console.log(signed);
    gpg.verifySignature(signed, [], (err2, result) => {
        if (err2) console.error(err2);
        console.log(result.toString());
    });
});