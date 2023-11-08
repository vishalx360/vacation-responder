# VacationResponder

An automated email response and thread management tool.

## Getting Started

first login to your google account using the following command

```bash
pnpm start login
```

then start the scheduler using the following command

```bash
pnpm start schedule
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
  schedule       Starts the task scheduler, executed at random intervals (ranging from 45 to 120 seconds)
```

## Description

VacationResponder is an intelligent Node.js-based application designed to ensure seamless email communication while users are away. Leveraging the power of Google's Gmail API, this tool automatically monitors incoming emails, identifies first-time threads, and sends tailored responses while maintaining the inbox's organization.

**Improvement Areas:**

- Add Pagination : Currently the program fetches 200 emails max per API call, which is the default value for maxResults. This can be improved by using the nextPageToken and resultSizeEstimate provided by the API call to fetch the next batch of emails.
- HTML Email Response : Currently the program sends a plain text email response. This can be improved by sending an HTML email response.
- Add testing : Currently the program does not have any tests. This can be improved by adding unit tests and integration tests.

VacationResponder is the go-to solution for professionals seeking a seamless, organized, and automated approach to manage their email correspondence during their absence, providing peace of mind and professionalism in communication.

## Prerequisites

This project contains a minimal starter for Node.js project with Typescript, ESLint and Prettier already configured

- Node.js 10+
- pnpm or yarn or npm

## Installation

- Clone this repository

```bash
git clone REPOSITORY_URL
```

- Install dependencies

```bash
pnpm install
```

- Start Application

```bash
pnpm start
```
