# Mock Backend
## Description 
- This is mock backend for you to use if you do not have the one from the Spring Boot training.
- The application uses [Nest.js](https://nestjs.com) and a in-memory repository database


## Installation

```bash
$ npm ci
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```
- Then open http://localhost:3000/api to see the Swagger documentation

## Notes
### Authentication and Security

- Only the authentication module paths are secured.
  - `http://localhost:3000/api/auth/profile` needs a JWT token in the request headers for it to work
- Check `src/assets/users.json` for more information regarding already available users.

### Input validation

- The payload for various `POST` and `PUT` operation is validated, check the Swagger for more information.
