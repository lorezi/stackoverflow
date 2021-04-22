# Stackoverflow Documentation

The stackoverflow task is basic implementation of [Stackoverflow](https://stackoverflow.com)
This project is a clone of [Stackoverflow](https://stackoverflow.com) a famous Q/A website.

## Documentation

API Documentation [here](https://documenter.getpostman.com/view/15496509/TzJvfHSi)

---

**API** built with Node + Express + MongoDB + Mongoose + Socket.io + Jest.

Written in TypeScript.

---

## Start Development

Kindly clone the repo ``

### Setup

Create a .env file in the root directory and add the following properties

```markdown
PORT=? DATABASE=? JWT_SECRET=?
```

### Installation

To install the necessary packages, in your root folder directory kindly run

```bash
# Install dependencies
$ yarn install

# Start the app
$ yarn start

# Run test
$ yarn test
```

---

## API Endpoints

#### Base Url - `http://localhost:5000/`

#### User

- `POST /users/signup`
- `POST /users/login`
- `GET /users/logout`

#### Question

- `GET /questions`
- `GET /questions/:id`
- `PATCH /questions/:id/up-vote`
- `PATCH /questions/:id/down-vote`
- `POST /questions/:id/reply`
- `POST /questions/:id/subscribe`

## 🎩 Author

- Lawrence 😁😁😁
