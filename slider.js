'use strict';

/**
 * Global Constants
 * All constant variables should be placed here.
 */
const slidesConfig = {
    slides: document.querySelectorAll('.pg-c-slider--radio'),
    controllers: document.querySelectorAll('.pg-c-slider--controls-item'),
    checkboxPrefix: 'pg-slider-0',
    interval: 15000,
};

/**
 * Global Variants
 * All changeable variables should be placed here.
 */
let slideCount = 1;

/**
 * Rotate Slides : Slider
 * 
 * @param {object} slidesConfig 
 * 
 */
const rotateSlides = (slidesConfig) => {
    // Loop through the slides.
    setInterval(() => {
        // Reset slideCount if this is the last slide.
        resetIfLastSlide(slidesConfig.slides.length);
        // Get the current slide.
        document.getElementById(slidesConfig.checkboxPrefix + slideCount).checked = true;
        // Remove the 'active' class from all controllers.
        slidesConfig.controllers.forEach(slide => {
            slide.classList.remove('active');
        });
        // Add the 'active' class to the current controller.
        document.querySelector('label[for="' + slidesConfig.checkboxPrefix + slideCount + '"]').classList.add('active');
        // Increment the slideCount.
        ++slideCount;
    }, slidesConfig.interval);
}

/**
 * Reset Slides After Last Slide
 * 
 * @param {number} numberOfSlides 
 */
const resetIfLastSlide = (numberOfSlides) => {
    if (slideCount > numberOfSlides) {
        slideCount = 1;
        return slideCount;
    }
}

/**
 * Enable Slide Navigation
 * 
 * @param {object} slidesConfig 
 */
const slideNavigation = (slidesConfig) => {
    // Loop through each controller.
    slidesConfig.controllers.forEach(slide => {
        // Add a 'click' event listener to each controller.
        slide.addEventListener('click', event => {
            // Loop through each controller.
            slidesConfig.controllers.forEach(slide => {
                // Remove the 'active' class from each controller.
                slide.classList.remove('active');
            });
            // Add the 'active' class to the current controller.
            slide.classList.add('active');
        });
    });
}

rotateSlides(slidesConfig);
slideNavigation(slidesConfig);