
import React from 'react';

const Overlay = ({ text }) => {
  if (!text) return null; // If no text is provided, do not render the overlay

  return (
    // <div className="overlay">
    //   {text}
    // </div>

    
    <div className="overlay">
    {text.split('\n').map((item, index) => (
    <p key={index}>{item}</p> // Using index as key; consider using more unique keys if available
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