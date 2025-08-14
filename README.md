# **ReQuestor: Reservation Queue System for Classroom Equipment**  
<p align="center"><em>Smart Requests. Seamless Reservations.</em></p>

---

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)
![ChakraUI](https://img.shields.io/badge/UI-Chakra%20UI-319795?logo=chakraui&logoColor=white)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Framework-Express-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Hosted%20On-Supabase-3ECF8E?logo=supabase&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

---

## 📊 Project Status  
**Under Development** — ReQuestor is an upcoming **web-based reservation and queue management platform** designed to replace outdated paper-based equipment request forms with a **streamlined, digital-first experience**.

---

## 📖 Overview  
**ReQuestor** is built for academic institutions such as **PUP San Juan** to simplify and modernize classroom equipment reservations — from projectors to white screens and beyond.  

### Key Benefits  
- **📄 Paperless Process** – Submit reservation requests online in seconds.  
- **⏱ Fair Queueing System** – First-come, first-served with timestamp-based ordering.  
- **📡 Real-Time Availability** – Instantly check if equipment is available.  
- **🛠 Admin Dashboard** – Approve, reject, or cancel bookings with one click.  
- **🔔 Notifications** – Email and in-app updates for every request status change.  

---

## ✨ Features by User Role

### 👩‍🎓 Student / Requestor
- Fully responsive interface for mobile, tablet, and desktop
- Submit equipment reservation requests online  
- View request status (Pending, Approved, In Use, Returned)  
- Check real-time availability of equipment  
- Receive email and in-app notifications for updates  
- Cancel pending requests before approval  

### 🧑‍💼 Admin
- Desktop-first interface for efficient management  
- View, approve, reject, or cancel equipment requests  
- Manage equipment inventory and availability status  
- Track ongoing and upcoming reservations  
- Configure reservation rules (e.g., max duration, advance booking time)  



> **💡 Design Note:**  
> The **Student side** of ReQuestor is fully responsive and optimized for mobile, tablet, and desktop devices.  
> The **Admin dashboard** is designed primarily for desktop use, given that most administrative workflows occur on larger screens for better visibility and data management efficiency.

---

## 🛠 Tech Stack  
| Layer       | Technology |
|-------------|------------|
| **Frontend** | React, Chakra UI, Vite |
| **Backend**  | Node.js, Express |
| **Database** | Supabase (PostgreSQL) |
| **Auth**     | JWT |
| **CI/CD**    | GitHub Actions |

---

## 🚀 Features  

### ✅ Completed  
- **User Accounts** – Role-based access (Admin, Student)  
- **Queue Management** – Track requests through Pending → Approved → In Use → Returned stages  
- **Admin Panel** – Review, approve, reject, or cancel requests  
- **Equipment Availability Tracking** – Real-time view of available and reserved equipment  
- **Inventory Management** – Admins can add, edit, or remove equipment items  
- **Basic Reservation Rules** – Prevent overlapping schedules and enforce availability
- **Advanced Search & Filters** – Find requests by date, status, or equipment type  

### 🔄 In Progress  
- **Online Reservation Form** – Fully paperless booking process  
- **Email & In-App Notifications** – Keep users informed instantly  
- **Configurable Booking Settings** – Admin-defined max booking time and advance request limits    
- **Student Dashboard** – View personal booking history, status updates, and announcements  
- **Responsive Student UI** – Mobile, tablet, and desktop optimization for requestors  

---

## 📂 Project Structure
```
📦 project-root
├── 📂 client
│   ├── 📂 public
│   ├── 📂 src
│   │   ├── 📂 api
│   │   ├── 📂 assets
│   │   ├── 📂 components
│   │   │   ├── 📂 buttons
│   │   │   ├── 📂 cards
│   │   │   ├── 📂 dropdowns
│   │   │   ├── 📂 inputs
│   │   │   ├── 📂 modals
│   │   │   ├── 📂 routes
│   │   ├── 📂 constants
│   │   ├── 📂 context
│   │   ├── 📂 hooks
│   │   ├── 📂 layouts
│   │   ├── 📂 pages
│   │   │   ├── 📂 Authentication
│   │   │   ├── 📂 admin
│   │   │   │   ├── 📂 Activity
│   │   │   │   ├── 📂 Dashboard
│   │   │   │   ├── 📂 Equipment
│   │   │   │   ├── 📂 ManageUsers
│   │   │   │   ├── 📂 Requests
│   │   │   │   ├── 📂 Settings
│   │   │   ├── 📂 user
│   │   │       ├── 📂 Dashboard
│   │   ├── 📂 routes
│   │   ├── 📂 store
│   │   ├── 📂 utils
├── 📂 server
│   ├── 📂 src
│   │   ├── 📂 config
│   │   ├── 📂 controllers
│   │   ├── 📂 emailservices
│   │   ├── 📂 helpers
│   │   ├── 📂 middleware
│   │   ├── 📂 routes
```
---

## 🤝 Contributing  
We welcome contributions!  
1. Fork the repository  
2. Create a feature branch (`git checkout -b feature-name`)  
3. Commit changes (`git commit -m 'Add new feature'`)  
4. Push to your branch (`git push origin feature-name`)  
5. Open a Pull Request  
