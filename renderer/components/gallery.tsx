import Image from 'next/image';
import { useState, useEffect } from 'react';

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
    const [image, setImage] = useState(images[index]);
    images = images.sort(() => Math.random() - 0.5);
    useEffect(() => {
        const interval = setInterval(() => {
            if(index >= images.length - 1){
                images = images.sort(() => Math.random() - 0.5);
                setIndex(0);
            } 
            else {
                setIndex(index + 1);
            }
            setImage(images[index]);
            console.log(images[index]);
          }, timing*1000);
        
          return () => clearInterval(interval);
    }, [index]);
    return (
        <div className="gallery">
            <div key={index} className="gallery-item">
                <Image src={image} fill priority className='object-contain w-auto' alt={'Image'} suppressHydrationWarning/>
            </div>
        </div>
    );
}
