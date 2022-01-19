## User Management API

### Setup

-   Run `npm install` to install all the dependencies.
-   Create `.env` file and add the required details as found in `.env.example`.
-   Run `npm start` to start the application.

### Routes

#### Authentication

-   Signup - `POST` `/api/auth/signup`

```
{
    "name": "Test",
    "email": "test@gmail.com",
    "gender": "MALE",
    "password": "Hello123$"
}
```

Valid `gender` - `MALE`, `FEMALE` and `OTHER`
`password` should contain atleast 8 characters with one uppercase, one lowercase, one number and one symbol.

-   Login - `PATCH` `/api/auth/login`

```
{
    "email": "test@gmail.com",
    "password": "Hello123$"
}
```

-   Get My Profile - `GET` `/api/auth/me`
    `Authorization` header should be set with the Bearer token received from Login

-   Get All User - `GET` `/api/auth/user?page=1&maximum=1`
    `Authorization` header should be set with the Bearer token received from Login
    `page` is optional and if not sent returns the entire data
    `maximum` is optional and if not sent returns 10 records by default
