<h2>What's that?</h2>
Simply package enigmail hard work on providing IPC feature in mozilla platform.
So we are able to launch child proccesses from javascript,
and in our case, from addon-sdk libraries :)

<h2>Sample of code:</h2>

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


<h2>Credits:</h2>
All enigmail team working on IPC component.<br/>
  Patrick Brunschwig (author of almost all code) <patrick@mozilla-enigmail.org>,<br/>
  Ramalingam Saravanan (from enigmail team) <svn@xmlterm.org><br/>
