var expect=require('expect');
var {isRealString}=require('./validator');


describe('isRealString',()=>{

  it('should reject empty string',()=>{
    expect(isRealString('')).toBe(false);
  });

  it('should reject string with spaces only',()=>{
    expect(isRealString('   ')).toBe(false);
  });

  it('should reject not string',()=>{
    expect(isRealString(324)).toBe(false);
  });

  it('should allow string with non-space characters',()=>{
    expect(isRealString(' sdf  ')).toBe(true);
  });
  
});
