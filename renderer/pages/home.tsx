import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import {useState, useEffect } from 'react';
import fs from 'fs'
import path from 'path'
import { Gallery } from '../components/gallery'
export const getStaticProps = (async (context) => {
  const dirRelativeToPublicFolder = 'gallery'

  const dir = path.resolve('./renderer/public', dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  const images = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))

  return { props: { images } }
}) satisfies GetStaticProps<{
  images: string[]
}>

export default function HomePage({
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  
  const size = useWindowSize();
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-tailwindcss)</title>
      </Head>
      <Gallery images={images} timing={5} imageWidth={size.width} imageHeight={size.height}/>
    </React.Fragment>
  )
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.screen.width,
        height: window.screen.height,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
     
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}