import React from 'react';
import styled from 'styled-components';

const Header1 = styled.h1`
  font-family: 'Supermercado One', cursive;
  font-size: 70px;
`;

const Landing = () => (
  <div className="landing" class="pt-5" >

  <div class="container ">
    <div class="row">
      <div class="col-lg-9 mx-auto ">
        <Header1 className="hero-title text-danger">Turn the music up!</Header1>
        <br/><br/><br/>
        <div>
        <section className="selling-points">
          <div className="point col-lg-4 d-inline-block">
            <h3 className="point-title">Choose your music</h3>
            <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
          </div>
          <div className="point col-lg-4 d-inline-block">
            <h3 className="point-title">Unlimited, streaming, ad-free</h3>
            <p className="point-description">No arbitrary limits. No distractions.</p>
          </div>
          <div className="point col-lg-4 d-inline-block">
            <h3 className="point-title">Mobile enabled</h3>
            <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
          </div>
        </section>
        </div>
      </div>
    </div>
  </div>


  </div>
);

export default Landing;
