import React, {useState} from 'react';
import DraggableTextBox from './DraggableTextBox';
import { gql, useMutation, useQuery } from '@apollo/client';


const GET_CHATGPT_RESPONSE = gql`
  mutation GetChatGptResponse($prompt: String!) {
    getChatGptResponse(prompt: $prompt)
  }
`;

const GET_ALL_TEXT_BOXES = gql`
  query GetAllTextBoxes {
    getAllTextBoxes {
      id
      content
      x
      y
      lastEdited
    }
  }
`;
// isSaved

const GET_TEXT_BOXES = gql`
query GetTextBoxes {
  textBoxes {
    _id
    content
    x
    y
    isSaved
  }
}`;

const SAVE_TEXT_BOX = gql`
mutation SaveTextBox($id: ID!, $content: String!) {
    saveTextBox(id: $id, content: $content) {
      id
      content
  }
}`;

// const SAVE_TEXT_BOX = gql`
// mutation SaveTextBox($id: ID!, $content: String!, $x: Int!, $y: Int!) {
//   saveTextBox(id: $id, content: $content, x: $x, y: $y) {
//     id
//     content
//     x
//     y
//     isSaved
//   }
// }`;



const CREATE_TEXT_BOX = gql`
mutation CreateTextBox($content: String!, $x: Int!, $y: Int!) {
  createTextBox(content: $content, x: $x, y: $y) {
    _id
  }
}`;

const DELETE_TEXT_BOX = gql`
mutation DeleteTextBox($id: ID!) {
  deleteTextBox(id: $id)
}`;

const UPDATE_POSITION = gql`
mutation UpdatePosition($id: ID!, $x: Int!, $y: Int!) {
  updatePosition(id: $id, x: $x, y: $y){
    id
    x
    y
  }
}`;

// const UPDATE_POSITION = gql`
// mutation UpdatePosition($id: ID!, $x: Int!, $y: Int!) {
//   updatePosition(id: $id, x: $x, y: $y){
//     id
//     x
//     y
//     content
//     lastEdited
//   }
// }`;


function TextBoxList({ onSave }) {
//   const [getResponse, { gptData, gptLoading, gptError }] = useMutation(GET_CHAT_GPT_RESPONSE);
  const [getChatGptResponse, { gptData, gptLoading, gptError }] = useMutation(GET_CHATGPT_RESPONSE);

//   const handleChatGptRequest = () => {
//     getResponse({ variables: { prompt: textBox.content } });
//   };


  const { loading, error, data } = useQuery(GET_ALL_TEXT_BOXES);
//   const { loading, error, data } = useQuery(GET_TEXT_BOXES);

  const [saveTextBox] = useMutation(SAVE_TEXT_BOX);
  

  const [createTextBox] = useMutation(CREATE_TEXT_BOX);
  const [deleteTextBox] = useMutation(DELETE_TEXT_BOX);
  const [updatePosition] = useMutation(UPDATE_POSITION);
// const [newTextBoxes, setNewTextBoxes] = useState([]);
  const [textBoxes, setTextBoxes] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading text boxes.</p>;

  
  const handleAddTextBox = () => {
    const newTextBox = {
      id: Date.now(),
      content: '',
      x: 100, 
      y: 100,
      isSaved: false
    };
    setTextBoxes([...textBoxes, newTextBox]);
  };
  
  
//   const handleSave = (id, { content, x, y }) => {
//     createTextBox({ variables: { content, x, y } });
//     const updatedTextBoxes = textBoxes.map(tb => {
//       if (tb.id === id) return { ...tb, isSaved: true };
//       return tb;
//     });
//     setTextBoxes(updatedTextBoxes);
//   };
  
    const handleSave = (id, content) => {
        console.log('handleSave', id, content);
        // onSave('this is a hardcoded string being here for reasons')

        // const gptPrompt = content;
        // const gptPrompt = `pretend you're two benjamin franklins, stuck in a void, and all you can see is the following floating text: ${gptPrompt}`;
        // !!! this should technically be after the save, but the save keeps failing, even though the db does get updated
        // getChatGptResponse({ variables: { prompt: gptPrompt } })
        getChatGptResponse({ variables: { prompt: content } })
            .then(response => {
                console.log("👽ChatGPT response:", response.data.getChatGptResponse);
                // You can also set state here to display the response in the UI
                onSave(response.data.getChatGptResponse);
                window.cheat(response.data.getChatGptResponse);
                
            })
            .catch(error => {
                console.error("👽Error getting response from ChatGPT:", error);
            });




        saveTextBox({ 
            variables: { id, content },
            update: (cache, { data: { saveTextBox } }) => {
                // Optionally update cache here if needed
            }
        })
        .then(response => console.log("Text saved successfully\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1\n1", response))
        .catch(error => console.error("Error saving text box:\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2\n2", error));
    };







//   const handleSave = (id, { x, y }) => {
//     return
//     createTextBox({ variables: { content: "", x, y } });
//   };

  
  const handleDelete = (id) => {
    deleteTextBox({ variables: { id } });
    const updatedTextBoxes = textBoxes.filter(tb => tb.id !== id);
    setTextBoxes(updatedTextBoxes);
  };
//   const handleDelete = (id) => {
//     return
//     deleteTextBox({ variables: { id } });
//   };

//   const handleUpdatePosition = (id, x, y) => {
//     return
//     updatePosition({ variables: { id, x, y } });
//   };
  const handleUpdatePosition = (id, { x, y }) => {
    console.log('yupp', id, x, y)
    updatePosition({ 
        variables: { id, x, y },
        update: (cache, { data: { updatePosition } }) => {
            // Here you can manually write to the cache or refetch queries as needed
            cache.modify({
            fields: {
                getAllTextBoxes(existingTextBoxes = [], { readField }) {
                return existingTextBoxes.map(box => {
                    if (readField('id', box) === id) {
                    return { ...box, x, y };  // Update position in the cache
                    }
                    return box;
                });
                }
            }
            });
        }
    
    }).catch(error => {
        console.error("Error updating position:", error);
    });
  };

  

  
//   return (
//     <div>
//       {data.textBoxes.map(textBox => (
//         <DraggableTextBox
//           key={textBox._id}
//           textBox={textBox}
//           onSave={handleSave}
//           onDelete={handleDelete}
//           onUpdatePosition={handleUpdatePosition}
//         />
//       ))}
//       <button onClick={() => handleSave(null, { x: 100, y: 100 })}>New Text Box</button>
//     </div>
//   );

//   return (
//     <div>
//       <h2>Text Boxes</h2>
//       {data.getAllTextBoxes.map(textBox => (
//         <div key={textBox.id}>
//           <p>{textBox.content}</p>
//           <p>Position: ({textBox.x}, {textBox.y})</p>
//           <p>Last Edited: {textBox.lastEdited}</p>
//         </div>
//       ))}
//     </div>
//   );

  
  return (
    <div>
      <h2>Text Boxes</h2>
      {/* <button onClick={handleAddTextBox}>Add Text Box</button> */}
      {data.getAllTextBoxes.map(textBox => (
        <DraggableTextBox
            key={textBox.id}
            textBox={textBox}
            onSave={handleSave}
            onDelete={handleDelete}
            onUpdatePosition={handleUpdatePosition}
        />
      ))}
      
       {data.getAllTextBoxes.map(textBox => (
         <div key={textBox.id}>
           <p>{textBox.content}</p>
           <p>Position: ({textBox.x}, {textBox.y})</p>
           <p>Last Edited: {textBox.lastEdited}</p>
         </div>
       ))}
    </div>
  );

}

export default TextBoxList;