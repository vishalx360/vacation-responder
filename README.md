# Vacation-Responder V2 (Web and Cli Interface)

![System Arch Visual Explanation](/System-Arch-Visual-Explanation.gif?raw=true 'System Arch')

<!-- ![System-Arch](/System-Arch.png) -->

Vacation-Responder is an intelligent Node.js-based command-line application designed to ensure seamless email communication while users are away. Leveraging the prowers of [Google's Gmail API](https://developers.google.com/gmail/api/guides) and the advanced [Google Gemini (Pro)](https://deepmind.google/technologies/gemini/) Large Language Model, this tool orchestrates seamless correspondence by actively monitoring incoming emails. With an intuitive approach, it adeptly identifies first-time threads and crafts intelligent responses, or **Smart-replies**, all while preserving the meticulous organization of the inbox.

A go-to solution for professionals seeking a seamless, organized, and automated approach to manage their email correspondence during their absence, providing peace of mind and professionalism in communication.

## Low Level Design (LLD)

![System Arch Visual Explanation](/LLD.png?raw=true 'LLD')

## Usage

```bash
Usage: pnpm run cli [command]

VacationResponder - An automated email response and thread management tool.

Options:
  -V, --version  output the version number
  -h, --help     display help for command

Commands:
  status         Outputs the currently logged-in Google account
  logout         Logs out the current user
  login          Opens a browser window to OAuth Google account
  scheduler       Starts the task scheduler, executed at random intervals (ranging from 45 to 120 seconds)

```

# Getting Started (Installation)

## Prerequisites:

- Node.js 10+
- pnpm or yarn or npm
- **credentials.json file** in the project directory. (Download from your Google Cloud Project console. [Learn more](https://developers.google.com/gmail/api/quickstart/nodejs))

## Installation Steps

1. **Clone this repository:**

   ```bash
   git clone https://github.com/vishalx360/vacation-responder.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd vacation-responder
   ```

3. **Install Dependencies:**

   Choose your preferred package manager (pnpm, yarn, or npm) and run:

   ```bash
   pnpm install
   ```

   Note: You can use any package manager such as npm, yarn, or pnpm.

## CLI and Server Scripts:

- **Run CLI:**

  ```bash
  pnpm run cli [command]
  ```

- **Run CLI in Watch Mode:**

  ```bash
  pnpm run cli:watch
  ```

- **Run Server:**

  ```bash
  pnpm run server
  ```

- **Run Server in Watch Mode:**

  ```bash
  pnpm run server:watch
  ```

## Improvement Areas

- **Add testing** : Currently the program does not have any tests. This can be improved by adding unit tests and integration tests.

- **Better Type Definitions** : Currently the program uses the any type in many places. This can be improved by adding better type definitions.

- **HTML Email Response** : Currently the program sends a plain text email response. This can be improved by sending an HTML email response.

- **Add Pagination** : Currently the program fetches 200 emails max per API call. 100 is the default value for maxResults and can be expanded to 500.But This number can be further improved by using the nextPageToken and resultSizeEstimate provided by the API call to fetch the next batch of emails.

- **Add more features** : Currently the program only sends a vacation response. This can be improved by adding more features such as email forwarding, email filtering, etc.

## Libraries Used

### Main Dependencies

- **[@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)**

  - The Google AI JavaScript SDK enables developers to use Google's state-of-the-art generative AI models (like Gemini) to build AI-powered features and applications.

- **[@google-cloud/local-auth](https://www.npmjs.com/package/@google-cloud/local-auth)**

  - Provides local authentication with Google Cloud for local services.

- **[commander](https://www.npmjs.com/package/commander)**

  - A framework enabling command-line interface (CLI) creation within applications.

- **[googleapis](https://www.npmjs.com/package/googleapis)**

  - Official Google API client library facilitating interaction with various Google services and APIs.

- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**

  - Implements JSON Web Tokens (JWT) for authentication and token-based security.

- **[ioredis](https://www.npmjs.com/package/ioredis)**

  - A robust Redis client library for Node.js, providing an interface to interact with Redis servers.

- **[express](https://www.npmjs.com/package/express)**

  - A fast, unopinionated, minimalist web framework for Node.js, used to build the server-side application.

- **[express-session](https://www.npmjs.com/package/express-session)**

  - Simple session middleware for Express, used for managing user sessions.

- **[connect-redis](https://www.npmjs.com/package/connect-redis)**

  - Redis session store for Express, enabling session management using Redis.

- **[cookie-session](https://www.npmjs.com/package/cookie-session)**

  - Lightweight cookie-based session middleware for Express, used for managing session data.

- **[dotenv](https://www.npmjs.com/package/dotenv)**

  - A zero-dependency module that loads environment variables from a .env file, enhancing configuration management.

- **[morgan](https://www.npmjs.com/package/morgan)**

  - HTTP request logger middleware for Node.js, providing information about incoming requests.

### Development Dependencies

- **[typescript](https://www.npmjs.com/package/typescript)**

  - Typed superset of JavaScript, enhancing code quality with static typing and modern ECMAScript features.

- **[nodemon](https://www.npmjs.com/package/nodemon)**

  - Utility monitoring application changes and automatically restarting the server during development.

- **[@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken)**

  - Provides TypeScript type definitions for the jsonwebtoken package.

- **[@types/node](https://www.npmjs.com/package/@types/node)**

  - Offers TypeScript support for Node.js-related features and APIs.

- **[@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)**

  - ESLint plugin providing TypeScript-specific linting rules.

- **[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)**

  - Parser for TypeScript in ESLint for linting TypeScript code.

- **[eslint](https://www.npmjs.com/package/eslint)**

  - Pluggable JavaScript and TypeScript linter ensuring code quality and standards.

- **[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)**

  - ESLint configuration to integrate with Prettier and maintain consistent code style.

- **[eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)**

  - ESLint plugin enabling code formatting using Prettier.

- **[prettier](https://www.npmjs.com/package/prettier)**
  - Opinionated code formatter ensuring consistent code style across the project.
