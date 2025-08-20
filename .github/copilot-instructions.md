# Phoenix 05 Football Academy Web Application

## Project Overview

This guide will walk you through building a full-stack web application for the Phoenix 05 Football Academy. We will use the T3 Stack philosophy (focusing on simplicity and modularity) with a Next.js frontend and a separate Node.js/Express backend.

### Technology Stack
- **Frontend**: Next.js 13+ (with App Router)
- **Styling**: Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens) for the admin panel

## Expected Outcome: The Final Website

Upon completion, you will have a professional, fully functional website with two main components:

### The Public-Facing Website
- **Homepage**: A visually engaging landing page with the academy's logo, photos, and mission
- **Teams Page**: A section showcasing all academy teams (e.g., U18 Boys, U15 Girls), with rosters for each
- **Player Profiles**: Individual pages for each player with their photo, bio, and position
- **Match Center**: A page displaying upcoming fixtures and past results, with a special feature to showcase the "Starting 11" on match days
- **Online Registration**: A seamless, user-friendly form for new players to submit their applications directly to your database

### The Secure Admin Dashboard
- **Login System**: A password-protected portal accessible only to academy staff
- **Application Management**: A dashboard to view all player applications, with the ability to approve or reject them
- **Player & Team Management**: Tools to add new players, update profiles, and assign players to their respective teams
- **Match Management**: An interface to schedule new matches and, most importantly, to select and publish the "Starting 11" and substitutes for upcoming games

## Phase 1: Project Setup & Backend Foundation

### Step 1.1: Initialize the Next.js Frontend
First, create the main project directory and then set up the Next.js frontend within a client folder.

```bash
mkdir phoenix-academy-web
cd phoenix-academy-web
npx create-next-app@latest client
```

When prompted by Next.js, choose the following options:
- Would you like to use TypeScript? **Yes**
- Would you like to use ESLint? **Yes**
- Would you like to use Tailwind CSS? **Yes**
- Would you like to use 'src/' directory? **Yes**
- Would you like to use App Router? **Yes**
- Would you like to customize the default import alias? **No**

### Step 1.2: Initialize the Node.js Backend
Now, set up the backend server in a separate server folder.

```bash
mkdir server
cd server
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
```

### Step 1.3: Structure the Backend Project
Create a clear folder structure inside the server directory for better organization:

```
/server
  /config
    - db.js       // MongoDB connection logic
  /controllers
    - applicationController.js
    - playerController.js
    - matchController.js
    - authController.js
  /models
    - Application.js
    - Player.js
    - Match.js
    - Team.js
    - User.js     // For admin users
  /routes
    - applicationRoutes.js
    - playerRoutes.js
    - matchRoutes.js
    - authRoutes.js
  - server.js     // Main server entry point
  - .env          // Environment variables
  - .gitignore
```

### Step 1.4: Define the Database Schemas with Mongoose
This is a critical step. You will create Mongoose schemas based on the academy's needs.

#### Player Model
```javascript
// Player.js schema should include:
// - firstName (String, required)
// - lastName (String, required)
// - dateOfBirth (Date, required)
// - gender (String, enum: ['Male', 'Female'], required)
// - position (String)
// - team (ObjectId, ref: 'Team')
// - bio (String)
// - imageUrl (String)
// - isActive (Boolean, default: true)
// Include timestamps
```

#### Application Model
```javascript
// Application.js schema should include:
// - firstName
// - lastName
// - dateOfBirth
// - gender
// - parentName
// - parentPhone
// - parentEmail
// - previousClub
// - medicalInfo
// - status (enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending')
```

#### Team Model
```javascript
// Team.js schema should include:
// - name (e.g., "U18 Boys", "U15 Girls")
// - ageGroup (String)
// - gender (String)
```

#### Match Model
```javascript
// Match.js schema should include:
// - teamA (ObjectId, ref: 'Team')
// - teamB (String, opponent name)
// - scoreA (Number)
// - scoreB (Number)
// - matchDate (Date)
// - venue (String)
// - starting11 (Array of ObjectId, ref: 'Player')
// - substitutes (Array of ObjectId, ref: 'Player')
```

#### User Model
```javascript
// User.js schema should include:
// - username (String, required, unique)
// - password (String, required)
// - role (String, default: 'admin')
```

### Step 1.5: Connect to MongoDB and Start the Server

#### Database Connection (db.js)
Create an async function to connect to MongoDB using Mongoose. Use `process.env.MONGO_URI` for the connection string and handle connection errors.

#### Express Server (server.js)
Create a basic Express server that:
- Uses dotenv to load environment variables
- Connects to the MongoDB database using the function from db.js
- Uses CORS middleware
- Parses JSON request bodies
- Sets up a basic route at `/` that responds with 'API is running...'
- Listens on `process.env.PORT` or defaults to 5000

#### Environment Variables (.env)
Create a `.env` file in the server directory:

```
MONGO_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_super_secret_key
```

## Phase 2: Building the API Endpoints

For each feature, you will create the controller logic (how to handle requests) and the routes (the URL endpoints).

### Step 2.1: Create the Application Submission Endpoint

#### Application Controller
Create a controller function `submitApplication` that:
- Takes `req` and `res` parameters
- Creates a new Application document using data from `req.body`
- Handles potential errors with a try-catch block
- Sends appropriate success or error responses

#### Application Routes
Create an Express router with a POST route at `/` that uses the `submitApplication` controller function.

In `server.js`, import and use this new route:
```javascript
app.use('/api/applications', applicationRoutes);
```

### Step 2.2: Create Public Data Endpoints
In the appropriate controllers and routes, create functions and GET endpoints to:
- Fetch all active players
- Fetch a single player by their ID
- Fetch all upcoming matches, sorted by date
- Fetch all teams

## Phase 3: Building the Frontend & Admin Panel

Now you'll switch to the client directory to build the user interface.

### Step 3.1: Create Reusable Components

#### Navbar Component
Create a `Navbar.tsx` component using Tailwind CSS with:
- The 'P05 Dynamic Mark' logo on the left
- Links to Home, About, Teams, and Registration on the right
- A 'Login' button for the admin
- Responsive design for mobile devices

#### Footer Component
Create a `Footer.tsx` component with appropriate content and styling.

Use both components in your main `layout.tsx` file to wrap the page content.

### Step 3.2: Build the Registration Page
Create a new page component at `client/src/app/register/page.tsx`:
- Create a player registration form with fields matching the Application schema
- Use the react-hook-form library for form state management and validation
- On submit, make a POST request to the `/api/applications` backend endpoint using axios
- Display success or error messages to the user

### Step 3.3: Build the Match Day Page
Create a new page component at `client/src/app/matches/page.tsx`:
- Fetch the list of upcoming matches from the `/api/matches` endpoint
- Display the matches as a series of cards
- Each card should show the two teams, the match date, and the venue
- For each match, if a 'starting11' array exists, display a visual grid of the 11 player names

### Step 3.4: Build the Admin Dashboard (Protected)

#### Authentication Controller
Create two controller functions in `authController.js`:
- `registerUser`: Hash the user's password using bcryptjs before saving to the database
- `loginUser`: Find a user by username, compare the password with the stored hash, and generate a JWT token containing the user's ID if they match

#### Admin Frontend
- Create an admin login page
- On successful login, save the received JWT to local storage
- Create a protected layout or higher-order component that checks for a valid JWT
- If the token is missing or invalid, redirect to the login page
- Create an 'Application Management' page within the admin section that fetches all applications and allows an admin to update their status (Approve/Reject)

## Final Steps: Deployment

### Frontend (Vercel)
- Connect your GitHub repository to Vercel
- It will automatically detect your Next.js app and deploy it
- Add your backend API URL as an environment variable (e.g., `NEXT_PUBLIC_API_URL=https://your-backend-url.com`)

### Backend (DigitalOcean/Heroku/Render)
- Use a service that supports Node.js
- Configure your environment variables (`MONGO_URI`, `PORT`, `JWT_SECRET`) in the service's dashboard

This detailed guide provides a clear roadmap. Use GitHub Copilot to generate the boilerplate code for each step, then refine it to perfectly match your academy's unique requirements.