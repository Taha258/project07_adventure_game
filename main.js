#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
//slow animationtext
async function slowtext(text, delay = 20) {
    for (let char of text) {
        process.stdout.write(char);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
}
// ..welcome message
await slowtext(chalk.magenta.italic.bold(`\n\t<------------------------------ Welcome to the Adventure Game🎮 -------------------------------->\n\t`));
// game surrounding message
await slowtext(chalk.yellowBright.italic(`\n\tYou find yourself in a dark dungeon, surrounded by dangerous creatures.\n\tUse your wits and courage to survive!\n\n`));
//class tempalte 
class Game {
    playername;
    constructor() {
        this.playername = '';
    }
    async askName(para) {
        this.playername = para;
    }
    async gameObj() {
        // Game variables
        let random = Math.random();
        // enemy variables 
        let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
        let maxEnemyHealth = 100;
        let maximumHealthDamage = 25;
        // Player variables
        let health = 100;
        let attackDamage = 50;
        let numberOfHealthPotions = 4;
        let healthPotionAmount = 15;
        let healthPerDropChance = 50;
        let running = true;
        while (running) {
            let opponentHealth = Math.floor(random * maxEnemyHealth);
            let enemy = enemies[Math.floor(random * enemies.length)];
            await slowtext(chalk.rgb(216, 191, 216)(`\t\n "${chalk.yellow(this.playername.toUpperCase())}" Enemy ${chalk.yellow(enemy)} has appeared and he is your opponent\t\n`));
            while (opponentHealth > 0) {
                console.log(chalk.rgb(216, 191, 216)(`\n\t     "${(this.playername.toUpperCase())}" health: ${chalk.green(health)} 🔋`));
                console.log(chalk.rgb(216, 191, 216)(`\t\n\t     "${(enemy)}'s" health: ${chalk.redBright(opponentHealth)} \n`));
                const answer = await action();
                switch (answer.Act) {
                    case "Attack":
                        let damageDealt = Math.floor(random * attackDamage);
                        let damageTaken = Math.floor(random * maximumHealthDamage);
                        opponentHealth -= damageDealt;
                        health -= damageTaken;
                        console.log(chalk.yellow(`\n    ${this.playername} you strike the Enemy ${enemy} for ${chalk.green(damageDealt)} damage.\n`));
                        console.log(chalk.yellow(`\t You receive ${chalk.red(damageTaken)} damage in retaliation!`));
                        if (health < 1) {
                            console.log(chalk.gray(`\n\tYou have taken too much damage you are too weak to go! \n`));
                            running = false; // Set running to false to break out of the outer loop
                        }
                        break;
                    case "Drink Health Potion":
                        if (numberOfHealthPotions > 0) {
                            if (health <= 90) {
                                health += healthPotionAmount;
                                numberOfHealthPotions--;
                                console.log(chalk.yellow(`\t\n\t${this.playername.toUpperCase()}  you drink a health potion for ${chalk.greenBright(healthPotionAmount)} ⚗️`));
                                console.log(chalk.yellow(`\t\n\t\t${this.playername.toUpperCase()} you  Have now ${chalk.greenBright(health)} HP`));
                                console.log(chalk.yellow(`\t\n\t${this.playername.toUpperCase()}  you have ${chalk.greenBright(numberOfHealthPotions)} health Potion left ⚗️ `));
                            }
                            else {
                                console.log(chalk.yellow.italic(`\n\t----Your HP is already full----\t`));
                            }
                        }
                        else {
                            console.log(chalk.red(`\t\nYou have zero potions to drink. Defeat enemies to get a chance for one potion.\t\n`));
                        }
                        break;
                    case "Run":
                        console.log(chalk.rgb(220, 20, 60)(`\n\tYou run away from the enemy :${enemy}`));
                        running = false; // Set running to false to break out of the outer loop
                        break;
                    default:
                        console.log(chalk.rgb(255, 0, 0).italic("Invalid action."));
                        break;
                }
            }
            if (health < 2) {
                await slowtext(chalk.red.italic(`-----You limp up from the dungeon, weak from battle .Better luck next time!-----`));
                await slowtext(chalk.italic.magenta(`\t\n________________________________________________________________________________\n\n`));
                break; // Set running to false to break out of the outer loop
            }
            if (opponentHealth <= 0) {
                await slowtext(chalk.rgb(255, 140, 0).bold(`\n   CONGRATULATION ${this.playername.toUpperCase()}! 🎉 You won from ${enemy} 🏆🌟 \n`));
                console.log((chalk.red.bold(`\n\t\t${enemy} defeated!\n`)));
                console.log(chalk.yellow(`\t\tyou have ${chalk.green(health)} HP left!\t\n`));
                if (Math.random() * 100 > healthPerDropChance) {
                    healthPotionAmount++;
                    console.log(chalk.yellow.bold(`\t The ${chalk.green(enemy)} dropped a health potion⚗️ !`));
                    console.log(chalk.yellow.bold(`\n\t#--------Now you have  ${chalk.green(numberOfHealthPotions)} health portions ⚗️ !-------#\n`));
                }
                let confirmation = await askingToCon();
                if (confirmation.ask !== "want to continue" && confirmation.ask !== "Exit dungeon") {
                    console.log("\t\nInvalid command");
                }
                else if (confirmation.ask === "want to continue") {
                    console.log(chalk.rgb(255, 182, 193)(`\t\n------- ${this.playername.toUpperCase()} you continue on your dungeon Adventure-------\n`));
                }
                else if (confirmation.ask === "Exit dungeon") {
                    await slowtext(chalk.magenta(`\n\t<-------------${this.playername} You exit from dungeon adventure successfully---------->\n`));
                    await slowtext(chalk.magenta(`\n\t\t<-----------Thank you ${this.playername} for playing ✨----------->\n`));
                    running = false; // Set running to false to break out of the outer loop
                }
            }
        }
    }
}
let dungeon = new Game();
async function main() {
    await Name();
    dungeon.gameObj();
}
main();
// asking name
async function Name() {
    await inquirer
        .prompt([
        {
            name: "player",
            type: "input",
            message: chalk.magenta.italic("please enter your Good name❤︎ : "),
            validate: (input) => /^[A-Za-z]+$/.test(input) ? true : "Please enter only alphabetical characters.",
        },
    ])
        .then((answer) => {
        dungeon.askName(answer.player);
    });
}
//query about game playing
async function action() {
    let ans = await inquirer.prompt([
        {
            name: "Act",
            type: "list",
            message: chalk.magenta.italic("what would you like to do ?"),
            choices: ["Attack", "Drink Health Potion", "Run"],
        },
    ]);
    return ans;
}
// asking about continue or exit 
async function askingToCon() {
    let answer = await inquirer.prompt([
        {
            name: "ask",
            type: "list",
            message: chalk.magenta.italic("what you wanna do"),
            choices: ["want to continue", "Exit dungeon"],
        },
    ]);
    return answer;
}
