

var searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    var textValue = document.querySelector('#search-bar').value;
    fetchApiFrom(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${textValue}&maxResults=10&key=AIzaSyBz27sc9wRuqJSx7wUyoCp0ekIaXneWajg`);

})


function fetchApiFrom(URLString) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        var res = JSON.parse(xhttp.responseText);
        var videoData = res.items.map(function(item) {
            return item.snippet;
        });

        var container = document.querySelector('#video-divs');
        container.innerHTML = '';
        videoData.forEach(video => {
            console.log(video)
            var videoDiv = document.createElement('div');
            videoDiv.classList.add('video-div');
            videoDiv.innerHTML = `
                    <img height=300 src="${video.thumbnails.high.url}"/>
                    <h4>${video.title}</h4>
                    <p>${video.channelTitle}</p>
                    <p>${new Date(video.publishTime).toLocaleDateString()}</p>
            `;
            container.appendChild(videoDiv);
        });
        }
    };
    xhttp.open("GET", URLString, true);
    xhttp.send();
}
