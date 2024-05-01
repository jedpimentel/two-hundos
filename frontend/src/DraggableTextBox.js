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
      onUpdatePosition(textBox.id, { x: data.x, y: data.y });
      setPosition({ x: data.x, y: data.y });  // Update local React state
    // }
  };

  const handleSave = () => {
    if (content.trim()) {
    //   onSave(textBox.id, { content, ...position });
    //   onSave(textBox.id, content, textBox.x, textBox.y);
      onSave(textBox.id, content);
    }
  };
  
  return (
    <Draggable onStop={handleDragStop} defaultPosition={{ x: position.x, y: position.y }}>
      <div className="text-box-window">
        <div className="text-box-bar">
          <button onClick={() => onDelete(textBox.id)}>X</button>
        </div>
        {/* <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          disabled={textBox.isSaved}
        /> */}
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={false && textBox.isSaved} 
        />
        <div className="text-box-bar">
          {!textBox.isSaved && (
            <button onClick={handleSave}>Save</button>
          )}
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