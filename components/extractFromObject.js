var noflo;

noflo = require('noflo');

exports.getComponent = function() {
  var c = new noflo.Component({
    description: 'Given a key, return only the value matching that key in the incoming object'
  });
  c.inPorts = new noflo.InPorts({
    in: {
      datatype: 'object',
      description: 'An object to extract property from',
      required: true
    },
    key: {
      datatype: 'string',
      description: 'Property names to extract (one property per IP)',
    }
  });
  c.outPorts = new noflo.OutPorts({
    out: {
      datatype: 'all',
      description: 'Values of the property extracted (each value sent as a separate IP)'
    }
  });
  return c.process(function(input, output) {
    var data, i, key, keys, len, value;
    if (!input.has('in')) {
      return;
    }
  
    data = input.getData('in');
    key = input.getData('key');
    value = data;
    
    var content = JSON.parse(data);
    
    if (!(key in content)){
      output.send({
          out:'Key was not notfound on object',
      });
    }else{
      value = content[`${key}`]
      output.send({
          out: value
      });
    } 
    return output.done();
  });
};
