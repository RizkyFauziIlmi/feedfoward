
![Logo](https://raw.githubusercontent.com/RizkyFauziIlmi/feedfoward/main/public/logo.png)


# FeedFoward

Application to share extra food so that it is not wasted, this project was carried out to fulfill the assignment for the final exam.


## Demo

Insert gif or link to demo


## Authors

- [@RizkyFauziIlmi](https://github.com/RizkyFauziIlmi)


## Tech Stack

**Client:** NextJS, ShadcnUI, TailwindCSS

**Server:** PostgreSql, Prisma, Docker



## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### if you use docker for db
`DATABASE_URL="postgresql://kyra:K8y6r200a4@localhost:5432/feedfoward?schema=public"`
#### otherwise use your own db
`DATABASE_URL`

`GITHUB_CLIENT_ID`
`GITHUB_CLIENT_SECRET`

`DISCORD_CLIENT_ID`
`DISCORD_CLIENT_SECRET`

`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`

#### you can use `openssl rand -base64 32` to generate random
`NEXTAUTH_SECRET`

`UPLOADTHING_SECRET`
`UPLOADTHING_APP_ID`
## Run Locally

Clone the project

```bash
  git clone https://github.com/RizkyFauziIlmi/feedfoward
```

Go to the project directory

```bash
  cd feedfoward
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

if you do not have database url simply run this
```bash
  npm run project:dev
```

these are full scripts

`"dev": "next dev"`

`"build": "next build"`

`"start": "next start"`

`"lint": "next lint"`

`"db:start": "docker compose up -d"`

`"db:stop": "docker compose down"`

`"db:sync": "npx prisma migrate dev && npx prisma generate"`

`"db:studio": "npx prisma studio"`

`"project:dev": "npm run db:start && npm run dev"`
## Roadmap

- Add responsive UI
- Race condition handle
- Tour Feature
- Add time picker when create event

## Features

- OAuth
- Booking system
- Cross platform


## Feedback

If you have any feedback, please reach out to us at rizkyfauziilmi@gmail.com
