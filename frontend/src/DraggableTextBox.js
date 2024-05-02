import React, {useState} from 'react';
import Draggable from 'react-draggable';

function DraggableTextBox({ id, textBox, onSave, onDelete, onUpdatePosition }) {
  console.log('Component mounted with textBox:', textBox);
  const [content, setContent] = useState(textBox.content);
  const [position, setPosition] = useState({ x: textBox.x, y: textBox.y });
//   const handleStop = (e, data) => {
//     console.log('handleStop')
//     setPosition({ x: data.x, y: data.y });
//     onUpdatePosition(textBox._id, data.x, data.y);
//   };

//   const handleDragStop = (e, data) => {
//     setPosition({ x: data.x, y: data.y });
//   };
  // Handle the drag stop event
  const handleDragStop = (e, data) => {
    console.log('Drag stopped at:', data.x, data.y);
    // Only update position if the text box is already saved
    // console.log(textBox.isSaved)
    // if (textBox.isSaved) {

        // I disabled this so people don't drag it too out of the way

    //   onUpdatePosition(textBox.id, { x: data.x, y: data.y });
    //   setPosition({ x: data.x, y: data.y });  // Update local React state


    // }
  };

  const handleSave = (event) => {
    event.preventDefault();
    document.querySelectorAll('.fade-in').forEach(e => {
        e.classList.remove('fade-in');
        e.classList.add('fade-out');
    })
    if (content.trim()) {
    //   onSave(textBox.id, { content, ...position });
    //   onSave(textBox.id, content, textBox.x, textBox.y);
      onSave(textBox.id, content);
    }
  };
  
  return (
    <Draggable handle=".text-box-bar" onStop={handleDragStop} defaultPosition={{ x: position.x, y: position.y }}>
      <div className="text-box-window">
        <div className="text-box-bar">
            {/* <button onClick={() => alert()}>?</button> */}
            {/* <button onClick={() => onDelete(textBox.id)}>?</button> */}
        </div>
        <textarea 
          value={content}
          placeholder='"questions, comments... just enter some text here and press Hundos"'
          onChange={(e) => setContent(e.target.value)}
          disabled={false && textBox.isSaved} 
        />
        {!textBox.isSaved && (
          <button className="unselectable" onTouchEnd={handleSave} onClick={handleSave}>Hundos</button>
        )}
        <div className="text-box-bar">
        </div>
      </div>
    </Draggable>
  );

//   return (
//     <Draggable onStop={handleStop} defaultPosition={{ x: textBox.x, y: textBox.y }}>
//       <div className="text-box-window">
//         <div className="text-box-bar">
//           <button onClick={() => onDelete(textBox._id)}>X</button>
//         </div>
//         {/* <textarea
//           defaultValue={content}
//         //   onBlur={(e) => onSave(id, e.target.value)}
//         /> */}
//         <textarea defaultValue={textBox.content} disabled={textBox.isSaved} />
//         <div className="text-box-bar">
//           {!textBox.isSaved && (
//             <button onClick={() => onSave(textBox._id, position)}>Save</button>
//           )}
//         </div>
//       </div>
//     </Draggable>
//   );
}

export default DraggableTextBox;