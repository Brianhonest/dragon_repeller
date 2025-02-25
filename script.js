let xp = 0;
let  health = 100;
let gold = 50;

let currentWeapon = 0;

let fighting;
let monsterHealth;
let inventory = ['stick'];

const buttonOne = document.querySelector('#button1');
const buttonTwo = document.querySelector('#button2');
const buttonThree = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterNameText');
const monsterHealthText = document.querySelector('#monsterHealthText')

const locations = [
    {
        name:'Town Square',
        "button text":["Go to store", "Go to cave" ,"Fight dargon"],
        "button functions" :[goStore,goCave,fightDragon],
        text : "You are in the town square.You see a sign that says \"store\" ."
    },
    {
        name:'Store',
        "button text":["Buy 10 health(10gold)", "Buy weapon(30gold)" ,"Go to town square"],
        "button functions" :[buyHealth,buyWeapon,goTown],
        text : "You enter the store"
    },
    {
        name:'cave',
        "button text":["Fight slime", "Fight fanged beast" ,"Go to town square"],
        "button functions" :[fightSlime,fightBeast, goTown],
        text : "You enter the cave.You see some monsters."
    }
]

// initalize buttons
buttonOne.onclick = goStore;
buttonTwo.onclick = goCave;
buttonThree.onclick = fightDragon;

function update (location) {
    buttonOne.innerText = location['button text'][0];
    buttonTwo.innerText = location["button text"][1];
    buttonThree.innerText = location["button text"][2];
    buttonOne.onclick = location["button functions"][0];
    buttonTwo.onclick = location["button functions"][1];
    buttonThree.onclick = location["button functions"][2];
    text.innerText = location.text;
}
function goTown() {
   update(locations[0]);
}



function goStore() {
   update(locations[1]);
}

function goCave() {
    console.log('Going to cave.')
}

function fightDragon() {
    console.log('Fighting Dragon')
}

function buyHealth() {

}


function buyWeapon() {
    
}


