import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Search } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

const CATEGORIES = ['Groceries', 'Clothes', 'Books', 'Essentials'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'nearest', label: 'Nearest' },
  { value: 'popular', label: 'Popular' },
];

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortValue,
  onSortChange,
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full sm:w-40"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!selectedCategory ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange('')}
        >
          All
        </Button>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(selectedCategory === cat ? '' : cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
}
