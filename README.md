# Chit Chat 

### Overview

The **Chit Chat** is a fully functional chat platform that enables users to send and receive messages in real time. Built with a modern tech stack, it provides features such as user authentication, private and group messaging, and timestamped messages.

## Application Link

[https://chit-chat-olive-delta.vercel.app](https://chit-chat-olive-delta.vercel.app)

## Features

- **Multi-User Platform** : Multiple users can simultaneously draw, erase and chat on the whiteboard.
- **Real-Time Messaging** : Send and receive messages instantly.
- **User Authentication** : Secure login and registration using JWT.
- **Private Chat** : One-to-one conversations.
- **Group Chat** : Create and participate in group discussions.
- **Message Timestamps** : Each message includes a timestamp for context.


## Setup Instructions

### 1. Clone the repository

```shell
git clone https://github.com/sanketjaswal/SyncSketch.git
cd SyncSketch
```

### 2. Install dependencies for Client and Server

```shell
cd client
npm install

cd server
npm install
```

### 3. Start the application

```shell
npm start
```

This will run the app in development mode in http://localhost:3000.

### 4. Build for production

```shell
npm run build
```

## Dependencies

Below is a list of dependencies used in the project:

- **[React](https://www.npmjs.com/package/react)**: Frontend library for building user interfaces.
- **[React Router](https://www.npmjs.com/package/react-router-dom)**: For client-side routing within the application.
- **[Toastify](https://www.npmjs.com/package/toastify)**: Library for customizable toast notifications in web apps.
- **[Rough.js](https://roughjs.com/)**: Library for creating hand-drawn, sketchy graphics in web applications.
- **[Socket.io](https://www.npmjs.com/package/scoketio)**: Library for real-time, bidirectional communication between clients and servers.
- **[Eslint](https://www.npmjs.com/package/eslint)**: ESLint tool used to detects and fixes JavaScript code issues.
- **[Prettier](https://www.npmjs.com/package/prettier)**: For code formatter with consistent styling.

## Features

### `Room` 

A room is a unique identifier that groups users for collaborative interactions within a specific session.

### `Create Room`

To create a room -
   - Define the User name.
   - Generate a unique room code.
   - Create a room. 
   - Room create will be joined to the new room.
 
> Room creater can share the room ID to the other users.

### `Join Room`

To join a room -
   - Define the User name.
   - Enter the unique room code.
   - Join the room. 
   - New user will be joined to the room.

### `Whiteboard`

A whiteboard is an interactive canvas where users can draw and collaborate in real-time, often used for brainstorming, teaching, or creative projects.

### `Color Picker`

Color picker allows users to select and customize colors for their drawing tools, enhancing the creative experience with a range of colors and shades.

### `Sketch Tools`

Sketching tools provide users with various options of tools to create and modify drawings with different styles and effects.
Tools available in Application -
   - **Pencil** - To draw free hand drawing.
   - **Line** - To draw a straight line.
   - **Quadrilateral** - To draw a shape with four sides.

> More tools to be added in coming updates.

### `Draw`

To do sketching follow these steps -
   - Chosse your desired tool and color.
   - Press the mouse click button.
   - Hold the click and Drag the mouse to your desire. 
   - Release the Mouse button.

### `Undo / Redo`

Undo and Redo allow users to revert or reapply their previous actions, providing flexibility and control over their artwork.

### `Clear Canvas`

Clear Canvas allows users to erase all content on the canvas, providing a fresh workspace for new drawings.

## Code Structure

```shell
 client ──
  src
  ├── /components                   # Includes  components for application
  |
  ├── /pages                        # Includes pages to be shown
  │   └── index.jsx                 # Page to start the application
  |
  ├── /assets                       # Includes assets for application
  │
  ├── App.jsx                       # Main component that houses the layout
  ├── App.css                       # Global CSS file
  │
  └── index.html                    # Main index.html file

server ──
  ├── /utils                        # Includes utilities for server
  |
  ├── server.js                     # Main file for start server 
  │
  └── .env                          # Includes the environmental variables
```



# Conclusion

This whiteboard application is ideal for remote learning, brainstorming sessions, and team collaboration, providing an interactive and engaging platform for users to work together in real-time.
