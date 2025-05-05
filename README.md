# 🎵 OpalMp3

OpalMp3 is a lightweight, Java-based music application that provides a seamless experience for managing and playing MP3 files. The project includes a web-based interface and can be deployed as a `.war` file to any Java application server.

---

## 🚀 Features

- 🎧 Play and manage MP3 files
- 📁 Upload and organize audio files
- 🔍 Search and filter tracks
- 📊 User-friendly dashboard
- 💾 Integrated with MySQL for persistent storage
- 📦 Deployable `.war` build using Ant or Maven

---

## 🛠️ Tech Stack

- **Backend:** Java, Spring MVC
- **Frontend:** ExtJS (or HTML/CSS/JS)
- **Database:** MySQL
- **Build Tool:** Ant or Maven
- **Deployment:** `.war` file for servlet containers (e.g., Apache Tomcat)

---

## 📁 Project Structure

```
OpalMp3/
├── dist/
│   └── OpalMp3.war
├── src/
│   └── ... Java source files ...
├── web/
│   └── ... Frontend files ...
├── .gitignore
└── README.md
```

---

## 🔧 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/puzariZ/OpalMp3.git
cd OpalMp3
```

### 2. Configure MySQL
- Create a database, e.g., `opalmp3`
- Update DB credentials in your `jdbc.properties` or `application.properties`

### 3. Build the Project

Using **Maven**:
```bash
mvn clean package
```

Using **Ant**:
```bash
ant build
```

### 4. Deploy the `.war` file
- Copy `dist/OpalMp3.war` to your servlet container’s `webapps/` folder (e.g., Apache Tomcat).
- Start the server.
- Visit `http://localhost:8080/OpalMp3/`

---

## 📌 Notes

- The `.war` file is **not tracked** in version control due to GitHub's 100 MB file limit.
- If you need the latest build, generate it locally using your build tool.

---

## 🧑‍💻 Author

- **Name:** Avinash Pandey (`@puzariZ`)
- **GitHub:** [https://github.com/puzariZ](https://github.com/puzariZ)

---

## 📜 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
