'use client'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onCategoryChange('')}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
          selectedCategory === ''
            ? 'bg-[#0F1115] text-[#C9A24D] border-2 border-[#C9A24D]'
            : 'bg-white border-2 border-[#E8DCC4] text-[#0F1115] hover:border-[#C9A24D] hover:text-[#C9A24D]'
        }`}
      >
        All Collections
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-[#0F1115] text-[#C9A24D] border-2 border-[#C9A24D]'
              : 'bg-white border-2 border-[#E8DCC4] text-[#0F1115] hover:border-[#C9A24D] hover:text-[#C9A24D]'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  )
}
