# Product Management App

A modern full-stack e-commerce application built with Next.js 15, featuring user authentication, product management, and a responsive design.

## 🚀 Features

- **Landing Page**: Attractive hero section with navigation and product highlights
- **Authentication**: Secure login/signup with NextAuth.js (supports Google OAuth and credentials)
- **Product Catalog**: Browse and search products with detailed views
- **Protected Dashboard**: Add and manage products (authentication required)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Database**: SQLite with Prisma ORM for data management
- **Theme Toggle**: Light/dark mode support (optional enhancement)

## 🛠️ Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React icons
- **Notifications**: React Hot Toast
- **TypeScript**: Full type safety

## 📁 Project Structure

```
my-product-app/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── products/
│   │   └── register/
│   ├── dashboard/
│   │   ├── add-product/
│   │   └── layout.tsx
│   ├── login/
│   ├── products/
│   │   └── [id]/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── ThemeToggle.tsx
├── lib/
│   ├── auth.ts
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
└── scripts/
    └── setup-db.js
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd my-product-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Setup
```bash
# Generate Prisma client and setup database with sample data
npm run db:setup
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🌍 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**: Make sure your code is pushed to a GitHub repository.

2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard

3. **Environment Variables**: Add the following to your Vercel environment variables:
   ```
   DATABASE_URL=file:./dev.db
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Deploy**: Vercel will automatically deploy your app.

### Alternative Deployment Options
- **Netlify**: Similar process to Vercel
- **Railway**: Good for full-stack apps with databases
- **Heroku**: Traditional platform-as-a-service option

## 📚 API Routes

| Route | Method | Description | Protected |
|-------|--------|-------------|-----------|
| `/api/auth/[...nextauth]` | GET/POST | Authentication endpoints | No |
| `/api/products` | GET | Fetch all products | No |
| `/api/products` | POST | Create new product | Yes |
| `/api/products/[id]` | GET | Fetch single product | No |
| `/api/register` | POST | User registration | No |

## 🔐 Route Protection

| Route | Access Level | Redirect |
|-------|-------------|----------|
| `/` | Public | - |
| `/login` | Public | - |
| `/products` | Public | - |
| `/products/[id]` | Public | - |
| `/dashboard/*` | Protected | `/login` |

## 🎨 Customization

### Adding New Product Fields
1. Update the Prisma schema in `prisma/schema.prisma`
2. Run `npx prisma db push` to update database
3. Update the API routes and forms accordingly

### Styling
- Modify `app/globals.css` for global styles
- Use Tailwind CSS classes for component styling
- Customize the color scheme in `tailwind.config.js`

### Authentication Providers
Add more providers in `lib/auth.ts`:
```typescript
providers: [
  // Add more providers like GitHub, Twitter, etc.
  GitHubProvider({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  }),
]
```

## 🧪 Testing

Run the application locally and test:

1. **Landing Page**: Navigate to `/`
2. **Authentication**: Test login/signup flows
3. **Product Browsing**: View products and individual product pages
4. **Protected Routes**: Try accessing `/dashboard` without login
5. **Product Management**: Add new products via dashboard

## 📝 Development Notes

- The app uses SQLite for development (easily replaceable with PostgreSQL/MySQL for production)
- NextAuth.js handles session management automatically
- All forms include loading states and error handling
- The app is fully responsive and works on mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

**Database Connection Error**
- Ensure DATABASE_URL is correctly set in `.env.local`
- Run `npm run db:setup` to initialize the database

**Authentication Not Working**
- Check NEXTAUTH_URL matches your domain
- Verify NEXTAUTH_SECRET is set
- For Google OAuth, ensure redirect URIs are configured

**Build Errors**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

## 📧 Support

If you encounter any issues or have questions, please create an issue in the GitHub repository.

---

**Happy coding! 🚀**