import { getData } from "./Data.js"
import { setTransientState,transientState } from "./TransientState.js"

const handleMineralChange = (mineralSelectedChangeEvent) => {
    if(mineralSelectedChangeEvent.target.name === "facilityMineralsAvailable") {
        const convertedToInteger = parseInt(mineralSelectedChangeEvent.target.value)
        setTransientState("mineralId",convertedToInteger)
    }
}

export const getFacilityMineralList = async () => {
    let facilityMinerals = await getData("facilityMinerals?_expand=mineral&_expand=facility")
    
    document.addEventListener(
        "change",
        handleMineralChange
    )

    let facilityMineralsHTML = ""
    const facilityMineralsStringArray = facilityMinerals.filter(
        (facilityMineral) => {
            return facilityMineral.facilityId !=0 && facilityMineral.facilityId === transientState.get("facilityId") && facilityMineral.quantity > 0

        }
    ).map((facilityMineral) => {
        if (facilityMineral.facilityId === transientState.get("facilityId")) {
        return `
              <div>
                <input type="radio" name="facilityMineralsAvailable" value=${facilityMineral.mineral.id} selected>${facilityMineral.quantity} tons of ${facilityMineral.mineral.name}</input>
              </div>
                `
        }
        return `
              <div>
                <input type="radio" name="facilityMineralsAvailable" value=${facilityMineral.mineral.id}>${facilityMineral.quantity} tons of ${facilityMineral.mineral.name}</input>
              </div>
                `
    })
    

    facilityMineralsHTML += facilityMineralsStringArray.join("")
    return facilityMineralsHTML
}