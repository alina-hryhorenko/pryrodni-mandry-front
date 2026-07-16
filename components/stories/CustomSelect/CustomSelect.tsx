'use client';

import { useState, useRef, useEffect } from 'react';
import css from './CustomSelect.module.css';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  hasError?: boolean;
}

export default function CustomSelect({
  id,
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Оберіть значення',
  hasError = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        if (isOpen) onBlur?.();
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onBlur]);

  const handleToggle = () => {
    if (isOpen) onBlur?.();
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    onBlur?.();
  };

  return (
    <div className={css.wrapper} ref={wrapperRef}>
      <button
        id={id}
        type="button"
        className={`${css.trigger} ${hasError ? css.errorField : ''} ${
          isOpen ? css.triggerOpen : ''
        }`}
        onClick={handleToggle}
      >
        <span className={selectedOption ? css.value : css.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`${css.arrow} ${isOpen ? css.arrowOpen : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className={css.list}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${css.item} ${
                option.value === value ? css.itemSelected : ''
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
