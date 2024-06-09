/* === Imports === */

import {charactersArray, cardDeckArray, enemiesArray} from "/data.js"

/* === Global Variables ===  */

let isGameStarted = false
let isAlive = false

/* === Constants === */

/* === Constants ==>>>> Buttons === */


const enterGameButton = document.getElementById("enter-game-button")

const drawCardButton = document.getElementById("draw-card-button")
const endTurnButton = document.getElementById("end-turn-button")

/////////////////////////////////////7

const introPageContainer = document.getElementById("intro-page-container")
const characterSelectPage = document.getElementById("character-select-page")
const gameplayPageContainer = document.getElementById("gameplay-page-container")

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


/* === Event Listeners === */


enterGameButton.addEventListener("click", enterGame)

deckContainer.addEventListener("click", showHideDeck)
closeDeckWindowButton.addEventListener("click", showHideDeck)

playableCharactersContainer.addEventListener("click", selectPlayer)

drawCardButton.addEventListener("click", getHand)



/////////////////////* === Functions === */ /////////////////////////



/* === UI Functions === */

function enterGame() {
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

let currentEnemy = ""

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
                
                localStorage.setItem("selectedCharacter", JSON.stringify(selectedCharacter))
                renderSelectedCharacterInBattleground(retriveSelectedCharacterById(selectedCharacterId))
                currentEnemy = getRandomEnemy()
                renderEnemyInBattleground(currentEnemy)
                toggleHideClass(characterSelectPage)
                toggleHideClass(gameplayPageContainer)
            }

        }
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

function getRandomNumber(array) {
    let randomNumber = Math.ceil(Math.random()*array.length) -1
    return randomNumber
}

// Fuction that returns a random card object

function getRandomCardFromDeck() {
    let randomIndex = getRandomNumber(cardDeckArray)
    let randomCard = ""
    for (let i = 0; i < cardDeckArray.length; i++) {
        if (randomIndex === i) {
            randomCard = cardDeckArray[i]
        }
    }
    return randomCard
}

// Array containing the cards drawed

let handArray = []


function returnFilterdArray(array) {
 // to implement maybe ?????
}


function getHand() {
    if (isAlive) {
        for (let i = 0; i < 4; i++) {
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
    console.log(`${htmlElement} cleared`)
}

// Function that returns a random enemy object

function getRandomEnemy() {
    let randomIndex = getRandomNumber(enemiesArray)
    let randomEnemy = ""
    for (let i = 0; i < enemiesArray.length; i++) {
        if (randomIndex === i) {
            randomEnemy = enemiesArray[i]
        }
    }
    return randomEnemy
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
    let character = JSON.parse(localStorage.getItem("selectedCharacter"))
    let remainingMana = Number(character.mana_power)
    return remainingMana
}

//Cards Actions Functions




function attackCard() {
    const remainingMana = getRemainingMana()
    if (remainingMana > 0) {
        swordSound.play()
        toggleHideClass(hitIconEnemy)
        setTimeout(() => {
            toggleHideClass(hitIconEnemy)
        }, 300);

        const attackPower = 3

        let character = JSON.parse(localStorage.getItem("selectedCharacter"))

        let updatedCharacterObj = {
            name: character.name,
            imageSrc: character.imageSrc,
            id: character.id,
            life: character.life,
            mana_power: remainingMana - 1,
            shield: character.shield,
        }

        localStorage.setItem("selectedCharacter", JSON.stringify(updatedCharacterObj))


        let stringEnemyLife = enemyLifeBar.innerText
        let numberEnemyLife = Number(stringEnemyLife)

        let updatedEnemyLife = numberEnemyLife - attackPower

        enemyLifeBar.innerText = updatedEnemyLife
        playerManaBar.innerText = remainingMana - 1
    } else if (remainingMana === 0) {
        console.log("No Mana left")
    }
}

function shieldCard() {

    const remainingMana = getRemainingMana()
    if (remainingMana > 0) {
        equipArmorSound.play()


        let character = JSON.parse(localStorage.getItem("selectedCharacter"))

        let updatedCharacterObj = {
            name: character.name,
            imageSrc: character.imageSrc,
            id: character.id,
            life: character.life,
            mana_power: remainingMana - 1,
            shield: character.shield + 3,
        }

        playerShieldCount.innerText = Number(updatedCharacterObj.shield)
        playerManaBar.innerText = Number(updatedCharacterObj.mana_power)

        shieldIconPlayer.classList.remove("hide")
        playerShieldCount.classList.remove("hide")

        localStorage.setItem("selectedCharacter", JSON.stringify(updatedCharacterObj))

    }
}


function skeletonCard() {
    const remainingMana = getRemainingMana()
    if (remainingMana > 0) {

        let character = JSON.parse(localStorage.getItem("selectedCharacter"))

        let updatedCharacterObj = {
            name: character.name,
            imageSrc: character.imageSrc,
            id: character.id,
            life: character.life,
            mana_power: remainingMana - 1,
            shield: character.shield,
        }


        currentEnemy.course_attack += 1
        courseSound.play()
        playerManaBar.innerText = Number(updatedCharacterObj.mana_power)

        localStorage.setItem("selectedCharacter", JSON.stringify(updatedCharacterObj))
    }
}


// var audio = new Audio('audio_file.mp3');
// audio.play();

// Function to use selected card
cardsInHandContainer.addEventListener("click", function(e) {
    if (isAlive) {
        let character = getCurrentCharacter()
        if (getRemainingMana() != 0) {
            if (e.target.id != "cards-in-hand-container" && e.target.classList != "card-in-hand") {
                let cardId = e.target.id
                const card = getCardById(cardId, cardDeckArray)
                card.isUsed = true
                if (card.name === "shield") {
                    shieldCard()
                } else if (card.name === "sword") {
                    attackCard()
                } else if (card.name === "skeleton") {
                    skeletonCard()
                    console.log(`Coursed! Enemy's attack reduced by ${currentEnemy.course_attack}`)
                }
                toggleHideClass(e.target)
                
                checkWinner(getCurrentCharacter(), currentEnemy)
                renderCharactersActionInBG(character, card)
    
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
    
        setTimeout(() => {
            startEnemyTurn() 
        }, 1500)
        drawCardButton.disabled = true
    }
}

function resetIsUsedBoolean(array) {
    array.map(card => card.isUsed = false)
}

//Functions to start enemy's turn

function startEnemyTurn() {
    if (isAlive) {
    useShield(enemyNormalAttack(currentEnemy))
    checkWinner(getCurrentCharacter(), currentEnemy)

        setTimeout(() => {
            startPlayerTurn()
        }, 1500)
    }
}

//Function to get current selected player character

function getCurrentCharacter() {
    return JSON.parse(localStorage.getItem("selectedCharacter"))
}

//Function enemy attack Functions


function enemyNormalAttack(enemyObj) {

    let enemyAttack = enemyObj.attack_power

    if (enemyObj.course_attack != 0) {

        enemyAttack = enemyAttack - enemyObj.course_attack
    }
    renderEnemyActionInBG(enemyObj)
    return enemyAttack

}

//Function to subtract shield from any enemy attack


function useShield(enemyAttack) {

    const character = getCurrentCharacter()

    let currentShield = character.shield

    let realEnemyAttackPower = 0

    let updatedCharacterObj = ""

    if (currentShield === 0) {

        realEnemyAttackPower = enemyAttack
        console.log(` Shield = ${currentShield}, enemy attack = ${realEnemyAttackPower}`)

        updatedCharacterObj = {
                 name: character.name,
                 imageSrc: character.imageSrc,
                 id: character.id,
                 life: character.life - realEnemyAttackPower,
                 mana_power: character.mana_power,
                 shield: character.shield,
             }
             swordSound.play()
             toggleHideClass(hitIconPlayer)
             setTimeout(() => {
                 toggleHideClass(hitIconPlayer)
             }, 300);


    } else if (currentShield > enemyAttack) {

        currentShield = currentShield - enemyAttack
        console.log(` Shield = ${currentShield}, enemy attack = ${realEnemyAttackPower}`)

        updatedCharacterObj = {
            name: character.name,
            imageSrc: character.imageSrc,
            id: character.id,
            life: character.life,
            mana_power: character.mana_power,
            shield: currentShield,
        }
        blockedAttackSound.play()

    } else if (currentShield < enemyAttack) {
        realEnemyAttackPower = enemyAttack - currentShield
        currentShield = 0
        console.log(` Shield = ${currentShield}, enemy attack = ${realEnemyAttackPower}`)

        updatedCharacterObj = {
            name: character.name,
            imageSrc: character.imageSrc,
            id: character.id,
            life: character.life - realEnemyAttackPower,
            mana_power: character.mana_power,
            shield: currentShield,
        }
        swordSound.play()
        toggleHideClass(hitIconPlayer)
        setTimeout(() => {
            toggleHideClass(hitIconPlayer)
        }, 300);

    } else if (currentShield === enemyAttack) {

        currentShield = 0
        console.log(` Shield = ${currentShield}, enemy attack = ${realEnemyAttackPower}`)

        updatedCharacterObj = {
            name: character.name,
            imageSrc: character.imageSrc,
            id: character.id,
            life: character.life - realEnemyAttackPower,
            mana_power: character.mana_power,
            shield: currentShield,
        }
        blockedAttackSound.play()
    }

    localStorage.setItem("selectedCharacter", JSON.stringify(updatedCharacterObj))
    renderPlayerFromLocalStorage()
}



//Function to start player Turn

function startPlayerTurn() {
    if (isAlive) {

        console.log("Player turn started")
        resetPlayerManaAndShield()
        currentEnemy.course_attack = 0
        drawCardButton.disabled = false
    }
}



//function to reset player Mana and Shield after finishing turn

function resetPlayerManaAndShield() {

    let character = JSON.parse(localStorage.getItem("selectedCharacter"))
    let updatedCharacterObj = {
        name: character.name,
        imageSrc: character.imageSrc,
        id: character.id,
        life: character.life,
        mana_power: 3,
        shield: 0,
    }

    playerShieldCount.innerText = Number(updatedCharacterObj.shield)
    playerManaBar.innerText = Number(updatedCharacterObj.mana_power)

    shieldIconPlayer.classList.add("hide")
    playerShieldCount.classList.add("hide")

    localStorage.setItem("selectedCharacter", JSON.stringify(updatedCharacterObj))
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

    let player = getCurrentCharacter()

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

function renderEnemyActionInBG(enemy) {
    playerMovesContainer.innerHTML = `
        <p>${enemy.name} used ${enemy.attack_name}</p>
    `
    setTimeout(()=> {
        playerMovesContainer.innerHTML = ""
    }, 1500)
}

//Function to check winner

function checkWinner(character, enemy) {

    const characterLife = Number(character.life)
    const enemyLife = Number(enemyLifeBar.innerHTML)

    if ( characterLife <= 0) {
        isAlive = false
        console.log(`${enemy.name} wins, you lose`)
        drawCardButton.disabled = true
        endTurnButton.disabled = true
        playerLifeBar.innerText = 0
        clearDivHTML(cardsInHandContainer)
        setTimeout(()=>{
            playerMovesContainer.innerText = `You losed against ${enemy.name}!!`
            gameOverSound.play()
        }, 2000)


    } else if (enemyLife <= 0) {
        console.log(`${character.name} wins, you beated ${enemy.name}`)
        drawCardButton.disabled = true
        endTurnButton.disabled = true
        enemyLifeBar.innerText = 0
        clearDivHTML(cardsInHandContainer)
        setTimeout(()=>{
            playerMovesContainer.innerText = `You beated ${enemy.name}!!`
            winningSound.play()
        }, 2000)

    }

    console.log(`Player life: ${characterLife}.....enemy life: ${enemyLife}`)
}


//Function to start new


