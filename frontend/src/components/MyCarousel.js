import React, { useState } from 'react';
   import {
     Carousel,
     CarouselItem,
     CarouselControl,
     CarouselIndicators,
     CarouselCaption
   } from 'reactstrap';

const MyCarousel = (props) => {
   // console.log(props.items)
   const images = props.items;
   let items = [];
   let i=0;
   images.forEach(img => {
      let element = {
         id: i,
         altText: 'Slide 1',
         caption: 'Slide 1',
         src:img
      }
      items.push(element);
      i++;
   });

     const [activeIndex, setActiveIndex] = useState(0);
     const [animating, setAnimating] = useState(false);
   
     const next = () => {
       if (animating) return;
       const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
       setActiveIndex(nextIndex);
     }
   
     const previous = () => {
       if (animating) return;
       const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
       setActiveIndex(nextIndex);
     }
   
     const goToIndex = (newIndex) => {
       if (animating) return;
       setActiveIndex(newIndex);
     }
   
     const slides = items.map((item) => {
       return (
         <CarouselItem
           className="custom-tag"
           tag="div"
           key={item.id}
           onExiting={() => setAnimating(true)}
           onExited={() => setAnimating(false)}
         >
           <CarouselCaption className="text-danger" captionText={item.caption} captionHeader={item.caption} />
           <img src={item.src} />
         </CarouselItem>
       );
     });
   
     return (
       <div>
         <style>
           {
             `.custom-tag {
                 max-width: 100%;
                 height: 500px;
                 background: black;
               }`
           }
         </style>
         <Carousel
           activeIndex={activeIndex}
           next={next}
           previous={previous}
         >
           <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
           {slides}
           <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
           <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
         </Carousel>
       </div>
     );

}

export default MyCarousel;