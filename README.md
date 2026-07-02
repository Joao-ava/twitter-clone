# Twitter Clone

This project is a simple twitter clone, using javascript stack.

## Server

The server is writer in node js with express, sequelize and the database is postgresql.

Execute the server.

```shell
cd server
cp .env.example .env
docker-compose up -d
```

## Web

The frontend is writer in react js with:
- react-router
- react-hook-form

Execute
```shell
cd web
cp .env.example .env
npm i
npm run dev
```
