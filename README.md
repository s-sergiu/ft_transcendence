# ft_Transcendence - Web-based Social Gaming Platform

![Transcendence](https://img.shields.io/badge/Transcendence-42_Project-blue)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#Configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

Transcendence is a web-based social gaming platform that allows users to:

- Register or log in using the 42Auth API or an email and username.
- Connect with friends and see their online status.
- Chat with friends using a built-in chat app.
- View friend profiles and game statistics.
- Play Ping Pong against friends online in real-time.
- Play Ping Pong locally against the computer or with another user at the same keyboard.

## Technologies Used

- Front-end: React with Bootstrap for a responsive and user-friendly interface.
- Back-end: Django for robust server-side logic and data management.
- Websocket Secure for efficient and secure real-time communication during online Ping Pong matches.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed for front-end development.
- Python 3 and Django framework installed for back-end development.
- A 42Auth API client ID and secret (if using 42Auth for login).

### Installation

**Nothing to Install Manually**


### Configuration

1. **Set Env**

   - Create a local development environment by copying what inside `README.md` to `.env`.
   - Update `.env` with your database connection details, 42Auth credentials (if applicable), and any other necessary settings.

### Running the Project

1. **Start the Docker Container**

   ```bash
   ./start
   ```
2. **Choose From the Menu**
  
   *In Production Mode : This will typically run the server on `https://Your_Host_Name:443`.
   *In Development Mode : This will typically run the server on `http://Your_Host_Name:80`.

## Usage

1. Open `https://Your_Host_Name:443` or `http://Your_Host_Name:80` in your web browser.
2. Register or log in using the available methods.
3. Add friends and view their online status.
4. Choose a game mode: Play online with a friend, locally with another user, or against the computer.
5. Chat with friends using the built-in chat app.

## Contributing

We welcome contributions to Transcendence! If you'd like to contribute, please fork the repository and submit a pull request. Before contributing, please review the project's contribution guidelines (if available).

## License

[MIT](https://github.com/s-sergiu/ft_transcendence/blob/master/LICENSE).
