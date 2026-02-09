export const CATEGORIES = ['Groceries', 'Clothes', 'Books', 'Essentials'];

export const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];

export const LOCATIONS = ['Whitefield', 'HSR Layout', 'Koramangala', 'Indiranagar'];

export const items = [
  {
    id: '1',
    title: 'Organic Rice & Lentils Pack',
    category: 'Groceries',
    description: 'Unopened 2kg rice and 1kg toor dal. Bought in bulk, sharing extra.',
    condition: 'New',
    location: 'Whitefield',
    imageUrl: null,
    postedAt: '2024-02-06T10:30:00',
    postedBy: 'user1',
    postedByName: 'Priya S.',
    status: 'available',
  },
  {
    id: '2',
    title: 'Winter Jackets (Kids 5-8 yrs)',
    category: 'Clothes',
    description: 'Two gently used winter jackets. Clean and in good condition.',
    condition: 'Good',
    location: 'HSR Layout',
    imageUrl: null,
    postedAt: '2024-02-05T14:20:00',
    postedBy: 'user2',
    postedByName: 'Rahul M.',
    status: 'available',
  },
  {
    id: '3',
    title: 'Clean Code & Design Patterns Books',
    category: 'Books',
    description: 'Robert Martin Clean Code and Head First Design Patterns. Light use.',
    condition: 'Like New',
    location: 'Koramangala',
    imageUrl: null,
    postedAt: '2024-02-04T09:15:00',
    postedBy: 'user3',
    postedByName: 'Anita K.',
    status: 'available',
  },
  {
    id: '4',
    title: 'Toothpaste, Soap & Shampoo Bundle',
    category: 'Essentials',
    description: 'Unused toiletries from bulk buy. Sharing with community.',
    condition: 'New',
    location: 'Indiranagar',
    imageUrl: null,
    postedAt: '2024-02-06T08:00:00',
    postedBy: 'user1',
    postedByName: 'Priya S.',
    status: 'available',
  },
  {
    id: '5',
    title: 'Fresh Vegetables Box',
    category: 'Groceries',
    description: 'Tomatoes, onions, potatoes, greens. From local market today.',
    condition: 'New',
    location: 'Whitefield',
    imageUrl: null,
    postedAt: '2024-02-06T07:45:00',
    postedBy: 'user4',
    postedByName: 'Vikram J.',
    status: 'available',
  },
  {
    id: '6',
    title: 'Men\'s Casual Shirts (M)',
    category: 'Clothes',
    description: 'Three cotton shirts, size M. Minimal wear.',
    condition: 'Good',
    location: 'Koramangala',
    imageUrl: null,
    postedAt: '2024-02-03T16:00:00',
    postedBy: 'user2',
    postedByName: 'Rahul M.',
    status: 'available',
  },
  {
    id: '7',
    title: 'JavaScript & React Books',
    category: 'Books',
    description: 'You Don\'t Know JS series + React docs. Great for learners.',
    condition: 'Like New',
    location: 'HSR Layout',
    imageUrl: null,
    postedAt: '2024-02-05T11:30:00',
    postedBy: 'user3',
    postedByName: 'Anita K.',
    status: 'available',
  },
  {
    id: '8',
    title: 'Sanitary Pads & Masks Pack',
    category: 'Essentials',
    description: 'Sealed packs. Donating to anyone in need.',
    condition: 'New',
    location: 'Indiranagar',
    imageUrl: null,
    postedAt: '2024-02-06T09:00:00',
    postedBy: 'user4',
    postedByName: 'Vikram J.',
    status: 'available',
  },
  {
    id: '9',
    title: 'Cooking Oil & Spices Set',
    category: 'Groceries',
    description: '1L oil + basic spices (turmeric, cumin, coriander). Unopened.',
    condition: 'New',
    location: 'Whitefield',
    imageUrl: null,
    postedAt: '2024-02-02T12:00:00',
    postedBy: 'user1',
    postedByName: 'Priya S.',
    status: 'available',
  },
  {
    id: '10',
    title: 'Baby Clothes (0-6 months)',
    category: 'Clothes',
    description: 'Onesies and sleepers. Washed and ready to use.',
    condition: 'Good',
    location: 'HSR Layout',
    imageUrl: null,
    postedAt: '2024-02-01T10:00:00',
    postedBy: 'user2',
    postedByName: 'Rahul M.',
    status: 'available',
  },
];

export function getItemById(id) {
  return items.find((item) => item.id === id) || null;
}

export function getItemsByCategory(category) {
  if (!category) return items;
  return items.filter((item) => item.category === category);
}

export function getItemsByLocation(location) {
  if (!location) return items;
  return items.filter((item) => item.location === location);
}
