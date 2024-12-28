# TalkNest Chat Application

TalkNest is a full-stack chat application built with a React frontend and an Express.js backend. It offers real-time messaging, user authentication, profile management, and a responsive design tailored for seamless user experience.

## Features

- **User Authentication**: Secure sign-up and login functionalities using JWT.
- **Profile Management**: Users can update their profiles, including uploading profile images.
- **Real-Time Chat**: Engage in direct messages and participate in various channels.
- **Responsive Design**: Built with Tailwind CSS for a modern and adaptable interface.
- **Emoji Support**: Enhance messages with a wide range of emojis.
- **Secure Data Handling**: Password hashing with bcrypt and protected routes with middleware.

## Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Zustand](https://zustand-demo.pmnd.rs/) for state management
  - [Axios](https://axios-http.com/) for API requests
  - [Sonner](https://github.com/sonnerhq/sonner) for notifications

- **Backend**:
  - [Express.js](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
  - [JWT](https://jwt.io/) for authentication
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing


## Project Structure
The project is structured into two main parts:
- **`client/`**: Contains the ReactJS frontend.
- **`server/`**: Contains the NodeJS & Express.js backend.
