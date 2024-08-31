import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Slide, Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export const Gallery = ({
    images,
    timing
}: {
    images: string[];
    timing: number;
    imageWidth?: number;
    imageHeight?: number;
}) => {
    const [index, setIndex] = useState(0);
    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'contain',
        height: "100vh",
        width: "100vw",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }
    images = images.sort(() => Math.random() - 0.5);
    return (
        <div className="slide-container">
            <Fade arrows={false} duration={timing*1000}>
            {images.map((image, index)=> (
                <div key={index}>
                    <div style={{...divStyle, 'backgroundImage': `url(${image})` }}>
                    </div>
                </div>
            ))} 
            </Fade>
        </div>
    );
}
