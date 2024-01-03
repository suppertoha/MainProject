
const pictureImg = document.querySelector('.picture-api__image img');
const pictureButton = document.querySelector('.picture-api__button');
const url = 'https://randomfox.ca/floof/'

if (pictureButton) {
  //! с помощью fetch
  async function fetchHandler() {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      pictureImg.src = data.image;
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }

  pictureButton.addEventListener('click', fetchHandler);

  //! с помощью promice
  function fetchHandlerPromise() {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.image;
        pictureImg.src = imageUrl;
      })
      .catch(error => {
        console.error('Произошла ошибка при получении данных:', error);
      });
  }

  //pictureButton.addEventListener('click', fetchHandlerPromise);

  //! с помощью AJAX

  function fetchHandlerAJAX() {
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.send();
    request.addEventListener('load', () => {
      if (request.status === 200) {
        const responseData = JSON.parse(request.responseText);
        const imageUrl = responseData.image;
        pictureImg.src = imageUrl;
      }
    });
  }

  //pictureButton.addEventListener('click', fetchHandlerAJAX);
}




