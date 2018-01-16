import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import styled from 'styled-components';

const Tr = styled.tr`
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  background: hsla(0, 0%, 0%, 0.01);
  transition: all 0.2s ease;

  &:focus {
    outline: aliceblue;
  }
  &:hover .ion-play,
  &.playing .ion-pause,
  &.paused .ion-play {
    display: block;
  }
  & .ion-play,
  & .ion-pause,
  &:hover .song-number,
  &.playing .ion-play,
  &.playing .song-number,
  &.paused .ion-pause,
  &.paused .song-number {
    display: none;
  }
  &:hover {
    background: hsla(0, 0%, 0%, 0.05);
    cursor: pointer;
  }

  &.playing {
    background: hsla(0, 0%, 0%, 0.1);
  }

  &:hover .song-title {
    color: hsla(0, 0%, 100%, 1);
  }

  &:last-child {
    border: none;
  }

  & button {
    border: none;
    background: none;
    color: white;
    cursor: pointer;
    padding: 0;
  }

  & button:focus {
    outline: none;
    text-shadow: 2px 4px 3px hsla(0,0%,0%,0.25);
  }

  & button:focus .song-number {
    display: none;
  }
  & button:focus .ion-play {
    display: block;
  }

  &.playing button:focus .song-number,
  &.playing button:focus .ion-play {
    display: none;
  }
  &.playing button:focus .ion-pause {
    display: block;
  }
`;
class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album,
       currentSong: album.songs[0],
       currentTime: 0,
       duration: album.songs[0].duration,
       isPlaying: false
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }

   pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
   }
   componentDidMount() {
     this.eventListeners = {
       timeupdate: e => {
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       }
     };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
   }
   componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   }


   setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });
   }
   handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;
     if (this.state.isPlaying && isSameSong) {
       this.pause();

     } else {
       if (!isSameSong) { this.setSong(song); }
       this.play();

     }

   }

   handlePrevClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
   }
   handleNextClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
      //if (currentIndex >= this.state.album.songs.length) { return; }
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
   }
   handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   }
   formatTime(e){
     if(isNaN(e)){return "-:--";}
     var min=Math.floor(e/60);
     var sec=e%60;
     var ret=""+min+":"+Math.round(sec);
     return ret;
   }
   render() {
     return (

         <section className="album">
         <div class="container pt-5 col-lg-10">
         <div class="container col-lg-8 d-inline-block align-right">
             <div>
               <section id="album-info">
                 <div class="col-lg-6 ">
                  <img id="album-cover-art" src={this.state.album.albumCover} class="img-thumbnail"/>
                 </div>
                 <div className="album-details" class="col-lg-6  text-white">
                   <h1 id="album-title">{this.state.album.title}</h1>
                   <h4 className="artist">{this.state.album.artist}</h4>
                   <div id="release-info">{this.state.album.releaseInfo}</div>
                  </div>
                </section>
              </div>
          </div>
          <div class="container col-lg-4 align-top align-left pt-5 d-inline-block">
            <table id="song-list" class="table table-striped">
             <colgroup>
               <col id="song-number-column" />
               <col id="song-title-column" />
               <col id="song-duration-column" />
             </colgroup>
             <tbody>
             <section className='album'>
               {
                 this.state.album.songs.map( (song, index) =>
                 <Tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                  <td class="align-left">
                      <button>
                        <span className='bbb' class="song-number text-white">{index + 1}</span>
                        <span className='bbb' class="ion-play text-white"></span>
                        <span className='bbb' class="ion-pause  text-white"></span>
                      </button>
                    </td>
                  <td class="align-middle text-white">{song.title}</td>
                  <td class="align-right text-white">{this.formatTime(song.duration)}</td>
                </Tr>
                 )
               }
             </section>
             </tbody>
           </table>
          </div>
          </div>
           <PlayerBar
             isPlaying={this.state.isPlaying}
             currentSong={this.state.currentSong}
             currentTime={this.audioElement.currentTime}
             duration={this.audioElement.duration}
             handleSongClick={() => this.handleSongClick(this.state.currentSong)}
             handlePrevClick={() => this.handlePrevClick()}
             handleNextClick={() => this.handleNextClick()}
             handleTimeChange={(e) => this.handleTimeChange(e)}
             formatTime={ (e) => this.formatTime(e) }
           />
         </section>

     );
   }
 }

export default Album;
