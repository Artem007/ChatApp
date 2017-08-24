class Users{
  constructor(){
    this.users=[];
  };
  addUser(id,name,room){
    var user={id,name,room};
    this.users.push(user);
    return user;
  };
  removeUser(id){
    var user=this.users.find((user)=>user.id===id);
    // console.log(`BEFORE this.users ${this.users.length}`);
    var users=this.users.filter((user)=>!(user.id===id));
    this.users=users;
    // console.log(`AFTER this.users ${this.users.length}`);
    return user;
  };
  getUser(id){
    return this.users.find((user)=>user.id===id);
  };
  getListUsers(room){
    var users=this.users.filter((user)=>user.room===room);
    var userNames=users.map((user)=>user.name);
    return userNames;
  };
}


// var users=new Users();
// var user1=users.addUser(1,'ed','Song');
// var user2=users.addUser(2,'taylor','Song');
// var user3=users.addUser(3,'katy','Song');
// var user4=users.addUser(4,'Tony','Song');
// var user5=users.addUser(5,'Roger','Tennis');
// var user6=users.addUser(6,'Rafa','Tennis');

// console.log(users.getListUsers('Song'));
// users.removeUser(1);
// console.log();
// console.log(users.getListUsers('Song'));
// console.log(users.getUser(2));
// console.log();
// console.log(users.getListUsers('Tennis'));

module.exports={Users};
