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
A simple node.js application that demonstrates writing data via a serial port,
on select Intel IoT development boards. This app uses the [mraa Uart object][4]
to write to the selected serial port's TxD (Transmit Data) pin. This is a
convenient way to print debug messages from your IoT app, while it is running.

[4]:http://iotdk.intel.com/docs/master/mraa/classmraa_1_1_uart.html

Serial communication is performed via an onboard [UART][5] (Universal
Asynchronous Receiver/Transmitter). UARTs are serial I/O devices commonly
associated with [RS-232][6] and [COM ports][7].

[5]: https://en.wikipedia.org/wiki/Universal_asynchronous_receiver/transmitter
[6]: https://en.wikipedia.org/wiki/RS-232
[7]: https://en.wikipedia.org/wiki/COM_(hardware_interface)

> Following are some board-specific notes to help you use this app with your
> specific IoT hardware device.

### [Intel® Galileo Board for Arduino (Gen1)](http://intel.com/galileo)

The Intel Galileo Gen1 board provides access to two UART controllers:

* `Uart(0)` is “UART TTL” compatible and accessed via pins 0 and 1 of the
  18-pin Arduino compatible header (near the top-right corner of the board,
  just above the Intel Galileo logo).

  To monitor data printed via `Uart(0)`, connect to pin 1 (TxD), directly on
  your Galileo board, or by using the UART slot of a [Seeed Base Shield][8]
  or equivalent mezzanine board, if available.

[8]: https://www.seeedstudio.com/Base-Shield-V2-p-1378.html

* `Uart("/dev/tty???")` is accessed via a [3.5mm audio jack][9] (located
  near the Ethernet jack).

  This UART must be initialized with mraa using its device name.

[9]: http://www.ftdichip.com/Products/Cables/USBTTLSerial.htm

> See also: <https://www.arduino.cc/en/ArduinoCertified/IntelGalileo>

### [Intel® Galileo Board for Arduino (Gen2)](http://intel.com/galileo)

The Intel Galileo Gen2 board provides access to two UART controllers:

* `Uart(0)` is “UART TTL” compatible and accessible via pins 0 and 1 of the
  18-pin Arduino compatible header (near the top-right corner of the board,
  just above the Intel Galileo logo).

  To monitor data printed via `Uart(0)`, connect to pin 1 (TxD), directly on
  your Galileo board, or by using the UART slot of a [Seeed Base Shield][10]
  or equivalent mezzanine board, if available.

[10]: https://www.seeedstudio.com/Base-Shield-V2-p-1378.html

* `Uart("/dev/tty???")` is available via the 6-pin 3.3V
  [USB TTL FTDI header][11] located near the Ethernet jack.

  This UART must be initialized with mraa using its device name.

[11]: http://www.ftdichip.com/Products/Cables/USBTTLSerial.htm

> See also: <https://www.arduino.cc/en/ArduinoCertified/IntelGalileoGen2>

### [Intel® Edison Board for Arduino](http://intel.com/edison)

The Intel Edison board provides access to three UART controllers:

* `Uart(0)` is “UART TTL” compatible and accessible via pins 0 and 1 of the
  18-pin Arduino compatible header (along the bottom of the board, near the
  Edison CPU module).

  To monitor data printed via `Uart(0)`, connect to pin 1 (TxD), directly on
  your Edison board or by using the UART slot of a [Seeed Base Shield][12]
  or equivalent mezzanine board, if available.

[12]: https://www.seeedstudio.com/Base-Shield-V2-p-1378.html

* `Uart("/dev/ttyGS0")` is accessed as part of the USB “multifunction gadget”
  interface.

  This “[Multifunction Composite Gadget][13]” interface provides access to a
  serial console, RNDIS Ethernet interface and USB mass storage device. It is
  the uppermost of two micro-USB connectors, located along the right edge of
  the board (J16). This port is only active when SW1 (located directly above
  the micro-USB connector) is [set to “device mode,”][14] which is the switch
  position closest to the micro-USB connector.

  This UART must be initialized with mraa using its device name.

[13]: https://www.kernel.org/doc/Documentation/usb/gadget_multi.txt
[14]: https://communities.intel.com/docs/DOC-23454

* `Uart("/dev/ttyMFD2")` is the Linux kernel debug port. It is the micro-USB
  connector located at the lower-right corner of the board (J3).

  This is a very useful port to connect to for debugging, especially when
  trying to isolate boot problems. The kernel generates its “debug spew” to
  this port at 115,200 baud. You may find it useful to attach a PuTTY or
  similar serial terminal console application to this USB port.

  This UART must be initialized with mraa using its device name.

> See also: <https://www.arduino.cc/en/ArduinoCertified/IntelEdison>

### [Intel® Joule™ 570x Developer Kit](http://intel.com/joule)

> Because the Joule BIOS does not enumerate the onboard UART devices, you
> must use the Linux `/dev/tty??` device names to access these devices.
> This means there are no "UART pin numbers" that can be used to identify the
> onboard Joule UART devices.

* `Uart("/dev/ttyS0")` is “UART TTL” compatible. The TxD (Transmit) pin of this
  UART is accessed via pin 7 of the J12 connector (the top-most 40-pin header).
  The other UART pins (RxD, RTS and CTS) can be located on J13 (the other 40-pin
  header) at pins 28, 30 and 32 (respectively). Because this app only writes to
  the UART, it is only necessary to monitor the TxD pin.

  This UART must be initialized with mraa using its device name.

* `Uart("/dev/ttyS1")` is “UART TTL” compatible. The TxD (Transmit) pin of this
  UART is accessed via pin 22 of the J12 connector (the top-most 40-pin header).
  The RxD pin is located at pin 24 of J12. There are no RTS and CTS pins
  associated with this UART. Because this app only writes to the UART, it is
  only necessary to monitor the TxD pin.

  This UART must be initialized with mraa using its device name.

* `Uart("/dev/ttyS2")` is accessed via the USB “FTDI” interface.

  This [USB “FTDI”][15] interface provides access to a serial to USB console
  device. It is the micro-USB connector (j9) located between the large Type A
  USB connector and the small micro-HDMI connector. This port is typically
  configured to listen for a login using the Linux `getty` daemon. This means
  that data you write to this port may be intermixed with serial data emitted
  by other services that are also connected to the port.

  This UART must be initialized with mraa using its device name.

[15]: https://en.wikipedia.org/wiki/FTDI

* `Uart("/dev/ttyS3")` is “UART TTL” compatible. The TxD (Transmit) pin of this
  UART is accessed via pin 34 of the J13 connector (the inner 40-pin header).
  The other UART pins (RxD, RTS and CTS) are also located on J13, at pins 36, 38
  and 40 (respectively). Because this app only writes to the UART, it is only
  necessary to monitor the TxD pin.

  This UART must be initialized with mraa using its device name.

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
