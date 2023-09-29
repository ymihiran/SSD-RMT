import styles from "./CSS/Featured.module.css";
import { useState } from "react";
import Slideshow from 'react-slidez';


const Featured = () => {

  const slides = [
    'https://res.cloudinary.com/sliit-yasantha/image/upload/v1653937624/SLIDER1_ipttex.png',
    'https://res.cloudinary.com/sliit-yasantha/image/upload/v1653938076/SLIDER2_ml7ebl.png',
    'https://res.cloudinary.com/sliit-yasantha/image/upload/v1653938406/slider3_byae23.png'
  ];
  
  return (

    
    <Slideshow
      showArrows
      autoplay
      enableKeyboard
      slideInterval={4000}
      defaultIndex={1}
      slides={slides}
      effect={'top'}
      height={'60%'}
      width={'60%'} />

  );

  
  
};

export default Featured;
