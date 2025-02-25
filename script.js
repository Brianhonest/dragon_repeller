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
const monsterHealthText = document.querySelector('#monsterHealthText');

const weapons = [
    {
        name:'stick',
        power:5
    },
    {
        name:'dagger',
        power:30
    },
    {
        name:'Claw hammer',
        power:50
    },
    {
        name:"sword",
        power:100
    }
];

const monsters = [
    {
        name:"slime",
        level: 2,
        health:15
    },
    {
        name:"fanged beast",
        level: 8,
        health:60
    },
    {
        name:"dragon",
        level:20,
        health:300
    }
]
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
    },
    {
        name:"fight",
        "button text" : ["Attack","Dodge","Run"],
        "button functions": [attack,dodge,goTown],
        text:"You are fighting a monster"
    },
    {
        name:'kill monster',
        "button text": ["Go to town square","Go to town square","Go to town square"],
        "button functions" : [goTown,goTown,goTown],
        text:"The monster screams 'Arg!' as it dies. You gain experience points and find gold." 
    },
    {
        name:'lose',
        "button text":["REPLAY?","REPLAY?","REPLAY?"],
        "button functions": [restart,restart,restart],
        text:"You die."
    }
]

// initalize buttons
buttonOne.onclick = goStore;
buttonTwo.onclick = goCave;
buttonThree.onclick = fightDragon;

function update (location) {
    monsterStats.style.display ="none";
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
    update(locations[2]);
}



function buyHealth() {
    if (gold >= 10) {
        gold  -=10;
        health +=10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You dont have enough gold to buy health";
    }
}


function buyWeapon() {
    if (currentWeapon < weapons.length-1){
        if (gold >=30) {
            gold-=30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + '.';
            inventory.push(newWeapon);
            text.innerText += "In your inventory you have:" + inventory;
        } else {
            text.innerText = "You dont have enough gold to buy a weapon";
        }
    } else {
        text.innerText = 'You already have the most powerful weapon!';
        buttonTwo = "Sell weapon for 15 gold";
        buttonThree = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold+=15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText +="In your inventory you have: " + inventory;
    } else {
        text.innerText = "Dont sell your only weapon!";
    }
}
function fightSlime( ) {
    fighting  = 0;
    goFight();
}

function fightBeast() {
    fighting  = 1;
    goFight();
}

function fightDragon() {
    fighting  = 2;
    goFight();
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText =  monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText = "You attack it with your " + weapons[currentWeapon].name + ".";
    health-=weapons[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) +1;
    monsterHealthText.innerText = monsterHealth;

    if (health <= 0) {
        lose();
    }else if (monsterHealth <=0){
        fighting === 2 ? winGame(): defeatMonster(); 
       
    }

}
function dodge() {
    text.innerText = "You dodge the attack from the" + monsters[fighting].name + ".";
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting.level];
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    monsterHealth;
    inventory = ['stick'];
    goldText.innerText =  gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();

}