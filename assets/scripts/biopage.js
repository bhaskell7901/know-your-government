// Api call to YT - Renders embeded YT links to the bioPage

  function ytApi(query) {
    const API_KEY = 'AIzaSyBz6RBLJ5i8mG7CLpH6SWfYcUTiRVa7FxA'
    const requestUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`;
    const ytEl = document.getElementById('yt-render');
    

    axios.get(requestUrl, {
        })
        .then(response => {
          if (response.data.items.length === 0) {
            emptyEl = document.createElement('p')
            emptyEl.textContent = "Sorry, there don't seem to be any videos available."
            ytEl.append(emptyEl)
          } 
          else {

            for(i = 0; i < response.data.items.length; i++) {
                  var videoId = response.data.items[i].id.videoId;
                  var ytLink = `https://www.youtube.com/embed/${videoId}`;
                
                  var ytEmbed = document.createElement('iframe');
                  ytEmbed.style.opacity = 1;

                  ytEmbed.setAttribute('src', ytLink);
                  ytEmbed.setAttribute('frameborder', '0');
                  ytEmbed.setAttribute('allowfullscreen', 'true');
                
                  ytEl.append(ytEmbed)
                
            }  
          }
        })     
        .catch(error => {
          emptyEl = document.createElement('p');
          emptyEl.textContent = "🤔 Oops! Something went wrong.";
          emptyEl.setAttribute("style","color:lightblue");
          ytEl.append(emptyEl);
    });
    
  }
    
    //api call to retrieve news articles
    function newsApi(query){
      const apiKey = 'a654c191-aae9-4b05-95d8-d13ad6c72fa0';
      const reqUrl = `https://api.goperigon.com/v1/all?q=${query}&apiKey=${apiKey}`;
      var newsEl = document.getElementById('news');
      axios.get(reqUrl, {
      })
      .then(response => {
        if (response.data.articles.length === 0) {
          emptyEl = document.createElement('p');
          emptyEl.textContent = "Sorry, there don't seem to be any articles available."
          newsEl.append(emptyEl);
        } else {
          for (i = 0 ; i <response.data.articles.length ; i++) {
            if(response.data.articles[i].country == "us") {
              var newsUrl = response.data.articles[i].url;
              var newsLink = document.createElement('a');
              newsLink.textContent = response.data.articles[i].title;
              newsLink.setAttribute('href',newsUrl);
              newsLink.setAttribute('target','_blank');
              newsLink.setAttribute('style','color:lightblue');
              newsEl.append(newsLink);
              var brkEl = document.createElement('br');
              newsEl.append(brkEl);
            }
          }
        }
      })    
      .catch(error => {
        emptyEl = document.createElement('p');
        emptyEl.textContent = "🤔 Oops! Something went wrong.";
        emptyEl.setAttribute("style","color:lightblue");
        newsEl.append(emptyEl);

      });

    }
   
    // Get the search params out of the URL
    function getParams() {
      var decodedURL = decodeURI(document.location);
      //console.log(decodedURL);
      var searchParamsArr = decodedURL.split('&');
      // Get the query values
      var query = searchParamsArr[0].split('=').pop();
      // sets hero text = rep's name
      const heroEl = document.getElementById('rep-search')
      heroEl.textContent = query

      newsApi(query);
      ytApi(query);
    }
    getParams();
