# VacationResponder

An automated email response and thread management tool.

## Getting Started

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

**Key Features:**

1. **Automated Response:** Detects and replies to incoming emails that initiate new threads, ensuring prompt and personalized responses to first-time senders.

2. **Thread Management:** Filters out previously replied emails, avoiding redundant responses and maintaining the inbox's clarity.

3. **Labeling and Organization:** Adds a designated label to responded emails, facilitating easy identification and efficient inbox organization.

4. **Scheduled Execution:** Executes operations at random intervals (ranging from 45 to 120 seconds), ensuring a natural and varied response pattern.

**Technical Implementation:**

- Utilizes Google's Gmail API for seamless interaction with the user's Gmail account, avoiding IMAP-based solutions for a more robust and secure approach.

- Built using Node.js, adhering to modern JavaScript practices with the implementation of Promises and async/await for efficient and non-blocking code execution.

**Benefits:**

- **Enhanced Productivity:** Enables users to stay connected and maintain professionalism by ensuring timely responses even during their absence.

- **Inbox Organization:** Labels and organizes responded emails, keeping the inbox clutter-free and easily manageable upon return.

- **Error-Proof Communication:** Minimizes the risk of missed or neglected emails, ensuring a reliable and responsive communication system.

**Improvement Areas:**

- Optimization for reduced API calls and improved performance.

- Enhanced error handling and logging for better debugging and maintenance.

- Code refactoring for improved readability and scalability.

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
