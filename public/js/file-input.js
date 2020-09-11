const fileInput = document.querySelector('#car-image input[type=file]')
fileInput.onchange = () => {
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#car-image .file-name')
    fileName.textContent = fileInput.files[0].name
  }
}
