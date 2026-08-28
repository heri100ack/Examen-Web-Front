import React from 'react';

export default function Question({ question, index, selectedOption, onSelect }) {
  return (
    <div className="card border-0 shadow-sm p-4 mb-3">
      <h5 className="fw-bold mb-3">
        <span className="text-primary me-2">Q{index + 1}.</span> {question.text}
      </h5>
      <div className="d-flex flex-column gap-2">
        {question.options?.map((opt) => (
          <label 
            key={opt.id} 
            className={`form-check-label border rounded p-3 d-flex align-items-center gap-3 cursor-pointer ${
              selectedOption === opt.id ? 'border-primary bg-light' : ''
            }`}
          >
            <input
              type="radio"
              name={`q-${question.id}`}
              className="form-check-input"
              checked={selectedOption === opt.id}
              onChange={() => onSelect(question.id, opt.id)}
            />
            <span>{opt.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}