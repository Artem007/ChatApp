var msgGen=(from,text)=>{
return {
  from,
  text,
  createdAt:new Date().getTime()
}
}

var genLocationMsg=(from,lat,long)=>{
return {
  from,
  url:`http://maps.google.com/maps?q=${lat},${long}`,
  createdAt:new Date().getTime()
}
}

module.exports={genLocationMsg,msgGen}
