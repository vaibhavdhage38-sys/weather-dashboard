# ☀️ Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API. Get current weather conditions, hourly forecasts, and 5-day weather predictions for any city in the world.

## 🌟 Features

- **Real-time Weather Data**: Get current temperature, humidity, wind speed, and more
- **5-Day Forecast**: Plan ahead with a 5-day weather forecast
- **Search by City**: Search for any city worldwide
- **Geolocation Support**: Automatically fetch weather for your current location
- **Recent Searches**: Quick access to previously searched cities
- **Detailed Weather Information**:
  - Temperature and "Feels Like" temperature
  - Humidity and pressure
  - Wind speed and direction
  - Visibility
  - UV Index
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations
- **Local Storage**: Remembers your recent searches and last viewed city

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vaibhavdhage38-sys/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Go to your API keys section
   - Copy your API key

3. **Add Your API Key**
   - Open `script.js`
   - Find the line: `const API_KEY = 'YOUR_OPENWEATHER_API_KEY';`
   - Replace `'YOUR_OPENWEATHER_API_KEY'` with your actual API key

4. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (if you have http-server installed)
     http-server
     ```
   - Then navigate to `http://localhost:8000`

## 📁 Project Structure

```
weather-dashboard/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # JavaScript functionality
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## 🎨 Features Breakdown

### Search Functionality
- **City Search**: Type a city name and search for its weather
- **Geolocation**: Click the location button to get weather for your current position
- **Recent Searches**: Click any recent city to quickly view its weather

### Weather Information Displayed

**Current Weather:**
- City name, state, and country
- Current date and time
- Weather icon and description
- Temperature and "Feels Like" temperature

**Weather Details:**
- Humidity percentage
- Wind speed (in km/h)
- Visibility distance
- Atmospheric pressure
- UV Index

**5-Day Forecast:**
- Date and day of the week
- Weather icon
- Temperature prediction
- Weather description

## 🔧 Configuration

### API Endpoints Used

1. **Current Weather**
   ```
   https://api.openweathermap.org/data/2.5/weather
   ```

2. **5-Day Forecast**
   ```
   https://api.openweathermap.org/data/2.5/forecast
   ```

3. **Reverse Geocoding** (City name from coordinates)
   ```
   https://api.openweathermap.org/geo/1.0/reverse
   ```

4. **UV Index**
   ```
   https://api.openweathermap.org/data/2.5/uvi
   ```

### Temperature Units
- Default: Celsius (°C)
- To change to Fahrenheit, modify the `units=metric` parameter in API calls to `units=imperial`

## 🌐 Browser Compatibility

- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- IE 11: ⚠️ Limited support (may require polyfills)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🔐 Security Notes

- Your API key is stored in `script.js`. For production applications, consider:
  - Using a backend proxy to hide the API key
  - Using environment variables with a build tool
  - Implementing request validation and rate limiting

## 🐛 Troubleshooting

### Weather data not loading?
1. Verify your API key is correct
2. Check if the API key is activated on OpenWeatherMap
3. Ensure you have internet connectivity
4. Check browser console for error messages

### Geolocation not working?
1. Ensure the page is served over HTTPS (required for geolocation)
2. Check browser permissions for location access
3. Some browsers may have additional restrictions

### Forecast not showing?
1. Verify API key has access to forecast data
2. Check if city name is valid
3. Allow time for API to respond (may take 1-2 seconds)

## 📚 API Documentation

For more information, visit [OpenWeatherMap API Documentation](https://openweathermap.org/api)

## 🎓 Learning Resources

This project demonstrates:
- Fetching data from RESTful APIs
- Working with JSON data
- DOM manipulation with JavaScript
- CSS Grid and Flexbox layouts
- Responsive web design
- Local storage usage
- Geolocation API
- Date and time formatting

## 📝 Future Enhancements

Potential features to add:
- [ ] Temperature unit toggle (Celsius/Fahrenheit)
- [ ] Weather alerts and warnings
- [ ] Air quality index
- [ ] Multiple location comparison
- [ ] Weather radar integration
- [ ] Dark mode toggle
- [ ] PWA functionality (offline support)
- [ ] Weather history graphs
- [ ] Hourly forecast view
- [ ] Weather notification system

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License. Feel free to use it for personal and commercial projects.

## 👨‍💻 Author

Created by [vaibhavdhage38-sys](https://github.com/vaibhavdhage38-sys)

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org) - Weather data API
- [Font Awesome](https://fontawesome.com) - Icons
- [Google Fonts](https://fonts.google.com) - Typography

## 📞 Support

For issues, questions, or suggestions:
- Open an [GitHub Issue](https://github.com/vaibhavdhage38-sys/weather-dashboard/issues)
- Check existing documentation and FAQs

---

**Happy Weather Tracking! 🌤️**
