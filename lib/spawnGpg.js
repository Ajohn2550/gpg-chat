const spawn = require('child_process').spawn;
const globalArgs = ['--batch'];

/**
 * Wrapper around spawning GPG. Handles stdout, stderr, and default args.
 *
 * @param  {String}   input       Input string. Piped to stdin.
 * @param  {Array}    defaultArgs Default arguments for this task.
 * @param  {Array}    args        Arguments to pass to GPG when spawned.
 * @param  {Function} cb          Callback.
 */
module.exports = function(input, defaultArgs, args, cb) {
  // Allow calling with (input, defaults, cb)
  if (typeof args === 'function'){
    cb = args;
    args = [];
  }

  cb = once(cb);

  var gpgArgs = (args || []).concat(defaultArgs);
  var buffers = [];
  var buffersLength = 0;
  var error = '';
  var gpg = spawnIt(gpgArgs, cb);

  gpg.stdout.on('data', function (buf){
    buffers.push(buf);
    buffersLength += buf.length;
  });

  gpg.stderr.on('data', function(buf){
    error += buf.toString('utf8');
  });

  gpg.on('close', function(code){
    var msg = Buffer.concat(buffers, buffersLength);
    if (code !== 0) {
      // If error is empty, we probably redirected stderr to stdout (for verifySignature, import, etc)
      return cb(new Error(error || msg));
    }

    cb(null, msg, error);
  });

  gpg.stdin.end(input);
};

// Wrapper around spawn. Catches error events and passed global args.
function spawnIt(args, fn) {
  var gpg = spawn('gpg2', globalArgs.concat(args || []) );
  gpg.on('error', fn);
  return gpg;
}

// Ensures a callback is only ever called once.
function once(fn) {
  var called = false;
  return function() {
    if (called) return;
    called = true;
    fn.apply(this, arguments);
  };
}
