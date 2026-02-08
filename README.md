# URL Shortener

A clean, responsive web application that shortens URLs using TinyURL's public API. Built with vanilla HTML, CSS, and JavaScript.

## Live Demo

[View Live Demo](https://queenashleyinfrastructure.github.io/url-shortener)

## Features

- **URL Shortening**: Convert long URLs into short, shareable links using TinyURL's public API
- **Link History**: Automatically saves all shortened links in browser storage
- **Copy to Clipboard**: One-click copying of shortened URLs
- **Delete Links**: Remove unwanted links from your history
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Error Handling**: Clear feedback for invalid URLs and API errors
- **Loading States**: Visual feedback during URL shortening process

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- TinyURL public API
- LocalStorage API
- Fetch API

## Getting Started

### Prerequisites

- A modern web browser

### Installation

1. Clone the repository:

```bash
git clone https://github.com/QueenAshleyInfrastructure/url-shortener.git
```

2. Navigate to the project directory:

```bash
cd url-shortener
```

3. Open `index.html` in your browser or use a local server

### Notes on API

This project uses TinyURL's public API endpoint and does not require an API token. It performs a simple GET request to the TinyURL endpoint to generate short links.

## Usage

1. Paste a long URL into the input field (must start with http:// or https://)
2. Click the "Shorten" button
3. Your shortened URL will appear with a copy button
4. All links are automatically saved to your browser
5. Click "Copy" to copy any link to clipboard
6. Click "Delete" to remove a link from history

## Features Breakdown

### Responsive Design

- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly buttons

### User Experience

- Toast notifications for actions
- Loading indicators
- Error messages
- Success feedback

### Data Persistence

- Links saved in browser localStorage
- Survives page refreshes
- No server required

## Project Structure

```
url-shortener/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # JavaScript logic and API calls
└── README.md          # Project documentation
```

## Security Note

No API token is required for the TinyURL endpoint used here. Avoid storing any sensitive credentials in client-side code for production apps.

## License

This project is open source and available for educational purposes.

## Developer

**Ashley Henderson**

- GitHub: [@QueenAshleyInfrastructure](https://github.com/QueenAshleyInfrastructure)

## Acknowledgments

- TinyURL public API for URL shortening service
- Frontend Mentor for project inspiration
