const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
const snapButton = document.getElementById('snap')
const context = canvas.getContext('2d')

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream
  })
  .catch(err => {
    alert('Не вдалося відкрити камеру: ' + err)
  })

snapButton.addEventListener('click', () => {
 
  context.drawImage(video, 0, 0, canvas.width, canvas.height)

  const imageData = canvas.toDataURL()

  const { ipcRenderer } = require('electron')
  ipcRenderer.send('image-captured', imageData)
})
