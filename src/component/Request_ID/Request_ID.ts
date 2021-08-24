const getRequestID = () => {
  var req = new XMLHttpRequest();
  req.open("GET", document.location.toString(), false);
  req.send(null);
  var headers:{} = req.getAllResponseHeaders().toLowerCase();
  headers = headers.toString().split(/\n|\r|\r\n/g).reduce(function(a, b) {
    if (b.length) {
      var [key, value] = b.split(": ");
      a[key] = value;
    }
    return a;
  }, {});
  console.log(headers);
  return headers['x-request-id'];
};

const getSourceIp = () => {
  var req = new XMLHttpRequest();
  req.open("GET", document.location.toString(), false);
  req.send(null);
  var headers:{} = req.getAllResponseHeaders().toLowerCase();
  headers = headers.toString().split(/\n|\r|\r\n/g).reduce(function(a, b) {
    if (b.length) {
      var [key, value] = b.split(": ");
      a[key] = value;
    }
    return a;
  }, {});
  console.log(headers);
  return headers['x-source-ip'];
};


export {
  getRequestID,
  getSourceIp
}
