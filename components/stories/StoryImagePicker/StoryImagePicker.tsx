'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useField } from 'formik';

import placeholder from '/public/images/Placeholder.webp';
import { ALLOWED_IMAGE_TYPES } from '@/constants/stories';

import css from './StoryImagePicker.module.css';

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleImageChange(file ?? null);

    if (!file) return;

    if (file){
      if(!ALLOWED_IMAGE_TYPES.includes(file.type) || file.size > 1024 * 1024)
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
