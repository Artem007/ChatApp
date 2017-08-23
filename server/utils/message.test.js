const expect=require('expect');

var {genLocationMsg,msgGen}=require('./message.js');

describe('Just test',()=>{

  it('it should return message object',()=>{
    var from="Rog";
    var text="Hi";
    var msg=msgGen(from,text);

    expect(msg).toInclude({from,text});
    expect(msg.createdAt).toBeA('number');
  });

  it('it should return location url',()=>{

    var from="Rafa";
    var url=`http://maps.google.com/maps?q=1,2`;
    var msg=genLocationMsg(from,1,2);
    expect(msg).toInclude({from,url});
    expect(msg.createdAt).toBeA('number');

  });

});
