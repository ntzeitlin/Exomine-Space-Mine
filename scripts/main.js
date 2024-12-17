const mainContainerElement = document.getElementById("container")

const render = async () => {
    const compositeHTML =
        `<h1>TESTING HEADER</h1>`

    mainContainerElement.innerHTMl = compositeHTML
}

render()

