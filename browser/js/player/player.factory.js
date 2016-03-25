'use strict';

juke.factory('PlayerFactory', function($http){
  // non-UI logic in here
  var playerObject={};
  var audio = document.createElement('audio');

  // state
  playerObject.currentSong;
  playerObject.playing = false;

  playerObject.start= function(song){
    this.play(song)
    this.currentSong=song;
  }

  playerObject.play= function(song){


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
    audio.play();
  }

  playerObject.toggle= function(song){

  }

  playerObject.isPlaying=function(song){
    console.log(song);
    if (this.playing==true){
      console.log('playing')
    }
    if(this.currentSong===song){
      return 'xc'
    }
    else{
      return false
    }

  }


  return playerObject;
});
