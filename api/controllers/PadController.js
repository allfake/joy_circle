/**
 * PadController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


var serialport = require("serialport")
var SerialPort = serialport.SerialPort;
var serialPort = new SerialPort("/dev/tty.usbserial-AH01KRA8", {
     baudrate: 9600,
     parser: serialport.parsers.readline("\r\n") 
}, false);

var serial_openned = false


module.exports = {
    
   read: function (req, res) {
    
      var do_in_serial = function () {
        serialPort.on('data', function(data) {
          sails.io.sockets.emit('serialport', { data: data})
        });
      }

      if (!serial_openned) {
        serialPort.open(do_in_serial)
      }
      else {
        serial_openned = true
      }

     return res.json({result: 'hello'});
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PadController)
   */
  _config: {}

  
};
