import {nanoid} from "/node_modules/nanoid/nanoid.js"

//Array containing all the playable characters informations

const charactersArray = [
    {
        name: "RoB",
        imageSrc: "/assets/pictures/characters/players/robot1.png",
        id: nanoid(),
        life: 30,
        mana_power: 3,
        shield: 0,
    },
    {
        name: "WaCo",
        imageSrc: "/assets/pictures/characters/players/robot2.png",
        id: nanoid(),
        life: 30,
        mana_power: 3,
        shield: 0,
    },
    {
        name: "ViC",
        imageSrc: "/assets/pictures/characters/players/robot3.png",
        id: nanoid(),
        life: 30,
        mana_power: 3,
        shield: 0,
    },
    {
        name: "MoE",
        imageSrc: "/assets/pictures/characters/players/robot4.png",
        id: nanoid(),
        life: 30,
        mana_power: 3,
        shield: 0,
    },

]

//Array containing all the cards playable by the player


const cardDeckArray = [

    {
        name: "sword",
        imageSrc: "/assets/pictures/cards/sword_card.png",
        type: "attack",
        icon: "",
        power: 3,
        mana_cost: 1,
        description: "Attack enemy with meele weapon, 3 points damage.",
        id: nanoid(),
        isUsed: false,
    },
    {
        name: "sword",
        imageSrc: "/assets/pictures/cards/sword_card.png",
        type: "attack",
        icon: "",
        power: 3,
        mana_cost: 1,
        description: "Attack enemy with meele weapon, 3 points damage.",
        id: nanoid(),
        isUsed: false,
    },
    {
        name: "sword",
        imageSrc: "/assets/pictures/cards/sword_card.png",
        type: "attack",
        icon: "",
        power: 3,
        mana_cost: 1,
        description: "Attack enemy with meele weapon, 3 points damage.",
        id: nanoid(),
        isUsed: false,
    },
    {
        name: "sword",
        imageSrc: "/assets/pictures/cards/sword_card.png",
        type: "attack",
        icon: "",
        power: 3,
        mana_cost: 1,
        description: "Attack enemy with meele weapon, 3 points damage.",
        id: nanoid(),
        isUsed: false,
    },
    {
        name: "shield",
        imageSrc: "/assets/pictures/cards/shield_card.png",
        type: "defense",
        icon: "",
        power: 3,
        mana_cost: 1,
        description: "Reduce meele damage taken, 3 points shield.",
        id: nanoid(),
        isUsed: false,
    },
    {
        name: "shield",
        imageSrc: "/assets/pictures/cards/shield_card.png",
        type: "defense",
        icon: "",
        power: 3,
        mana_cost: 1,
        description: "Reduce meele damage taken, 3 points shield.",
        id: nanoid(),
        isUsed: false,
    },
    {
        name: "shield",
        imageSrc: "/assets/pictures/cards/shield_card.png",
        type: "defense",
        icon: "",
        power: 3,
        mana_cost: 1,
        description: "Reduce meele damage taken, 3 points shield.",
        id: nanoid(),
        isUsed: false,
    },
    {
        name: "shield",
        imageSrc: "/assets/pictures/cards/shield_card.png",
        type: "defense",
        icon: "",
        power: 3,
        mana_cost: 1,
        description: "Reduce meele damage taken, 3 points shield.",
        id: nanoid(),
        isUsed: false,
    },
    {
        name: "skeleton",
        imageSrc: "/assets/pictures/cards/course_card.png",
        type: "course",
        icon: "",
        power: 1,
        mana_cost: 1,
        description: "Reduce enemy power attack by 1.",
        id: nanoid(),
        isUsed: false,
    },
    {
        name: "skeleton",
        imageSrc: "/assets/pictures/cards/course_card.png",
        type: "course",
        icon: "",
        power: 1,
        mana_cost: 1,
        description: "Reduce enemy power attack by 1.",
        id: nanoid(),
        isUsed: false,
    },
    {
        name: "skeleton",
        imageSrc: "/assets/pictures/cards/course_card.png",
        type: "course",
        icon: "",
        power: 1,
        mana_cost: 1,
        description: "Reduce enemy power attack by 1.",
        id: nanoid(),
        isUsed: false,
    },
    {
        name: "skeleton",
        imageSrc: "/assets/pictures/cards/course_card.png",
        type: "course",
        icon: "",
        power: 1,
        mana_cost: 1,
        description: "Reduce enemy power attack by 1.",
        id: nanoid(),
        isUsed: false,
    },

]

//Array containing all the enemies informations

const enemiesArray = [
    {
        name: "DragOn",
        type: "Dragon",
        life: 30,
        attack_power: 3,
        attack_name: "bite",
        special_move_name: "Huge Sword",
        special_move_power: 9,
        imageSrc: "/assets/pictures/characters/enemies/dragoPixel1.png",
        course_attack: 0,
        id: 1,
    },
]


export {charactersArray, cardDeckArray, enemiesArray}