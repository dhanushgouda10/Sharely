export const requests = [
  {
    id: 'req1',
    itemId: '1',
    itemTitle: 'Organic Rice & Lentils Pack',
    requesterId: 'user2',
    requesterName: 'Rahul M.',
    status: 'pending',
    requestedAt: '2024-02-06T11:00:00',
    message: 'Need for family. Can pick up today.',
  },
  {
    id: 'req2',
    itemId: '3',
    itemTitle: 'Clean Code & Design Patterns Books',
    requesterId: 'user1',
    requesterName: 'Priya S.',
    status: 'accepted',
    requestedAt: '2024-02-05T10:00:00',
    message: 'Learning design patterns. Would love these books.',
  },
  {
    id: 'req3',
    itemId: '4',
    itemTitle: 'Toothpaste, Soap & Shampoo Bundle',
    requesterId: 'user3',
    requesterName: 'Anita K.',
    status: 'pending',
    requestedAt: '2024-02-06T09:30:00',
    message: 'In need of essentials this week. Thank you!',
  },
  {
    id: 'req4',
    itemId: '2',
    itemTitle: 'Winter Jackets (Kids 5-8 yrs)',
    requesterId: 'user4',
    requesterName: 'Vikram J.',
    status: 'declined',
    requestedAt: '2024-02-05T15:00:00',
    message: 'For my two kids. Can collect from HSR.',
  },
];

export const myListings = [
  { id: '1', title: 'Organic Rice & Lentils Pack', category: 'Groceries', location: 'Whitefield', status: 'available', requestsCount: 2 },
  { id: '4', title: 'Toothpaste, Soap & Shampoo Bundle', category: 'Essentials', location: 'Indiranagar', status: 'available', requestsCount: 1 },
  { id: '9', title: 'Cooking Oil & Spices Set', category: 'Groceries', location: 'Whitefield', status: 'available', requestsCount: 0 },
];

export const myRequests = [
  { id: 'req2', itemTitle: 'Clean Code & Design Patterns Books', status: 'accepted', requestedAt: '2024-02-05T10:00:00' },
  { id: 'req5', itemTitle: 'JavaScript & React Books', status: 'pending', requestedAt: '2024-02-06T12:00:00' },
  { id: 'req6', itemTitle: 'Fresh Vegetables Box', status: 'declined', requestedAt: '2024-02-06T08:30:00' },
];

export function getRequestsForItem(itemId) {
  return requests.filter((r) => r.itemId === itemId);
}

export function getRequestsByUser(userId) {
  return requests.filter((r) => r.requesterId === userId);
}
