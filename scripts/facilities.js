import { getData } from "./Data.js"
import { setTransientState, transientState } from "./TransientState.js"


const handleFacilityChange = (facilitySelectedChangeEvent) => {
    if (facilitySelectedChangeEvent.target.id === "facility") {
        const convertedToInteger = parseInt(facilitySelectedChangeEvent.target.value)
        setTransientState("facilityId", convertedToInteger)
    }
}


export const getFacilitiesList = async () => {
    let facilities = await getData("facilities")

    document.addEventListener(
        "change",
        handleFacilityChange
    )

    let facilitiesHTML = `<select id='facility' >
                                <option value='0'> Choose a facility:</option>
                         `
    const facilitiesStringArray = facilities.filter(
        (facility) => {
            return facility.activestatus === true
        }
    ).map((facility) => {
        if (facility.id === transientState.get("facilityId")) {
            return `<option value=${facility.id} selected>${facility.name}</option>`
        }

        return `<option value=${facility.id}>${facility.name}</option>`
    })

    facilitiesHTML += facilitiesStringArray.join("")
    facilitiesHTML += `</select>`

    return facilitiesHTML

}
