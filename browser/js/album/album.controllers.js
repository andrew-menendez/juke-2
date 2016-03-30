'use strict';

// var StatsFactory= require('./album.factory.js');




juke.controller('AlbumCtrl', function($scope, $rootScope, $log, StatsFactory,albumFactory,PlayerFactory) {

  albumFactory.fetchAll().then(function(albums){
    console.log(albums);
    $scope.albums=albums;
  })


  albumFactory.fetchById("56eb362c913f75b605c456bd")
  .then(function (res) { return res.data })
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    });
    $scope.album = album;

    StatsFactory.totalTime(album)
    .then(function (albumDuration) {
        $scope.fullDuration = albumDuration;
    });
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound




  //main toggle
  $scope.toggle = function (song) {
    console.log(song);
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      $rootScope.$broadcast('pause');
    } else $rootScope.$broadcast('play', song);
  };

  // incoming events (from Player, toggle, or skip)
  $scope.$on('pause', pause);
  $scope.$on('play', play);
  $scope.$on('next', next);
  $scope.$on('prev', prev);

   $scope.getCurrentSong= function(){
    return PlayerFactory.getCurrentSong();
  }

  // functionality
  function pause () {
    // $scope.playing = false;
    PlayerFactory.pause();
  }
  function play (event, song) {
    // $scope.playing = true;
    // $scope.currentSong = song;
    PlayerFactory.play(song);
  };

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // };
  // function next () { skip(1); };
  // function prev () { skip(-1); };

  function next() {
    PlayerFactory.next();
  }
  function prev(){
    PlayerFactory.previous();
  }

});





/// new controller

juke.controller('AlbumnsCtrl', function($scope, $rootScope, $log,albumFactory) {

      albumFactory.fetchAll().then(function(albums){
        $scope.albums=albums.data;
        $scope.albums.forEach(function(album){
            album.imageUrl = '/api/albums/' + album._id + '.image';
          });
        console.log($scope.albums);

      })
});



