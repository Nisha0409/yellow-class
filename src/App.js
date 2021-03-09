import React, { useState, useEffect } from "react";
import { Loader } from "./ImageLoader";
import { UnsplashImage } from "./UnsplashImage";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import "./App.css";
import axios from "axios";
//import { ActivityIndicator } from 'react-native';
//import { Image } from 'react-native-elements';

// import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

// Style
const GlobalStyle = createGlobalStyle`

`;

function App() {
  const [images, setImg] = useState([]);
  const [loadedimage,loading] =useState(false)
  const [currindex,setindex] =useState(0);
  const [myimagemodel,setimagemodel] =useState(false)

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {

    axios
      .get(`https://api.unsplash.com/photos/random?client_id=3fRFcdULcOxXx9OxvOaZ5GVvMkPq8jMdWO58L2-8us8&count=50`)
      .then((res) => setImg([...images, ...res.data]));
  };
  const Eachimage = ({url,key,index})=>(
    <div className = "image" key={key} >
      <img src={url} alt = "loading" onclick={() => {
        console.log(index,images[index])
        setindex(index);
        setimagemodel(true);
      }}/>
    </div>
  )
  const breakpointColumnsObj = {
    default: 6,
    1288: 4,
    992: 3,
    768: 2,
    576: 1,
  };

  return (
    <>
      
      <Loader />
      <GlobalStyle />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {images.map((image, idx) => (
            <UnsplashImage url={image.urls.thumb} key={idx} />
          ))}

        </Masonry>
        
      ( <div classname="imagepopup">
        {loadedimage? images.map((image, index)=>(
        <Eachimage 
        url={image.urls.thumb}
        key={index}
        index={index}
        />
      )) : ''}
    </div>

    </InfiniteScroll>
    </>
  );
}

export default App;


