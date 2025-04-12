// /components/CreateTableForm.js
import { useState } from 'react';
import supabase from '../lib/supabaseClient';

const CreateTableForm = () => {
  const [tableName, setTableName] = useState('');
  const [tableCapacity, setTableCapacity] = useState('');

  const handleTableCreation = async () => {
    const newTable = {
      name: tableName,
      capacity: parseInt(tableCapacity),
      availableSeats: parseInt(tableCapacity),
    };

    // Insert table into the database
    const { data, error } = await supabase.from('tables').insert([newTable]);

    if (error) {
      console.error(error);
    } else {
      setTableName('');
      setTableCapacity('');
      alert('Table created successfully');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
        placeholder="Table Name"
      />
      <input
        type="number"
        value={tableCapacity}
        onChange={(e) => setTableCapacity(e.target.value)}
        placeholder="Table Capacity"
      />
      <button onClick={handleTableCreation}>Create Table</button>
    </div>
  );
};

export default CreateTableForm;
