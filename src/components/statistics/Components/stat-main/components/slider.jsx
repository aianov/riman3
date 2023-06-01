import React from "react";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";

export const Slider = () => {
    const slider = document.querySelector(".slider__items")

    const prevSlide = () => {
        slider.scrollBy({
            left: -150, // Задайте нужный размер прокрутки
            behavior: 'smooth' // Добавляем плавную анимацию
        });
    };
    const nextSlide = () => {
        slider.scrollBy({
            left: 150, // Задайте нужный размер прокрутки
            behavior: 'smooth' // Добавляем плавную анимацию
        });
    };

    const images = {};
    const pngFiles = require.context('../images', true, /\.png$/);
    pngFiles.keys().forEach((key) => {
        images[key] = pngFiles(key);
    });

    return (
        <div className="slider-div1">
            <div
                className="slider__control slider__control--left"
                onClick={prevSlide}
            >
                <BsCaretLeft size={30} />
            </div>
            <div className="slider-div">
                <div className="slider">
                    <div className="slider__items">
                        {Object.keys(images).map((key, ind) => (
                            <div className="slider__item" key={ind}>
                                <div className="slider__item-image">
                                    <img key={ind} className="slider__item-image-image" src={images[key]} alt={key} />
                                </div>
                                <div className="slider__item-text">
                                    <p>{ind + 1}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className="slider__control slider__control--right"
                onClick={nextSlide}
            >
                <BsCaretRight size={30} />
            </div>
        </div>
    );
};