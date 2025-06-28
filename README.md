# 🍽️ Smart Restaurant Finder

A full-stack application that provides personalized restaurant recommendations based on user health profiles and location. The app uses AI to suggest restaurants and dishes that align with dietary preferences, restrictions, and health goals.

## 🏗️ Project Structure

This repository contains two main components:

- **Backend API** (`/src/`) - Node.js/Express/TypeScript server
- **Frontend UI** (`/restaurant-finder-ui/`) - Quasar/Vue.js application

## ✨ Features

- 📍 **Location-based recommendations** - Find restaurants near your current location
- 🏥 **Health-aware suggestions** - Recommendations based on dietary restrictions and health goals
- 🤖 **AI-powered matching** - Uses OpenAI to provide personalized restaurant and dish suggestions
- 📱 **Modern UI** - Responsive design with Quasar framework
- 🔐 **Mock authentication** - Bearer token authentication for API access

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key (optional - falls back to mock data)

### Backend Setup

1. **Navigate to the project root:**
   ```bash
   cd smart-restaurant-finder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file (optional):**
   ```bash
   # Create .env file
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```
   > **Note:** If no API key is provided, the app will use mock restaurant data.

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd restaurant-finder-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The UI will be available at `http://localhost:9000` (or another port shown in terminal)

## 🔧 API Endpoints

### POST `/api/suggestions`

Get restaurant recommendations based on location.

**Request:**
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Headers:**
```
Authorization: Bearer <patient-id>
Content-Type: application/json
```

**Response:**
```json
[
  {
    "name": "Healthy Bites Cafe",
    "address": "123 Main St, Downtown",
    "cuisine": "Healthy",
    "justification": "Perfect for your health goals with fresh, organic ingredients",
    "suggestedDish": "Grilled Salmon with Quinoa"
  }
]
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **OpenAI API** - AI-powered recommendations
- **Mock Services** - Health profile simulation

### Frontend
- **Vue 3** - Progressive framework
- **Quasar** - Vue.js framework
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **Composition API** - Modern Vue development

## 📁 Project Structure

```
smart-restaurant-finder/
├── src/                          # Backend API
│   ├── controller.ts            # Request handlers
│   ├── service.ts               # Business logic & OpenAI integration
│   ├── middleware.ts            # Authentication middleware
│   ├── routes.ts                # API routes
│   ├── types.ts                 # TypeScript definitions
│   ├── mockHealthService.ts     # Mock health data
│   └── index.ts                 # Server entry point
├── restaurant-finder-ui/         # Frontend Application
│   ├── src/
│   │   ├── pages/               # Vue pages
│   │   ├── services/            # API services
│   │   ├── types/               # TypeScript definitions
│   │   └── components/          # Vue components
│   └── quasar.config.ts         # Quasar configuration
├── package.json                 # Backend dependencies
└── README.md                    # This file
```

## 🔒 Environment Variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## 🧪 Development

### Backend Development
```bash
# Start backend with auto-reload
npm run dev

# Build for production
npm run build
```

### Frontend Development
```bash
cd restaurant-finder-ui

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 🚀 Deployment

### Backend
The backend can be deployed to any Node.js hosting service (Heroku, Vercel, Railway, etc.)

### Frontend
The frontend can be deployed as a static site or SPA to services like Netlify, Vercel, or GitHub Pages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- OpenAI for providing the AI recommendation engine
- Quasar Framework for the beautiful UI components
- Vue.js community for the excellent ecosystem
