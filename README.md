# Node.js Backend for Response Code List Management  

## Description  
This is a backend service built with Node.js, Express, and MongoDB for managing HTTP response code lists. It supports user authentication, advanced regex-based filtering, saving response code lists with metadata, and full CRUD operations. The project was developed as part of the MoEngage assignment to demonstrate backend development skills and database interaction.  

---

## Features  
- **User Authentication:** Secure login and signup functionality.  
- **Advanced Filtering:** Filter HTTP response codes using regex patterns (e.g., `2xx`, `20x`, etc.).  
- **List Management:** Create, read, update, and delete saved lists with metadata such as:  
  - Name  
  - Creation date  
  - Response codes  
  - Associated images  
- **Search Page:** Display matching response code images from the [http.dog](https://http.dog/) API based on filters.  
- **Listing Page:** View, edit, or delete saved lists.  

---

## Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JSON Web Tokens (JWT)  
- **Dependencies:**  
  - `mongoose` for MongoDB integration  
  - `express` for routing  
  - `bcryptjs` for password hashing  
  - `jsonwebtoken` for secure token-based authentication  

---

## Installation  

### Prerequisites  
- Node.js and npm installed on your system.  
- MongoDB installed locally or access to a MongoDB Atlas cluster.  

### Steps  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/sahil1si18ec083/Response-Code-List-Management-in-Node.js.git 
