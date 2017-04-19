/**
 * @file
 * A simple Node.js application to write to a UART.
 *
 * Supported Intel IoT development boards are identified in the code.
 * See the `cfg-app-platform.js` file for board configuration details.
 *
 * <https://software.intel.com/en-us/xdk/docs/using-templates-nodejs-iot>
 *
 * @author Paul Fischer, Intel Corporation
 * @author Elroy Ashtian, Intel Corporation
 * @author Dan Yocom, Intel Corporation
 *
 * @copyright (c) 2016-2017, Intel Corporation
 * @license BSD-3-Clause
 * See LICENSE.md for complete license terms and conditions.
 */

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */

"use strict" ;



var APP_NAME = "IoT UART Serial Write" ;
var Cfg = require("./utl/cfg-app-platform.js") ;    // get Cfg() constructor
var cfg = new Cfg() ;                               // init and config I/O resources

console.log("\n\n\n\n\n\n") ;                       // poor man's clear console
console.log("Initializing " + APP_NAME) ;

process.on("exit", function(code) {                 // define up front, due to no "hoisting"
    clearInterval(intervalID) ;
    console.log(" ") ;
    console.log("Exiting " + APP_NAME + ", with code:", code) ;
    console.log(" ") ;
}) ;


// confirm that we have a version of libmraa and Node.js that works
// exit this app if we do not

cfg.identify() ;                // prints some interesting platform details to console

if( !cfg.test() ) {
    process.exit(1) ;
}

if( !cfg.init() ) {
    process.exit(2) ;
}


// configure (initialize) our I/O pins for usage (gives us an I/O object)
// configuration is based on parameters provided by the call to cfg.init()

cfg.io = new cfg.mraa.Uart(cfg.ioPin) ;         // construct our I/O object
cfg.ioPath = cfg.io.getDevicePath() ;           // get path to UART device

// NOTE: a UART can be identified using a "pin#" or an OS "/tty/dev#" string.
// Only those UART devices accessible via the board's I/O header have a "pin#"
// which means cfg.ioPin might contain an int that resolves to a device name
// or just a device name string, both work (see the mraa Uart constructor docs).

if( typeof cfg.ioPin === "number" && Number.isInteger(cfg.ioPin) ) {
    console.log("UART mraa #: " + cfg.ioPin) ;
    console.log("UART" + cfg.ioPin + " device path: " + cfg.ioPath) ;
} else {
    console.log("UART has no mraa #, using: " + cfg.ioPin) ;
    console.log("UART device path: " + cfg.ioPath) ;
}


// configure UART device (speed, bits, etc.)
// NOTE: inconsistent support for setNonBlocking(), avoiding use here
// NOTE: set BAUD rate to 1200 for easier detection with a multimeter

cfg.io.setBaudRate(115200) ;
//cfg.io.setBaudRate(1200) ;
cfg.io.setMode(8, cfg.mraa.UART_PARITY_NONE, 1) ;
// cfg.io.setNonBlocking(true) ;
cfg.io.setFlowcontrol(false, false) ;
cfg.io.setTimeout(0, 0, 0) ;        // see http://stackoverflow.com/a/26006680/2914328


// write current time to the UART port, at a periodic interval

var time = new Date() ;
var periodicActivity = function() {
    time.setTime(Date.now()) ;                              // assign current time to our Date object
    cfg.io.writeStr("UUUUUUUUUUUUUUUUUUUU ") ;              // generates ~square wave for easy testing
    cfg.io.writeStr(time.toLocaleTimeString() + " ") ;      // write the current time to the UART
    process.stdout.write(time.toLocaleTimeString() + " ") ; // and to the JavaScript console
} ;
var intervalID = setInterval(periodicActivity, 2000) ;      // start the periodic writes
