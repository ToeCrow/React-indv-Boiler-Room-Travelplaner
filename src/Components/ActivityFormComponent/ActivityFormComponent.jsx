import React from 'react';

const ActivityFormComponent = ({ activity, handleChange, handleSubmit, isEditing, handleCancel }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Redigera Aktivitet' : 'Lägg till Aktivitet'}</h2>
      
      <label>Aktivitet:</label>
      <input type="text" name="activity" value={activity.activity} onChange={handleChange} required />

      <label>Datum:</label>
      <input type="date" name="date" value={activity.date} onChange={handleChange} required />

      <label>Plats:</label>
      <input type="text" name="place" value={activity.place} onChange={handleChange} required />

      <button type="submit">{isEditing ? 'Spara ändringar' : 'Lägg till aktivitet'}</button>
      <button type="button" onClick={handleCancel}>Avbryt</button>
    </form>
  );
};

export default ActivityFormComponent;
