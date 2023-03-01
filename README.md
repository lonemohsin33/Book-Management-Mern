# Book-Management-Mern
This is the frontend for Book management system!

### Features 
1. It contains the Login Page, Signup Page, The homepage. 
2. It contains AUthentication for the user if user it will move on to users profile page showig some details about the user. 
3. The user will be able to create a book of his liking and upload the cover for the Book. 
4. User will be able to logout from his account or it will get logged out after an hour of inactivity.
5. The details of the user are stored in the MongoDB and the profile pic of the user isuploaded to cloud using cloudinary. 
6. Since i am using react this is a single page website meaning moving from one page to other is easier and instantaneous. 
7. Redux is used a the state management for the website. 
8. Website uses RestFull Architecture.


### MongoDB 
MongoDB is a nosql Database used to store data in json/document format. I have used mongoDB using mongoose Library for the connection of Nodejs and The DB.
Mongoose Provides many different and easy methods to interact with the DB. 


### RestFull
Using HTTP requests, we can use the respective action to trigger every of these four CRUD operations.
1. POST is used to send data to a server — Create
2. GET is used to fetch data from a server — Read
3. PUT is used to send and update data — Update
4. DELETE is used to delete data — Delete

### Authentication / Authorization
Use of JSONWEBTOKEN for Authentication and Authorization purpose.

### Use Of Cookie-Parser
I have used the Token which will be available from Jsonwebtoken and sent it as  cokiee for the session to keep the user Logged in.

### Reeact Hooks
I have used React hooks like use state and use Effect. 
Use effect is used to render changes after any updation/change in the provided state. 

# Scripts

### npm run start

Command to run the server in development mode!

### npm run build 

Command to create a build folder for Production.

### Use of Chakra UI. 
I have used chakra ui in this project. Almost all Css is done in using Chakra UI.
It gives us an inbuilt theme for changing the light mode and dark mode of the application. 

### use Of Cloudinary for uploading pictures/videos(if needed) 

### Use of MongoDB as a DataBase

### This is yet in the devlopement phase so it is not ready to use yet.
