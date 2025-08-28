import { useState } from 'react';

const FilterSection = ({ onFilter }) => {
  const [filter, setFilter] = useState({ date: '', subject: '', student: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilter = { ...filter, [name]: value };
    setFilter(newFilter);
    onFilter(newFilter);
  };

  return (
    <div className="flex gap-4 mb-4">
      <input type="date" name="date" onChange={handleChange} className="border px-2 py-1" />
      <input type="text" name="subject" placeholder="Subject" onChange={handleChange} className="border px-2 py-1" />
      <input type="text" name="student" placeholder="Student" onChange={handleChange} className="border px-2 py-1" />
    </div>
  );
};

export default FilterSection;
