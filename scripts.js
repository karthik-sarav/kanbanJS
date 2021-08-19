//Congiguration data
let dataBucket = [
  {
    status: "Open",
  },
  {
    status: "Progress",
  },
  {
    status: "Testing",
  },
  {
    status: "Completed",
  },
];

let proiorityValues = {
  High: 5,
  Medium: 3,
  Low: 1,
};

let dataCards = [
  {
    id: 1,
    title: "Fix data picker",
    description: "Fix the input date handler",
    status: "Open",
    developer: "Andy",
    priority: "5",
  },
  {
    id: 2,
    title: "Change data",
    description: "Change the data",
    status: "Open",
    developer: "Candy",
    priority: "3",
  },
  {
    id: 3,
    title: "New Requirement",
    description: "Change the data",
    status: "Open",
    developer: "Candy",
    priority: "1",
  },
  {
    id: 4,
    title: "UAT testing",
    description: "Change the data",
    status: "Open",
    developer: "Candy",
    priority: "5",
  },
];

//Starts here
$(document).ready(() => {
  initializeBoards();
  initializeCards(dataCards);
  initializeCardListeners();

  $("#add-btn").click(() => {
    const title = $("#titleInput").val() != "" ? $("#titleInput").val() : null;
    const description =
      $("#descriptionInput").val() != "" ? $("#descriptionInput").val() : null;
    if (title && description) {
      let newCard = {
        id: cards.length + 1,
        title: title,
        description: description,
        status: "Open",
        priority: "3",
      };
      $("#titleInput").val("");
      $("#descriptionInput").val("");
      dataCards.push(newCard);
      $(`#${newCard.status}`).append(getCardUI(newCard));
      initializeCardListeners();
    }
  });
  $("#delete-btn").click(() => {
    deleteAll();
  });
});

function sortOpen(params) {
  let selectedSort = params.textContent.toLowerCase();
  let openCards = dataCards.filter((s) => s.status === "Open");
  openCards.forEach((c) => {
    $(`#${c.id}`).remove();
  });
  let sortedData;
  switch (params.textContent) {
    case "Id":
      sortedData = openCards.sort((a, b) => a[selectedSort] - b[selectedSort]);
      break;
    case "Priority":
      sortedData = openCards.sort((a, b) => b[selectedSort] - a[selectedSort]);
      break;
    case "Title":
      sortedData = openCards.sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
      break;
    default:
      return;
  }
  sortedData.forEach((sc) => {
    $("#Open").append(
      getCardUI(sc, {
        [selectedSort]: true,
      })
    );
  });
}

function filterOpen(params) {
  let openCards = dataCards.filter((s) => s.status === "Open");
  openCards.forEach((c) => {
    $(`#${c.id}`).remove();
  });

  let filteredCards = openCards.filter(
    (c) => c.priority == proiorityValues[params.textContent]
  );
  filteredCards.forEach((sc) => {
    $("#Open").append(getCardUI(sc, { priority: true }));
  });
}

//Function to initialze boards from configs.
function initializeBoards() {
  let dropzones = document.querySelectorAll(".boardContainer");

  dropzones.forEach((dropzone) => {
    //Drag Over
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    //Drop
    dropzone.addEventListener("drop", (e) => {
      try {
        if (e.target.id) {
          let draggedcardId = e.dataTransfer.getData("cardId");
          let newDataCards = [...dataCards];
          deleteAll();
          let index = newDataCards.findIndex((e) => e.id == draggedcardId);
          newDataCards[index].status = e.target.id;
          initializeCards(newDataCards);
        }
      } catch (err) {
        console.log("err in droping the card->", e);
      }
    });
  });
}

function deleteAll() {
  dataCards.forEach((c) => {
    $(`#${c.id}`).remove();
  });
}

//Function to initialize cards.
function initializeCards(dataCards) {
  dataCards.forEach((card) => {
    $(`#${card.status}`).append(getCardUI(card));
  });
  initializeCardListeners();
}

function initializeCardListeners() {
  cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("cardId", card.id);
    });
  });
}

function getCardUI(card, isHighlighted) {
  let cardUI = `
      <div 
        class="card card-container ${card.status}" 
        id=${card.id.toString()} 
        draggable="true"
        >
          <div class="card-title"> 
          <p class=${isHighlighted?.id && "isHighlighted"} >${card.id}.</p>
          <p class=${isHighlighted?.title && "isHighlighted"} >${card.title}</p>
          </div>
          <div class="card-description">${card.description}</div>
          <div class="card-status"> 
          <p class=${isHighlighted?.priority && "isHighlighted"}>  Priority - ${
    card.priority
  }</p>
          <p>  Status - ${card.status}</p>

    </div>
    `;
  return cardUI;
}
