# API Inspector 🚀

A professional, modern API testing tool built with React, TypeScript, and Tailwind CSS. Test, debug, and document your APIs with ease using our intuitive interface and powerful features.

## ✨ Features

### 🔥 Core Functionality
- **Multi-tab Interface** - Work with multiple API requests simultaneously
- **Real-time Response Viewer** - Instant response visualization with syntax highlighting
- **Request History** - Automatic tracking of all your API calls
- **Save Collections** - Organize and save your frequently used requests
- **Authentication Support** - Bearer tokens, Basic auth, and API key authentication

### 🎨 User Experience
- **Modern UI/UX** - Clean, professional interface built with Tailwind CSS
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme** - Comfortable viewing in any environment
- **Keyboard Shortcuts** - Boost productivity with quick actions

### 🛠️ Developer Tools
- **JSON Editor** - Monaco Editor with syntax highlighting and validation
- **Request Builder** - Intuitive form-based request configuration
- **Response Analysis** - Detailed response metrics (status, timing, size)
- **Export/Import** - Share and backup your API collections

## 🚀 Live Demo

**[Try API Inspector Live](https://tiny-donut-3a1ced.netlify.app/)**

*Experience the full functionality without any setup required.*

## 📱 Screenshots

### Desktop Interface


### Mobile Responsive

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development for better code quality
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Lightning-fast build tool and development server

### State Management & Data
- **Zustand** - Lightweight state management with persistence
- **Axios** - Promise-based HTTP client for API requests
- **Monaco Editor** - VS Code-powered code editor

### Authentication & Routing
- **Clerk** - Secure user authentication and management
- **React Router** - Client-side routing for single-page application

### Development Tools
- **ESLint** - Code linting for consistent code quality
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing with Autoprefixer

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/api-inspector.git
   cd api-inspector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Authentication Setup (Clerk)

1. Create a [Clerk](https://clerk.com) account
2. Create a new application
3. Copy your publishable key to the `.env` file
4. Configure your authentication settings in the Clerk dashboard

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk authentication key | ✅ Yes |

## 📖 Usage Guide

### Making Your First Request

1. **Sign up/Sign in** to your account
2. **Enter API URL** in the request panel
3. **Select HTTP method** (GET, POST, PUT, DELETE, etc.)
4. **Add headers** if required (Authorization, Content-Type, etc.)
5. **Configure authentication** if needed
6. **Add request body** for POST/PUT requests
7. **Click Send** to execute the request
8. **View response** in the response panel

### Managing Requests

- **Save requests** for future use
- **Organize collections** by project or API
- **Search history** to find previous requests
- **Duplicate requests** to create variations
- **Export collections** for sharing or backup

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Top navigation bar
│   ├── Sidebar.tsx     # Request history & collections
│   ├── TabBar.tsx      # Multi-tab interface
│   ├── RequestPanel.tsx # Request configuration
│   ├── ResponsePanel.tsx # Response viewer
│   └── ProtectedRoute.tsx # Authentication guard
├── hooks/              # Custom React hooks
│   └── useAPIRequest.ts # API request logic
├── pages/              # Page components
│   ├── LandingPage.tsx # Marketing/auth page
│   └── DashboardPage.tsx # Main application
├── store/              # State management
│   └── apiStore.ts     # Zustand store
├── types/              # TypeScript definitions
│   └── api.ts          # API-related types
└── main.tsx           # Application entry point
```

## 🎯 Key Features Breakdown

### Multi-tab Interface
Work with multiple API requests simultaneously without losing context. Each tab maintains its own state including request configuration, response data, and loading status.

### Request History & Collections
- Automatic history tracking of all requests
- Search and filter capabilities
- Save frequently used requests
- Organize requests into collections
- Export/import functionality

### Authentication Support
- **Bearer Token** - For JWT and OAuth 2.0 APIs
- **Basic Authentication** - Username/password authentication
- **API Key** - Custom header-based authentication
- **No Auth** - For public APIs

### Response Analysis
- **Status Codes** - Color-coded status indicators
- **Response Time** - Performance metrics
- **Response Size** - Data transfer information
- **Headers** - Complete response header inspection
- **JSON Formatting** - Beautiful syntax highlighting

## 🔒 Security Features

- **Secure Authentication** - Powered by Clerk
- **Local Storage** - Sensitive data never leaves your browser
- **HTTPS Only** - Secure communication protocols
- **Input Validation** - Prevents malicious input
- **CORS Handling** - Proper cross-origin request management

## 📊 Performance

- **Fast Loading** - Optimized bundle size with code splitting
- **Responsive Design** - Smooth experience on all devices
- **Efficient State Management** - Minimal re-renders with Zustand
- **Lazy Loading** - Components loaded on demand
- **Caching** - Intelligent request and response caching

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [User Guide](docs/user-guide.md)
- [API Reference](docs/api-reference.md)
- [Troubleshooting](docs/troubleshooting.md)

### Community
- [GitHub Issues](https://github.com/yourusername/api-inspector/issues)
- [Discussions](https://github.com/yourusername/api-inspector/discussions)
- [Discord Community](https://discord.gg/your-discord)

### Professional Support
For enterprise support and custom development:
- 📧 Email: support@api-inspector.com
- 🌐 Website: [www.api-inspector.com](https://www.api-inspector.com)

## 🎉 Acknowledgments

- [React Team](https://reactjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Clerk](https://clerk.com/) for authentication services
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [Lucide Icons](https://lucide.dev/) for beautiful icons

---

<div align="center">

**Built with ❤️ for developers by developers**

[⭐ Star this repo](https://github.com/yourusername/api-inspector) | [🐛 Report Bug](https://github.com/yourusername/api-inspector/issues) | [✨ Request Feature](https://github.com/yourusername/api-inspector/issues)

</div>
