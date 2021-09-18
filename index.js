// DOM
//-----------------------------------------------------------------------
const main = document.querySelector(".main");
const passerAuContenu = document.querySelector(".passer-au-contenu");

// Variables globales
//-----------------------------------------------------------------------
let photographes = [];
let tagHTML = "";
let currentArrayOfPhotographe = [];

// Apparition du bouton "Passer au contenu"
const renderPasserAuContenu = () => {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (scrolled >= 50) {
      passerAuContenu.style.display = "block";
    } else {
      passerAuContenu.style.display = "none";
    }
  });
};
renderPasserAuContenu();

// Récupération des données du fetch
//------------------------------------------------------------
const fetchAllData = () => {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      photographes = data.photographers;

      affichagePhotographes(photographes);

      filterTag();
    });
};
fetchAllData();

// Affichage cartes des photographes
const affichagePhotographes = (arrayOfPhotographe) => {
  arrayOfPhotographe.forEach((photographe) => {
    tagHTML = "";
    photographe.tags.forEach((tag) => {
      tagHTML += `
        <button onclick="newFilterTag('${tag}')" class="lien-des-tags" tag="${tag}">#${tag}</button>
        `;
    });
    
    main.innerHTML += `
        <article class="card">
        <a href="./page-photographe.html?id=${photographe.id}&name=${photographe.name}" class="card__image">
          <img src="./Sample Photos/Photographers ID Photos/${photographe.portrait}" alt="" />
          <h2>${photographe.name}</h2>
        </a>
        <div class="card__infos">
          <h3 class="card__infos__titre">${photographe.city}, ${photographe.country}</h3>
          <p class="card__infos__slogan">
            ${photographe.tagline}
          </p>
          <p class="card__infos__prix">${photographe.price}€/jour</p>
        </div>
        <div class="card__liens">
          ${tagHTML}
        </div>
        </article>
        `;
  });
};

// Filtre principal
const filterTag = () => {
  const navigationTags = document.querySelectorAll(".lien-des-tags");
  navigationTags.forEach((btnTag) => {
    btnTag.addEventListener("click", (e) => {
      let currentTag = e.currentTarget.getAttribute("tag");
      const newArrayOfPhotographe = photographes.filter((p) =>
        p.tags.includes(currentTag)
      );
      currentArrayOfPhotographe = [...newArrayOfPhotographe];
      main.innerHTML = "";
      affichagePhotographes(newArrayOfPhotographe);
    });
  });
};

// Filtre secondaire
function newFilterTag(tag) {
  const newArrayOfPhotographe = currentArrayOfPhotographe.filter((p) =>
    p.tags.includes(tag)
  );
  currentArrayOfPhotographe = [...newArrayOfPhotographe];
  main.innerHTML = "";
  affichagePhotographes(newArrayOfPhotographe);
}