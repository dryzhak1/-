const { ipcRenderer } = require('electron')

ipcRenderer.on('show-image', (event, imageData) => {
  const imageElement = document.createElement('img')
  imageElement.src = imageData
  document.body.appendChild(imageElement)
})
