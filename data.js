
import createRandomId from "/functions/createRandomId.js"

//Array containing all the playable characters informations

const charactersArray = [
    {
        name: "RoB",
        imageSrc: "/assets/pictures/characters/players/robot1.png",
        id: createRandomId(),
        life: 30,
        mana_power: 3,
        shield: 0,
    },
    {
        name: "WaCo",
        imageSrc: "/assets/pictures/characters/players/robot2.png",
        id: createRandomId(),
        life: 30,
        mana_power: 3,
        shield: 0,
    },
    {
        name: "ViC",
        imageSrc: "/assets/pictures/characters/players/robot3.png",
        id: createRandomId(),
        life: 30,
        mana_power: 3,
        shield: 0,
    },
    {
        name: "MoE",
        imageSrc: "/assets/pictures/characters/players/robot4.png",
        id: createRandomId(),
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
        id: createRandomId(),
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
        id: createRandomId(),
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
        id: createRandomId(),
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
        id: createRandomId(),
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
        id: createRandomId(),
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
        id: createRandomId(),
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
        id: createRandomId(),
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
        id: createRandomId(),
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
        id: createRandomId(),
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
        id: createRandomId(),
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
        id: createRandomId(),
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
        id: createRandomId(),
        isUsed: false,
    },

]

//Array containing all the enemies informations


const stagesArray = [
    {
        stage_id: 1,
        stage_background_src: "/assets/pictures/backgrounds/forest1.png"
    },
    {
        stage_id: 2,
        stage_background_src: "/assets/pictures/backgrounds/forest2.png"
    },
    {
        stage_id: 3,
        stage_background_src: "/assets/pictures/backgrounds/forest3.png"
    },
    {
        stage_id: 4,
        stage_background_src: "/assets/pictures/backgrounds/forest4.png"
    },
]

//New enemies array with updated data to test new functions

const newEnemiesArray = [
    {
        name: "DragOn",
        type: "Dragon",
        life: 25,
        moves: [
            {
                name: "claw",
                power: 1
            },
            {
                name: "bite",
                power: 3
            },
            {
                name: "huge_sword",
                power: 6
            },
        ],
        imageSrc: "/assets/pictures/characters/enemies/dragoPixel1.png",
        course_attack: 0,
        id: 1,
    },
    {
        name: "Robort",
        type: "Robot",
        life: 30,
        moves: [
            {
                name: "pistol",
                power: 3
            },
            {
                name: "AI",
                power: 4
            },
            {
                name: "laser",
                power: 6
            },
        ],
        imageSrc: "/assets/pictures/characters/enemies/robotEnemy1.png",
        course_attack: 0,
        id: 2,
    },
]

export {charactersArray, cardDeckArray, newEnemiesArray, stagesArray}