// Import necessary modules
import { program } from 'commander';
import { UserData, getUserData, isLoggedIn, login, logout } from './auth';
import { Main } from './main';

// Simulate the login status, can be replaced with actual logic to check login status
let loggedInAccount: UserData | null; // To store logged-in account info

// Set the version and description of your CLI app
program
    .version('1.0.0')
    .description('VacationResponder - An automated email response and thread management tool.');

// Define options and commands
program
    .command('status')
    .description('Outputs the currently logged-in Google account')
    .action(async () => {
        try {
            if (await isLoggedIn()) {
                loggedInAccount = await getUserData();
                console.log(`Logged in with email: ${loggedInAccount?.client_email}`);
            } else {
                console.log('Not logged in. Please run "login" command to log in.');
            }
        } catch (err) {
            console.log('Error loading user data:', err);
        }
    });

program
    .command('logout')
    .description('Logs out the current user')
    .action(async () => {
        await logout();
    });

program
    .command('login')
    .description('Opens a browser window to OAuth Google account')
    .action(async () => {
        await login();
    });

program
    .command('Scheduler')
    .description('Starts the scheduler of vacation responder which will run at random intervals (ranging from 45 to 120 seconds)')
    .action(async () => {
        if (!(await isLoggedIn())) {
            console.log('Not logged in. Please run "login" command to log in to continue.');
            process.exit(0);
        } else {
            await Main();
        }
    });

// Set the default action to trigger the --help function
program
    .action(() => {
        program.help();
    });

// Parse the arguments and display outputs based on commands
program.parse(process.argv);
