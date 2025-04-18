# My Interactive CV / Portfolio

This repository contains the source code for my personal CV and portfolio website, built with modern web technologies.

![React](https://img.shields.io/badge/React-^18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-^5.2.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-^5.2.0-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-^3.4.1-06B6D4?logo=tailwindcss)
![daisyUI](https://img.shields.io/badge/daisyUI-^4.7.2-1ad1a5?logo=daisyui)
![React Router](https://img.shields.io/badge/React_Router-^6.22.3-CA4245?logo=reactrouter)
![React Markdown](https://img.shields.io/badge/React_Markdown-^10.1.0-blue)

<!-- Optional: Add a screenshot -->
<!-- ![Screenshot](link/to/your/screenshot.png) -->

## Features

*   Interactive CV presentation.
*   Sections for Resume (Experience, Education, Competencies), Projects, and Blog.
*   Language toggle (English / Portuguese).
*   Responsive design for various screen sizes.
*   Built following the [Tailawesome Personal CV Template](https://www.tailawesome.com/resources/personal-cv) style.
*   Blog posts loaded dynamically from Markdown files.

## Project Setup & Running Locally

1.  **Prerequisites:**
    *   Node.js (LTS version recommended, e.g., v18 or v20)
    *   npm (comes with Node.js) or yarn/pnpm

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/mrricardocarvalho/my-cv.git
    cd my-cv
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install / pnpm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or yarn dev / pnpm dev
    ```
    This will start the Vite development server, typically at `http://localhost:5173`. The application will automatically reload when you make changes to the source files.

5.  **Build for production:**
    ```bash
    npm run build
    # or yarn build / pnpm build
    ```
    This creates an optimized static build in the `dist/` directory.

6.  **Preview the production build:**
    ```bash
    npm run preview
    # or yarn preview / pnpm preview
    ```

## Tech Stack

*   **Framework:** React (v18+) with TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS with the daisyUI component library (primarily for toggle, potentially other elements) and the `@tailwindcss/typography` plugin.
*   **Routing:** React Router DOM (v6+)
*   **Markdown:** React Markdown
*   **Icons:** Font Awesome (via CDN)

## Project Structure

my-cv/
├── public/ # Static assets (images, logos, etc.)
│ ├── images/
│ │ └── logos/
│ └── ...
├── src/ # Source files
│ ├── assets/ # Static assets processed by Vite (e.g., CSS background images)
│ ├── blog/
│ │ └── posts/ # Markdown files for blog content (.en.md, .pt.md)
│ ├── components/ # Reusable React components (Sidebar, JobEntry, Footer, etc.)
│ ├── pages/ # Page-level components rendered by router (ResumePage, BlogPostPage, etc.)
│ ├── App.tsx # Main application component with routing setup
│ ├── cv-data.ts # Centralized data for CV content (experience, education, skills, text, etc.)
│ ├── index.css # Tailwind CSS directives and base styles
│ └── main.tsx # Entry point of the application, renders App
├── .gitignore # Files/folders ignored by Git
├── index.html # Main HTML template
├── package.json # Project dependencies and scripts
├── README.md # This file
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js # PostCSS configuration (for Tailwind/Autoprefixer)
└── tsconfig.json # TypeScript configuration


## Deployment

This is a static site built with Vite. The production files are generated in the `dist/` folder after running `npm run build`. Deploy this `dist/` folder to any static hosting provider like:

*   [Vercel](https://vercel.com/) (Recommended: Easy Git integration)
*   [Netlify](https://www.netlify.com/) (Recommended: Easy Git integration / Drag & Drop)
*   [GitHub Pages](https://pages.github.com/) (Requires some configuration for SPAs built with Vite)
*   ...and many others!

<!-- Add specific deployment instructions if you choose one -->

## Contributing

This is a personal project, but feel free to fork it or use it as inspiration.

## License

<!-- Optional: Add a license like MIT -->
<!-- MIT License -->
<!-- Copyright (c) [Year] [Your Name] -->
<!-- ... full license text ... -->