var {Users}=require('./users.js');
const expect=require('expect');

describe('Users',()=>{

describe('addUser',()=>{

  it('should return user',()=>{
    var users=new Users();
    var user={id:123,name:'Ed',room:'Song'};
    var resUser=users.addUser(user.id,user.name,user.room);
    expect(resUser).toEqual(user);
    expect(users.users[0]).toEqual(user);
  });

})



});
