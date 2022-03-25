function renderTutorials(tutorialDictionary) {
  for (const key in tutorialDictionary) {
    const tutorial = tutorialDictionary[key];
    console.log(tutorial);
    console.log(key);
    var tutorialDiv = $(
      '<div id="tutorial_' + key + '" class="solution col-12 col-md-6"></div>'
    );
    var tutorialHeadlineDiv = $(
      '<h2 id="tutorial_' + key + '_headline" class="solutionheadline"></h2>'
    );

    tutorialHeadlineDiv.text(tutorial.title);

    var tutorialHeadSubtitle = $(
      '<h3 id="tutorial_' +
        key +
        ' class="solution col-12 col-md-6">prueba</h3>'
    );
    tutorialHeadSubtitle.text(tutorial.subtitle);

    tutorialDiv.append(tutorialHeadlineDiv);
    tutorialDiv.append(tutorialHeadSubtitle);

    var solutionBodyDiv = $(
      '<div id="solution_body_' + key + '" class="solutionbody"></div>'
    );
    var solutionSnippetDiv = $(
      '<div id="tutorial_' + key + '_snippet" class="solutionsnippet"></div>'
    );

    if (tutorial.links.length > 0) {
      var tutorialsLinksList = $(
        '<ul class="list-group list-group-flush"></ul>'
      );
      for (let tutorialLinks = 0;tutorialLinks < tutorial.links.length;tutorialLinks++) {
        let name = tutorial.links[tutorialLinks].name;
        let link = tutorial.links[tutorialLinks].url;
        let tutorialSite = $('<li class="list-group-item"></li>');
        let tutorialSiteLink = $('<a href="' + link + '"/>');

        tutorialSiteLink.text(name);
        tutorialSite.append(tutorialSiteLink);
        tutorialsLinksList.append(tutorialSite);
      }
    }
    solutionSnippetDiv.text(tutorial.description);
    solutionBodyDiv.append(solutionSnippetDiv);
    solutionBodyDiv.append(tutorialsLinksList);
    tutorialDiv.append(solutionBodyDiv);
    $("#solutioncontent").append(tutorialDiv);
  }
}

window.onpopstate = () => {
  search();
};

async function main() {
  let tutorialsJson = await $.ajax({
    url: "tutorials.json?r=" + Math.random() * 10000,
  });
  console.log(tutorialsJson);

  $("head").append(
    '<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" rel="stylesheet">'
  );
  var flexDiv = $('<div id="solutioncontent" class="row"></div>');
  $("#content").append(flexDiv);

  renderTutorials(tutorialsJson);
}

main();
