const { Cc, Ci } = require("chrome");
const subprocess = require("subprocess");
const env = Cc["@mozilla.org/process/environment;1"].getService(Ci.nsIEnvironment);

// For now, only test on windows
if (env.get('OS') && env.get('OS').match(/Windows/))
exports.testWindows = function (test) {
  test.waitUntilDone();
  let envTestValue = "OK";
  let gotStdout = false;
  let gotStderr = false;
  
  var p = subprocess.call({
    // Retrieve windows cmd.exe path from env
    command:     env.get('ComSpec'),
    // In order to execute a simple "echo" function
    arguments:   ['/C', 'echo %ENV_TEST%'], // ' & type CON' should display stdin, but doesn't work
    // Printing an environnement variable set here by the parent process
    environment: ['ENV_TEST='+envTestValue],
    
    stdin: subprocess.WritablePipe(function() {
      // Win32 command line is not really made for stdin
      // So it doesn't seems to work as it's hard to retrieve stdin
      this.write("stdin");
      this.close();
    }),
    stdout: subprocess.ReadablePipe(function(data) {
      test.assert(!gotStdout,"don't get stdout twice");
      test.assertEqual(data,envTestValue+"\r\n","stdout contains the environnement variable");
      gotStdout = true;
    }),
    stderr: subprocess.ReadablePipe(function(data) {
      test.assert(!gotStderr,"don't get stderr twice");
      test.assertEqual(data,"","stderr is empty");
      gotStderr = true;
    }),
    onFinished: subprocess.Terminate(function() {
      test.assert(gotStdout, "got stdout before finished");
      test.assert(gotStderr, "got stderr before finished");
      test.done();
    }),
    mergeStderr: false
  });
  
}

// Not tested ... but should work :-p
if (env.get('OSTYPE') && env.get('OSTYPE').match(/linux|gnu/))
exports.testWindows = function (test) {
  test.waitUntilDone();
  let envTestValue = "OK";
  let gotStdout = false;
  let gotStderr = false;
  
  var p = subprocess.call({
    // Hope that we don't have to give absolute path on linux ...
    command:     'echo',
    // Print stdin and our env variable
    arguments:   ['$@', '$ENV_TEST'],
    environment: ['ENV_TEST='+envTestValue],
    
    stdin: subprocess.WritablePipe(function() {
      this.write("stdin");
      this.close();
    }),
    stdout: subprocess.ReadablePipe(function(data) {
      test.assert(!gotStdout,"don't get stdout twice");
      test.assertEqual(data,stdin+" "+envTestValue,"stdout contains the environnement variable");
      gotStdout = true;
    }),
    stderr: subprocess.ReadablePipe(function(data) {
      test.assert(!gotStderr,"don't get stderr twice");
      test.assertEqual(data,"","stderr is empty");
      gotStderr = true;
    }),
    onFinished: subprocess.Terminate(function() {
      test.assert(gotStdout, "got stdout before finished");
      test.assert(gotStderr, "got stderr before finished");
      test.done();
    }),
    mergeStderr: false
  });
  
}