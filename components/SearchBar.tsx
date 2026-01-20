'use client'

import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
}

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#C9A24D]" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search our collection..."
        className="w-full pl-12 pr-12 py-3 border-2 border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C9A24D] focus:ring-2 focus:ring-[#C9A24D]/20 transition-all bg-white text-[#0F1115] placeholder-[#7A7A7A] gold-glow"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#7A7A7A] hover:text-[#C9A24D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
