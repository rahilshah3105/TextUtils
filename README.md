<div align="center">
  
# 📝 Worded - Advanced Text Analysis & Formatting Tools
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple.svg)](https://getbootstrap.com/)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
  
  **A powerful, feature-rich text manipulation and analysis tool built with React**
  
  *Transform • Analyze • Format • Export*
  
  [🚀 View Demo](#) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)
  
</div>

---

---

## 📖 About The Project

<div align="center">
  <img src="https://via.placeholder.com/800x400/0d6efd/ffffff?text=Worded+Screenshot" alt="Worded Screenshot" width="100%">
</div>

<br>

**Worded** is a modern, comprehensive web application designed to simplify text manipulation, analysis, and formatting. Whether you're a writer, developer, student, or content creator, Worded provides **30+ powerful tools** to transform, analyze, and optimize your text with just a few clicks.

### 🎯 Perfect For

- **Writers & Authors**: Analyze readability, word count, and improve your content
- **Developers**: Format JSON, encode/decode Base64, and process code snippets
- **Students**: Count words, check character limits, and format assignments
- **Content Creators**: Optimize text, check similarity, and maintain consistency
- **Marketers**: Analyze text statistics and create SEO-friendly content

### ✨ Why Choose Worded?

- 🚀 **Lightning Fast**: Real-time text processing with instant results
- 💾 **Auto-Save**: Your work is automatically saved every 2 seconds - never lose progress
- 🎨 **Beautiful UI**: Modern, clean interface with 7 customizable color themes
- 📊 **Deep Analytics**: Advanced readability scores, word frequency, and text statistics
- 🔒 **Privacy First**: All processing happens locally in your browser - your data never leaves your device
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- ⌨️ **Keyboard Shortcuts**: Boost productivity with smart keyboard shortcuts (Ctrl+S to save, Ctrl+1/2/3 to switch tabs)
- 🌙 **Dark Mode**: Easy on the eyes with beautiful dark and light themes
- 📤 **Export Options**: Download as TXT, HTML, print, or email your documents

## 🚀 Key Features

### 📝 Text Editor (30+ Tools)
- **Case Conversion**: Uppercase, lowercase, capitalize, title case, alternating case, camelCase
- **Text Alignment**: Left, center, right, justify alignment
- **Find & Replace**: Advanced text search and replacement with match highlighting
- **Text Manipulation**: Reverse text, remove extra spaces, trim whitespace
- **Encryption**: ROT13 encryption/decryption for text obfuscation
- **Text-to-Speech**: Built-in speech synthesis to hear your text
- **Copy to Clipboard**: One-click text copying
- **Draft Management**: Save, load, and delete multiple text drafts
- **Word Wrapping**: Wrap text at specific character lengths
- **Line Operations**: Add line numbers, sort lines, remove duplicates

### 📊 Advanced Analysis Dashboard
- **Word & Character Count**: Real-time detailed text statistics
- **Reading Time**: Estimated reading time (200 words/min) and speaking time (150 words/min)
- **Readability Score**: Flesch Reading Ease calculation for content optimization
- **Word Frequency Analysis**: Top 10 most frequently used words with counts
- **Character Frequency**: Detailed character usage breakdown
- **Text Statistics**: Comprehensive metrics including sentences, paragraphs, lines, and average word length
- **Live Preview**: See word count update as you type

### 🔍 Text Comparison
- **Similarity Analysis**: Percentage-based text similarity
- **Common Words**: Shared vocabulary between texts
- **Unique Words**: Words unique to each text
- **Visual Comparison**: Side-by-side text analysis
- **Statistics Comparison**: Word and character count comparison

### 🛠️ Utility Tools
- **JSON Tools**: Format (beautify) and minify JSON with syntax validation
- **Encoding/Decoding**: Base64, hexadecimal, binary, URL encoding/decoding
- **HTML Tools**: HTML escape/unescape for safe text rendering
- **Generators**: UUID/GUID generation, hash generation (MD5, SHA)
- **Text Converters**: ASCII to text, text to ASCII, and more
- **List Processors**: Sort, shuffle, and deduplicate lists

### 💾 Save & Export Options
- **Auto-Save**: Work is automatically saved to localStorage every 2 seconds
- **Draft Management**: Save multiple drafts with custom names for later use
- **Export as TXT**: Download your text as a plain text file
- **Export as HTML**: Save formatted HTML documents
- **Print**: Direct printing support with print preview
- **Email**: Quick email integration to share your text

### 🎨 Themes & Customization
- **7 Color Themes**: Blue, Red, Green, Yellow, Grey, Aqua, Black
- **Dark/Light Mode**: Toggle between dark and light modes for comfortable viewing
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Persistent Settings**: Your theme and mode preferences are saved

### ⌨️ Keyboard Shortcuts
- `Ctrl + S` - Auto-save your current document
- `Ctrl + 1` - Switch to Text Editor tab
- `Ctrl + 2` - Switch to Text Comparison tab
- `Ctrl + 3` - Switch to Utility Tools tab
- `Ctrl + C` - Copy text
- `Ctrl + V` - Paste text

## 🛠️ Built With

| Technology | Purpose |
|-----------|---------|
| ⚛️ **React 18.2.0** | Frontend framework for building UI components |
| 🎨 **Bootstrap 5** | Responsive design and styling |
| 🎯 **React Icons 5.3.0** | Icon library for modern UI elements |
| 📄 **jsPDF** | PDF generation capabilities |
| 🖼️ **html2canvas** | HTML to image conversion |
| 🔧 **Create React App** | Development environment and build tools |
| 💾 **localStorage API** | Client-side data persistence |

## 📦 Installation & Setup

## 📦 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/worded.git
   cd worded
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   If you encounter peer dependency issues, use:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   
   The app will automatically open at [http://localhost:3000](http://localhost:3000)
   
   If it doesn't open automatically, manually navigate to the URL in your browser.

### 🔧 Troubleshooting

**Port 3000 already in use?**
```bash
# On Windows
npx kill-port 3000

# On Mac/Linux
lsof -ti:3000 | xargs kill
```

**Build errors?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## 🚀 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

The page will reload when you make changes. You may also see lint errors in the console.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and filenames include hashes.

Your app is ready to be deployed!

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## 📱 How to Use

### 🔤 Text Editor

1. Navigate to the **"Text Editor"** tab (or press `Ctrl+1`)
2. Type or paste your text into the large text area
3. Use the formatting buttons to transform your text:
   - Click **"UPPERCASE"** to convert all text to uppercase
   - Click **"lowercase"** to convert all text to lowercase
   - Click **"Capitalize Each Word"** for title case
   - And many more options...
4. View real-time statistics in the dashboard below:
   - Word count, character count, sentences, paragraphs
   - Reading time and speaking time estimates
   - Readability score
5. Use **Find & Replace** to search and replace text
6. Save your work as a draft for later use
7. Export your text as TXT or HTML, or print it directly

### 🔍 Text Comparison

1. Navigate to the **"Text Comparison"** tab (or press `Ctrl+2`)
2. Enter your first text in the left text area
3. Enter your second text in the right text area
4. Click **"Compare Texts"** to analyze
5. View the results:
   - Similarity percentage
   - Common words shared between both texts
   - Unique words in each text
   - Individual word and character counts

### 🛠️ Utility Tools

1. Navigate to the **"Utility Tools"** tab (or press `Ctrl+3`)
2. Choose a tool category:
   - JSON formatting/minification
   - Base64 encoding/decoding
   - URL encoding/decoding
   - UUID generation
   - And more...
3. Enter your input text
4. Click the corresponding action button
5. Copy the output to your clipboard

## 🎨 Customization

### Changing Themes

1. Click on the **"Themes"** dropdown in the navigation bar
2. Select your preferred color:
   - **Blue**: Professional and clean
   - **Red**: Bold and energetic
   - **Green**: Calming and natural
   - **Yellow**: Bright and cheerful
   - **Grey**: Neutral and balanced
   - **Aqua**: Fresh and modern
   - **Black**: Dark and sophisticated

### Toggle Dark/Light Mode

1. Use the toggle switch in the navigation bar
2. Your preference is automatically saved for your next visit

## 🎯 Use Cases

- **Content Writing**: Track word count, analyze readability, and format text
- **Academic Writing**: Meet word/character limits, check statistics
- **Social Media**: Count characters for tweets, format captions
- **Programming**: Format JSON, encode/decode Base64, process strings
- **Email Writing**: Format and analyze email content before sending
- **Document Editing**: Clean up text, remove extra spaces, fix formatting
- **Text Analysis**: Compare documents, find similarities, analyze frequency
- **Quick Notes**: Save drafts, auto-save prevents data loss

## � Project Structure

```
textmint/
├── public/
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # PWA manifest
│   └── worded-logo.svg     # Application logo
├── src/
│   ├── components/
│   │   ├── Alert.js        # Alert notification component
│   │   ├── Navbar.js       # Navigation bar with themes & help
│   │   ├── TextForm.js     # Main text editor component
│   │   ├── TextComparison.js  # Text comparison tool
│   │   └── UtilityTools.js    # Utility tools collection
│   ├── App.js              # Main app component with routing
│   ├── App.css             # App-specific styles
│   ├── ModernUI.css        # Custom modern UI styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Project dependencies
└── README.md              # This file
```

## 🔒 Privacy & Security

- ✅ **100% Client-Side**: All text processing happens in your browser
- ✅ **No Server Requests**: Your data never leaves your device
- ✅ **No Tracking**: No analytics, cookies, or tracking scripts
- ✅ **No Account Required**: Use the app without signing up
- ✅ **localStorage Only**: Data saved locally on your device
- ✅ **Open Source**: Review the code yourself

Your privacy is our priority. TextMint is designed to work entirely offline for the core text tools after the initial load. Ads only load after the user gives consent.

## 🚀 Deployment

### Deploy to GitHub Pages

1. Update `package.json` with your repository:
   ```json
   "homepage": "https://yourusername.github.io/worded"
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy to Netlify

1. Build your app:
   ```bash
   npm run build
   ```

2. Drag and drop the `build` folder to [Netlify](https://app.netlify.com/drop)

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

### How to Contribute

1. **Fork** the Project
2. **Create** your Feature Branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your Changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the Branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Contribution Guidelines

- Write clear, concise commit messages
- Follow the existing code style
- Test your changes thoroughly
- Update documentation as needed
- Add comments for complex logic

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea for a new feature?

- **Bug Reports**: [Open an issue](../../issues/new?labels=bug&template=bug_report.md)
- **Feature Requests**: [Open an issue](../../issues/new?labels=enhancement&template=feature_request.md)

Please provide as much detail as possible to help us understand and address your concern.

## 📝 Roadmap

- [ ] PDF export functionality
- [ ] Markdown editor and preview
- [ ] Advanced text diff viewer
- [ ] Custom regex find and replace
- [ ] Text translation integration
- [ ] Grammar and spell check
- [ ] Collaborative editing
- [ ] Browser extension version
- [ ] Mobile app (React Native)
- [ ] API integration for developers

## 📄 License

Distributed under the **MIT License**. See `LICENSE` file for more information.

This means you can:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Private use

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

Special thanks to:

- [Create React App](https://github.com/facebook/create-react-app) - For the amazing React toolchain
- [Bootstrap](https://getbootstrap.com/) - For the responsive CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - For the beautiful icon library
- [jsPDF](https://github.com/parallax/jsPDF) - For PDF generation capabilities
- [html2canvas](https://html2canvas.hertzen.com/) - For HTML to canvas conversion
- All contributors who help improve this project

## 💖 Support

If you find this project helpful, please consider:

- ⭐ **Starring** this repository
- 🐛 **Reporting bugs** or suggesting features
- 📢 **Sharing** with others who might find it useful
- 🤝 **Contributing** to make it even better

## 📞 Support & Contact

Need help or have questions?

- 📖 Check the [Documentation](#how-to-use)
- 🐛 [Open an Issue](../../issues)
- 💬 [Discussions](../../discussions)
- 📧 Email: support@worded.com

---

<div align="center">
  
### ⭐ Star this repo if you find it useful!

**Made with ❤️ using React**

**Worded** - Your comprehensive text analysis and formatting companion! ✨

[⬆ Back to Top](#-worded---advanced-text-analysis--formatting-tools)

</div>
