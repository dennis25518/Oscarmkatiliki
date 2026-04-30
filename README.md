# Oscar Mkatoliki - Catholic eBooks Platform

A modern, professional e-commerce platform for distributing Catholic educational materials and eBooks in Swahili. Built with React, TypeScript, and Supabase, Oscar Mkatoliki provides a seamless shopping experience with secure payments and responsive mobile design.

## 🌟 Features

### User Experience

- **Responsive Design**: Mobile-first approach with hamburger navigation menu for seamless mobile browsing
- **Product Catalog**: Browse and search Catholic educational materials with detailed product pages
- **Shopping Cart**: Add/remove items with real-time quantity controls
- **Secure Authentication**: User registration and login with secure session management
- **User Profiles**: Manage personal information, view order history, and save payment methods

### E-Commerce

- **Multiple Payment Methods**:
  - Credit/Debit card payments
  - Mobile money integration (M-Pesa, Vodacom, Airtel, TIGO, Equity Bank)
- **Order Management**: Track orders with status updates and download purchased materials
- **Professional Pricing**: Standardized "Tsh" currency formatting across all price displays
- **Cart Persistence**: Save shopping cart between sessions using localStorage

### Customer Engagement

- **Contact Form**: Direct messaging system with Supabase database integration
- **FAQ Section**: Frequently asked questions with accordion interface
- **Featured Products**: Homepage showcases popular items
- **Similar Products**: Recommendations based on current product category

### Admin & Backend

- **Supabase Integration**: Cloud-based PostgreSQL database for reliable data storage
- **Real-time Data**: Live product inventory and order synchronization
- **Secure API**: Row-level security policies for data protection

## 🛠️ Tech Stack

### Frontend

- **React** 19.2.5 - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** 8.0.10 - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **React Router DOM** 7.14.2 - Client-side routing
- **React Icons** - Icon library for consistent UI elements

### Backend

- **Supabase** - PostgreSQL database + authentication
- **TypeScript** - Type-safe backend interactions

### Development

- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **Node.js** - Runtime environment

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account with project setup
- Environment variables configured

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd oscarmkatoliki
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the project root:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   Access at `http://localhost:5175`

5. **Build for production**
   ```bash
   npm run build
   ```

## 🗂️ Project Structure

```
oscarmkatoliki/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Main navigation with mobile menu
│   │   └── ProtectedRoute.tsx  # Authentication wrapper
│   ├── pages/
│   │   ├── HomePage.tsx         # Landing page with hero, products, FAQ, contact
│   │   ├── LoginPage.tsx        # User authentication
│   │   ├── RegisterPage.tsx     # New user registration
│   │   ├── ProductDetailsPage.tsx # Individual product view
│   │   ├── CartPage.tsx         # Shopping cart
│   │   ├── CheckoutPage.tsx     # Order review & payment
│   │   └── UserProfilePage.tsx  # Account management
│   ├── layouts/
│   ├── assets/
│   ├── App.tsx                  # Main app component & routing
│   ├── App.css                  # Global styles
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Base styles
│   └── lib/
│       └── supabaseClient.ts    # Supabase client & API methods
├── public/
│   ├── favicon.jpeg
│   └── Asset/
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS customization
├── tsconfig.json               # TypeScript configuration
├── package.json
└── README.md
```

## 💾 Database Schema

### Products Table

```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  file_url: string;
  created_at: string;
  updated_at: string;
}
```

### Profiles Table

```typescript
interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  address: string | null;
  profile_picture: string | null;
}
```

### Orders Table

```typescript
interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  order_id: string;
  product_id: number;
  quantity: number;
  price: number;
}
```

### Payment Methods Table

```typescript
interface PaymentMethod {
  id: string;
  user_id: string;
  type: "card" | "mobile_money";
  // Card fields
  card_name?: string;
  card_number?: string;
  card_expiry?: string;
  card_type?: string;
  // Mobile money fields
  mobile_provider?: string;
  mobile_number?: string;
  created_at: string;
}
```

### Maswali (Messages) Table

```typescript
interface Maswali {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
}
```

## 🎨 Design System

### Color Palette

- **Primary**: Amber-700 (buttons, accents)
- **Hover**: Amber-800
- **Active**: Amber-900
- **Light Background**: Amber-50, Amber-100
- **Text**: Black (primary), Black/60 (secondary), Gray-600 (tertiary)
- **Accents**: Red (delete), Green (success)

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Custom Animations

- **Beep Animation**: Pulsing effect on indicator dots (1s infinite cycle)

## 🚀 Getting Started

### For Users

1. Visit the homepage and browse products
2. Click on a product to view details
3. Add items to cart
4. Create an account or login
5. Complete checkout with preferred payment method
6. Download purchased materials from your profile

### For Developers

**Set up Supabase:**

1. Create a new Supabase project
2. Create tables with schemas above
3. Configure Row Level Security (RLS)
4. Get your API URL and keys
5. Add to `.env.local`

**API Methods** (in `src/lib/supabaseClient.ts`):

```typescript
// Products
productsAPI.getAll();
productsAPI.getById(id);

// Authentication
auth.login(email, password);
auth.register(email, password);
auth.logout();

// Profiles
profiles.getProfile(userId);
profiles.updateProfile(userId, data);

// Orders
orders.getByUserId(userId);
orders.create(orderData);

// Payment Methods
paymentMethods.getByUserId(userId);
paymentMethods.create(paymentData);

// Messages
maswaliApi.createMessage(message);
maswaliApi.getMessages();
maswaliApi.deleteMessage(id);

// Storage
storage.uploadFile(bucket, path, file);
storage.getFile(bucket, path);
```

## 🔒 Security Considerations

- **Authentication**: Supabase Auth with secure session management
- **Data Protection**: Row-level security policies on all tables
- **Environment Variables**: Sensitive keys stored in `.env.local` (not committed)
- **Admin Functions**: All admin/management pages removed for security
- **Payment Security**: Payment methods stored securely with masked display

## 📱 Mobile Experience

- **Hamburger Menu**: Touch-friendly navigation on screens < 1024px
- **Responsive Grid**: Product listings adapt from 1 column (mobile) to 4 columns (desktop)
- **Touch-friendly Buttons**: Adequate padding and spacing for mobile interaction
- **Fast Loading**: Optimized images and efficient data fetching

## 🐛 Known Issues & Future Improvements

### Current Status

- ✅ Mobile navigation fully functional
- ✅ Contact form with database integration
- ✅ Multi-method payment support
- ✅ Professional UI/UX across all components

### Future Enhancements

- [ ] Email notifications for orders
- [ ] SMS payment confirmations
- [ ] Advanced product search/filtering
- [ ] Customer reviews and ratings
- [ ] Wishlist feature
- [ ] Multi-language support
- [ ] Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and intended for Oscar Mkatoliki Catholic services. All rights reserved.

## 📞 Support

For support or inquiries, please use the contact form on the website or email directly through the contact section.

---

**Built with ❤️ for Oscar Mkatoliki Catholic Community**

Last Updated: April 2026
