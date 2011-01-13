Simply package enigmail hard work on providing IPC feature in mozilla platform.
So we are able to launch child proccesses from javascript,
and in our case, from addon-sdk libraries :)

Here is an example of code:

const subprocess = require("subprocess");
var p = subprocess.call({
  command:     'echo',
  
  // Print stdin and our env variable
  arguments:   ['$@', '$ENV_TEST'],
  environment: ['ENV_TEST=OK'],
  
  stdin: subprocess.WritablePipe(function() {
    this.write("stdin");
    this.close();
  }),
  stdout: subprocess.ReadablePipe(function(data) {
    // data should be equal to: "stdin OK"
    
  }),
  stderr: subprocess.ReadablePipe(function(data) {
    
  }),
  onFinished: subprocess.Terminate(function() {
    
  }),
  mergeStderr: false
});
