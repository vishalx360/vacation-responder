# Vacation-Responder

![System-Arch](/System-Arch.png)

Vacation-Responder is an intelligent Node.js-based command-line application designed to ensure seamless email communication while users are away. Leveraging the power of Google's Gmail API, this tool automatically monitors incoming emails, identifies first-time threads, and sends tailored responses while maintaining the inbox's organization.

A go-to solution for professionals seeking a seamless, organized, and automated approach to manage their email correspondence during their absence, providing peace of mind and professionalism in communication.

## Getting Started (Installation)

Pre-requisites:

- Node.js 10+
- pnpm or yarn or npm
- **credentials.json file** in project directory. (Download from your google cloud project console. [Learn more](https://developers.google.com/gmail/api/quickstart/nodejs))

Clone this repository

```bash
git clone https://github.com/vishalx360/vacation-responder.git
```

Navigate to the project directory.

```bash
cd vacation-responder
```

Install dependencies

```bash
pnpm install
```

Note: You can use any package manager such as npm, yarn, or pnpm.

Build application

```bash
pnpm build
```

Login to Your Google Account

Execute the following command to open a browser window from where you will give permission to the application to access your gmail account.

```bash
pnpm start login
```

Start the Scheduler

Initiate the scheduler using the following command:

```bash
pnpm start scheduler
```

## Usage

```bash
Usage: pnpm start [command]

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

## Improvement Areas

- **HTML Email Response** : Currently the program sends a plain text email response. This can be improved by sending an HTML email response.

- **Add testing** : Currently the program does not have any tests. This can be improved by adding unit tests and integration tests.

- **Deployment** : Currently this has a CLI interface. This can be improved by deploying this as a web application.

- **Add Pagination** : Currently the program fetches 200 emails max per API call. 100 is the default value for maxResults and can be expanded to 500.But This number can be further improved by using the nextPageToken and resultSizeEstimate provided by the API call to fetch the next batch of emails.

- **Add more features** : Currently the program only sends a vacation response. This can be improved by adding more features such as email forwarding, email filtering, etc.

## Libraries Used

### Main Dependencies

- **[@google-cloud/local-auth](https://www.npmjs.com/package/@google-cloud/local-auth)**

  - Provides local authentication with Google Cloud for local services.

- **[commander](https://www.npmjs.com/package/commander)**

  - A framework enabling command-line interface (CLI) creation within applications.

- **[googleapis](https://www.npmjs.com/package/googleapis)**

  - Official Google API client library facilitating interaction with various Google services and APIs.

- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**

  - Implements JSON Web Tokens (JWT) for authentication and token-based security.

### Development Dependencies

- **[typescript](https://www.npmjs.com/package/typescript)**

  - Typed superset of JavaScript, enhancing code quality with static typing and modern ECMAScript features.

- **[unbuild](https://www.npmjs.com/package/unbuild)**
  - Manages build processes and configurations in projects.

- **[@swc/cli](https://www.npmjs.com/package/@swc/cli)**

  - Super-fast JavaScript to JavaScript compiler that transpiles modern code for different environments.

- **[@swc/core](https://www.npmjs.com/package/@swc/core)**

  - Core functionality of the SWC JavaScript to JavaScript compiler, enabling code transpilation.

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

- **[nodemon](https://www.npmjs.com/package/nodemon)**

  - Utility monitoring application changes and automatically restarting the server.

- **[prettier](https://www.npmjs.com/package/prettier)**
  - Opinionated code formatter ensuring consistent code style across the project.
