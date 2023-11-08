import { program } from 'commander';

program.version("1.0.0").description("VacationResponder - An automated email response and thread management tool.");
program.command("status").description("Outputs the currently logged-in Google account").action(async () => {
  console.log("TODO: status");
});
program.command("logout").description("Logs out the current user").action(async () => {
  console.log("TODO: logout");
});
program.command("login").description("Opens a browser window to OAuth Google account").action(async () => {
  console.log("TODO: login");
});
program.command("Scheduler").description("Starts the scheduler of vacation responder which will run at random intervals (ranging from 45 to 120 seconds)").action(async () => {
  console.log("TODO: Schedule");
});
program.action(() => {
  program.help();
});
program.parse(process.argv);
