Intel® XDK IoT Node.js\* UART Serial Communication App
======================================================
See [LICENSE.md](LICENSE.md) for license terms and conditions.

This sample application is distributed as part of the [Intel® XDK][1]. It can
also be downloaded or cloned directly from its git repo on the [public Intel XDK
GitHub\* site][2].

[1]: http://xdk.intel.com
[2]: https://github.com/gomobile

For help getting started developing applications with the Intel XDK, please
start with [the Intel XDK documentation][3].

[3]: https://software.intel.com/en-us/xdk/docs

App Overview
------------
A simple node.js application that demonstrates reading and writing data via a
serial port, on select Intel IoT development boards. This app uses the
[‘serialport' node module][4] to enable communication via the serial port.

[4]: https://www.npmjs.com/package/serialport

Serial communication is performed via a UART (Universal Asynchronous
Receiver/Transmitter), commonly associated with [RS-232][5] and [COM ports][6].
You will need to identify the serial port that will be used by this data
communication sample app.

[5]: https://en.wikipedia.org/wiki/RS-232
[6]: https://en.wikipedia.org/wiki/COM_(hardware_interface)

>   Following are some board-specific notes to help you use this app with your
>   specific IoT hardware device.

### [Intel® Galileo Board for Arduino (Gen1)](http://intel.com/galileo)

The Intel Galileo Gen1 board provides access to two UART controllers:

* UART(0) is “UART TTL” compatible and accessed via pins 0 and 1 of the 18-pin
  Arduino compatible header (near the top-right corner of the board, just
  above the Intel Galileo logo).

  To communicate via UART(0), connect to pin 0 (RX), pin 1 (TX), 3.3V and GND,
  directly on the Galileo board or using the UART slot on a [Seeed Base
  Shield][8], if available.

* UART(?) is accessed via a [3.5mm audio jack][7] (located near the Ethernet
  jack). This UART must be initialzed with mraa using its `/dev/tty???` name.

[7]: http://www.ftdichip.com/Products/Cables/USBTTLSerial.htm
[8]: https://www.seeedstudio.com/Base-Shield-V2-p-1378.html

See also: <https://www.arduino.cc/en/ArduinoCertified/IntelGalileo>

### [Intel® Galileo Board for Arduino (Gen2)](http://intel.com/galileo)

The Intel Galileo Gen2 board provides access to two UART controllers:

* UART(0) is “UART TTL” compatible and accessible via pins 0 and 1 of the 18-pin
  Arduino compatible header (near the top-right corner of the board, just
  above the Intel Galileo logo).

  To communicate via UART(0), connect to pin 0 (RX), pin 1 (TX), 3.3V and GND,
  directly on the Galileo board or by using the UART slot on a [Seeed Base
  Shield][10], if available.

* UART(?) is available via the [6-pin 3.3V USB TTL FTDI header][9] (near the
  Ethernet jack). This UART must be initialzed with mraa using its `/dev/tty???`
  name.

[9]: http://www.ftdichip.com/Products/Cables/USBTTLSerial.htm
[10]: https://www.seeedstudio.com/Base-Shield-V2-p-1378.html

See also: <https://www.arduino.cc/en/ArduinoCertified/IntelGalileoGen2>

### [Intel® Edison Board for Arduino](http://intel.com/edison)

The Intel Edison board provides access to three UART controllers:

* UART(0) is “UART TTL” compatible and accessible via pins 0 and 1 of the 18-pin
  Arduino compatible header (along the bottom of the board, near the Edison
  CPU module).

  To communicate using UART(0), connect to pin 0 (RX), pin 1 (TX), 3.3V and GND,
  directly on the Galileo board or by using the UART slot on a [Seeed Base
  Shield][11], if available.

[11]: https://www.seeedstudio.com/Base-Shield-V2-p-1378.html

* UART(ttyGS0) is accessed as part of the USB “multifunction gadget” interface.

  This “[Multifunction Composite Gadget][12]” interface provides access to a
  serial console, RNDIS Ethernet interface and USB mass storage device. It is
  the uppermost of two micro-USB connectors, located along the right edge of
  the board (J16). This port is only active when SW1 (located directly above
  the micro-USB connector) is [set to “device mode,”][13] which is the switch
  position closest to the micro-USB connector.

  This UART must be initialzed with mraa using its `/dev/ttyGS0` name.

[12]: https://www.kernel.org/doc/Documentation/usb/gadget_multi.txt
[13]: https://communities.intel.com/docs/DOC-23454

* UART(ttyMFD2) is the Linux kernel debug port. It is the micro-USB connector
  located at the lower-right corner of the board (J3).

  This is a very useful port to connect to for debugging, especially when
  trying to isolate boot problems. The kernel generates its “debug spew” to
  this port at 115,200 baud. You may find it useful to attach a PuTTY or
  similar serial terminal console application to this USB port.

  This UART must be initialzed with mraa using its `/dev/ttyMFD2` name.

See also: <https://www.arduino.cc/en/ArduinoCertified/IntelEdison>

### [Intel® Joule™ 570x Developer Kit](http://intel.com/joule)

* UART(ttyS2) is accessed via the USB “FTDI” interface.

  This [“FTDI”][14] interface provides access to a serial to USB console device.
  It is the micro-USB connector (j9) located between the large Type A USB
  connector and the small micro-HDMI connector. This port is typically
  configured to listen for a login using the Linux getty daemon. This means that
  data you write to the this port may be intermixed with serial data emitted by
  other services that are also connected to the port.

  This UART must be initialzed with mraa using its `/dev/ttyGS0` name.

[14]: https://en.wikipedia.org/wiki/FTDI

Important Sample App Files
--------------------------
* main.js
* package.json

Important Sample Project Files
------------------------------
* README.md
* LICENSE.md
* project-name.xdk
* project-name.xdke

Tested IoT Node.js Platforms
----------------------------
* [Intel® Galileo Board for Arduino](http://intel.com/galileo)
* [Intel® Edison Board for Ardunio](http://intel.com/edison)
* [Intel® Joule™ 570x Developer Kit](http://intel.com/joule)
