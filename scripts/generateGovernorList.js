import { getData } from "./Data.js"

export const generateGovernorList = async () => {
    const govData = await getData("governors");

    let govListHTML = ""

    govListHTML += '<select id="governor">'
    govListHTML += '<option value="0">Choose a governor</option>'

    const governorArray = govData
        .filter((governor) => governor.activestatus === true)
        .map((governor) => {
            return `<option value="${governor.id}">${governor.name}</option>`
        }
    )

    govListHTML += governorArray.join("")
    govListHTML += "</select>"

    return govListHTML
}