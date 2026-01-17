# 🔧 Install .NET 8 SDK and MySQL - Step by Step Guide

## ❌ **Current Issue**
```
dotnet: The term 'dotnet' is not recognized
mysql: The term 'mysql' is not recognized
```

## ✅ **Solution: Manual Installation**

---

## 📥 **Step 1: Install .NET 8 SDK**

### **Method 1: Direct Download**
1. **Open your web browser**
2. **Go to**: https://dotnet.microsoft.com/en-us/download/dotnet/8.0
3. **Click**: "Download .NET 8.0 SDK x64" (Windows)
4. **Run the installer** when download completes
5. **Follow installation wizard** (click Next, Next, Install)
6. **Restart your command prompt** after installation

### **Method 2: Using Winget (if available)**
```powershell
winget install Microsoft.DotNet.SDK.8
```

### **Method 3: Using Chocolatey (if available)**
```powershell
choco install dotnet-8.0-sdk
```

### **Verify Installation**
After installation, open a **NEW** PowerShell window and run:
```powershell
dotnet --version
```
Expected output: `8.0.xxx`

---

## 📥 **Step 2: Install MySQL Server**

### **Method 1: MySQL Installer (Recommended)**
1. **Go to**: https://dev.mysql.com/downloads/installer/
2. **Download**: "mysql-installer-community-8.x.x.x.msi"
3. **Run installer** and select "Developer Default"
4. **Set root password**: Use `admin123` (or remember your password)
5. **Complete installation** following the wizard

### **Method 2: Direct MySQL Server**
1. **Go to**: https://dev.mysql.com/downloads/mysql/
2. **Download**: "MySQL Community Server" ZIP or MSI
3. **Install** following the setup wizard

### **Verify Installation**
After installation, open a **NEW** PowerShell window and run:
```powershell
mysql --version
```
Expected output: `mysql Ver 8.x.x`

---

## 🔄 **Step 3: Update Environment Variables (If Needed)**

If commands still don't work after installation:

### **For .NET:**
1. **Open**: System Properties → Advanced → Environment Variables
2. **Add to PATH**: `C:\Program Files\dotnet`

### **For MySQL:**
1. **Add to PATH**: `C:\Program Files\MySQL\MySQL Server 8.0\bin`

---

## 🧪 **Step 4: Test Installation**

Open a **NEW** PowerShell window and run:
```powershell
# Test .NET
dotnet --version

# Test MySQL
mysql --version

# Test both together
dotnet --info
```

---

## 🚀 **Step 5: Run the Backend API**

Once .NET is installed:
```powershell
cd EmployeeManagementAPI
dotnet restore
dotnet run
```

Expected output:
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
      Now listening on: http://localhost:5000
```

---

## 🗄️ **Step 6: Setup Database**

Once MySQL is installed:

### **6.1 Connect to MySQL**
```powershell
mysql -u root -p
# Enter your password when prompted
```

### **6.2 Run Database Setup**
```sql
-- Copy and paste the entire content from:
-- EmployeeManagementAPI/database-setup.sql
```

### **6.3 Update Connection String**
Edit `EmployeeManagementAPI/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=EmployeeManagementDB;User=root;Password=admin123;"
  }
}
```

---

## 🎯 **Alternative: Use Online Tools (Temporary)**

If installation is difficult, you can use online alternatives:

### **For .NET Development:**
- **GitHub Codespaces**: https://github.com/codespaces
- **Replit**: https://replit.com
- **CodeSandbox**: https://codesandbox.io

### **For MySQL:**
- **PlanetScale**: https://planetscale.com (free tier)
- **Railway**: https://railway.app
- **Supabase**: https://supabase.com

---

## 🔧 **Troubleshooting**

### **If .NET still not recognized:**
1. **Restart computer** after installation
2. **Check PATH** environment variable
3. **Reinstall** .NET SDK
4. **Use full path**: `C:\Program Files\dotnet\dotnet.exe --version`

### **If MySQL still not recognized:**
1. **Restart computer** after installation
2. **Check PATH** environment variable
3. **Use full path**: `"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" --version`

---

## ⚡ **Quick Alternative: Use Docker**

If you have Docker installed:
```powershell
# Run MySQL in Docker
docker run --name mysql-emp -e MYSQL_ROOT_PASSWORD=admin123 -p 3306:3306 -d mysql:8.0

# Run .NET in Docker (advanced)
docker run -it --rm -v ${PWD}:/app -w /app mcr.microsoft.com/dotnet/sdk:8.0 dotnet run
```

---

## 🎉 **Expected Final Result**

After successful installation:
```powershell
PS C:\Users\S K\Desktop\Assign> dotnet --version
8.0.404

PS C:\Users\S K\Desktop\Assign> mysql --version
mysql  Ver 8.0.35 for Win64 on x86_64
```

Then you can run the full Employee Management System with real backend and database!