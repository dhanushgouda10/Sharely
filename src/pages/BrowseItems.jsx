import { useState, useEffect, useMemo } from 'react';
import { FilterBar } from '../components/FilterBar';
import { ItemCard } from '../components/ItemCard';
import { Skeleton } from '../components/ui/Skeleton';
import { items } from '../data/items';

export function BrowseItems() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortValue, setSortValue] = useState('newest');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filteredItems = useMemo(() => {
    let list = selectedCategory
      ? items.filter((i) => i.category === selectedCategory)
      : [...items];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q)
      );
    }
    if (sortValue === 'newest') {
      list.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    } else if (sortValue === 'nearest') {
      list.sort((a, b) => a.location.localeCompare(b.location));
    } else if (sortValue === 'popular') {
      list.sort(() => Math.random() - 0.5);
    }
    return list;
  }, [searchQuery, selectedCategory, sortValue]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-24 rounded-2xl" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Browse Items</h1>
        <p className="text-muted-foreground mt-1">Find what your neighbours are sharing</p>
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-muted/20 py-16 text-center">
          <p className="text-muted-foreground">No items match your filters. Try changing search or category.</p>
        </div>
      )}
    </div>
  );
}
