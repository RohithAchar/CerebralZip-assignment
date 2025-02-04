# Project Setup Instructions

![Dashboard Image](dashboard-image.png)

Follow the steps below to get the project up and running.

## 1. Clone the repository

```bash
git clone https://github.com/RohithAchar/CerebralZip-assignment.git
cd CerebralZip-assignment
```

## 2. Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the MySQL database (Ensure MySQL is installed and running).

   To run the database in a Docker container, you can use:

   ```bash
   docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=yourpassword -d -p 3306:3306 mysql:latest
   ```

4. Seed the database:

   ```bash
   npm run seed
   ```

5. Start the backend server:

   ```bash
   npm run start
   ```

## 3. Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd ./frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Your application should now be running!
