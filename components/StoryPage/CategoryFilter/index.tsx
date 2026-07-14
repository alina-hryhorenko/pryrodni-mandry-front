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
    

    const fetchCategories = async () => {
        try {
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
    const [isOpen, setIsOpen] = useState(false);

    const selectedCategory =
        categoriesFilter.find(
            item => item._id === activeCategory
        )?.category || 'Всі статті';

    return (
        <div className="container">
            {error && <p className={style.error}>{error}</p>}

            <div className={style.mobileSelect}>
                <p className={ style.heading}>Категорії</p>
                <button
                    type="button"
                    className={style.selectButton}
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <span>{selectedCategory}</span>

                    <svg
                        className={`${style.icon} ${isOpen ? style.open : ''
                            }`}
                    >
                        <use href="/icons/sprite.svg#icon-arrow_down" />
                    </svg>
                </button>

                {isOpen && (
                    <div className={style.dropdown}>
                        {categoriesFilter.map(category => (
                            <button
                                key={category._id}
                                type="button"
                                className={`${style.option} ${activeCategory === category._id
                                        ? style.active
                                        : ''
                                    }`}
                                onClick={() => {
                                    onSelectCategory(category._id);
                                    setIsOpen(false);
                                }}
                            >
                                {category.category}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <ul className={style.categoryList}>
                {categoriesFilter.map(category => (
                    <li
                        key={category._id}
                        className={`${style.categoryElement} ${activeCategory === category._id
                                ? style.active
                                : ''
                            }`}
                        onClick={() =>
                            onSelectCategory(category._id)
                        }
                    >
                        {category.category}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryFilter
