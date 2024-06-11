export default function getCurrentEnemy() {
    const currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
    const enemy = currentGameStatus[2]
    return enemy
}