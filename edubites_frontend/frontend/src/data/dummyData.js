// EduBites Dummy Data

export const statsData = {
  upcomingEvents: 5,
  booksAvailable: 248,
  ordersToday: 23,
  padRequests: 2,
};

export const announcements = [
  {
    id: 1,
    title: "Library Extended Hours",
    description: "The library will be open until 10 PM during exam week. Make the most of it!",
    priority: "Important",
    timestamp: "2025-02-26 09:00",
  },
  {
    id: 2,
    title: "Canteen New Menu",
    description: "Check out our new healthy breakfast options starting Monday.",
    priority: "Normal",
    timestamp: "2025-02-25 14:30",
  },
  {
    id: 3,
    title: "Campus WiFi Maintenance",
    description: "Scheduled maintenance on Sunday 2 AM - 6 AM. Services may be disrupted.",
    priority: "Urgent",
    timestamp: "2025-02-24 11:00",
  },
];

export const todaysMenu = [
  { id: 1, name: "Idli with Sambar", category: "Breakfast", price: 40 },
  { id: 2, name: "Paneer Butter Masala", category: "Lunch", price: 80 },
  { id: 3, name: "Veg Biryani", category: "Lunch", price: 75 },
  { id: 4, name: "Masala Chai", category: "Drinks", price: 15 },
  { id: 5, name: "Samosa", category: "Snacks", price: 25 },
];

export const events = [
  {
    id: 1,
    name: "Tech Talk: AI in Education",
    date: "2025-03-05",
    time: "2:00 PM",
    location: "Auditorium A",
    description: "Join us for an exciting talk on how artificial intelligence is transforming education.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    category: "Workshop",
  },
  {
    id: 2,
    name: "Sports Day 2025",
    date: "2025-03-08",
    time: "9:00 AM",
    location: "Main Ground",
    description: "Annual sports day with various competitions. Register now!",
    image: "https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=400&h=250&fit=crop",
    category: "Sports",
  },
  {
    id: 3,
    name: "Book Club Meeting",
    date: "2025-03-02",
    time: "4:00 PM",
    location: "Library Conference Room",
    description: "Monthly book club meeting. This month: Atomic Habits by James Clear.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=250&fit=crop",
    category: "Cultural",
  },
  {
    id: 4,
    name: "Startup Pitch Competition",
    date: "2025-03-12",
    time: "10:00 AM",
    location: "Innovation Hub",
    description: "Present your startup idea and win exciting prizes!",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
    category: "Workshop",
  },
  {
    id: 5,
    name: "Music Festival",
    date: "2025-03-15",
    time: "6:00 PM",
    location: "Amphitheater",
    description: "Annual campus music festival with local bands and artists.",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop",
    category: "Cultural",
  },
];

export const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop",
    status: "Available",
    returnDate: null,
  },
  {
    id: 2,
    title: "Design Patterns",
    author: "Gang of Four",
    isbn: "978-0201633610",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=280&fit=crop",
    status: "Issued",
    returnDate: "2025-03-10",
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    isbn: "978-0135957059",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop",
    status: "Available",
    returnDate: null,
  },
  {
    id: 4,
    title: "React in Action",
    author: "Mark Tielens Thomas",
    isbn: "978-1617293856",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=280&fit=crop",
    status: "Issued",
    returnDate: "2025-02-28",
  },
  {
    id: 5,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    isbn: "978-0596517748",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop",
    status: "Available",
    returnDate: null,
  },
  {
    id: 6,
    title: "Introduction to Algorithms",
    author: "CLRS",
    isbn: "978-0262033848",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=280&fit=crop",
    status: "Issued",
    returnDate: "2025-03-05",
  },
];

export const libraryStats = {
  total: 500,
  issued: 252,
  dueSoon: 18,
  available: 248,
};

export const foodItems = [
  {
    id: 1,
    name: "Idli with Sambar",
    description: "Soft steamed rice cakes served with lentil soup",
    price: 40,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1630386220902-85922417335f?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: 2,
    name: "Dosa",
    description: "Crispy fermented crepe with coconut chutney",
    price: 50,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1630386220902-85922417335f?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: 3,
    name: "Paneer Butter Masala",
    description: "Cottage cheese in rich tomato gravy",
    price: 80,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: 4,
    name: "Veg Biryani",
    description: "Fragrant rice with mixed vegetables and spices",
    price: 75,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: 5,
    name: "Samosa",
    description: "Crispy pastry with spiced potato filling",
    price: 25,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: 6,
    name: "Pav Bhaji",
    description: "Spiced vegetable mash with buttered bread",
    price: 45,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop",
    available: false,
  },
  {
    id: 7,
    name: "Masala Chai",
    description: "Traditional spiced Indian tea",
    price: 15,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: 8,
    name: "Fresh Lime Soda",
    description: "Refreshing lime with soda",
    price: 30,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: 9,
    name: "Upma",
    description: "Savory semolina breakfast",
    price: 35,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
    available: true,
  },
];

export const orderHistory = [
  {
    id: 1,
    items: [
      { name: "Idli with Sambar", qty: 2, price: 40 },
      { name: "Masala Chai", qty: 1, price: 15 },
    ],
    total: 95,
    date: "2025-02-26 08:30",
    status: "Delivered",
  },
  {
    id: 2,
    items: [
      { name: "Paneer Butter Masala", qty: 1, price: 80 },
      { name: "Veg Biryani", qty: 1, price: 75 },
    ],
    total: 155,
    date: "2025-02-25 12:45",
    status: "Delivered",
  },
  {
    id: 3,
    items: [
      { name: "Samosa", qty: 3, price: 25 },
      { name: "Fresh Lime Soda", qty: 2, price: 30 },
    ],
    total: 135,
    date: "2025-02-25 16:20",
    status: "Cancelled",
  },
  {
    id: 4,
    items: [
      { name: "Dosa", qty: 2, price: 50 },
      { name: "Masala Chai", qty: 2, price: 15 },
    ],
    total: 130,
    date: "2025-02-24 09:15",
    status: "Delivered",
  },
  {
    id: 5,
    items: [
      { name: "Pav Bhaji", qty: 1, price: 45 },
    ],
    total: 45,
    date: "2025-02-27 14:00",
    status: "Preparing",
  },
];

export const padRequests = [
  {
    id: 1,
    date: "2025-02-25",
    reason: "Regular monthly requirement",
    type: "Personal",
    status: "Approved",
  },
  {
    id: 2,
    date: "2025-02-20",
    reason: "Medical documentation provided",
    type: "Medical",
    status: "Approved",
  },
  {
    id: 3,
    date: "2025-02-27",
    reason: "Need for upcoming trip",
    type: "Permission Pad",
    status: "Pending",
  },
  {
    id: 4,
    date: "2025-02-15",
    reason: "Personal use",
    type: "Personal",
    status: "Rejected",
  },
];

export const eventCategories = ["All", "Workshop", "Sports", "Cultural"];

export const foodCategories = ["All", "Breakfast", "Lunch", "Snacks", "Drinks"];

export const padRequestTypes = ["Permission Pad", "Medical", "Personal"];

export const priorityLevels = ["Normal", "Important", "Urgent"];
