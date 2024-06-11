export default function getCurrentStage() {
    const currentGameStatus = JSON.parse(localStorage.getItem("currentGameStatus"))
    const stage = currentGameStatus[1]
    return stage
}