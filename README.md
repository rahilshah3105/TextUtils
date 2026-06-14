# 📝 TextMint - Advanced Text Utility & Analysis Suite

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg?style=flat-square&logo=react)](https://react.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.1.3-7952B3.svg?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deployment-Netlify-00C7B7.svg?style=flat-square&logo=netlify)](https://textmint.netlify.app/)

**TextMint** (developed in the `TextUtils` repository) is a modern, comprehensive, and privacy-first text manipulation and real-time analysis web application. Designed for developers, writers, editors, and students, TextMint offers a suite of powerful utilities to edit, format, compare, and transform text directly in the browser.

Created by **[Rahil Shah (rahilshah3105)](https://github.com/rahilshah3105)**.

---

## 🚀 Live Demo

Access the live application here: **[https://textmint.netlify.app/](https://textmint.netlify.app/)**

---

## 📂 Table of Contents

- [About The Project](#-about-the-project)
- [The Problem It Solves](#-the-problem-it-solves)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation & Setup](#-installation--setup)
- [Usage Instructions](#-usage-instructions)
- [SEO & Discoverability](#-seo--discoverability)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)
- [License](#-license)

---

## 📖 About The Project

TextMint is a highly responsive, single-page React application built to streamline common text operations. Whether you need to analyze writing readability, find differences between two drafts, format complex JSON structures, or encrypt/encode snippets, TextMint provides a centralized, beautiful glassmorphic dashboard to get it done instantly.

Designed to be beginner-friendly for everyday users yet feature-rich enough for developers, TextMint combines high performance with fluid, elegant UI customizability.

---

## 💡 The Problem It Solves

Most online text utility tools require pasting sensitive, private, or proprietary data (such as API payloads, emails, keys, or drafts) onto external servers. This poses a major **privacy and data security risk**.

**TextMint solves this by being 100% client-side.**
All text calculations, transformations, and comparisons happen locally in your web browser. No server calls are made, ensuring your data never leaves your device. It runs securely and privately.

---

## ✨ Key Features

### 1. 📝 Advanced Text Editor
* **Case Converters:** Convert to UPPERCASE, lowercase, Capitalize Each Word, Title Case, camelCase, snake_case, kebab-case, alternating case.
* **Line Operations:** Sort lines alphabetically, add line numbers, and remove duplicate lines.
* **Layout & Alignment:** Center, left, right, or justify alignment; trim whitespace and remove extra spaces.
* **Find & Replace:** Dynamic search with live visual highlighting and global replacement.
* **Text-to-Speech:** Listen to your text using browser-native speech synthesis with controls.
* **ROT13 Cipher:** Instantly encrypt/decrypt text snippets.

### 2. 📊 Live Statistics Dashboard
* **Real-time Counters:** Track word count, character count, sentences, paragraphs, and line counts dynamically as you type.
* **Readability Index:** Automated readability calculation using the Flesch Reading Ease formula.
* **Estimations:** Average reading and speaking time estimates based on standard speeds.
* **Frequencies:** Interactive lists displaying the most frequently used words and characters.

### 3. 🔍 Visual Diff Tool (Comparison)
* **Side-by-Side View:** Input two drafts and visually track added, removed, or modified terms.
* **Similarity Score:** An exact percentage indicator showing how similar the text blocks are.

### 4. 🛠️ Developer Utilities Suite
* **JSON Formatter & Minifier:** Beautify raw JSON with proper indentation or compress it for payload optimization.
* **Encoders & Decoders:** Support for Base64, Hexadecimal, Binary, and URL encoding/decoding.
* **HTML Escaper:** Safely encode HTML tags for secure web rendering.

### 🎨 Premium Aesthetics & Customization
* **Multiple Themes:** Choose from **7 pre-curated color branding palettes** (Blue, Red, Green, Yellow, Grey, Aqua, and Dark).
* **True Dark Mode:** Sleep-friendly dark interface protecting eyes during night shifts.
* **Persistence & Auto-save:** Restores active editor drafts and user preferences (like theme and mode) automatically on reload.

---

## 🛠️ Tech Stack

* **Frontend Core:** [React.js](https://react.dev/) (v18.2.0)
* **Styling UI:** [Bootstrap](https://getbootstrap.com/) (v5.1.3) & Custom Vanilla CSS (fluid glassmorphism, smooth transitions)
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/)
* **Document Export:** [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)
* **Deployment:** [Netlify](https://www.netlify.com/)

---

## 📸 Screenshots

*Below are UI placeholders representing the core layout of TextMint.*

| Light Mode Dashboard | Dark Mode Dashboard |
| :---: | :---: |
| ![Light Mode Preview](https://via.placeholder.com/600x350/ffffff/6366f1?text=TextMint+Light+Mode+Editor) | ![Dark Mode Preview](https://via.placeholder.com/600x350/0f1419/ffffff?text=TextMint+Dark+Mode+Editor) |

| Text Comparison View | Utility Tools View |
| :---: | :---: |
| ![Comparison Tool](https://via.placeholder.com/600x350/f8fafc/6366f1?text=TextMint+Visual+Diff+Comparison) | ![Utility Tools](https://via.placeholder.com/600x350/eef2ff/4f46e5?text=TextMint+Developer+Utilities) |

---

## ⚙️ Installation & Setup

Follow these steps to run TextMint locally on your computer:

### Prerequisites
Make sure you have Node.js installed:
* [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
* [npm](https://www.npmjs.com/) (v8.0.0 or higher)

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
   *Note: If you encounter peer dependency conflicts, resolve them safely with `npm install --legacy-peer-deps`.*

3. **Start the Development Server**
   ```bash
   npm start
   ```
   The application will launch automatically at `http://localhost:3000` in your browser.

4. **Build for Production**
   ```bash
   npm run build
   ```
   Compiles and builds production-ready files in the `/build` folder.

---

## 💡 Usage Instructions

1. **Toolbar Tab Navigation:** Navigate between the **Text Editor**, **Text Comparison (Diff)**, and **Utility Tools** using the horizontal tab menu or use keyboard shortcuts `Ctrl + 1`, `Ctrl + 2`, and `Ctrl + 3`.
2. **Text Processing:** Type or paste text into the inputs to instantly view character statistics, word counts, and readability analysis.
3. **Saving Drafts:** Click "Save Draft" in the editor. TextMint automatically handles backup persistence so you won't lose work on tab refreshes.
4. **Exporting Documents:** Use the export buttons at the bottom of the editor to download your formatted text as a plain `.txt` file, custom `.html` page, or generate a `.pdf` layout.
5. **Theme Selection:** Click the sun/moon button in the top navbar to toggle Light/Dark Mode, or choose a custom color theme accent from the menu choices to suit your visual style.

---

## 🔍 SEO & Discoverability

To improve visibility and search performance (making sure the page loads and ranks on Google Search Console):
* **Canonical Configuration:** Configured `<link rel="canonical">` in `index.html` referencing `https://textmint.netlify.app/`.
* **Sitemap (`sitemap.xml`):** Pre-generated index maps for Google Crawler bot optimization.
* **Robots Configuration (`robots.txt`):** Structured crawlers direction pointing explicitly to the sitemap location.
* **Verification:** Embedded Google Search Console meta tag directly within the head template.
* **Schema Markup:** Implemented structured metadata tags for proper index listings.

---

## 🔮 Future Enhancements

- [ ] Add a visual **Markdown Editor** featuring a side-by-side live HTML renderer.
- [ ] Incorporate advanced **Regex (Regular Expression) Search & Replace** engine.
- [ ] Implement integrated grammar checklist indicator warnings.
- [ ] Support file uploads to directly edit `.docx` or `.pdf` file text.
- [ ] Build a browser extension for quick access to utility features.

---

## 👨‍💻 Author

Created by **Rahil Shah (rahilshah3105)**.

* **GitHub:** [@rahilshah3105](https://github.com/rahilshah3105)
* **LinkedIn:** [Rahil Shah](https://www.linkedin.com/in/rahilshah3105)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
