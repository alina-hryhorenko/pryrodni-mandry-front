'use client';

import { useCategories } from '@/hooks/useCategories';
import css from './CategoriesFilter.module.css';
import { useState } from 'react';

type Props = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function CategoriesFilter({
  selectedCategory,
  onCategoryChange,
}: Props) {
  const { data, isLoading } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  if (isLoading) return <p>Loading...</p>;

    const selected =
    data?.find(
      (item) => item._id === selectedCategory,
    )?.category || 'Всі статті';

    return (<div className='container'>
        <p className={css.heading}>Категорії</p>
        {/* TABLET & DESKTOP */}
        <div className={css.desktop}>
          <button
            className={
              selectedCategory === ''
                ? css.active
                : css.button
            }
            onClick={() => onCategoryChange('')}
          >Всі статті</button>
    
          {data?.map((category) => (
            <button
              key={category._id}
              className={
                selectedCategory === category._id
                  ? css.active
                  : css.button
              }
              onClick={() =>
                onCategoryChange(category._id)
              }
            >
              {category.category}
            </button>
          ))}
        </div>
        {/* MOBILE */}
        <div className={css.mobileSelect}>
        <button
          type="button"
          className={css.selectButton}
          onClick={() =>
            setIsOpen((prev) => !prev)
          }
        >
          <span>{selected}</span>

          <svg
            className={`${css.icon} ${
              isOpen ? css.open : ''
            }`}
          >
            <use href="/icons/sprite.svg#icon-arrow_down" />
          </svg>
        </button>

        {isOpen && (
          <ul className={css.dropdown}>
            <li
  className={`${css.option} ${
    selectedCategory === ''
      ? css.active
      : ''
  }`}
  onClick={() => {
    onCategoryChange('');
    setIsOpen(false);
  }}
>
  Всі статті
</li>

            {data?.map((category) => (
              <li
                key={category._id}
                className={`${css.option} ${
                  selectedCategory ===
                  category._id
                    ? css.active
                    : ''
                }`}
                onClick={() => {
                  onCategoryChange(
                    category._id,
                  );
                  setIsOpen(false);
                }}
              >
                {category.category}
              </li>
            ))}
          </ul>
        )}
      </div>
  </div>
  );
}