import React, { useEffect, useState } from "react";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";

export const Slider = () => {
    const [translateValue, setTranslateValue] = useState(0);
    const [max, setMax] = useState(0);

    const gg = require.context('../images', true, /\.png$/);
    const numberOfImages = gg.keys().length;
    const items = Array.from({ length: numberOfImages }, (_, i) => i + 1);

    useEffect(() => {
        function init() {
            let num = 0;
            for (let i = 0; i < items.length - 8; i++) {
                num -= 110;
            }
            setMax(num)
        }
        init()
    }, [items.length])
    const prevSlide = () => {
        if (translateValue === 0) { return; }
        if (translateValue === -110) {
            setTranslateValue((prevValue) => prevValue + 110);
            return
        }
        setTranslateValue((prevValue) => prevValue + 110);
    };
    const nextSlide = () => {
        if (translateValue === max) { return; }
        setTranslateValue((prevValue) => prevValue - 110);
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
                    <div className="slider__items" style={{ transform: `translateX(${translateValue}px)` }}>
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