# Veterinary Petcare
Create new microservice for its veterinary franchise.

<h1 align="center"> 🐾 Petcare </h1>

<p align="center">
  <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>

## 📄 Project Description
<p align="justify">
A client hired Compass to build a new microservice for its veterinary franchise. This microservice will be used by all the clinics they own for internal client and attendances management.

So, you have this new mission, to build the POC foundations of this brand new microservice, so the sales and management team can have the primary technical view of the needs that the client has.
</p>

## 🔥 API Documentation

For information about the endpoints made available by the API, after deploying the project just access localhost:3000/api-docs, the swagger with the available functionalities will be displayed.

##  🛠 Project Features
### Create a REST API following the requested patterns:

Auth
- `POST/auth`: -> Authenticate the given user.

Tutor
- `GET/tutors`: -> Retrieves all tutors.
- `POST/tutor `: -> Create a new tutor.
- `PUT/tutor/:id`: -> Updates a tutor.
- `DELETE/tutor/:id`: -> Deletes a tutor.

Pet
- `POST/pet/:tutorId`: -> Creates a pet and adds it to a tutor.
- `PUT/pet/:petId/tutor/:tutorId`: -> updates a pet's info.
- `DELETE/pet/:petId/tutor/:tutorId`: -> deletes a pet from a tutor.


## 🚩 Requirements

 - Before starting, you will need to have [NodeJS](https://nodejs.org/en/) installed on your machine.
 - You need a [MongoDB](https://account.mongodb.com/account/login?signedOut=true) account and a [cluster](https://medium.com/reprogramabr/conectando-no-banco-de-dados-cloud-mongodb-atlas-bca63399693f#:~:text=Acesse%20ao%20site%20do%20MongoDB,%2C%20pois%20demora%20para%20carregar..) to be able to connect

## 💻 How to initialize

<br/>
Then you will run the following commands:

Clone repository to local machine

```sh
git https://github.com/SilvaRafael1/veterinary-petcare.git
```

Access the cloned folder

```sh
cd veterinary-petcare
```

Run NPM to install dependencies

```sh
npm install
```

Create a file called .env in the default directory and put the preferences

```sh
MONGO_URI= # MongoDB connection URI - ex: mongodb+srv://<username>:<password>@cluster.com
JWT_SECRET=  # Secret key for JWT authentication - ex: secret
JWT_LIFETIME=  # JWT token lifetime - ex: 1h, 1d, 30d
```

Start the server

```sh
npm start
```
## 🧪 Running the tests

To run tests, run the following command:

```sh
npm run test
```

### Check Coverage
To check test coverage, run the following command:
```sh
npm run test:coverage
```
## ✅ Techniques and technologies used

- ``Typescript`` vˆ5.1.6
- ``Mongoose`` v^7.4.1
- ``Express`` v^4.18.2
- ``Prettier`` v^3.0.0
- ``ESLint`` v^8.45.0
- ``Swagger`` v^5.0.0
- ``Joi`` v^17.9.2
- ``Jest`` v^29.6.2

## 👨🏻‍💻 Developers

| [<img src="https://avatars.githubusercontent.com/u/112594276?v=4" width="80px;"/>](https://github.com/JeanCarlosDelai) | [<img src="https://avatars.githubusercontent.com/u/104951242?v=4" width="80px;"/>](https://github.com/SilvaRafael1) | [<img src="https://avatars.githubusercontent.com/u/37108878?v=4" width="80px;"/>](https://github.com/tegerafael)
| --- | --- | --- |
| Jean Carlos | Rafael Augusto | Tiago Rafael
