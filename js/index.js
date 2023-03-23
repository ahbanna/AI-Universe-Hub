const loadNews = () => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNews(data.data))
    .catch((error) => console.log(error));
};

const showNews = (allNews) => {
  const allNewsContainer = document.getElementById("all-news-container");

  for (const singleNews of allNews.tools.slice(0, 6)) {
    const singleNewsDiv = document.createElement("div");
    singleNewsDiv.classList.add("col");
    // feature list
    const featuresList = singleNews.features
      .map((feature, index) => `${index + 1}. ${feature}`)
      .join("<br>");

    singleNewsDiv.innerHTML = `
          <div class="card">
            <img src="${singleNews.image}" class="card-img-top" alt="..." style="min-height: 250px;" width="400px">
            <div class="card-body">
              <h6>Features</h6>
              <p class="card-text">${featuresList}</p>
              <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">${singleNews.name}</h5>
                  <p><i class="fa-regular fa-calendar"></i> ${singleNews.published_in}
                  <p>
                </div>
                <div><button onclick="singleNewsDetails('${singleNews.id}')" type="button" class="btn modal-link-btn" data-bs-toggle="modal" data-bs-target="#single-news-modal"><i class="fa-solid fa-arrow-right-long"></i></button></div>
              </div>
            </div>

          </div>
    `;
    allNewsContainer.appendChild(singleNewsDiv);
  }
  // ‍Stop spinner
  loadSpinner(false);
  //
};

// Single news
const singleNewsDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showSingleNewsDetails(data));
};

const showSingleNewsDetails = (items) => {
  const singleNewsModalBody = document.getElementById("single-news-modal-body");
  singleNewsModalBody.innerHTML = `
<div class="row">
  <div class="col">
    <div class="row px-4">
      <div class="col-12 col-sm-6 modal-left-part">
        <h1 class="modal-title fs-5" id="single-news-modalLabel">${
          items.data.description
        }</h1>
     <div class="pricing d-flex align-items-center gap-2">
  <div class="basic"><p>${
    items.data.pricing && items.data.pricing[0]
      ? items.data.pricing[0].price
      : "Free of cost /"
  } </p>
  <p> ${
    items.data.pricing && items.data.pricing[0]
      ? items.data.pricing[0].plan
      : "Basic"
  }</p>
  </div>
  <div class="pro"> <p>${
    items.data.pricing && items.data.pricing[1]
      ? items.data.pricing[1].price
      : "Free of cost /"
  } </p>
  <p> ${
    items.data.pricing && items.data.pricing[1]
      ? items.data.pricing[1].plan
      : "Pro"
  }</p></div>
  <div class="contact"> <p>${
    items.data.pricing && items.data.pricing[2]
      ? items.data.pricing[2].price
      : "Free of cost /"
  } </p>
  <p> ${
    items.data.pricing && items.data.pricing[2]
      ? items.data.pricing[2].plan
      : "Enterprise"
  }</p></div>
</div>
        <div class="features-integration d-flex">
          <div class="features-part"><h4>Features</h4><ul>${Object.keys(
            items.data.features
          )
            .map((key) => `<li>${items.data.features[key].feature_name}</li>`)
            .join("")}</ul>
          </div>
          <div class="integration-part"><h4>Integration</h4>

<ul> ${
    items.data.integrations &&
    Array.isArray(items.data.integrations) &&
    items.data.integrations.length
      ? items.data.integrations
          .map((integration) => `<li>${integration}</li>`)
          .join("")
      : "No data found"
  } </ul>

          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 modal-right-part">
        <div>
          <img src="${
            items.data.image_link[0]
          }" alt="" style="min-height: 300px;" width="450px" class='rounded img-fluid'> </div>
        <div class="accuracy-level">
          <p class="accuracy">${
            items.data.accuracy.score !== null
              ? `<span class="yes-accuracy">${
                  items.data.accuracy.score * 100
                }% accuracy </span>`
              : `<span class="no-accuracy"></span>`
          }</p>
        </div>
        <div class="examples text-center">
          <h4>${
            items.data.input_output_examples === null
              ? "Can you give any example?"
              : items.data.input_output_examples[0].input
          }</h4>
          <p> ${
            items.data.input_output_examples === null
              ? "No! Not Yet! Take a break!!!"
              : items.data.input_output_examples[0].output
          }
        </div>
      </div>

    </div>
  </div>
</div>

  `;
};

// Spinner function
const loadSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};
//

// see all news
document.getElementById("see-more-btn").addEventListener("click", function () {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNews2(data.data));
  const seeMoreBtn = document.getElementById("see-more-btn");
  seeMoreBtn.classList.add("d-none");

  //spinner
  loadSpinner(true);
});

const showNews2 = (allNews2) => {
  const allNewsContainer = document.getElementById("all-news-container");

  for (const singleNews of allNews2.tools.slice(6, 12)) {
    const singleNewsDiv = document.createElement("div");
    singleNewsDiv.classList.add("col");
    // feature list
    const featuresList = singleNews.features
      .map((feature, index) => `${index + 1}. ${feature}`)
      .join("<br>");

    singleNewsDiv.innerHTML = `
          <div class="card">
            <img src="${singleNews.image}" class="card-img-top" alt="..." style="min-height: 250px;" width="400px">
            <div class="card-body">
              <h6>Features</h6>
              <p class="card-text">${featuresList}</p>
              <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title">${singleNews.name}</h5>
                  <p><i class="fa-regular fa-calendar"></i> ${singleNews.published_in}
                  <p>
                </div>
                <div><button onclick="singleNewsDetails('${singleNews.id}')" type="button" class="btn modal-link-btn" data-bs-toggle="modal" data-bs-target="#single-news-modal"><i class="fa-solid fa-arrow-right-long"></i></button></div>
              </div>
            </div>

          </div>
    `;
    allNewsContainer.appendChild(singleNewsDiv);
  }
  // ‍Stop spinner
  loadSpinner(false);
  //
};

// function call
loadNews();
