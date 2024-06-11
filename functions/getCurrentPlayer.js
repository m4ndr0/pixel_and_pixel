export default function getCurrentPlayer() {
    const currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
    const character = currentGameStatus[0]
    return character
}