import React, { Component } from 'react';
import styled from 'styled-components';

const Section = styled.section`
    background: hsla(0, 0%, 0%, 0.3);
    bottom: 0;
    height: 100px;
    position: fixed;
    width: 100%;

    & #buttons{
      width: 300px;
      margin: auto;
      text-align: center;
    }
    & #buttons button {
      border: none;
      background: none;
      color: white;
      font-size: 1.2rem;
      color: hsla(0, 0%, 100%, 0.5);
      transition: all 0.2s ease;
      cursor: pointer;
    }
    & #buttons button:hover, #buttons button:focus {
      outline: none;
      color: hsla(0, 0%, 100%, 1);
      text-shadow: 2px 4px 3px hsla(0,0%,0%,0.25);
    }
    & #buttons #play-pause {
      color: hsla(0, 0%, 100%, 0.8);
      font-size: 2rem;
      margin: 0.5rem 1rem 0;
      transform: translateY(0.3rem);
    }

    & #buttons #play-pause:hover {
      color: hsla(0, 0%, 100%, 1);
    }
    & #time-control input {
      float: left;
      width: calc(100% - 80px);
    }

    & #time-control {
      margin: 0.5rem auto;
      /* max-width: 640px; */
      width: 50%;
    }

    & #time-control div,
    & #volume-control div {
      font-size: 0.8rem;
      color: hsla(0, 0%, 100%, 0.4);
      width: 35px;
      display: block;
      float: left;
      text-align: center;
    }

    & #volume-control div {
      font-size: 0.9rem;
      width: 20px;
    }

    & #volume-control {
      transform: translateY(-50%);
      top: 66%;
      position: absolute;
      right: 2rem;
      width: 15%;
    }

    & #volume-control input {
      float: left;
      width: calc(100% - 40px);
    }

`;

 class PlayerBar extends Component {
   render() {
     return (
       <Section className="player-bar">
         <section id="buttons">
           <button id="previous" onClick={this.props.handlePrevClick}>
             <span className="ion-skip-backward"></span>
           </button>
           <button id="play-pause" onClick={this.props.handleSongClick} >
             <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
           </button>
           <button id="next" onClick={this.props.handleNextClick}>
             <span className="ion-skip-forward"></span>
           </button>
         </section>
         <section id="time-control">
           <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
           <input
             type="range"
             className="seek-bar"
             value={(this.props.currentTime / this.props.duration) || 0}
             max="1"
             min="0"
             step="0.01"
             onChange={this.props.handleTimeChange}
           />
           <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
         </section>
         <section id="volume-control">
           <div className="icon ion-volume-low"></div>
           <input type="range" className="seek-bar" value="80" />
           <div className="icon ion-volume-high"></div>
         </section>
       </Section>
     );
   }
 }

 export default PlayerBar;
