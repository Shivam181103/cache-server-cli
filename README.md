# Caching Proxy CLI

A simple **CLI-based caching proxy server** built with Node.js. It intercepts requests, caches responses, and reduces redundant API calls.

## 🚀 Features
- Caches API responses for faster subsequent requests.
- Supports custom **port** and **API base URL** via CLI arguments.
- Works with **cURL, browser, or frontend apps (React, etc.)**.
- Graceful shutdown: clears cache on exit.

## 📌 Prerequisites

Ensure you have **Node.js** installed on your system.

## 🔧 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Shivam181103/cache-server-cli.git
   cd cache-server-cli
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Make the script executable (optional for Unix/Linux/Mac):**
   ```sh
   chmod +x index.js
   ```

## 🚀 Start the Proxy Server

Run the following command to start the proxy server with a custom port and API base URL:
```sh
node index.js --port 5000 --api https://jsonplaceholder.typicode.com
```

📌 **Example Output:**
```
🚀 Proxy Server running at http://localhost:5000
🌎 Proxying requests to: https://jsonplaceholder.typicode.com
```

## 🔄 Using the Proxy Server

### 1️⃣ **Make Requests**

#### **Using cURL**
```sh
curl http://localhost:5000/todos/1
```

#### **From Browser**
Open: [http://localhost:5000/todos/1](http://localhost:5000/todos/1)

#### **From JavaScript (React, etc.)**
```javascript
fetch("http://localhost:5000/todos/1")
  .then(res => res.json())
  .then(data => console.log(data));
```

### 2️⃣ **Stop the Proxy Server**
Press `CTRL + C` in the terminal or run:
```sh
node index.js stop
```

## 🛠️ How It Works
1. **Intercepts requests** made to `http://localhost:<port>/path`.
2. **Checks the cache**:
   - If cached, returns the saved response.
   - Otherwise, fetches from the target API, stores in cache, and returns the response.
3. **Graceful Shutdown**:
   - On exit, clears cache and releases memory.

## 📝 Notes
- If `index.js` isn't executable, run:
  ```sh
  chmod +x index.js
  ```
- Requests to `localhost:5000/some-path` are proxied to the API base URL. 

