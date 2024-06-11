export default function renderCurrentStageBackground(stageObj) {
    document.getElementById("battleground-container").style.backgroundImage = `url("${stageObj.stage_background_src}")`
}