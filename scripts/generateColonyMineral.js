import { getData } from "./Data.js"
import { setTransientState, transientState } from "./TransientState.js"

const handleGovernorChange = (governorSelectedChangeEvent) => {
    if (governorSelectedChangeEvent.target.id === "colonyMineralsAvailable") {
        const convertValueToInteger = parseInt(governorSelectedChangeEvent.target.value)
        setTransientState("colonyId", convertValueToInteger)
    }
}

export const generateColonyMineral = async () => {
    const colonyMinerals = await getData("colonyMinerals?_expand=mineral&_expand=colony");

    document.addEventListener("change", handleGovernorChange)

    let colonyMineralsHTML = ""
    const colonyMineralsArray = colonyMinerals.filter(
        (colonyMineral) => {
            return colonyMineral.colonyId != 0 && colonyMineral.colonyId === transientState.get("colonyId") && colonyMineral.quantity > 0
        }
    ).map((colonyMineral) => {
        return `<ul>
                    <li id="colonyMineralsAvailable" value="${colonyMineral.colonyId}">${colonyMineral.quantity} tons of ${colonyMineral.mineral.name}</li>
                </ul>`
    })

    colonyMineralsHTML += colonyMineralsArray.join("")

    return colonyMineralsHTML

}