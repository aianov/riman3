import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './main-page.scss';
import mylogo from '../../pages/main-page/images/logo.jpg';
import mainDark from './images/bgc.png'
import mainLight from './images/mainLight.png'

export const MainPage = () => {
  const [bg, setBg] = useState()

  console.log("изменения вступили в силу! #1")
  useEffect(() => {
    const dark = document.querySelector(".tasksdark");
    const light = document.querySelector(".taskslight");
    const currentTheme = localStorage.getItem("app-theme")
    console.log(currentTheme)
    if (currentTheme === "light") {
        light.classList.toggle("themeico-hide");
        dark.classList.toggle("themeico-hide");
        setBg(false)
    }
    if (currentTheme === "dark") {
      setBg(true)
    }
}, [])

  return (
    <>
    <img className='main-background' src={bg ? mainDark : mainLight} alt="background of main-page" />
      <div className="main-logo">
        <img src={mylogo} alt="#" className='main-logo__logo' />
      </div>
      <div className="wrap">
        <div className="main-elements">
          <div className="main-elementswrap">
            <div className="main-elements__title">
              <span className="main-elements__title-p">Удачного Путешествия</span>
            </div>
            <div className="main-elements__btns">
              <NavLink className='main-elements_btn' to="/signin"><p className='main-elements_btn-text'>вход</p></NavLink>
              <NavLink className='main-elements_btn' to='/signup'><p className='main-elements_btn-text'>регистрация</p></NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}