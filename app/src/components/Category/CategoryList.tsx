import React from 'react'


interface Category {
    id: string;
    category: string;
    childs: Category[];
}

interface CategoryListProps {
    categories: Category[],
    level: number,
    setCurrentCategory: React.Dispatch<React.SetStateAction<number>>;
}




const CategoryList: React.FC<CategoryListProps> = ({ categories, level, setCurrentCategory }) => {
    const TagName = `h${level}`;

    return (
        <ul>
            {Object.keys(categories).map((id: any) => (
                <li key={id}>
                    {React.createElement(
                        TagName,
                        {
                            onClick: () => {
                                setCurrentCategory(id);
                            },
                        },
                        categories[id].category
                    )}
                    {categories[id].childs && Object.keys(categories[id].childs).length > 0 && (
                        <CategoryList categories={categories[id].childs} level={level + 1} setCurrentCategory={setCurrentCategory}  />
                    )}
                </li>
            ))}
        </ul>
    );
};







export default CategoryList