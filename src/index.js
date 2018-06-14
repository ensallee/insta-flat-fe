//<div class="image-container">
//    <img src="https://scontent-lga3-1.cdninstagram.com/vp/bd9b15079ec27c52c076e9c7792bdc04/5B992309/t51.2885-15/s640x640/sh0.08/e35/c180.0.719.719/31449135_2115995735352355_6317812590797914112_n.jpg">
//    <p>
//        <img data-action="like-image" data-image-id="1" class="like-button" src="./images/like.png"><br>
//        <span id="likes-count-for-image-1">41</span>
//    </p>
//</div>
document.addEventListener("DOMContentLoaded", function() {
  const imageContainer = document.getElementById('container')
  const newImageForm = document.getElementById('post-image-form')
  const imageInputField = document.getElementById('post-image-form-url')

  newImageForm.addEventListener("submit", postNewImage)
  imageContainer.addEventListener("click", addLike)

  function getImages() {
    fetch('http://localhost:3000/api/v1/images').then(resp=>resp.json()).then(json=>renderImages(json))
  }

  function renderImages(json) {
    imageContainer.innerHTML = ""
    json.forEach(function(imgObj) {
      imageContainer.innerHTML += `<div class="image-container">
       <img src="${imgObj.url}">
      <p>
        <img data-action="like-image" data-image-id="${imgObj.id}" class="like-button" src="./images/like.png"><br>
        <span id="likes-count-for-image-1">${imgObj.likes_count}</span>
      </p>
      </div>`
    })
  }

  function postNewImage(e) {
    e.preventDefault()
    let newImageLink = imageInputField.value
    body = {url: newImageLink}
    let config = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    }
    fetch('http://localhost:3000/api/v1/images', config).then(resp=>resp.json()).then(json=>addImageToDom(json))
  }

  function addImageToDom(imgObj) {
    imageContainer.innerHTML += `<div class="image-container">
     <img src="${imgObj.url}">
    <p>
      <img data-action="like-image" data-image-id="${imgObj.id}" class="like-button" src="./images/like.png"><br>
      <span id="likes-count-for-image-1">${imgObj.likes_count}</span>
    </p>
    </div>`
  }

  function addLike(e) {
    if (e.target.className === "like-button") {
      let imageId = e.target.dataset.imageId
      // let likeSpan = document.getElementById(`likes-count-for-image-${imageId}`)
      // let numberOfLikes = likeSpan.innerHTML
      let body = {image_id: parseInt(`${imageId}`)}
      let config = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      }
      fetch(`http://localhost:3000/api/v1/likes`, config).then(resp=>resp.json()).then(getImages)
    }
  }

  getImages()
})
