
var setSong = function(songNumber) {
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: [ 'mp3' ],
    preload: true
});

setVolume(currentVolume);
  };

  var setVolume = function(volume) {
      if (currentSoundFile) {
          currentSoundFile.setVolume(volume);
      }
  };

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]')
      };

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
  +  ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + ' </td>'
  +  ' <td class="song-item-title">' + songName + '</td>'
  +  ' <td class="song-item-duration">' + songLength + '</td>'
  +  '</tr>'


    var $row = $(template);

    var clickHandler = function() {
      var songNumber = parseInt($(this).attr('data-song-number'));

      	if (SetSong !== null) {
          var currentlyPlayingCell = getSongNumberCell(SetSong);

          currentlyPlayingCell = getSongNumberCell(SetSong);
          currentlyPlayingCell.html(SetSong);
      	}
      	if (SetSong !== songNumber) {
          setSong(songNumber);
          currentSoundFile.play();
          $(this).html(pauseButtonTemplate);
          SetSong = currentAlbum.songs[songNumber - 1];
          updatePlayerBarSong();
      	} else if (SetSong === songNumber) {
          if (currentSoundFile.isPaused()) {
              $(this).html(pauseButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPauseButton);
              currentSoundFile.play();
          } else {
              $(this).html(playButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPlayButton);
              currentSoundFile.pause();
          }
      	}

        };


     var onHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = parseInt($(this).attr('data-song-number'));

           if (songNumber !== SetSong) {
               songNumberCell.html(playButtonTemplate);
           }
     };

     var offHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = parseInt($(this).attr('data-song-number'));

           if (songNumber !== SetSong) {
               songNumberCell.html(songNumber);
           }
           console.log("songNumber type is " + typeof songNumber + "\n and SetSong type is " + typeof SetSong);
         };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
    };

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');


    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();
};
     for (var i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
     };

     var updatePlayerBarSong = function() {

         $('.currently-playing .song-name').text(SetSong.title);
         $('.currently-playing .artist-name').text(currentAlbum.artist);
         $('.currently-playing .artist-song-mobile').text(SetSong.title + " - " + currentAlbum.artist);

     };

     var trackIndex = function(album, song) {
       return album.songs.indexOf(song);
    };

    var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, SetSong);
    currentSongIndex++;
    currentSoundFile.play();

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    var lastSongNumber = SetSong;

    SetSong = currentSongIndex + 1;
    SetSong = currentAlbum.songs[currentSongIndex];

    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + SetSong + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    };

    var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, SetSong);
    currentSongIndex--;
}
    if (currentSongIndex < 0) {
    currentSongIndex = currentAlbum.songs.lenth-1;
    currentSoundFile.play();

    }

  var lastSongNumber = SetSong;

  SetSong = currentSongIndex + 1;
  SetSong = currentAlbum.songs[currentSongIndex];

  updatePlayerBarSong();

  $('.main-controls .play-pause').html(playerBarPauseButton);

  var $previousSongNumberCell = $('.song-item-number[data-song-number="' + SetSong + '"]');
  var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

  $previousSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);


  var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
  var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
  var playerBarPlayButton = '<span class="ion-play"></span>';
  var playerBarPauseButton = '<span class="ion-pause"></span>';

  var currentSongFromAlbum = null;
  var currentSoundFile = null;
  var currentVolume = 80;

  var $previousButton = $('.main-controls .previous');
  var $nextButton = $('.main-controls .next');


 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
 });
