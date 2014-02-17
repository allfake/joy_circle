'use strict';

describe('Service: socket', function () {

  // load the service's module
  beforeEach(module('linkerApp'));

  // instantiate service
  var socket;
  beforeEach(inject(function (_$socket_) {
    socket = _socket_;
  }));

  it('should do something', function () {
    expect(!!socket).toBe(true);
  });

});
