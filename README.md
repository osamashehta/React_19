# React 19 Demo - Modern Optimistic UI Patterns 🚀

A comprehensive demonstration project showcasing **React 19's** latest features, optimistic UI updates, and modern state management patterns using **Next.js 16**, **React Query**, and **TypeScript**.

![React 19](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.0.0-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📋 Table of Contents

- [Overview]
- [Features]
- [Tech Stack]
- [Getting Started]
- [Project Structure]
- [Key Implementations]
- [Learn More]

## 🎯 Overview

This project demonstrates **two approaches** to implementing optimistic UI updates in modern React applications:

1. **React Query's `onMutate` approach** - Cache-level optimistic updates
2. **React 19's `useOptimistic` hook** - Component-level optimistic updates

Both patterns provide instant UI feedback while maintaining data consistency and graceful error handling.

## ✨ Features

### 🎨 UI/UX
- **Modern, Responsive Design** - Beautiful gradient backgrounds and card-based layouts
- **Shared Navigation** - Navbar and Footer across all pages
- **Mobile-Friendly** - Responsive hamburger menu for mobile devices
- **Smooth Animations** - Transitions and hover effects throughout

### 🔧 Technical Features
- **Optimistic UI Updates** - Instant feedback on user interactions
- **Automatic Rollback** - Reverts to previous state on API errors
- **Session Management** - Guest and authenticated user support via cookies
- **Toast Notifications** - Real-time feedback with `react-hot-toast`
- **Type Safety** - Full TypeScript implementation
- **Server-Side Rendering** - Next.js App Router with RSC support

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.0.0 |
| **UI Library** | React 19.2.0 |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS 4.x |
| **State Management** | React Query (TanStack Query) 5.90.5 |
| **Notifications** | react-hot-toast 2.6.0 |
| **Session Management** | UUID cookies |
| **HTTP Client** | Fetch API with custom wrapper |

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react_19

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
react_19/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Home page with navigation
│   │   ├── layout.tsx                # Root layout with Navbar/Footer
│   │   ├── onMutate/                 # React Query onMutate demo
│   │   ├── useOptimistic/            # React 19 useOptimistic demo
│   │   ├── activity/                 # Activity component demo
│   │   └── api/                      # API routes
│   │       └── auth/                 # Authentication endpoints
│   ├── component/
│   │   ├── CardProduct/              # Product card with React Query
│   │   ├── CardProductOptimistic/    # Product card with useOptimistic
│   │   ├── Navbar/                   # Shared navigation bar
│   │   └── Footer/                   # Shared footer
│   ├── hooks/
│   │   ├── useSession.ts             # Custom session hook
│   │   └── useToggleFav.ts           # Favorite toggle mutation
│   ├── lib/
│   │   ├── apiServiceCall.ts         # API client wrapper
│   │   ├── getServerSession.tsx      # Server-side session
│   │   └── reactQueryClient.ts       # React Query configuration
│   ├── providers/
│   │   └── providers.tsx             # React Query provider
│   └── types/
│       └── types.ts                  # TypeScript type definitions
└── middleware.ts                      # Next.js middleware for UUID cookies
```

## 🔑 Key Implementations

### 1. React Query with `onMutate` (Cache-Level Optimistic Updates)

```typescript
const { mutate } = useMutation({
  mutationFn: apiCall,
  
  // 🎯 Optimistic update
  onMutate: async () => {
    await queryClient.cancelQueries(['products']);
    const previous = queryClient.getQueryData(['products']);
    
    queryClient.setQueryData(['products'], (old) => ({
      ...old,
      products: old.products.map(p => 
        p.id === id ? { ...p, is_favorite: !p.is_favorite } : p
      )
    }));
    
    return { previous };
  },
  
  // ❌ Rollback on error
  onError: (err, variables, context) => {
    queryClient.setQueryData(['products'], context.previous);
  },
  
  // ✅ Sync with server
  onSuccess: () => {
    queryClient.invalidateQueries(['products']);
  }
});
```

### 2. React 19 `useOptimistic` (Component-Level Updates)

```typescript
const [optimisticProduct, setOptimisticProduct] = useOptimistic(
  product,
  (state, newValue: boolean) => ({ ...state, is_favorite: newValue })
);

const handleToggle = () => {
  startTransition(async () => {
    // Instant UI update
    setOptimisticProduct(!optimisticProduct.is_favorite);
    
    // API call
    await toggleFavorite();
  });
};
```

### 3. Session Management with Cookies

The middleware automatically creates a UUID for guest users:

```typescript
// middleware.ts
export default function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  if (!req.cookies.get('uuid')) {
    res.cookies.set('uuid', uuidv4(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }
  
  return res;
}
```

## 🎓 Key Concepts Demonstrated

### Optimistic UI Updates
- **Instant Feedback**: UI updates immediately without waiting for server
- **Automatic Rollback**: Reverts changes if API call fails
- **Server Sync**: Ensures consistency with backend state

### React 19 Features
- **`useOptimistic` Hook**: New React 19 hook for optimistic updates
- **`useTransition`**: Non-blocking state updates
- **Server Components**: RSC support in Next.js 16

### Best Practices
- **TypeScript**: Full type safety across the application
- **Error Handling**: Graceful fallbacks with toast notifications
- **Separation of Concerns**: Custom hooks for business logic
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 📚 Learn More

### React 19 Resources
- [React 19 Documentation](https://react.dev/)
- [useOptimistic Hook](https://react.dev/reference/react/useOptimistic)
- [React Compiler](https://react.dev/learn/react-compiler)

### Next.js Resources
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

### React Query Resources
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Optimistic Updates Guide](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ using React 19, Next.js 16, and TypeScript**
