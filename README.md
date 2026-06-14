# 📝 TextMint - Advanced Text Analysis & Formatting Suite

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.1.3-purple.svg)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-black.svg)](https://taskmint-tools.vercel.app/)

**TextMint** is a modern, comprehensive, and privacy-first text manipulation and analysis web application. Designed for developers, writers, students, and content creators, TextMint offers a suite of **30+ powerful utilities** to edit, compare, and transform text directly in the browser.

Created by **[Rahil Shah (rahilshah3105)](https://github.com/rahilshah3105)**.

---

## 🚀 Live Demo

Check out the live application here: **[https://taskmint-tools.vercel.app/](https://taskmint-tools.vercel.app/)**

---

## 📂 Table of Contents
- [About The Project](#-about-the-project)
- [The Problem It Solves](#-the-problem-it-solves)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation & Setup](#-installation--setup)
- [Usage Instructions](#-usage-instructions)
- [SEO & Search Console Integration](#-seo--search-console-integration)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)
- [License](#-license)

---

## 📖 About The Project

TextMint is a highly responsive, single-page application built to make common text operations painless. Whether you need to count words, compare drafts for differences, format JSON data, or encode keys to Base64, TextMint provides a centralized dashboard to do it all in real time.

### 🎯 Perfect For:
- **Developers:** Format JSON, encode/decode Base64/Hex/Binary/URL, and escape HTML tags instantly.
- **Writers & Editors:** Analyze readability, check word frequency, track word limits, and estimate reading/speaking times.
- **Marketers & SEO Specialists:** Cleanup content, count characters, and optimize formatting for platforms.
- **Students:** Convert cases, strip excess whitespace, and export formatted work.

---

## 💡 The Problem It Solves

Most online formatting tools require pasting sensitive or proprietary data (like emails, articles, or software keys) onto external servers. This poses a major **privacy and data security risk**. 

**TextMint solves this by being 100% client-side.** All text transformations, analyses, and comparisons happen entirely in your browser. No server calls are made, ensuring your data never leaves your local device. 

---

## ✨ Key Features

### 1. 📝 Advanced Text Editor
- **Case Converters:** UPPERCASE, lowercase, Capitalize Each Word, title case, camelCase, alternating case.
- **Line Operations:** Add line numbers, sort lines alphabetically, remove duplicate lines.
- **Layout & Formatting:** Left, right, center, and justify alignment; trim whitespace and remove extra spaces.
- **Interactive Find & Replace:** Find matching terms with live visual highlighting and replace them globally.
- **ROT13 Encryption:** Obfuscate/encrypt and decrypt text snippets.
- **Text-to-Speech:** Listen to your written text using built-in speech synthesis.

### 2. 📊 Live Statistics Dashboard
- **Real-Time Counters:** Instant updates for word count, character count, sentences, paragraphs, and lines.
- **Reading & Speaking Times:** Estimates based on standard speech rates.
- **Readability Index:** Automated Flesch Reading Ease calculations.
- **Frequencies & Distribution:** Detailed charts for the top 10 most used words and characters.

### 3. 🔍 Text Comparison (Diff Tool)
- **Visual Diff:** Side-by-side comparison highlighting matching and unique vocabulary.
- **Similarity Percentage:** Numerical scoring showing how similar two text blocks are.

### 4. 🛠️ Utilities Suite
- **JSON Formatter/Minifier:** Beautify or compress JSON strings with built-in validation.
- **Encoders & Decoders:** Base64, Hexadecimal, Binary, and URL.
- **HTML Escaper:** Safely encode HTML tags for secure web rendering.

### 5. 🎨 Aesthetic & UX Customization
- **Theme Switcher:** Toggle between **7 gorgeous color palettes** (Blue, Red, Green, Yellow, Grey, Aqua, and Dark/Black).
- **Dark/Light Mode:** Full dark mode support preserving eye comfort.
- **Auto-Save:** Saves work progress to local storage every 2 seconds.
- **Keyboard Shortcuts:** Use `Ctrl + S` to save and `Ctrl + 1/2/3` to jump tabs.

---

## 🛠️ Tech Stack

- **Frontend Core:** [React.js](https://react.dev/) (v18.3.1)
- **Styling UI:** [Bootstrap](https://getbootstrap.com/) (v5.1.3) & Custom CSS (featuring glassmorphism, fluid transitions, and responsive layouts)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Document Export:** [jsPDF](https://github.com/parallax/jsPDF) and [html2canvas](https://html2canvas.hertzen.com/)
- **Deployment:** [Netlify](https://www.netlify.com/)

---

## 📸 Screenshots

*Placeholders for UI screenshots. Feel free to replace these with actual screenshot links.*

| Light Mode Dashboard | Dark Mode Dashboard |
|:---:|:---:|
| ![Light Mode Preview](https://via.placeholder.com/600x350/ffffff/0d6efd?text=TextMint+Light+Mode) | ![Dark Mode Preview](https://via.placeholder.com/600x350/121212/ffffff?text=TextMint+Dark+Mode) |

| Text Comparison View | Utility Tools View |
|:---:|:---:|
| ![Comparison Tool](https://via.placeholder.com/600x350/f3f4f6/1f2937?text=TextMint+Text+Comparison) | ![Utility Tools](https://via.placeholder.com/600x350/e0f2fe/0369a1?text=TextMint+Utility+Tools) |

---

## ⚙️ Installation & Setup

Get a local copy of the project up and running in minutes.

### Prerequisites
Make sure you have Node.js and npm installed.
- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rahilshah3105/TextUtils.git
   cd TextUtils
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   *Note: If you encounter peer dependency warnings, resolve them with `npm install --legacy-peer-deps`.*

3. **Start the Development Server**
   ```bash
   npm start
   ```
   The application will automatically load at `http://localhost:3000` in your browser.

4. **Build for Production**
   ```bash
   npm run build
   ```
   Optimizes and outputs production-ready code in the `/build` folder.

---

## 💡 Usage Instructions

1. **Tab Navigation:** Switch tabs using the navbar buttons or press `Ctrl + 1` (Text Editor), `Ctrl + 2` (Text Comparison), or `Ctrl + 3` (Utility Tools).
2. **Interactive Elements:** Input text to watch the counters and stats dashboard update instantly.
3. **Draft Control:** Use the "Save Draft" button to save text versions. Drafts persist even if you reload the browser tab.
4. **Theme Selection:** Click the theme selector in the navbar to swap color branding on the fly.

---

## 🔍 SEO & Search Console Integration

TextMint is optimized for crawling, speed, and discoverability:
- **`sitemap.xml`**: Pre-configured routes for indexation.
- **`robots.txt`**: Clear directions for crawlers to map the index paths.
- **`manifest.json`**: Configured app identity metadata.
- **Google Search Console**: Configured with meta verification tags in `index.html`.

---

## 🔮 Future Enhancements

- [ ] Add full **Markdown Editor** with real-time side-by-side HTML preview.
- [ ] Implement advanced **Regex (Regular Expression) Search & Replace** engine.
- [ ] Add support for **Grammar & Spell Checking** indicators.
- [ ] Expand export options to include **Microsoft Word (.docx)** formats.
- [ ] Build a **Chrome Extension** for quick utility access anywhere on the web.

---

## 👨‍💻 Author

**Rahil Shah**
- **GitHub:** [@rahilshah3105](https://github.com/rahilshah3105)
- **LinkedIn:** [Rahil Shah](https://www.linkedin.com/in/rahilshah3105) *(Update with your LinkedIn profile link!)*

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
