# ConIngenio Website Project

A responsive, multilingual website for ConIngenio - a software consulting and development company. Built with modern HTML, CSS and JavaScript following best practices.

## Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Dual Language Support**: Toggle between Spanish and English
- **Dark/Light Theme**: User preference theme switching with local storage persistence
- **Dynamic Content Loading**: Services and About Us sections load content from API
- **Form Validation**: Client-side validation with visual feedback
- **Smooth Scrolling**: Enhanced navigation experience
- **Accessibility Features**: ARIA attributes and semantic HTML

## Technologies

- HTML5
- CSS3 with custom properties (variables)
- Vanilla JavaScript (ES6+)
- Font Awesome 6.4.0
- Google Fonts (Roboto, Montserrat)

## Project Structure

```
/
├── css/
│   └── styles.css     # Main stylesheet with design system
├── js/
│   └── scripts.js     # Core JavaScript functionality
├── images/
│   ├── favicon/       # Favicon files 
│   └── *.svg          # Vector graphics for the site
└── index.html         # Main HTML document
```

## Design System

The project uses CSS custom properties to implement a comprehensive design system:

- **Color Scheme**: Primary, secondary, and neutral colors with light/dark theme variants
- **Typography**: Consistent type scale with two font families
- **Spacing**: Standardized spacing scale for consistent layout
- **Components**: Reusable UI components like buttons, cards, and form elements

## API Integration

The site connects to the following endpoints:
- `/v1/services/` - Fetches service information
- `/v1/about-us/` - Fetches company information

Data is loaded asynchronously with loading and error states handled appropriately.

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. No build tools or dependencies required to run the site

```bash
git clone https://github.com/alexiscampusano/coningenio-website.git
cd coningenio-website
# Simply open index.html in your browser
```

## Live Demo

Visit the live version of the website:
[https://coningenio-website.vercel.app/](https://coningenio-website.vercel.app/)

Deployed on [Vercel](https://vercel.com/), a platform optimized for frontend frameworks and static sites.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Best Practices

This project follows several best practices:

- **Clean Code**: Meaningful variable names, consistent formatting
- **DRY Principles**: Avoiding repetition through reusable components
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Performance Optimization**: Preloaded fonts, optimized images
- **Code Organization**: Logical separation of concerns

---

## License

This project, ConIngenio, is licensed for educational purposes at Ipss under a proprietary license. All rights reserved by the developers.

Developed by [Alexis Campusano](https://github.com/alexiscampusano).