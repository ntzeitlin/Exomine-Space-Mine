import { getData } from "./Data.js"

export const getFacilitiesList = async () => {
    facilities = await getData("facilities")

    let facilitiesHTML = `<select id='facility'>
                                <option value='0'> Choose a facility:</option>
                         `
    
    const facilitiesStringArray = facilities.map(
        (facility) => {
            return `<option value=${facility.id}>${facility.name}</option>`
        }
    )

    facilitiesHTML += facilitiesStringArray.join("")
    facilitiesHTML += `</select>`

    return facilitiesHTML

}