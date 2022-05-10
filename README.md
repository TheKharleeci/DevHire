# DevHire API

## Getting Started
- Clone the repository
```
git clone https://github.com/TheKharleeci/DevHire.git
```

### Prerequisites

You must have

1. [Node.js](https://nodejs.org/) (_v8.12.0 or higher_) and npm (_6.4.1 or higher_) installed on your local machine. Run `node -v` and `npm -v` in your terminal to confirm that you have them installed

2. GIT

### Installation
```
cd Devs-for-hire
npm install
```

- Download .env file and put it in the root folder.

- Run the project
```
npm run dev
```

## Testing
The tests are written in Mocha and the assertions done using Chai.

```
"chai": "^4.3.6",
"chai-http": "^4.3.0",
"mocha": "^10.0.0",

```

Test files are created under **test** folder.
### Running tests using NPM Scripts
````
npm run test

````
## Running migrations

```
npm run migrate:up
npm run migrate:down
```
## Seeding database

```
npm run seed:up
```
## Technologies

- Node JS
- Express
- Postgres