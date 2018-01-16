import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }
   render() {
    return (
      <div class="container col-lg-10 pt-5">
        <section className='library'>
          {
            this.state.albums.map( (album, index) =>
              <div className="col-lg-6 d-inline-block">
                <Link to={`/album/${album.slug}`} key={index}>
                <div className="col-lg-8 d-inline-block">
                <img src={album.albumCover} alt={album.title} class="img-responsive mx-auto img-thumbnail"/>
                </div>
                <div className="col-lg-4 d-inline-block">
                 <div><p class="text-white font-weight-bold">{album.title}</p></div>
                 <div><p class="text-white font-italic">{album.artist}</p></div>
                 <div><p class="text-white">{album.songs.length} songs</p></div>
                 </div>
                </Link>
              </div>
            )
          }
        </section>
      </div>
     );
   }
 }


export default Library;
