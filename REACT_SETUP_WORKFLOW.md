# Workflow: Setting up React with Rails 5 API

This guide details how to create a modern React frontend that consumes your existing Rails application as an API.

## 1. Prepare Rails (The Backend)

To allow a separate React app (running on a different port) to talk to Rails, you must enable **CORS**.

### Step 1.1: Add CORS Gem
Add this to your `Gemfile`:
```ruby
gem 'rack-cors'
```
Then run:
```bash
docker-compose exec web bundle install
```

### Step 1.2: Configure CORS
Create `config/initializers/cors.rb`:
```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:5173' # Vite's default port

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```
*Restart your Rails server after this change.*

---

## 2. Create React App (The Frontend)

We will use **Vite** for a fast, modern setup.

### Step 2.1: Initialize Project
Run this command inside your project folder (`kitnet-edparaiba`):
```bash
npm create vite@latest property-flow-web -- --template react
cd property-flow-web
npm install
```

### Step 2.2: Verify Setup
Start the dev server:
```bash
npm run dev
```
Open `http://localhost:5173` to see your new React app.

---

## 3. Connect Frontend to Backend

### Step 3.1: Create an API Service
In your React project, create `src/services/api.js`:
```javascript
const API_URL = "http://localhost:3000";

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users.json`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
};
```

### Step 3.2: Fetch Data in a Component
Edit `src/App.jsx`:
```javascript
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users.json')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>PropertyFlow Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

---

## 4. (Optional) Run React with Docker

To run your frontend in Docker alongside Rails, follow these steps.

### Step 4.1: Create Frontend Dockerfile
Inside `property-flow-web/Dockerfile`:
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
```

### Step 4.2: Update docker-compose.yml
Add the `frontend` service to your main `docker-compose.yml`:

```yaml
  frontend:
    build: ./property-flow-web
    ports:
      - "5173:5173"
    volumes:
      - ./property-flow-web:/app
      - /app/node_modules
    depends_on:
      - web
```

### Step 4.3: Start Everything
```bash
docker-compose up --build
```
Now you have:
*   Frontend: `http://localhost:5173`
*   Backend: `http://localhost:3000`
