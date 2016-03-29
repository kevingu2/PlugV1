angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    random: function() {
      var randInt = Math.floor((Math.random() * 4) + 1);
      return chats[randInt];
    }
  };
})


/* Give us a list of all the social networks */
.factory('SocialNetworks', function() {
  var networks = [{
    'id': 0,
    'class': 'ion-social-facebook',
    'network': 'Facebook',
    'filter': true
  },{
    'id': 1,
    'class': 'ion-social-instagram',
    'network': 'Instagram',
    'filter': true
  },{
    'id': 2,
    'class': 'ion-social-linkedin',
    'network': 'LinkedIn',
    'filter': true
  },{
    'id': 3,
    'class': 'ion-social-twitter',
    'network': 'Twitter',
    'filter': true
  },{
    'id': 4,
    'class': 'ion-social-googleplus',
    'network': 'Google+',
    'filter': true
  }];

  return {
    all: function() {
      return networks
    },
    set: function(id, bool) {
      networks[id]['filter'] = bool;
    }
  }

});
