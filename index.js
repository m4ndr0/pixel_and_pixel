/* === Imports === */

import {charactersArray, cardDeckArray, newEnemiesArray, stagesArray} from "/data.js"
import getCurrentPlayer from "./functions/getCurrentPlayer.js"
import getCurrentStage from "./functions/getCurrentStage.js"
import getCurrentEnemy from "./functions/getCurrentEnemy.js"
import getRandomNumberArrayLength from "./functions/getRandomNumberArrayLength.js"
import renderCurrentStageBackground from "./functions/renderCurrentStageBackground.js"

/* === Global Variables ===  */

let isGameStarted = false
let isAlive = false

/* === Constants === */

/* === Constants ==>>>> Buttons === */


const enterGameButton = document.getElementById("enter-game-button")

const drawCardButton = document.getElementById("draw-card-button")
const endTurnButton = document.getElementById("end-turn-button")

const restartEndGameButton = document.getElementById("restart-end-game-button")
/////////////////////////////////////7

const introPageContainer = document.getElementById("intro-page-container")
const characterSelectPage = document.getElementById("character-select-page")
const gameplayPageContainer = document.getElementById("gameplay-page-container")
const gameSceneContainer = document.getElementById("game-scene-container")


const playableCharactersContainer = document.getElementById("playable-characters-container")


const playerImage = document.getElementById("player-image")
const playerLifeBar = document.getElementById("player-life-bar")
const playerManaBar = document.getElementById("player-mana-bar")


const playerMovesContainer = document.getElementById("player-moves-container")

// const cardInfosContainer = document.getElementById("card-infos-container")
// const closeCardWindowButton = document.getElementById("close-card-window-button")
// const useCardButton = document.getElementById("use-card-button")

const enemyImage = document.getElementById("enemy-image")
const enemyLifeBar = document.getElementById("enemy-life-bar")

const cardsInHandContainer = document.getElementById("cards-in-hand-container")

const deckContainer = document.getElementById("deck-container")

const deckWindowContainer = document.getElementById("deck-window-container")
const deckWindow = document.getElementById("deck-window")
const closeDeckWindowButton = document.getElementById("close-deck-window-button")

const endPageContainer = document.getElementById("end-page-container")

/* === Gameplay interactions icons Constants === */

const shieldIconPlayer = document.getElementById("shield-icon-player")
const hitIconPlayer = document.getElementById("hit-icon-player")

const playerShieldCount = document.getElementById("player-shield-count")

const hitIconEnemy = document.getElementById("hit-icon-enemy")



/* === MP3_audio Constants === */

const swordSound = new Audio("/assets/audio_effects/sword_sound.MP3")
const equipArmorSound = new Audio("/assets/audio_effects/equip_armor_sound.MP3")
const courseSound = new Audio("/assets/audio_effects/course_sound.MP3")
const blockedAttackSound = new Audio("/assets/audio_effects/blocked_attack_sound.MP3")
const drawCardSound = new Audio("/assets/audio_effects/draw_card_sound.MP3")
const selectSound = new Audio("/assets/audio_effects/select_sound.MP3")
const gameOverSound = new Audio("/assets/audio_effects/game_over_sound.MP3")
const winningSound = new Audio("/assets/audio_effects/winning_sound.MP3")
/* === MP4_video Constants */


const introVideo = document.getElementById("intro-video")
const endVideo = document.getElementById("end-video")

/* === Event Listeners === */


enterGameButton.addEventListener("click", enterGame)

deckContainer.addEventListener("click", showHideDeck)
closeDeckWindowButton.addEventListener("click", showHideDeck)

playableCharactersContainer.addEventListener("click", selectPlayer)

drawCardButton.addEventListener("click", getHand)

restartEndGameButton.addEventListener("click", startNewGameAfterEnd)

/////////////////////* === Functions === */ /////////////////////////


/* === UI Functions === */

function enterGame() {
    introVideo.pause()
    toggleHideClass(characterSelectPage)
    toggleHideClass(introPageContainer)
    selectSound.play()
}

function toggleHideClass(htmlElement) {
    htmlElement.classList.toggle("hide")
}

/* === Render selectable Characters === */


for (let character of charactersArray) {
    playableCharactersContainer.innerHTML += `
    <div class="character-select-card">
        <img class="select-character-image" id=${character.id} src=${character.imageSrc} />
        <p class="select-character-name">${character.name}</p>
    </div>
    
    `
}

/* === Functions to select player character and render the selected character on the battleground === */

function selectPlayer(e) {
    if (e.target.id && e.target.id != "playable-characters-container") {
        let selectedCharacterId = e.target.id
        let selectedCharacter = ""
        selectSound.play()

        for (let i = 0; i < charactersArray.length; i++) {
            if (selectedCharacterId === charactersArray[i].id) {

                isGameStarted = true
                isAlive = true

                selectedCharacter = charactersArray[i]
/////////////////////////////////////////////////////////
                let stage = stagesArray[0]
                let currentEnemy = newEnemiesArray[0]
                
                let currentGameStatus = [selectedCharacter, stage, currentEnemy]


                localStorage.setItem("currentGameStatus", JSON.stringify(currentGameStatus))

              ///////  localStorage.setItem("selectedCharacter", JSON.stringify(selectedCharacter)) ///////
                renderCurrentStageBackground(stage)
                renderSelectedCharacterInBattleground(retriveSelectedCharacterById(selectedCharacterId))
                renderEnemyInBattleground(currentEnemy)
                
                toggleHideClass(characterSelectPage)
                toggleHideClass(gameplayPageContainer)


            }

        }
    }
}


//Function to retrive game status after refreshing page

function regainStage(){
        let currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
        if (currentGameStatus) {
            isAlive = true
            isGameStarted = true

            let character = currentGameStatus[0]
            let stage = currentGameStatus[1]
            let enemy = currentGameStatus[2]


            renderCurrentStageBackground(stage)

            toggleHideClass(introPageContainer)
            toggleHideClass(gameplayPageContainer)
            

            renderPlayerFromLocalStorage()
            renderEnemyInBattleground(enemy)
            renderCurrentGameStatus()
        }
    
}
regainStage()

//Function to retrive enemy by the stage id number

function retriveEnemyByStageId(stageId, enemiesArray) {
    for (let i = 0; i < enemiesArray.length; i++) {
        return enemiesArray[stageId - 1]
    }
}



function retriveSelectedCharacterById(id) {
    let characterObj = ""
    for (let i = 0; i < charactersArray.length; i++) {
        if (charactersArray[i].id === id) {
            characterObj = charactersArray[i]
        }
    }
    return characterObj
}



function renderSelectedCharacterInBattleground(obj) {
    playerImage.src = obj.imageSrc
    playerLifeBar.innerText = obj.life
    playerManaBar.innerText = obj.mana_power
}

/* === Card Deck Functions === */

function showHideDeck() {
    toggleHideClass(deckWindowContainer)
}


// Fuction that returns a random card object

function getRandomCardFromDeck() {

    let randomCard = getRandomNumberArrayLength(cardDeckArray)
    return randomCard
}

// Array containing the cards drawed

let handArray = []



function getHand() {
    if (isAlive) {
        for (let i = 0; i < 8; i++) {
            getCard()
            }
    }
}

// Function to check if the card has already been drawed

function getCard() {
    let cardObj = getRandomCardFromDeck()
    if (!handArray.includes(cardObj) && handArray.length < 4) {
        handArray.push(cardObj)
        renderCardsInHand()
    }
}


//Function to display cards in hand

function renderCardsInHand() {
    clearDivHTML(cardsInHandContainer)
    for (let i = 0; i < handArray.length; i++) {
        if (!handArray[i].isUsed) {
            cardsInHandContainer.innerHTML += `
            <div class="card-in-hand">
                <img src=${handArray[i].imageSrc} id=${handArray[i].id} />
            </div>
            `
        }
    }
    drawCardSound.play()

}


function clearDivHTML(htmlElement) {
    htmlElement.innerHTML = ""
}


function renderEnemyInBattleground(obj) {
    enemyImage.src = obj.imageSrc
    enemyLifeBar.innerHTML = obj.life
}


// Function to get card based on the id and array

function getCardById(id, array) {
    let cardToUse = ""
    for (let i = 0; i < array.length; i++) {
        if (id === array[i].id) {
            cardToUse = array[i]
        }
    }
    return cardToUse
}

//Function to get Mana left

function getRemainingMana() {
    let currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
    let currentCharacter = currentGameStatus[0]
    let remainingMana = Number(currentCharacter.mana_power)
    return remainingMana
}

//Function to render current Game status

function renderCurrentGameStatus() {
    const currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
    const player = currentGameStatus[0]
    const stage = currentGameStatus[1]
    const enemy = currentGameStatus[2]
    playerLifeBar.innerText = player.life
    playerManaBar.innerText = player.mana_power
    enemyLifeBar.innerText = enemy.life
    if (player.shield > 0) {
        shieldIconPlayer.classList.remove("hide")
        playerShieldCount.innerText = player.shield
        playerShieldCount.classList.remove("hide")
    } else {
        shieldIconPlayer.classList.add("hide")
        playerShieldCount.classList.add("hide")
    }
}

//Cards Actions Functions


function swordCard() {
    const remainingMana = getRemainingMana()
    if (remainingMana > 0) {
        swordSound.play()
        toggleHideClass(hitIconEnemy)
        setTimeout(() => {
            toggleHideClass(hitIconEnemy)
        }, 300);

        const attackPower = 3

        let currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
        let character = currentGameStatus[0]
        let stage = currentGameStatus[1]
        let enemy = currentGameStatus[2]

        let updatedGameStatus = [
            {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life,
                mana_power: remainingMana - 1,
                shield: character.shield,
            },
            {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
            },
            {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life - attackPower,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack,
                id: enemy.id,
            },
        ]
        

        localStorage.setItem("currentGameStatus", JSON.stringify(updatedGameStatus))


        renderCurrentGameStatus()
    } else if (remainingMana === 0) {
        console.log("No Mana left")
    }
}



function shieldCard() {

    const remainingMana = getRemainingMana()
    if (remainingMana > 0) {
        equipArmorSound.play()
        let currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
        let character = currentGameStatus[0]
        let stage = currentGameStatus[1]
        let enemy = currentGameStatus[2]

        let updatedGameStatus = [
            {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life,
                mana_power: remainingMana - 1,
                shield: character.shield + 3,
            },
            {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
            },
            {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack,
                id: enemy.id,
            },
        ]

        localStorage.setItem("currentGameStatus", JSON.stringify(updatedGameStatus))


        renderCurrentGameStatus()


    }
}


function skeletonCard() {
    const remainingMana = getRemainingMana()
    if (remainingMana > 0) {
        courseSound.play()

        let currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
        let character = currentGameStatus[0]
        let stage = currentGameStatus[1]
        let enemy = currentGameStatus[2]

        let updatedGameStatus = [
            {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life,
                mana_power: remainingMana - 1,
                shield: character.shield,
            },
            {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
            },
            {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack + 1,
                id: enemy.id,
            },
        ]

        localStorage.setItem("currentGameStatus", JSON.stringify(updatedGameStatus))


        renderCurrentGameStatus()
        
    }
}

function broadswordCard() {
    const remainingMana = getRemainingMana()
    if (remainingMana > 0) {
        swordSound.play()
        toggleHideClass(hitIconEnemy)
        setTimeout(() => {
            toggleHideClass(hitIconEnemy)
        }, 300);

        const attackPower = 6

        let currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
        let character = currentGameStatus[0]
        let stage = currentGameStatus[1]
        let enemy = currentGameStatus[2]

        let updatedGameStatus = [
            {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life,
                mana_power: remainingMana - 1,
                shield: character.shield,
            },
            {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
            },
            {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life - attackPower,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack,
                id: enemy.id,
            },
        ]
        

        localStorage.setItem("currentGameStatus", JSON.stringify(updatedGameStatus))


        renderCurrentGameStatus()
    } 
}

function bigShieldCard() {

    const remainingMana = getRemainingMana()
    if (remainingMana > 0) {
        equipArmorSound.play()
        let currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
        let character = currentGameStatus[0]
        let stage = currentGameStatus[1]
        let enemy = currentGameStatus[2]

        let updatedGameStatus = [
            {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life,
                mana_power: remainingMana - 1,
                shield: character.shield + 6,
            },
            {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
            },
            {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack,
                id: enemy.id,
            },
        ]

        localStorage.setItem("currentGameStatus", JSON.stringify(updatedGameStatus))


        renderCurrentGameStatus()

    }
}

function lifePotionCard() {

    const remainingMana = getRemainingMana()
    if (remainingMana >= 2) {
        courseSound.play()
        let currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
        let character = currentGameStatus[0]
        let stage = currentGameStatus[1]
        let enemy = currentGameStatus[2]

        let characterLifeCured = character.life + 10

        if (characterLifeCured > 30) {
            characterLifeCured = 30
        }

        let updatedGameStatus = [
            {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: characterLifeCured,
                mana_power: remainingMana - 2,
                shield: character.shield,
            },
            {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
            },
            {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack,
                id: enemy.id,
            },
        ]

        localStorage.setItem("currentGameStatus", JSON.stringify(updatedGameStatus))


        renderCurrentGameStatus()

    }
}

// var audio = new Audio('audio_file.mp3');
// audio.play();

// Function to use selected card
cardsInHandContainer.addEventListener("click", function(e) {
    if (isAlive) {
        let cardId = e.target.id
        const card = getCardById(cardId, cardDeckArray)
        if (getRemainingMana() < card.mana_cost) {
            console.log("Not enough mana")
            playerMovesContainer.innerText = "Not enough mana."
            setTimeout(()=> {
                clearDivHTML(playerMovesContainer)
            }, 1500)
        }
        if (getRemainingMana() >= card.mana_cost) {
            if (e.target.id != "cards-in-hand-container" && e.target.classList != "card-in-hand") {
                card.isUsed = true
                if (card.name === "shield") {
                    shieldCard()
                } else if (card.name === "sword") {
                    swordCard()
                } else if (card.name === "skeleton") {
                    skeletonCard()
                } else if (card.name === "broadsword") {
                    broadswordCard()
                } else if (card.name === "big_shield") {
                    bigShieldCard()
                } else if (card.name === "life_potion") {
                    lifePotionCard()
                }
                toggleHideClass(e.target)
                
                checkWinner(getCurrentPlayer(), getCurrentEnemy())
                renderCharactersActionInBG(getCurrentPlayer(), card)
    
            } else {
                console.log("Not Enough Mana")
            }
    }
    }
})


//Function to End player turn


endTurnButton.addEventListener("click", endPlayerTurn)

function endPlayerTurn() {
    if (isAlive) {
        console.log("player turn ended...enemy's turn")
        clearDivHTML(cardsInHandContainer)
        handArray = []
        resetIsUsedBoolean(cardDeckArray)
        drawCardButton.disabled = true
        endTurnButton.disabled = true
        setTimeout(() => {
            startEnemyTurn() 
        }, 1500)
    }
}

function resetIsUsedBoolean(array) {
    array.map(card => card.isUsed = false)
}

//Functions to start enemy's turn

function startEnemyTurn() {
    if (isAlive) {
    useShield(enemyRandomAttack(getCurrentEnemy()))
    checkWinner(getCurrentPlayer(), getCurrentEnemy())

        setTimeout(() => {
            startPlayerTurn()
        }, 1500)
    }
}

//Function enemy attack Functions

function enemyRandomAttack(enemyObj) {

    const randomAttackObj = getRandomNumberArrayLength(enemyObj.moves)

    let attackPower = randomAttackObj.power

    if (enemyObj.course_attack != 0) {

        attackPower = attackPower - enemyObj.course_attack
    }
    renderEnemyActionInBG(enemyObj, randomAttackObj)
    return attackPower

}

function randomEnemyAttack(enemyObj) {
    
}
//Function to subtract shield from any enemy attack


function useShield(enemyAttack) {

    const character = getCurrentPlayer()
    let stage = getCurrentStage()
    let enemy = getCurrentEnemy()

    let currentShield = character.shield

    let realEnemyAttackPower = 0

    let updatedGameStatus = ""

    if (currentShield === 0) {

        realEnemyAttackPower = enemyAttack
        console.log(` Shield = ${currentShield}, enemy attack = ${realEnemyAttackPower}`)

        updatedGameStatus = [
            {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life - realEnemyAttackPower,
                mana_power: character.mana_power,
                shield: currentShield,
            },
            {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
            },
            {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack,
                id: enemy.id,
            },
        ]
        
        swordSound.play()
        toggleHideClass(hitIconPlayer)
        setTimeout(() => {
            toggleHideClass(hitIconPlayer)
        }, 300);


    } else if (currentShield > enemyAttack) {

        currentShield = currentShield - enemyAttack
        console.log(` Shield = ${currentShield}, enemy attack = ${realEnemyAttackPower}`)

        updatedGameStatus = [
            {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life,
                mana_power: character.mana_power,
                shield: currentShield,
            },
            {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
            },
            {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack,
                id: enemy.id,
            },
        ]

        blockedAttackSound.play()

    } else if (currentShield < enemyAttack) {
        realEnemyAttackPower = enemyAttack - currentShield
        currentShield = 0
        console.log(` Shield = ${currentShield}, enemy attack = ${realEnemyAttackPower}`)

        updatedGameStatus = [
            {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life - realEnemyAttackPower,
                mana_power: character.mana_power,
                shield: currentShield,
            },
            {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
            },
            {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack,
                id: enemy.id,
            },
        ]

        
        swordSound.play()
        toggleHideClass(hitIconPlayer)
        setTimeout(() => {
            toggleHideClass(hitIconPlayer)
        }, 300);

    } else if (currentShield === enemyAttack) {

        currentShield = 0
        console.log(` Shield = ${currentShield}, enemy attack = ${realEnemyAttackPower}`)

        updatedGameStatus = [
            {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life,
                mana_power: character.mana_power,
                shield: currentShield,
            },
            {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
            },
            {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack,
                id: enemy.id,
            },
        ]

        blockedAttackSound.play()
    }

    localStorage.setItem("currentGameStatus", JSON.stringify(updatedGameStatus))
    renderPlayerFromLocalStorage()
}



//Function to start player Turn

function startPlayerTurn() {
    if (isAlive) {
        console.log("Player turn started")
        drawCardButton.disabled = false
        endTurnButton.disabled = false
        resetPlayerManaAndShield()
        // currentgetEnemy.course_attack = 0 rewrite this

        const character = getCurrentPlayer()
        const stage = getCurrentStage()
        const enemy = getCurrentEnemy()

        let updatedGameStatus = [
            {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life,
                mana_power: character.mana_power,
                shield: character.shield,
            },
            {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
            },
            {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: 0,
                id: enemy.id,
            },
        ]

        localStorage.setItem("currentGameStatus", JSON.stringify(updatedGameStatus))

        

    }
}



//function to reset player Mana and Shield after finishing turn

function resetPlayerManaAndShield() {

    let currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
        let character = currentGameStatus[0]
        let stage = currentGameStatus[1]
        let enemy = currentGameStatus[2]

    let updatedGameStatus = [
        {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life,
                mana_power: 3,
                shield: 0,
        },
        {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
        },
        {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack,
                id: enemy.id,
        },
    ]
    
    localStorage.setItem("currentGameStatus", JSON.stringify(updatedGameStatus))

    renderCurrentGameStatus()

}


//Function to render all cards in the deck window

cardDeckArray.map(card => {
    deckWindow.innerHTML += `
    <div class="card-in-show-deck-window">
        <img src=${card.imageSrc} />
        <p>${card.name}</p>
        <p>Power: ${card.power}</p>
        <p>Mana cost: ${card.mana_cost}</p>
        <p class="card-in-show-deck-window-description">${card.description}</p>
    <div>
    `
})


// Function to render player current status

function renderPlayerFromLocalStorage() {

    let player = getCurrentPlayer()

    playerLifeBar.innerText = player.life
    playerManaBar.innerText = player.mana_power
    playerShieldCount.innerText = player.shield


    
    if (player.shield > 0) {
        shieldIconPlayer.classList.remove("hide")
        playerShieldCount.classList.remove("hide")
    } else {
        shieldIconPlayer.classList.add("hide")
        playerShieldCount.classList.add("hide")
    }

}


//Function to render player action in battleground central section

function renderCharactersActionInBG(character, attack) {
    playerMovesContainer.innerHTML = `
        <p>${character.name} used ${attack.name}</p>
    `
    setTimeout(()=> {
        playerMovesContainer.innerHTML = ""
    }, 1500)
}

//Function to render enemy action in battleground central section

function renderEnemyActionInBG(enemy, attack) {
    playerMovesContainer.innerHTML = `
        <p>${enemy.name} used ${attack.name}</p>
    `
    setTimeout(()=> {
        playerMovesContainer.innerHTML = ""
    }, 1500)
}

//Function to check winner


function checkWinner(character, enemy) {

    const characterLife = character.life
    const enemyLife = enemy.life

    if ( characterLife <= 0) {
        isAlive = false
        console.log(`${enemy.name} wins, you lose`)
        drawCardButton.disabled = true
        endTurnButton.disabled = true
        playerLifeBar.innerText = 0
        clearDivHTML(cardsInHandContainer)

        const button = document.createElement("button")
        button.className = "command-button"
        button.textContent = "Restart Game"
        button.onclick = startNewGame

        setTimeout(()=>{
            playerMovesContainer.innerText = `You losed against ${enemy.name}!!`
            gameOverSound.play()
        }, 2000)
        setTimeout(()=>{
            clearDivHTML(playerMovesContainer)
            playerMovesContainer.appendChild(button)
        }, 6000)

        localStorage.clear()
        handArray = []
        
    } else if (enemyLife <= 0) {
        console.log(`${character.name} wins, you beated ${enemy.name}`)
        const stage = getCurrentStage()

        drawCardButton.disabled = true
        endTurnButton.disabled = true
        enemyLifeBar.innerText = 0
        clearDivHTML(cardsInHandContainer)

        if (stage.stage_id === 5) {
            // ///////////////////// CHANGE THE CODE HERE TO ADD THE END VIDEO   ////////////////////////////////////////////
            handArray = []
            localStorage.clear()
            setTimeout(()=>{
                playerMovesContainer.innerText = `You beated ${enemy.name}!!`
                winningSound.play()
            }, 2000)

            setTimeout(()=>{

                toggleHideClass(gameSceneContainer)
                toggleHideClass(endPageContainer)
                document.getElementById("end-video").play()
            }, 7000)

        } else {
            const button = document.createElement("button")
            button.className = "command-button"
            button.textContent = "Next Stage"
            button.onclick = startNextStage
    
            setTimeout(()=>{
                playerMovesContainer.innerText = `You beated ${enemy.name}!!`
                winningSound.play()
            }, 2000)
            setTimeout(()=>{
                clearDivHTML(playerMovesContainer)
                playerMovesContainer.appendChild(button)
            }, 6000)
        }
        
    }

    console.log(`Player life: ${characterLife}.....enemy life: ${enemyLife}`)
}

//Function to start new

function startNewGame() {
    console.log("Starting new game....")
    clearDivHTML(playerMovesContainer)
    drawCardButton.disabled = false
    endTurnButton.disabled = false
    toggleHideClass(gameplayPageContainer)
    toggleHideClass(characterSelectPage)
}

//Function to jump into next stage
function startNextStage() {
    handArray = []
    console.log("Starting next stage...")
    clearDivHTML(playerMovesContainer)
    
    let currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))

        let character = currentGameStatus[0]
        let stage = stagesArray[currentGameStatus[1].stage_id]
        let stageId = currentGameStatus[1].stage_id + 1
        let enemy = retriveEnemyByStageId(stageId, newEnemiesArray)


    let updatedGameStatus = [
        {
                name: character.name,
                imageSrc: character.imageSrc,
                id: character.id,
                life: character.life,
                mana_power: 3,
                shield: 0,
        },
        {
                stage_id: stage.stage_id,
                stage_background_src: stage.stage_background_src
        },
        {
                name: enemy.name,
                type: enemy.type,
                life: enemy.life,
                moves: enemy.moves,
                imageSrc: enemy.imageSrc,
                course_attack: enemy.course_attack,
                id: enemy.id,
        },

    ]
    
    localStorage.setItem("currentGameStatus", JSON.stringify(updatedGameStatus))
    drawCardButton.disabled = false
    endTurnButton.disabled = false

    renderCurrentStageBackground(stage)
    renderEnemyInBattleground(enemy)
    renderCurrentGameStatus()
}

//Function to restart game at the end of the game

function startNewGameAfterEnd() {
        console.log("Starting new game....")
        clearDivHTML(playerMovesContainer)
        endVideo.pause()
        toggleHideClass(endPageContainer)
        toggleHideClass(characterSelectPage)
        toggleHideClass(gameplayPageContainer)
        toggleHideClass(gameSceneContainer)
        drawCardButton.disabled = false
        endTurnButton.disabled = false
}

