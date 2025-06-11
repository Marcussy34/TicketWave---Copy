import React, { useState, useEffect } from 'react';
import ChevronIcon from '../public/ChevronIcon';
import concertData from '../data/data.json';

const ImageSlider = ({ concertIds }) => {
  const sliderData = concertIds && !concertIds.includes(-1)
    ? concertData.concerts.filter(concert => concertIds.includes(concert.id))
    : concertData.concerts;

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = sliderData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [maxSteps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <div 
        className="flex flex-row h-full transition-transform duration-500 ease-in-out"
        style={{
          width: `${100 * maxSteps}%`,
          transform: `translateX(-${activeStep * (100 / maxSteps)}%)`,
        }}
      >
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className="relative flex-shrink-0 h-full overflow-hidden"
            style={{ width: `${100 / maxSteps}%` }}
          >
            {/* Blurred background */}
            <div 
              className="absolute inset-0 bg-cover bg-center filter blur-md scale-110"
              style={{ backgroundImage: `url(${slide.imgCover})` }}
            ></div>
            {/* Main image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={slide.imgCover}
                alt={slide.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Arrow and Pagination Controls */}
      <div className="absolute bottom-[2%] left-0 right-0 flex justify-center items-center z-10">
        <button
          className="mr-4 text-white"
          onClick={handleBack}
          aria-label="Previous slide"
        >
          <ChevronIcon />
        </button>

        {sliderData.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${
              index === activeStep ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setActiveStep(index)}
          />
        ))}

        <button
          className="ml-4 text-white"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronIcon className="rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;



// import React, { useState, useEffect } from 'react';
// import ChevronIcon from '../public/ChevronIcon';
// import concertData from '../data/data.json';

// const ImageSlider = ({ concertIds }) => {
//   const sliderData = concertIds 
//     ? concertData.concerts.filter(concert => concertIds.includes(concert.id))
//     : concertData.concerts;

//   const [activeStep, setActiveStep] = useState(0);
//   const maxSteps = sliderData.length;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
//     }, 5000); // Change slide every 5 seconds
//     return () => clearInterval(interval);
//   }, [maxSteps]);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
//   };

//   return (
//     <div className="relative w-full h-[60vh] overflow-hidden">
//       <div 
//         className="flex flex-row h-full transition-transform duration-500 ease-in-out"
//         style={{
//           width: `${100 * maxSteps}%`,
//           transform: `translateX(-${activeStep * (100 / maxSteps)}%)`,
//         }}
//       >
//         {sliderData.map((slide) => (
//           <div
//             key={slide.id}
//             className="flex-shrink-0 h-full overflow-hidden"
//             style={{ width: `${100 / maxSteps}%` }}
//           >
//             <img
//               src={slide.imgCover}
//               alt={slide.title}
//               className="w-full h-full object-cover object-top"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Arrow and Pagination Controls */}
//       <div className="absolute bottom-[2%] left-0 right-0 flex justify-center items-center z-10">
//         <button
//           className="mr-4 text-white"
//           onClick={handleBack}
//           aria-label="Previous slide"
//         >
//           <ChevronIcon />
//         </button>

//         {sliderData.map((_, index) => (
//           <span
//             key={index}
//             className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${
//               index === activeStep ? 'bg-white' : 'bg-white/50'
//             }`}
//             onClick={() => setActiveStep(index)}
//           />
//         ))}

//         <button
//           className="ml-4 text-white"
//           onClick={handleNext}
//           aria-label="Next slide"
//         >
//           <ChevronIcon className="rotate-180" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ImageSlider;