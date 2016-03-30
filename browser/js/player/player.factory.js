'use strict';

juke.factory('PlayerFactory', function($http, $rootScope){
  // non-UI logic in here
  var playerObject={};
  var audio = document.createElement('audio');

  audio.addEventListener('timeupdate', function () {
    // var myEval= function(){
    //   if($scope){
    //     $scope.$evalAsync();
    //   } else {
    //     return null;
    //   }
    // }

    playerObject.progress =  audio.currentTime / audio.duration;
    // $scope.$digest(); // re-computes current template only (this scope)
    //playerObject.$evalAsync(); // likely best, schedules digest if none happening
    //myEval();
    $rootScope.$evalAsync();
    });

  audio.addEventListener('ended', function () {
    playerObject.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    //$scope.$evalAsync(); // likely best, schedules digest if none happening
  });

  // state
  playerObject.currentSong=null;
  playerObject.playing = false;
  playerObject.songList=[];
  playerObject.progress=0;


  playerObject.start= function(song,songList){
    this.songList=songList;
    this.play(song)
    this.currentSong=song;
  }

  playerObject.play= function(song){
    console.log('play song is: ',song)
    this.pause();
    audio.src = song.audioUrl;
    audio.load();
    audio.play();

    this.playing=true
    this.currentSong=song;
  }

  playerObject.pause= function(){
    audio.pause();
    this.playing=false;

  }

  playerObject.resume= function(){
    //console.log('play got triggered');
    audio.play();
    this.playing=true;
  }

  playerObject.getCurrentSong= function(){
    return this.currentSong;
  }

  playerObject.next= function(){
    var curSong=playerObject.getCurrentSong();
    var lastSongIndex=this.songList.length-1
    var curSongIndex=this.songList.indexOf(curSong);

    var nextSongIndex=curSongIndex+1

    if(nextSongIndex>lastSongIndex){
      nextSongIndex=0;
    }
    //console.log('nextSongIndex',nextSongIndex)
    var nextSong=this.songList[nextSongIndex];
    //console.log('next song', nextSong);

    playerObject.start(this.songList[nextSongIndex]);

  }

    playerObject.previous= function(){
    var curSong=playerObject.getCurrentSong();
    var lastSongIndex=this.songList.length-1
    var curSongIndex=this.songList.indexOf(curSong);

    var prevSongIndex=curSongIndex-1

    if(prevSongIndex<0){
      prevSongIndex=lastSongIndex;
    }
    //console.log('prevSongIndex',prevSongIndex)
    var nextSong=this.songList[prevSongIndex];
    //console.log('next song', nextSong);

    playerObject.start(nextSong);

  }

  playerObject.isPlaying=function(){
    //console.log(playerObject.currentSong);
    if (playerObject.playing==true){
      //console.log('playing')
      return true;
    } else {
      return false;
    }
  }

  playerObject.getProgress=function(){

    // console.log('currentTime',audio.currentTime)
    // console.log('duration',audio.duration);
    // console.log('progress: ',this.progress);
    return this.progress;

  }



  return playerObject;
});
