//searchURL= 'https://api.github.com/users/'+ russellmccurdy +'/repos';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
           .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
}

function getResults(query) {
    const params= {
        type: "all",
        sort: "full_name",
        direction: "asc"
    };
    const queryString = formatQueryParams(params)
    const url = 'https://api.github.com/users/'+ query +'/repos' + '?' + queryString;

    console.log(url);

    fetch (url)
    .then(response => response.json())
    .then(responseJson => results(responseJson))
    .catch(error => alert("No such user. Please try again"));
}

function results(responseJson)  {
        console.log(responseJson);
        $("#results-list").empty();
        let responseHtml = "";
        responseJson.forEach(user => {
          responseHtml += 
          `<li>${user.name}</li>
           <li><a href=" ${user.html_url}">Repo URL Link</a></li>`;
        });
        $("#results-list").append(responseHtml);
        $("#results").removeClass("hidden");
}


function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      getResults(searchTerm);
    });
    console.log("yo I'm ready")
  }

  watchForm();
