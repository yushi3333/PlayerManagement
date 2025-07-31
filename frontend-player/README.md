# NBA Player Management System

A professional, modern web application for managing and analyzing NBA player statistics and team performance.

## Features

### 🏀 Professional Dashboard
- **Analytics Dashboard**: Comprehensive overview with key metrics and trends
- **Player Management**: Detailed player profiles with statistics and performance indicators
- **Team Statistics**: Team-based analytics and comparisons
- **Real-time Search**: Advanced search functionality across players and teams

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Professional Styling**: Modern gradient backgrounds and smooth animations
- **Team Branding**: Official NBA team logos and colors
- **Interactive Elements**: Hover effects and smooth transitions

### 📊 Advanced Analytics
- **Performance Metrics**: Points, rebounds, assists, efficiency ratings
- **Team Rankings**: Sortable team performance comparisons
- **Player Leaderboards**: Top performers in various categories
- **Visual Data**: Progress bars and color-coded performance indicators

### 🔍 Search & Filter
- **Team Filtering**: Filter players by NBA teams
- **Search Functionality**: Search by player name or team
- **Sorting Options**: Sort by various statistics
- **Real-time Results**: Instant search results

## Technology Stack

- **Frontend**: React 18 with modern hooks
- **Styling**: Bootstrap 5 with custom CSS
- **Icons**: FontAwesome icons
- **Routing**: React Router DOM
- **State Management**: React useState and useEffect
- **API Integration**: Axios for backend communication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running on localhost:8080

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-player
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
frontend-player/
├── src/
│   ├── components/
│   │   ├── api.js                 # API service functions
│   │   ├── header.js              # Navigation header
│   │   ├── header.css             # Header styling
│   │   ├── card/
│   │   │   ├── CardGroup.js       # Player cards component
│   │   │   └── CardGroup.css      # Player cards styling
│   │   ├── dashboard/
│   │   │   ├── Dashboard.js       # Analytics dashboard
│   │   │   └── Dashboard.css      # Dashboard styling
│   │   ├── home/
│   │   │   ├── Home.js            # Landing page
│   │   │   ├── Home.css           # Home page styling
│   │   │   └── Layout.js          # Layout wrapper
│   │   ├── player/
│   │   │   └── Player.js          # Individual player view
│   │   └── team/
│   │       ├── TeamStats.js       # Team statistics
│   │       └── TeamStats.css      # Team stats styling
│   ├── App.js                     # Main application component
│   ├── App.css                    # Global styles
│   └── index.js                   # Application entry point
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

## Key Components

### Header Component
- Professional navigation with team filtering
- Real-time search functionality
- Player count display
- Responsive mobile menu

### Dashboard Component
- Key performance indicators
- Top player leaderboards
- Team performance overview
- Interactive metric selectors

### Player Cards
- Team logos and branding
- Performance statistics with color coding
- Action buttons for player management
- Responsive grid layout

### Team Statistics
- Comprehensive team analytics
- Performance comparisons
- Best player identification
- Sortable data tables

## API Integration

The application connects to a Spring Boot backend API with the following endpoints:

- `GET /api/players` - Retrieve all players
- `POST /api/players` - Create new player
- `PUT /api/players/{id}` - Update player
- `DELETE /api/players/{id}` - Delete player

## Styling Features

### Color Scheme
- **Primary**: Professional blue gradients
- **Success**: Green for positive metrics
- **Warning**: Yellow for average performance
- **Danger**: Red for below-average performance

### Animations
- Smooth hover effects
- Fade-in animations
- Scale transitions
- Loading spinners

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading of components
- Optimized images and assets
- Efficient state management
- Minimal re-renders

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
