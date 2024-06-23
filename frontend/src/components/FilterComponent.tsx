import React, { useState } from 'react';

interface FilterField {
  title: string;
  key: string;
  values: string[];
}

interface FilterComponentProps {
  filterFields: FilterField[];
  setSelectedFilterFields : React.Dispatch<React.SetStateAction<any>>
}

const FilterComponent = ({ filterFields, setSelectedFilterFields }: FilterComponentProps) => {
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});

  const handleSelectChange = (key: string, value: string) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedValues);
    setSelectedFilterFields(selectedValues);
  };

  const handleReset = () => {
    const resetValues: { [key: string]: string } = {};
    filterFields.forEach((field) => {
      resetValues[field.key] = '';
    });
    setSelectedValues(resetValues);
    setSelectedFilterFields(resetValues);
  };

  return (
    <form onSubmit={handleSubmit} className='py-10 w-full flex gap-4'>
      {filterFields.map((field) => (
        <div key={field.key} className='p-2 rounded-xl border'>
          <select
            name={field.key}
            value={selectedValues[field.key] || ''}
            onChange={(e) => handleSelectChange(field.key, e.target.value)}
            className='outline-none'
          >
            <option value=''>Select {field.title}</option>
            {field.values.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button type='submit' className='p-3 border rounded-xl text-white bg-indigo-300 font-bold'>
        Search
      </button>
      <button type='button' onClick={handleReset} className='p-3 border rounded-xl text-white bg-indigo-300 font-bold'>
        Reset
      </button>
    </form>
  );
};

export default FilterComponent;
