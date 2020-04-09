const noflo = require('noflo');

exports.getComponent = () => {
    const c = new noflo.Component({
        description: 'Extract vlaue from Object by key',
        inPorts: {
          in: {
            datatype: 'string',
            description: 'json to analyse as String',
            required: true,
          },
          key: {
            datatype: 'string',
            description: 'key name to extract from object',
            required: true,
          },
        },
        outPorts: {
          out: {
            datatype: 'string',
            description: 'the data wrapped in brackets',
            required: true,
          },
          error: {
            datatype: 'string',
            description: 'log error isf exist',
          },
        },
      });
    
      c.process((input, output) => {
        if (!input.hasData('in')) { return; }
        

        const object = input.getData('object');
        
        output.send({
            out: new noflo.IP('openBracket'),
        });
        
        if (!input.hasData('key')) { 
            output.send({
                out: new noflo.IP('data', object),
            });  
        }
        const key = input.getData('key');
        
        if (!(key in object)){
            output.send({
                error: new noflo.IP('data', 'Key wa not notfound on object'),
            });
        }else{
            let content = object[`${key}`]
            output.send({
                out: new noflo.IP('data', content),
            });
        } 

        output.send({
            out: new noflo.IP('closeBracket'),
          });
        output.done();

      });
    
      return c;
}
