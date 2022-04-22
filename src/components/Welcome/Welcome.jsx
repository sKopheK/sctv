import React from 'react';
import './Welcome.scss';

export default function Welcome() {
  return (
    <div className="welcome">
      <p className="welcome__heading">Welcome to the StarCraft TV experience.</p>
      <p className="welcome__text">Grab the remote and start the show!</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 130" className="welcome__arrow welcome__arrow--right">
        <path d="M5,5 C20,110 170,65 200,90" />
        <path d="M207,92 C173,45 181,51 182,53" />
        <path d="M208,94 C165,96 167,104 167,106" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 200" className="welcome__arrow welcome__arrow--down">
        <path d="M30,5 V190" />
        <path d="M30,196 C0,175 5,170 5,172" />
        <path d="M32,195 C47,185 50,180 56,170" />
      </svg>
    </div>
  );
}
