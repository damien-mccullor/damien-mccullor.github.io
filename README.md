# Damien McCullor Portfolio

This project is a personal portfolio website built with React, Vite, and Supabase. It showcases Damien McCullor's background, projects, links, and a public contact form, while also providing a protected back-office view for managing submitted messages.

## Tech Stack

- React 19
- Vite
- React Router
- Supabase
- CSS

## Education

- Bachelor of Science in Cybersecurity
- Continuing professional development in software engineering, full-stack development, and data analytics

## Skills

- Full-Stack Development
- Java
- Node.js
- React Native
- SQL
- Python
- Data Analytics
- Cybersecurity

## Project Structure

```text
src/
  components/      Shared layout and UI components
  context/         Theme and language context providers
  i18n/            Translation files
  lib/             Supabase client setup
  pages/           Home, Portfolio, Links, Contact, Login, and Back Office pages
public/            Static assets and robots.txt
ai/                AI specification and feature planning files
docs/              Elevator pitch scripts and feedback
```

## Installation / Setup Instructions

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file in the project root with your Supabase values:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server with `npm run dev`.
5. Build for production with `npm run build`.

## Environment Variables

The application expects the following environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

These values should be stored in a local `.env` file and never committed to GitHub.

## API Documentation

The portfolio uses Supabase as the backend service for:

- storing contact form submissions in the `messages` table
- authenticating the admin user for the back office

## Author

Damien McCullor

I updated my LinkedIn profile, uploaded my resume, and refreshed my education and skills to reflect my current background in cybersecurity, full-stack development, and data analytics. The skills listed here match the portfolio and include Java, Node.js, React Native, SQL, Python, and cybersecurity.

LinkedIn: https://www.linkedin.com/in/damien-mccullor
