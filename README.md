# BELL.AI

BELL.AI is an interactive AI-powered portfolio built with React and Vite. It presents professional experience, technical skills, and business impact through a conversational interface that mimics modern AI chat applications.

This project was designed to bridge the gap between human interaction and digital portfolios, allowing users to explore information dynamically instead of through static pages.

---

## Overview

BELL.AI is a chat-based portfolio experience where users can:

- Explore professional experience in e-commerce and web development
- Understand measurable business results and impact
- Evaluate technical and analytical skills
- Interact with an AI assistant that represents the portfolio owner
- Access contact information through a dedicated conversational flow

The interface is inspired by modern AI tools and focuses on usability, responsiveness, and clean visual design.

---

## Features

- Chat-based user interface with message history
- Dynamic conversation creation and management
- AI integration via API for real-time responses
- Light and dark mode toggle
- Fully responsive layout with mobile optimization
- Sidebar navigation with chat sessions
- Contact section integrated into the chat experience
- Smooth scrolling and typing indicators
- Auto-resizing input field for better UX

---

## Tech Stack

Frontend:
- React
- Vite
- JavaScript (ES6+)
- Tailwind CSS (utility-based styling)

Concepts and Patterns:
- Component-based architecture
- State management with React hooks
- useMemo and useEffect for performance optimization
- API communication using fetch
- Responsive design principles

---

## Project Structure
src/
assets/ # Images and static assets
App.jsx # Main application entry
Chat-app.jsx # Core chat logic and UI
index.css # Global styles
main.jsx # React root initialization

---

## How It Works

The application simulates a chat environment where:

1. Users start a new conversation or select an existing one
2. Messages are stored per conversation
3. User input is sent to an external AI API
4. The assistant responds dynamically
5. Conversations are persisted in local state

The chat system includes predefined conversations to guide users and showcase key information.

Getting Started
Prerequisites
Node.js installed
npm or yarn

## Installation
npm install

## Run the development server
npm run dev


## Customization

You can easily customize:

Chat prompts and initial conversations inside the code
Theme colors and UI behavior
Contact information
API endpoint for AI responses

## Design Philosophy

This project was built with the following principles:

User-centered experience
Clear connection between business and technology
Interactive storytelling instead of static content
Clean and minimal interface
Performance and responsiveness
