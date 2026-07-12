'use client';

import { useState } from 'react';
import CategoriesFilter from '@/components/CategoriesFilter/CategoriesFilter';

export default function TravellersPage() {
  const [selectedCategory, setSelectedCategory] = useState('');


  return (
    <>
      <CategoriesFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

    </>
  );
}