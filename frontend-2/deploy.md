**deployment cheat sheet** for React + Spring Boot (Windows Service) 🚀setup.

---

## 📝 **ESMS Deployment Checklist (Windows Service)**

### 🔹 1. Build Frontend (React + Vite)

```bash
cd frontends
npm run build
```

- Output goes to: `frontend/dist/`
- Ensure `vite.config.js` is set with:

  ```js
  export default defineConfig({
    build: {
      outDir: '../backend/src/main/resources/static',
    },
  });
  ```

👉 This copies your React build into backend’s `static` folder automatically.

---

### 🔹 2. Build Backend (Spring Boot Jar)

```bash
cd backend
mvn clean package -DskipTests
```

### 🔹 2.1 Build Backend in Production env (Spring Boot Jar)

```bash
cd backend
mvn clean package -DskipTests -Dspring.profiles.active=prod


```

- Jar will be generated at:
  `backend/target/ESMS-<version>.jar`

---

### 🔹 3. Versioning the Jar

Update `pom.xml` for version control:

```xml
<version>4.0.0</version>
```

Then Jar name = `ESMS-4.0.0.jar`

---

### 🔹 4. Deploy to Server Folder

Copy the new jar to your deploy directory:

```powershell
Copy-Item target\ESMS-4.0.0.jar D:\esms\ESMS-4.0.0.jar -Force
```

---

### 🔹 5. Update Windows Service

Your service script (`ESMS-Service`) already points to the jar in `D:\esms`.
If you’re versioning, update symlink or rename old jar:

```powershell
Remove-Item D:\esms\ESMS-latest.jar -Force
Copy-Item D:\esms\ESMS-4.0.0.jar D:\esms\ESMS-latest.jar
```

---

### 🔹 6. Restart Service

```powershell
Restart-Service ESMS-Service
```

---

### 🔹 7. Verify

- Backend: `http://192.168.2.3:82/api/v1/welcome` ✅
- Frontend: `http://192.168.2.3:82/` ✅

---

## ⚡ Shortcut (2–3 Commands)

When updating:

```bash
cd frontend && npm run build && cd ../backend
mvn clean package -DskipTests
powershell -Command "Copy-Item target\ESMS-4.0.0.jar D:\esms\ESMS-latest.jar -Force; Restart-Service ESMS-Service"
```

---

🎯 That’s it — one command chain = build, deploy, restart.
No manual steps, smooth updates every time.
