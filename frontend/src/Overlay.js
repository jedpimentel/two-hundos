
import React from 'react';

const Overlay = ({ text }) => {
  if (!text) return null; // If no text is provided, do not render the overlay

  const textArr = text.split('\n').filter(t => t.length > 2);
  console.log('shadoop')
  document.querySelectorAll('.fade-out').forEach(e => {
    e.classList.remove('fade-out');
    e.classList.add('fade-in');
    e.style.animationPlayState="paused";
    e.style.animationPlayState="running";
  })
  console.log(textArr)
  return (
    // <div className="overlay">
    //   {text}
    // </div>

    
    <div className="overlay">
    {textArr.map((item, index) => (
        
      <p className="fade-in" key={index}>{item}</p> // Using index as key; consider using more unique keys if available
    ))}
    </div>
  );
};
// split('\n')
export default Overlay;








// import React from 'react';

// const Overlay = ({ text, isVisible }) => {
//   if (!isVisible) return null;

//   return (
//     <div className="overlay">
//       <p>{text}</p>
//     </div>
//   );
// };

// export default Overlay;