UART - Serial Communication App
============================
A simple node.js application intended to demonstrating reading and writing data via the serial port(s) on Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board. This project references the SerialPort NodeJS module to enable writing and reading via the serial ports provided.

When it comes to serial communication for embedded projects, universally asynchronous receiver/transmitter (UART) is one of the options for transfering data. First, you need to identify the desired serial port that will be involved in the data communication.
###Intel(R) Edison
**Serial**
Name: “Multi-gadget” or “Firmware Programming” or "Serial console" or "OTG" port.
Location: USB-micro connector near center of Arduino board.
Arduino SW name: Serial
Linux name: /dev/ttyGS0
 
This is the port you use to program your Edison/Arduino, and also the default port for the Serial console inside the Arduino IDE.  If the correct drivers are installed, this port also provides access to a USB storage partition and an RNDIS network interface (hence the name “multi-gadget”). When using the Arduino adapter board, this port is only active when SW1 is set to “device” mode, that is, the position closest to the multi-gadget port connector.

**Serial1**
Name: UART1, the general-purpose TTL-level port (Arduino shield compatibility).
Location: Pins 0 (RX) and 1 (TX) on the Arduino shield interface headers. 
Arduino SW name: Serial1
Linux name: /dev/ttyMFD1
 
This is the port that is exposed to an Arduino shield on pins 0 and 1, creating a simple 5V TTL interface to an external device.

**Serial2**
Name: UART2, “Linux kernel debug” or “debug spew” port.
Location: USB-micro connector near edge of Arduino board.
Arduino SW name: Serial2
Linux name: /dev/ttyMFD2
 

This is a very useful port to connect to for debugging, especially when trying to isolate boot problems.  The kernel generates its debug “spew” to this port at 115,200 baud.  I find it useful to always have a PuTTY terminal console connected to this.

**Reference**: https://www.arduino.cc/en/ArduinoCertified/IntelEdison

###Intel(R) Galileo
- provides UART TTL (5V/3.3V) serial communication, which is available on digital pin 0 (RX) and 1 (TX). In addition, a second UART provides RS-232 support and is connected via a 3.5mm jack.
- The USB Client ports allows for serial (CDC-ACM) communications over USB. This provides a serial connection
to the Serial Monitor or other applications on your computer. It is also used to upload sketches to the board.
- The USB Host port allows Galileo act as a USB Host for connected periphe

**UART0**
Name: UART0,
Location: the Digital 0 and 1 pins
Linux name: /dev/ttyS0

**Reference**: https://www.arduino.cc/en/ArduinoCertified/IntelGalileoGen2

####Getting Started
In order to use communicate with your sensors via UART, you will need to connect your sensor to Pin 0 (RX), Pin 1 (TX), GND and Power on the board directly or to the the UART slot on the Grove Starter Kit base shield if available.


Intel(R) XDK 
-------------------------------------------
This template is part of the Intel(R) XDK IoT Edition. 
Download the Intel(R) XDK at http://software.intel.com/en-us/html5. To see the technical details of the sample, 
please visit the sample article page at https://software.intel.com/en-us/node-js-templates-for-intel-xdk-iot-edition.

Important App Files
---------------------------
* main.js
* package.json
* README.md

mraa
--------------------------------------------
* Included on the IoTDevkit Linux Image

* source:  https://github.com/intel-iot-devkit/mraa
* license:  https://github.com/intel-iot-devkit/mraa/blob/9d488c8e869e59e1dff2c68218a8f38e9b959cd7/cmake/modules/LICENSE_1_0.txt

serialport
--------------------------------------------
* Node Module
* source:  https://www.npmjs.com/package/serialport
* license:  https://github.com/voodootikigod/node-serialport/blob/master/LICENSE