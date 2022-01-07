const bingoCard = (() => {
    let _size = 5
    let _words = new Array(25)
    let _board = new Array(25)

    const getSize = () => _size
    const setSize = (size) => _size = size

    const addWords = (words) => {
        words.forEach((item) => _words.push(item))
    }

    return {
        getSize,
        setSize,
        addWords
    }
})()

const bingoController = (() => {
    const container = document.getElementById('bingo-card')
    
    const createCard = (size) => {
        container.style.setProperty('--grid-rows', size)
        container.style.setProperty('--grid-cols', size)
        for (i = 0; i < (size * size); i++) {
            let cell = document.createElement('div')
            container.appendChild(cell).className = 'grid-item'
        }
        let gridItems = document.querySelectorAll(".grid-item")
        gridItems.forEach((gridItem) => {
            gridItem.addEventListener("click", () => {
                gridItem.style.backgroundColor = "#ffcccb";
            })
        })
    }

    const updateCard = (words) => {
        let gridItems = document.querySelectorAll('.grid-item')
        for (let i = 0; i < words.length; i++) {
            gridItems.item(i).textContent = words[i]
        }
        gridItems.forEach((gridItem) => {
            gridItem.style.backgroundColor = "transparent";
        })
    }

    const clearCard = () => {
        let gridItems = document.querySelectorAll('.grid-item')
        gridItems.forEach((gridItem) => {
            gridItem.textContent = ''
        })
    }

    const deleteCard = () => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    //taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const shuffle = ((array) => { 
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    })

    return {
        createCard,
        updateCard,
        clearCard,
        deleteCard,
        shuffle
    }
})()

const displayController = (() => {
    const updateBtn = document.getElementById('update')
    const randomBtn = document.getElementById('random')
    const ibbyBtn = document.getElementById('ibby')
    const words = document.getElementById('words')
    const bingoTitle = document.getElementById('bingo-card-title')
    const titleInput = document.getElementById('title')
      
    const _init = (() => {
        updateBtn.addEventListener('click', () => {
            let wordsArray = words.value.split("\n")
            bingoTitle.textContent = titleInput.value
            bingoController.clearCard()
            bingoCard.addWords(wordsArray)
            bingoController.updateCard(wordsArray)
        })

        randomBtn.addEventListener('click', () => {
            let wordsArray = words.value.split("\n")
            wordsArray = bingoController.shuffle(wordsArray)
            words.value = ""
            wordsArray.forEach((word) => {
                words.value += word + "\n"
            })
            words.value = words.value.trim()
        })

        ibbyBtn.addEventListener('click', () => {
            titleInput.value = "Ibby Bingo"
            words.value = 
`Mentioning his tinnitus or hppd
'Like Zoinks Scoob'
'Jinkies'
'I'm zoinked!'
'I'm gonna hit my bong'
'This is Za'
'We are one'
'It wasn't me'
Gaslighting
'At the function'
'I'm a hippie'
Going AFK randomly during a game to smoke
Sexually harass Uzair
'There is no such thing as objective reality'
'Mayo Monkey'
'I want a stoner hippie gf'
'Cowabunga dude'
'Can I que a song?'
'Check out my art'
Invading your private space
'I'm on Zoopiter'
Repeating something 3 times or more
'We are the universe experiencing itself'
Talking about his nails
'Bozo'
'You'll get it someday'`
        })
    })

    return {
        _init
    }
})()

displayController._init()
bingoController.createCard(5)