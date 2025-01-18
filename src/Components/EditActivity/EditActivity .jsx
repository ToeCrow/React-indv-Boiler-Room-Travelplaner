import React, { useState } from 'react';

const EditActivity = ({ activity, handleSave }) => {
  const [updatedActivity, setUpdatedActivity] = useState(activity);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedActivity({ ...updatedActivity, [name]: value });
  };

  return (
    <div>
      <input name="activity" value={updatedActivity.activity} onChange={handleChange} />
      <input name="date" value={updatedActivity.date} onChange={handleChange} />
      <input name="place" value={updatedActivity.place} onChange={handleChange} />
      <button onClick={() => handleSave(updatedActivity)}>Spara</button>
    </div>
  );
};

export default EditActivity;
