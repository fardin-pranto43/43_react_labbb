import React, { useState, useEffect } from 'react';

const TextBoxList = () => {
  const [textboxes, setTextboxes] = useState([0]);
  const [sum, setSum] = useState(0);
  const [invalidInputs, setInvalidInputs] = useState([]);

  const handleAddTextBox = () => {
    setTextboxes((prevTextboxes) => [...prevTextboxes, 0]);
  };

  const handleDeleteTextBox = (index) => {
    setTextboxes((prevTextboxes) => {
      const updatedTextboxes = [...prevTextboxes];
      updatedTextboxes.splice(index, 1);
      return updatedTextboxes;
    });
    setInvalidInputs((prevInvalidInputs) => {
      const updatedInvalidInputs = [...prevInvalidInputs];
      updatedInvalidInputs.splice(index, 1);
      return updatedInvalidInputs;
    });
  };

  const handleInputChange = (index, value) => {
    if (!isNaN(value)) {
      setInvalidInputs((prevInvalidInputs) => {
        const updatedInvalidInputs = [...prevInvalidInputs];
        updatedInvalidInputs[index] = null;
        return updatedInvalidInputs;
      });
      setTextboxes((prevTextboxes) => {
        const updatedTextboxes = [...prevTextboxes];
        updatedTextboxes[index] = parseInt(value, 10) || 0;
        return updatedTextboxes;
      });
    } else {
      setInvalidInputs((prevInvalidInputs) => {
        const updatedInvalidInputs = [...prevInvalidInputs];
        updatedInvalidInputs[index] = value;
        return updatedInvalidInputs;
      });
    }
  };

  // Calculate and update the sum whenever the textboxes change
  useEffect(() => {
    const calculatedSum = textboxes.reduce((acc, value) => acc + value, 0);
    setSum(calculatedSum);
  }, [textboxes]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Number Box List</h1>
      <button onClick={handleAddTextBox}>Add</button>
      {textboxes.map((value, index) => (
        <div key={index} style={{ margin: '10px' }}>
          <input
            type="text"
            value={invalidInputs[index] !== null ? invalidInputs[index] : value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            style={{ fontSize: '16px' }}
          />
          <button onClick={() => handleDeleteTextBox(index)}>Delete</button>
        </div>
      ))}
      {invalidInputs.map((error, index) => (
        error && <div key={index} style={{ color: 'red', fontSize: '16px', margin: '10px' }}>{`Invalid Input: ${error}`}</div>
      ))}
      <div style={{ fontSize: '20px', marginTop: '20px' }}>
        <strong>Sum:</strong> {sum}
      </div>
    </div>
  );
};

export default TextBoxList;
