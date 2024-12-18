import { getData } from "./Data.js"
import { transientState, setTransientState } from "./TransientState.js";

const handleGovernorChange = (governorSelectedChangeEvent) => {
    if (governorSelectedChangeEvent.target.id === "governor") {
        const convertedToInteger = parseInt(governorSelectedChangeEvent.target.value)
        setTransientState("governorId", convertedToInteger)
    }
}

export const generateGovernorList = async () => {
    const govData = await getData("governors");

    document.addEventListener("change", handleGovernorChange)

    let govListHTML = ""

    govListHTML += '<select id="governor">'
    govListHTML += '<option value="0">Choose a governor</option>'

    const governorArray = govData
        .filter((governor) => governor.activestatus === true)
        .map((governor) => {
            if (governor.id === transientState.get("governorId")) {
                return `<option value="${governor.id}" selected>${governor.name}</option>`
            }
            return `<option value="${governor.id}">${governor.name}</option>`
        }
        )

    govListHTML += governorArray.join("")
    govListHTML += "</select>"

    return govListHTML
}