import { getData } from "./Data.js"
import { setTransientState,transientState } from "./TransientState.js"

export const getFacilityMineralList = async () => {
    let facilityMinerals = await getData("facilityMinerals?_expand=mineral&_expand=facility")
    console.log(transientState)
    let facilityMineralsHTML = ""
    const facilityMineralsStringArray = facilityMinerals.filter(
        (facilityMineral) => {
            return facilityMineral.facilityId !=0 && facilityMineral.facilityId === transientState.get("facilityId")

        }
    ).map((facilityMineral) => {
        return `
              <div>
                <input type="radio" name="facilityMineralsAvailable" value=${facilityMineral.mineralId}>${facilityMineral.mineral.name}</input>
              </div>
                `
    })

    facilityMineralsHTML += facilityMineralsStringArray.join("")
    return facilityMineralsHTML
}