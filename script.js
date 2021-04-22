document.querySelector("#user_input").addEventListener("submit", createButton);

function createButton(event) {
  event.preventDefault();

  if (event.target.nextSibling.nextSibling.firstChild !== null) {
    event.target.nextSibling.nextSibling.firstChild.remove();
  }
  //get input from user
  const searchTerm = event.target.children[0].value;
  // create a button inside btns_container and named it with user input
  let singleButton = document.createElement("button");
  singleButton.setAttribute("class", "btn btn-primary");
  singleButton.style.margin = "20px";
  singleButton.innerText = searchTerm;
  document.querySelector("#btns_container").appendChild(singleButton);
  //reset search input
  event.target.children[0].value = "";

  singleButton.addEventListener("click", generateJobs);
}

async function generateJobs(event) {
  const searchTerm = event.target.innerHTML;
  const jobs = await getData(searchTerm);

  let jobsDiv = document.getElementById("cards_container").innerHTML;

  document.getElementById("cards_container").setAttribute("class", "row");

  if (jobs.length === 0) {
    alert("No jobs found, please search using different keywords");
  }
  jobsDiv = "";

  const fallBackUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkqj9VNzNNTMnUa5YXlPjYDD8YujOfh6fQag&usqp=CAU";

  for (const job of jobs) {
    let card = `<div class="card" style = "display: flex; align-items: center;width:15rem; height: fit-content; padding: 20px;margin:10px" >
    <img class="card-img-top" style = "width:150px;height:150px" src=${
      job.company_logo === null ? fallBackUrl : job.company_logo
    } alt="Card image cap">
    <div class="card-body"style = "display: flex; flex-direction:column; align-items: center;">
      <h6 class="card-title" style ="text-align: center">${job.title}</h6>
      <button class = "btn btn-warning" ><a href="${job.url}">APPLY</a>
      </button>
    </div>
    </div>`;
    jobsDiv += card;
  }

  document.getElementById("cards_container").innerHTML = jobsDiv;
}

async function getData(searchTerm) {
  const API = `https://cors.bridged.cc/https://jobs.github.com/positions.json?description=${searchTerm}`;

  const ownAPI = `https://my-jobs-proxy.herokuapp.com/jobs?tech=${searchTerm}`;

  try {
    const res = await fetch(ownAPI);
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
