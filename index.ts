#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos: string[] = ['1','2','3'];

async function main() {
  if (todos.length == 0) {
    console.log(
      chalk.greenBright`You have an empty list of your todos\nWhat do you want next?`
    );
  } else {
    console.log(
      chalk.greenBright`You have following list of your todos\n${todos}\nWhat do you want next?`
    );
  }

  while (true) {
    console.log(chalk.red.bold("Choose an action"));
    let choice = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "",
        choices: [
          "Add Todo",
          "Delete Todo",
          "Update Todo",
          "View Todos",
          "Exit",
        ],
      },
    ]);

    switch (choice.action) {
      case "Add Todo":
        await addTodo();
        break;
      case "Delete Todo":
        await deleteTodo();
        break;
      case "Update Todo":
        await updateTodo();
        break;
      case "View Todos":
        await viewTodos();
        break;
      case "Exit":
        return;
    }
  }
}



async function addTodo() {
  console.log(chalk.yellowBright(`Before adding todos\n${todos}`));
  let add = await inquirer.prompt([
    {
      name: "index",
      type: "input",
      message: "Enter the index of the todo you want to insert:",
    },

    {
      name: "entry",
      type: "input",
      message: "Enter your next todo you want to insert:",
    },
  ]);






  if (
    !add.index ||
    isNaN(parseInt(add.index)) ||
    parseInt(add.index) < 0 ||
    parseInt(add.index) > todos.length
  ) {
    console.log("Invalid index provided.\n\n\n");
  }
  else{

  todos.splice(parseInt(add.index), 0, add.entry);
  console.log(chalk.yellowBright(`after adding todos\n${todos}\n\n\n`));}
}








async function deleteTodo() {
    console.log(chalk.yellowBright(`Before deleting todos\n${todos}`));

  let del = await inquirer.prompt([
    {
      name: "index",
      type: "input",
      message: "Enter the index of the todo you want to delete:",
    },
  ]);

  if (
    !del.index ||
    isNaN(parseInt(del.index)) ||
    parseInt(del.index) < 0 ||
    parseInt(del.index) >= todos.length
  ) {
    console.log("Invalid index provided.\n\n\n");
  }
  else{

  todos.splice(parseInt(del.index), 1);
  console.log(chalk.yellowBright(`Todo deleted successfully!\nafter deleting todos\n${todos}\n\n\n`));

}
}

async function updateTodo() {
  console.log(chalk.yellowBright(`Before updating todos\n${todos}`));
  let update = await inquirer.prompt([
    {
      name: "index",
      type: "input",
      message: "Enter the index of the todo you want to update:",
    },

    {
      name: "entry",
      type: "input",
      message: "Enter your new todo:",
    },
  ]);

  if (
    !update.index ||
    isNaN(parseInt(update.index)) ||
    parseInt(update.index) < 0 ||
    parseInt(update.index) >= todos.length
  ) {
    console.log("Invalid index provided.\n\n\n");
  }
  else{
  todos.splice(parseInt(update.index), 1, update.entry);
  console.log(chalk.yellowBright(`after updating todos\n${todos}\n\n\n`));}
}

function viewTodos() {
  console.log(chalk.yellowBright(`Your current list of todos:\n${todos}\n`));
}

main();