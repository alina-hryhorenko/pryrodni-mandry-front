import { getCategories } from '@/services/categories';
import { useEffect, useState } from 'react'
import style from './CategoryFilter.module.css'

export const ALL_CATEGORIES = 'all';

interface CategoryFilterProps {
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onSelectCategory }: CategoryFilterProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async() => {
        try{
            const res = await getCategories();
            setCategories(res.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не вдалося завантажити категорії');
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const categoriesFilter: Category[] = [
        {
            _id: ALL_CATEGORIES,
            category: 'Всі статті'
        },
        ...categories
    ]

  return (
    <>
        {error && <p className={style.error}>{error}</p>}

        <ul className={style.categoryList}>
            {categoriesFilter.map((category) => (
                <li
                    className={`${style.categoryElement} ${activeCategory === category._id ? style.active : ''}`}
                    key={category._id}
                    onClick={() => onSelectCategory(category._id)}
                >
                    {category.category}
                </li>
            ))}
        </ul>
    </>
  )
}

export default CategoryFilter
