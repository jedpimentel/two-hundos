import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

function TextBoxList() {
  const { loading, error, data } = useQuery(GET_ALL_TEXT_BOXES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading text boxes.</p>;

  return (
    <div>
      <h2>Text Boxes</h2>
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