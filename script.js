console.log('hello')
//GLOBAL VARIABLES
const playButton = document.querySelector('#play-button')
const main = document.querySelector('main')

const createBoard = () => {
  for (let i = 0; i < 16; i++) {
    let newCell = document.createElement('div')
    newCell.setAttribute('class', 'board')
    newCell.setAttribute('id', `${i}`)
    main.appendChild(newCell)
  }
}

//EVENT LISTENERS

// playButton.addEventListener('click', create)
