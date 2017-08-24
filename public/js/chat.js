var socket = io();

function scrollToButtom() {
  var messages = $('#messages');

  var clientHeight = messages.prop('clientHeight');
  var scrollHeight = messages.prop('scrollHeight');
  var scrollTop = messages.prop('scrollTop');
  var newMsg = messages.children('li:last-child').innerHeight();
  var lastMsg = messages.children('li:last-child').prev().innerHeight();

  if (clientHeight + scrollTop + newMsg + lastMsg >= scrollHeight) {
    messages.prop('scrollTop', scrollHeight);
  }
}


socket.on('connect', () => {
  console.log('conected to server');

  var params = $.deparam(window.location.search);

  socket.emit('join', params, (err) => {
    if (err) {
      window.location.href = "index.html";
      alert('Name and Room are required!');
      console.log(err);
    } else {
      console.log('no error');
    }

  });

  socket.on('updateUsers',(users)=>{
    $('#users').empty();
    var usersList=$('#users');
    users.forEach((user)=>{
      var li=$('<li></li>');
      li.text(user);
      usersList.append(li);
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnected from server');
  });

  socket.on('newMsg', (msg) => {
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      from: msg.from,
      text: msg.text,
      createdAt: moment(msg.createdAt).format('h:mm a')
    });
    $('#messages').append(html);
    scrollToButtom();
  });
});

$("#message-form").on("submit", (event) => {

  event.preventDefault();

  var messageBox = $("[name=message]");
  var text = messageBox.val();

  socket.emit('createMsg', {
    text: text
  }, () => {
    messageBox.val('');
  });

});

socket.on('newLocationMsg', (msg) => {
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: msg.from,
    url: msg.url,
    createdAt: moment(msg.createdAt).format('h:mm a')
  });
  $('#messages').append(html);
  scrollToButtom();
});

var sendLocationBtn = $("#send-location");

sendLocationBtn.on("click", () => {

  if (!navigator.geolocation) {
    return alert("Cant get location");
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    sendLocationBtn.attr("disabled", "disabled");
    sendLocationBtn.text('Sending...');
    console.log('test');
    socket.emit('createLocationMsg', {
      long: position.coords.longitude,
      lat: position.coords.latitude
    }, () => {
      sendLocationBtn.removeAttr('disabled');
      sendLocationBtn.text('Send location');
    });
  });

});
