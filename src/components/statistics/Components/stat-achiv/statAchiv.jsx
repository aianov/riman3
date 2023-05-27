import React from 'react'
import './statAchiv.scss'

import { AiFillMinusSquare } from 'react-icons/ai'
import { Link } from 'react-router-dom';

export const StatAchiv = () => {
  const images = {};
  const pngFiles = require.context('../stat-main/images', true, /\.png$/);
  pngFiles.keys().forEach((key) => {
    images[key] = pngFiles(key);
  });
  return (
    <div className="stat__bottom" style={{ color: "white" }}>
      <div className="statachiv-container">
        <div className="statachiv-navbar">
          <Link to='/tasks/statistics' className="statachiv-navbar-text" style={{cursor: 'pointer', color: 'white', textDecoration: 'none'}}>
            <AiFillMinusSquare size={20}/>
            <span>скрыть</span>
          </Link>
        </div>
        <div className="statachiv-main">
          {Object.keys(images).map((key, ind) => (
            <div className="statachiv-slider-item" key={ind}>
              <div className="statachiv-slider-item-image">
                <img key={ind} src={images[key]} alt={key} />
              </div>
              <div className="statachiv-slider-item-text">
                <p>{ind + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
