
const mainContainerElement = document.querySelector("#container")

const governorListHTML = ""
const colonyMineralsHTML = ""
const facilitiesListHTML = ""
const facilityMineralsHTML = ""
const shoppingCartHTML = ""
const purchaseButton = ""

const render = () => {
    const compositeHTML =
        `<h1 id="title">Solar System Mining Marketplace</h1>
      <section class="choices">
        <article class="choices_gov options">
            <h5>Choose a governor:</h5>
            ${governorListHTML}
        </article>
        <article class="colonies_list options">
            <h2>Colony Minerals</h2>
            ${colonyMineralsHTML}
        </article>
        <article class="choices_facility options">
            <h5>Choose a facility:</h5>
            ${facilitiesListHTML}
        </article>
      </section>

      <section class="display">
        <article class="choices_mineral options">
            <h3>Facility Minerals</h3>
            ${facilityMineralsHTML}
        </article>
        <article class="cart">
            <h3>Space Cart</h3>
            ${shoppingCartHTML}
            ${purchaseButton}
        </article>
      </section>
    `
    mainContainerElement.innerHTML = compositeHTML

}

render()

