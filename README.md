<p align="center">
  <img width="460" height="300" src="https://github.com/Capstone-Team-Red/Bern/assets/86167421/01f6a971-64c3-415f-b131-22a2248f70bc">
</p>

<p align="center">
  https://bern-app.onrender.com/
</p>

## :fire:	Overview
"Bern" is a dynamic and feature-rich online platform designed to revolutionize the fitness industry by providing a centralized hub for fitness enthusiasts and instructors. Leveraging cutting-edge technologies and a user-centric approach, the platform offers a seamless experience for users to explore, book, and manage fitness sessions with a wide array of instructors. By integrating essential components such as user authentication, interactive maps for session locations, secure payment processing, and a user-friendly interface, Bern aims to bridge the gap between users seeking fitness guidance and instructors eager to share their expertise. Whether users are looking to engage in group classes or personalized training, the platform offers a comprehensive range of options tailored to individual preferences. With its emphasis on convenience, engagement, and security, Bern redefines the way people engage with fitness, fostering a community of fitness enthusiasts and instructors united by a shared passion for a healthier lifestyle.

## :goal_net: Objective
To develop a comprehensive and user-friendly online platform that connects users with fitness instructors and empowers them to discover, book, and manage fitness sessions seamlessly. This platform aims to provide users with a diverse range of fitness options, allowing them to explore various classes and training sessions offered by different instructors. By creating a dynamic interface that showcases listings, facilitates bookings, and integrates secure payment processing through technologies like Stripe, the project intends to foster a convenient and engaging experience for both users and instructors. The project also emphasizes user authentication, ensuring secure access to personalized profiles and features based on their roles, whether they are regular users or fitness instructors. Through effective UI/UX design and careful integration of front-end and back-end technologies, the project aims to offer a comprehensive fitness solution that enhances the fitness journey for users while providing instructors with a streamlined platform to showcase their expertise and manage their offerings.

## :footprints: Steps of Development
### 1. Project Planning and Setup
- Defined the scope and requirements of the project.
- Decided on which technologies we'll be using for both front-end and back-end.
- Set up the project structure, including directories for client-side and server-side code.

### 2. Front-End Development
- Created the user interface (UI) wireframes and design mockups.
- Set up the front-end library.
- Developed the UI components, pages, and views.
- Implemented state management using Redux.
- Integrated third-party libraries for specific functionalities (e.g., Stripe for payments, Google Maps for maps).
- Implemented user authentication and authorization if needed.
- Tested the front-end components and features.

### 3. Back-End Development
- Designed the database schema and relationships.
- Set up the back-end server using Express.js.
- Implemented API routes for handling user data, listings, orders, etc.
- Set up database models using an ORM (e.g., Sequelize) and defined associations.
- Implemented authentication and authorization using tools like JWT.
- Implemented data validation and sanitization.
- Tested the API endpoints using tools like Postman.

### 4. Database Setup Seeding 
- Set up the database using a database management system (e.g., PostgreSQL).
- Created tables based on the defined models.
- Implemented database seeding to populate initial data for testing.

### 5. Integration and Testing
- Integrated the front-end and back-end by making API requests from the client to the server.
- Tested the application as a whole, including user flows, interactions, and data flow.
- Implemented unit tests and integration tests for both front-end and back-end code.
- Debugged and fixed any issues that persisted during testing.

### 6. Styling and UI Enhancement
- Applied styles and CSS to improve the visual appearance of the application.
- Made the UI responsive and mobile-friendly using media queries.
- Implemented animations and transitions for a polished user experience.

### 7. Deployment and Hosting
- Set up hosting for both front-end and back-end (e.g., Render).
- Configured environment variables for sensitive information.
- Deployed the application to Render for hosting.

### 8. Performance Optimization
- Optimized the application's performance by minimizing unnecessary requests and improving load times.
- Implemented caching strategies for frequently accessed data.
- Optimized images and other media for faster loading.

### 9. Security and Bug Fixes
- Conducted security audits to identify potential vulnerabilities.
- Implemented security best practices to protect user data.
- Addressed any bugs or issues reported during testing or after deployment.

### 10. Documentation and User Testing
- Created documentation for developers, including API documentation and usage guides.
- Conducted user testing to gather feedback on usability and identify areas for improvement.
- Updated the application based on user feedback and testing results.

### 11. Final Polish and Launch
- Double-checked all functionalities and user flows.
- Made any final adjustments and polished the application.
- Launched the application for public use.

### 12. Maintenance and Updates
- Monitor the application's performance and correct any critical issues promptly.
- Regularly update dependencies to ensure security and compatibility.
- Continuously gather user feedback and consider adding new features or improvements.

## :computer: Technologies
### Front-end:

- JavaScript (Programming language for front-end logic)
- HTML5 (Markup Language)
- CSS3 (Styling)
- Git (Version control)
- React (version 18.2.0)
- React Redux (version 8.0.4)
- React Router DOM (version 6.4.2)
- react-google-maps (version 9.4.5)
- Redux Toolkit (version 1.9.5)
- Axios (version 1.1.3)
- ESM (version 3.2.25)
- React DOM (version 18.2.0)
- Redux Logger (version 3.0.6)
- Webpack (version 5.74.0)
- Webpack CLI (version 4.10.0)
- Babel Core (version 7.19.6)
- Babel Loader (version 8.2.5)
- Babel Preset Env (version 7.19.4)
- Babel Preset React (version 7.18.6)

### Back-end:

- Node.js (version 18.16.0)
- Express (version 4.18.2)
- Bcrypt (version 5.1.0)
- Compression (version 1.7.4)
- Dotenv (version 16.3.1)
- Jsonwebtoken (version 9.0.1)
- react-google-maps (version 9.4.5)
- Morgan (version 1.10.0)
- Pg (PostgreSQL client, version 8.8.0)
- Sequelize (version 6.25.3)
- Stripe (version 12.16.0)

## :floppy_disk: Installation from GitHub

To clone this repo, you'll need to take the following steps:

**Important:**
*You will need to update your .env file with the following items before starting the server to have it working properly...*
  
- **JWT**= (*your own*)
- **DB_HOST**=postgres://bern_user:6raSh41UFlu7cbfXRT63GkTJIkd6evxB@dpg-cjdte52nip6c73c06qo0-a.oregon-postgres.render.com/bern
- **CLIENT_SECRET**=(*your own secret key from stripe*)
- **REACT_APP_API_KEY**=(*your own Google Maps API key*)

```
git clone git@github.com:Capstone-Team-Red/Bern.git
cd Bern
npm install
npm run seed
npm run build
npm run start
```

## :man_technologist::woman_technologist::man_technologist::man_technologist: Contributors
<p align="center">
  <b>Leo Harada</b>
</p>
<p align="center">
  leotharada@gmail.com
</p>
<p align="center">
  https://www.linkedin.com/in/leoharada/
</p>
<p align="center">
  https://github.com/LeoHarada
</p>
<p align="center">
  <img width="202" height="202" src="https://github.com/Capstone-Team-Red/Bern/assets/86167421/51e4e01a-c5bf-4410-ae12-d15b4e6013a5">
</p>

<p align="center">
  <b>Dianna Chen</b>
</p>
<p align="center">
  diannachen10@gmail.com
</p>
<p align="center">
  https://www.linkedin.com/in/dianna-chen/
</p>
<p align="center">
  https://github.com/diannachen10
</p>
<p align="center">
  <img width="202" height="202" src="https://github.com/Capstone-Team-Red/Bern/assets/86167421/0c674949-4391-4928-ab0a-677a030039c6">
</p>

<p align="center">
  <b>Jesse Hernandez</b>
</p>
<p align="center">
  jhernandez43075@gmail.com
</p>
<p align="center">
  https://www.linkedin.com/in/jessehernandeziii/
</p>
<p align="center">
  https://github.com/imaJackal
</p>
<p align="center">
  <img width="202" height="202" src="https://github.com/Capstone-Team-Red/Bern/assets/86167421/f4c634c3-fdda-49c9-a593-15eaf9099c39">
</p>

<p align="center">
  <b>Ivan Garcia</b>
</p>
<p align="center">
  Garcia.ivan1211@gmail.com
</p>
<p align="center">
  https://www.linkedin.com/in/ivan-garcia1/
</p>
<p align="center">
  https://github.com/ig168
</p>
<p align="center">
  <img width="202" height="202" src="https://github.com/Capstone-Team-Red/Bern/assets/86167421/76438e14-46cc-4c20-8f0b-1e85849c42b0">
</p>
