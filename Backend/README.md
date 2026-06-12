# Backend Setup

1. Create a MySQL database:

```sql
CREATE DATABASE schooldiary;
```

2. Go to the backend directory:

```bash
cd Backend
```

3. Create your local environment file from the example:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Update the database credentials and JWT secret in `.env` if needed:

```env
DB_URL=jdbc:mysql://localhost:3306/schooldiary
DB_USERNAME=root
DB_PASSWORD=
JWT_SECRET=your-base64-secret
```

5. Run the backend on Windows cmd:

```cmd
mvnw.cmd spring-boot:run
```

The backend runs by default at:

```text
http://localhost:8081
```
