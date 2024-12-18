import { getData } from "./Data.js"

export const transientState = new Map()

const resetTransientState = () => {
    transientState.set("id", 0)
    transientState.set("governorId", 0)
    transientState.set("colonyId", 0)
    transientState.set("mineralId", 0)
    transientState.set("facilityId", 0)
}

resetTransientState()

// export const setFacility = (facilityId) => {
//     state.selectedFacility = facilityId
//     document.dispatchEvent(new CustomEvent("stateChanged"))
// }

export const setTransientState = (propertyType, selectedId) => {
    transientState.set(propertyType, selectedId)
    document.dispatchEvent(new CustomEvent("stateChanged"))
    // console.log(transientState)
}

// post and put data functions

const postData = async (data, url) => {

    const response = await fetch(url, ({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }))

}

const putData = async (data, url) => {

    const response = await fetch(url, ({
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }))
}


export const purchaseMineral = async () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */

    // Get current colony's id from transient state
    const currentColonyId = transientState.get("colonyId")

    // Get current facility's id from transient state
    const currentFacilityId = transientState.get("facilityId")

    // Get current mineral Id from transient state
    const currentMineralId = transientState.get("mineralId")

    // getData from the colonyminerals database
    const colonyMineralData = await getData("colonyminerals")

    // getData from the facilityminerals database
    const facilityMineralData = await getData("facilityminerals")

    // find colonies with match to current colonyId and current selected mineral,
    // should return 0 or 1 element in an array
    const filteredColonyMineralData = colonyMineralData.filter((colonyMineral) => parseInt(colonyMineral.colonyId) === currentColonyId
        && parseInt(colonyMineral.mineralId) === currentMineralId)

    const currentFacilityMineral = facilityMineralData.find((facilityMineral) => parseInt(facilityMineral.facilityId) === currentFacilityId
        && parseInt(facilityMineral.mineralId) === currentMineralId)


    //double check variable values
    console.log(filteredColonyMineralData)
    console.log(currentFacilityMineral)
    // console.log("filteredColonyMineralData[0].id", filteredColonyMineralData[0].id)
    // console.log("filteredColonyMineralData[0].quantity + 1", filteredColonyMineralData[0].quantity + 1)
    // console.log("currentColonyId", currentColonyId)
    // console.log("currentMineralId", currentMineralId)
    // console.log("currentFacilityMineral.id", currentFacilityMineral.id)
    // console.log("currentFacilityId", currentFacilityId)

    const facilityMineralDataPUT = {
        "id": currentFacilityMineral.id,
        "quantity": currentFacilityMineral.quantity - 1,
        "mineralId": currentMineralId,
        "facilityId": currentFacilityId
    }

    // Check whether Governor's colony currently has current materials
    // If it exists, update database
    if (filteredColonyMineralData.length > 0) {
        const colonyMineralDataPUT = {
            "id": filteredColonyMineralData[0].id,
            "quantity": filteredColonyMineralData[0].quantity + 1,
            "colonyId": currentColonyId,
            "mineralId": currentMineralId
        }

        // PUT TO DATABASE
        let putColonyURL = `http://localhost:8088/colonyminerals/${filteredColonyMineralData[0].id}`
        putData(colonyMineralDataPUT, putColonyURL)

        let putFacilityURL = `http://localhost:8088/facilityminerals/${currentFacilityMineral.id}`
        putData(facilityMineralDataPUT, putFacilityURL)
    }

    // if the colony currently has no material
    if (filteredColonyMineralData.length === 0) {
        const colonyMineralDataPOST = {
            "quantity": 1,
            "colonyId": currentColonyId,
            "mineralId": currentMineralId
        }
        let postColonyURL = "http://localhost:8088/colonyminerals/"
        postData(colonyMineralDataPOST, postColonyURL)

        let putFacilityURL = `http://localhost:8088/facilityminerals/${currentFacilityMineral.id}`
        putData(facilityMineralDataPUT, putFacilityURL)
    }



    console.log("PURCHASE MATERIAL TRIGGERED")
    document.dispatchEvent(new CustomEvent("stateChanged"))
}


//If there is a coloniesMinerals entry that contains the purchased material, increase the value by 1 ton/
//If there is not a coloniesMinerals entry that contains the correct colony and purchased material, create a new entry that contains the rel information

