const gpg = require('./lib/gpg');

gpg.encrypt('This is an elaborate test', ['-r alex@johnsonwebware.com'], (err, encrypted) => {
    if (err) console.error(err);
    console.log(encrypted);
    gpg.decrypt(encrypted, [], (err2, decrypted) => {
        if (err2) console.error(err2);
        console.log(decrypted.toString());
    });
});