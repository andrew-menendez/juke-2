'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope,PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  //var audio = document.createElement('audio');
  // audio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });
  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = PlayerFactory.getProgress();
  //   // $scope.$digest(); // re-computes current template only (this scope)
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

  // state

  $scope.currentSong=PlayerFactory.getCurrentSong();
  $scope.playing = PlayerFactory.isPlaying();

  $scope.isPlaying=function(){
    return PlayerFactory.isPlaying();
  };
  $scope.getProgress=function(){
    return PlayerFactory.getProgress()*100;
  }

  // main toggle
  $scope.toggle = function (song) {
    console.log(song);
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      $rootScope.$broadcast('pause');
    } else $rootScope.$broadcast('play', song);
  };

  $scope.getCurrentSong= function(){
    return PlayerFactory.getCurrentSong();
  }

  // incoming events (from Album or toggle)
  $scope.$on('pause', pause);
  $scope.$on('play', play);

  // functionality
  function pause () {
   PlayerFactory.pause();
  }
  function play (song){
    console.log(song);
    PlayerFactory.play(song);
    // // stop existing audio (e.g. other song) in any case
    // pause();
    // //$scope.playing = true;
    // // resume current song
    // if (song === $scope.currentSong) return audio.play();
    // // enable loading new song
    // $scope.currentSong = song;
    // audio.src = song.audioUrl;
    // audio.load();
    // audio.play();
  }

  // outgoing events (to Album… or potentially other characters)
  $scope.next = function () { PlayerFactory.next(); };
  $scope.prev = function () { PlayerFactory.previous(); };

});
