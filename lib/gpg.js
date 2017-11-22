const spawnGPG = require('./spawnGPG');

/**
 * Base `GPG` object.
 */
var GPG = {

      /**
       * Encrypt `str` and pass the encrypted version to the callback `fn`.
       *
       * @param {String|Buffer}   str    String to encrypt.
       * @param {Array}    [args] Array of additonal gpg arguments.
       * @param {Function} [fn]   Callback containing the encrypted Buffer.
       * @api public
       */
      encrypt: function(str, args, fn){
        spawnGPG(str, ['--encrypt'], args, fn);
      },
    
      /**
       * Decrypt `str` and pass the decrypted version to the callback `fn`.
       *
       * @param {String|Buffer} str    Data to decrypt.
       * @param {Array}         [args] Array of additonal gpg arguments.
       * @param {Function}      [fn]   Callback containing the decrypted Buffer.
       * @api public
       */
      decrypt: function(str, args, fn){
        spawnGPG(str, ['--decrypt'], args, fn);
      },
    
      /**
       * Clearsign `str` and pass the signed message to the callback `fn`.
       *
       * @param {String|Buffer} str  String to clearsign.
       * @param {Array}         [args] Array of additonal gpg arguments.
       * @param {Function}      fn   Callback containing the signed message Buffer.
       * @api public
       */
      clearsign: function(str, args, fn){
        spawnGPG(str, ['--clearsign'], args, fn);
      },
    
      /**
       * Verify `str` and pass the output to the callback `fn`.
       *
       * @param {String|Buffer} str    Signature to verify.
       * @param {Array}         [args] Array of additonal gpg arguments.
       * @param {Function}      [fn]   Callback containing the signed message Buffer.
       * @api public
       */
      verifySignature: function(str, args, fn){
        // Set logger fd, verify otherwise outputs to stderr for whatever reason
        var defaultArgs = ['--logger-fd', '1', '--verify'];
        spawnGPG(str, defaultArgs, args, fn);
      }
    
    };
    
    /**
     * Expose `GPG` object.
     */
    module.exports = GPG;
