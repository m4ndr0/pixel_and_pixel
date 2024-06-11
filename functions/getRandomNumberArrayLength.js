export default function getRandomNumberArrayLength(array) {

    const randomNumber = Math.ceil(Math.random() * array.length - 1)
    let randomElement = ""

    for (let i = 0; i < array.length; i++) {
        randomElement = array[randomNumber]
    }

    return randomElement
}