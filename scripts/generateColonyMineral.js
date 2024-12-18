import { getData } from "./Data.js"
import { transientState } from "./TransientState.js"

export const generateColonyMineral = async () => {
    const colonyMinerals = await getData("colonyMinerals?_expand=mineral&_expand=colony");

    let colonyMineralsHTML = "<ul>"
    const colonyMineralsArray = colonyMinerals.filter(
        (colonyMineral) => {
            return colonyMineral.colonyId != 0 && colonyMineral.colonyId === transientState.get("colonyId") && colonyMineral.quantity > 0
        }
    ).map((colonyMineral) => {
        return `<li id="colonyMineralsAvailable" value="${colonyMineral.colonyId}">${colonyMineral.quantity} tons of ${colonyMineral.mineral.name}</li>`
    })

    colonyMineralsHTML += "</ul>"
    colonyMineralsHTML += colonyMineralsArray.join("")

    return colonyMineralsHTML

}