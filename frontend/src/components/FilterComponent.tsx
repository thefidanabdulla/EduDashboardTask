// src/components/FilterComponent.tsx
import React, { useState, ChangeEvent, FC } from 'react';

type FilterField = {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
};

interface FilterComponentProps {
  fields: FilterField[];
  onFilterChange: (filters: { [key: string]: any }) => void;
}

const FilterComponent: FC<FilterComponentProps> = ({ fields, onFilterChange }) => {
  const [filters, setFilters] = useState<{ [key: string]: any }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div>
      {fields.map(field => (
        <div key={field.name}>
          <label>{field.label}</label>
          {field.type === 'text' && (
            <input
              type="text"
              name={field.name}
              value={filters[field.name] || ''}
              onChange={handleChange}
            />
          )}
          {field.type === 'number' && (
            <input
              type="number"
              name={field.name}
              value={filters[field.name] || ''}
              onChange={handleChange}
            />
          )}
          {field.type === 'select' && (
            <select name={field.name} value={filters[field.name] || ''} onChange={handleChange}>
              {field.options && field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterComponent;
