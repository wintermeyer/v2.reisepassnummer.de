(function(){
  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }
  };

  var pcastPlayers = document.querySelectorAll('.pcast-player');
  var speeds = [ 1, 1.5, 2, 2.5, 3 ]

  for(i=0;i<pcastPlayers.length;i++) {
    var player = pcastPlayers[i];
    var audio = player.querySelector('audio');
    var play = player.querySelector('.pcast-play');
    var pause = player.querySelector('.pcast-pause');
    var progress = player.querySelector('.pcast-progress');
    var speed = player.querySelector('.pcast-speed');
    var mute = player.querySelector('.pcast-mute');
    var currentTime = player.querySelector('.pcast-currenttime');
    var duration = player.querySelector('.pcast-duration');
    var itunes = player.querySelector('.pcast-itunes');
    var rss = player.querySelector('.pcast-rss');

    var currentSpeedIdx = 0;

    pause.style.display = 'none';

    var toHHMMSS = function ( totalsecs ) {
        var sec_num = parseInt(totalsecs, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours; }
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        var time = hours+':'+minutes+':'+seconds;
        return time;
    }

    if( isMobile.iOS() ) {
      itunes.style.display = 'inline'
      rss.style.display = 'none'
    };

    if( isMobile.Android() ) {
      itunes.style.display = 'none'
      rss.style.display = 'inline'
    };

    audio.addEventListener('loadedmetadata', function(){
      progress.setAttribute('max', Math.floor(audio.duration));
      duration.textContent  = '-' + toHHMMSS(audio.duration);
    });

    audio.addEventListener('timeupdate', function(){
      progress.setAttribute('value', audio.currentTime);
      duration.textContent  = '-' + toHHMMSS(Math.floor(audio.duration - audio.currentTime));
      currentTime.textContent  =  toHHMMSS(audio.currentTime);
    });

    play.addEventListener('click', function(){
      this.style.display = 'none';
      pause.style.display = 'inline-block';
      audio.play();
    }, false);

    pause.addEventListener('click', function(){
      this.style.display = 'none';
      play.style.display = 'inline-block';
      audio.pause();
    }, false);

    progress.addEventListener('click', function(e){
      audio.currentTime = Math.floor(audio.duration) * (e.offsetX / e.target.offsetWidth);
    }, false);

    speed.addEventListener('click', function(){
      currentSpeedIdx = currentSpeedIdx + 1 < speeds.length ? currentSpeedIdx + 1 : 0;
      audio.playbackRate = speeds[currentSpeedIdx];
      this.textContent  = speeds[currentSpeedIdx] + 'x';
      return true;
    }, false);

    mute.addEventListener('click', function() {
      if(audio.muted) {
        audio.muted = false;
        this.querySelector('.fa').classList.remove('fa-volume-off');
        this.querySelector('.fa').classList.add('fa-volume-up');
      } else {
        audio.muted = true;
        this.querySelector('.fa').classList.remove('fa-volume-up');
        this.querySelector('.fa').classList.add('fa-volume-off');
      }
    }, false);
  }
})(this);
