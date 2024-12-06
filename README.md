# Campus Cruisin' 
This website aims to organize UCLA Engineering Clubs so students can better find a club that interests them.

## Note for graders
Under contributors, Layah and Rachel only show one commit. However, they have been contributing to the project and have made multiple commits over the past three months. However, it does show up when the following command is run in the terminal on this repository:
     
     git log --author="<NAME>"

For Layah, there was a period of time where her GitHub account was not connected to her laptop, so her commits can be found using the following two commands:

     git log --author="Layah Vigneaud"
     git log --author="layahvigneaud"

For Rachel, use the following command to verify her commits:

     git log --author="rchlyoung0415"

## Tech Stack
**Backend:** ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

**Frontend:** ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)


## Clone the repository

     git clone https://github.com/layahvigneaud/campus_cruzin.git
     cd campus_cruzin

## Getting started

Open a new terminal and then split the terminal.

**Start client (frontend):**

     cd mern/client
     npm i
     npm run dev
     
**Start server (backend):**

     cd mern/server
     npm i
     npm start

**Add and Update an .env file in mern/server:**

     MONGODB_USER_URL=
     PORT="3001"
     KEY=
     GMAIL_PASS=
     GMAIL=
     
     # MONGO_USER_URL is the MongoDB URI
     # KEY is sequence of characters used to sign and decode the token, can be any
     # GMAIL is the email for which you want to send reset password links from
     # GMAIL_PASS is the app password generated from GMAIL

**NOTE:** _Clubs were added manually into the MongoDB following the schema specified under mern/server/models/Club.js_

## Credits:
@michelle-b7
@angoway
@chrissanrow
@layahvigneaud
@rchlyoung0415
