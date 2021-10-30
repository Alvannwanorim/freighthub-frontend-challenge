/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
  label: string
}

const SortDropdown = ({ options, label, ...props }: Props) => {
  return (
    <div>
      <label htmlFor={label}>
        <select {...props}>
          <option value="" disabled hidden>
            Sort by
          </option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default SortDropdown
