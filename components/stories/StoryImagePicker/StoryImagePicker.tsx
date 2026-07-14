'use client';

import Image from 'next/image';
import { useRef } from 'react';
import css from './StoryImagePicker.module.css';
import placeholder from '/public/images/Placeholder.webp';
import { useField } from 'formik';

interface StoryImagePickerProps {
  imagePreview: string;
  handleImageChange: (file: File | null) => void;
}

export default function StoryImagePicker({
  imagePreview,
  handleImageChange,
}: StoryImagePickerProps) {
  const [, meta, helpers] = useField<File | null>('img');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleImageChange(file ?? null);

    if (!file) return;

    if (file){
      if(!allowedTypes.includes(file.type) || file.size > 1024 * 1024)
          helpers.setTouched(true);
      return handleImageChange(file ?? null);
    }
  };

  return (
    <div>
      <div className={css.imageWrapper}>
        <Image
          src={imagePreview || placeholder}
          alt="Story image"
          width={335}
          height={223}
          className={css.image}
        />
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={css.uploadButton}
      >
        Завантажити фото
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onChange}
        hidden
      />
      {meta.touched && meta.error && (
        <span className={css.error}>{meta.error}</span>
      )}
    </div>
  );
}
