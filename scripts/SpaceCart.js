import { getData } from "./Data.js"
import { transientState } from "./TransientState.js"

export const generateShoppingCart = async () => {
    const mineralData = await getData("minerals")
    const facilityData = await getData("facilities")
    const stateOfMinerals = transientState.get("mineralId")
    const stateOfFacility = transientState.get("facilityId")

    if (stateOfMinerals != 0 && stateOfFacility != 0) {
        const targetMineral = mineralData.find(({ id: mineralId }) => stateOfMinerals === mineralId)
        const targetFacility = facilityData.find(({ id: facilityId }) => stateOfFacility === facilityId)
        return `<p>1 ton of ${targetMineral.name} from ${targetFacility.name}</p>`
    } else {
        return ""
    }
}