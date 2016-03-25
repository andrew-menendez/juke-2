"use strict";

juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});


juke.factory('albumFactory', function($http){
  var albumObject={};


  albumObject.fetchAll= function(){

      return $http.get('/api/albums/')
    };

  albumObject.fetchById= function(id){

      return $http.get('/api/albums/' + id);

    };

  return albumObject;
});

// $http.get('/api/albums/')
//   .then(function (res) { return res.data; })