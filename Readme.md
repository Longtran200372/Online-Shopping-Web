# Mobile Shop



## Use in this project

Nodejs, React, Mongodb,...

## How to run (just in local)

### Install Nodejs

Download and install [nodejs](https://nodejs.org/en/download)

### Install mongodb and GUI tool

Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community) (contain MongoDB Compass)

If don't have MongoDB Compass:
Download and install [MongoDB Compass](https://www.mongodb.com/try/download/compass)

### Setup database

- After install mongodb compass, open it and create database has name "project2_shop" and collection has name "users"
- Go to project root and open db_export folder. Create collection in mongodb compass has the same name with file in db_export folder.
- Open collection and import data by json file in db_export folder

### Install package

- Open terminal and change path to project root directory

```bash
cd path/to/root/directory
```

- Install package for server

```bash
npm install
```

- Cd to client directory in terminal (from root directory)

```bash
cd client
```

- Install package for client

```bash
npm install
```

### Run

- Go back to root directory in terminal

```bash
cd ..
```

- Run server

```bash
npm start
```

- Go to client directory in terminal

```bash
cd client
```

- Run client

```bash
npm start
```

Wait for client run and auto open website on your browser or access to http://localhost:3000

### Account to test

- Admin:
  -- username: admin01
  -- password: 123456
- User:
  -- username: user01
  -- password: 123456
- Or you can register your account to test (just user role)
