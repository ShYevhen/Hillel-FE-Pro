const TILES = [];
function initGame() {
    const tilesContainer = document.getElementById("tiles");
    tilesContainer.innerHTML = "";
    tilesContainer.addEventListener("click", onTileClick);
    TILES.length = 0; // clear all tiles in the array
    let tileIndex = 0;
    const randomIndex = getRandomIndex();
    for (let i = 0; i < 4; i++) {
        TILES[i] = [];
        for (let j = 0; j < 4; j++) {
            tileIndex = randomIndex();
            TILES[i].push(createTileEl(tileIndex));
        }
    }

    initCounterEl(tilesContainer);
    renderTiles();
}

function getRandomIndex() {
    let availableIdx = [];
    let invalidCombination = true;
    while (invalidCombination) {
        let tmpIdx = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        availableIdx = [];
        while (tmpIdx.length > 0) {
            const randomIndex = Math.floor(Math.random() * tmpIdx.length);
            availableIdx.push(tmpIdx[randomIndex]);
            tmpIdx.splice(randomIndex, 1);
        }
        invalidCombination = isInvalidCombination(availableIdx);
    }
    availableIdx.reverse();
    return function () {
        return availableIdx.pop();
    };
}

function isInvalidCombination(combinationArr) {
    let sum = combinationArr.reduce((accumulator, currentValue, index, combArr) => {
        if (index < combArr.length - 1) {
            for (let i = index + 1; i < combArr.length; i++) {
                if (currentValue > combArr[i]) {
                    accumulator++;
                }
            }
        }
        return accumulator;
    }, 0);
    return sum % 2 === 1 ? true : false;
}

function createTileEl(text) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    if (text > 0 && text < 5) {
        tile.classList.add("green");
    } else if (text > 4 && text < 9) {
        tile.classList.add("red");
    } else if (text > 8 && text < 13) {
        tile.classList.add("yellow");
    } else if (text && text < 16) {
        tile.classList.add("blue");
    }
    tile.textContent = text;
    return tile;
}

function renderTiles() {
    const tilesContainer = document.getElementById("tiles");
    tilesContainer.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            tilesContainer.append(TILES[i][j]);
        }
    }

    if (isDone()) {
        tilesContainer.append(createWinDiv());
    }
}

function isDone() {
    const titlesArr = TILES.flat();
    if (+titlesArr[titlesArr.length - 1].textContent !== 0) {
        return false;
    }
    let isDone = true;
    for (let i = 0; i < titlesArr.length - 1; i++) {
        let val = titlesArr[i].textContent;
        if (+val !== i + 1) {
            isDone = false;
            break;
        }
    }
    return isDone;
}

function onTileClick(e) {
    if (e.target.classList.contains("tile")) {
        const id = +e.target.textContent;
        if (id) {
            swapTiles(id);
        }
    }
    renderTiles();
}

function swapTiles(id) {
    const [tileX, tileY] = findTileCoordById(id);
    const [emptyX, emptyY] = findEmptyTileCoords();

    // are they neibors
    if ((tileX === emptyX && Math.abs(tileY - emptyY) === 1) || (tileY === emptyY && Math.abs(tileX - emptyX) === 1)) {
        [TILES[tileX][tileY], TILES[emptyX][emptyY]] = [TILES[emptyX][emptyY], TILES[tileX][tileY]];
        countSteps();
    }
}

function findEmptyTileCoords() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (TILES[i][j].textContent === "") {
                return [i, j];
            }
        }
    }
}

function findTileCoordById(id) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (TILES[i][j].textContent == id) {
                return [i, j];
            }
        }
    }
}

function initCounterEl(tilesContainer) {
    const counter = document.querySelector(".steps-counter");
    if (counter) {
        counter.textContent = 0;
    } else {
        const divEl = document.createElement("div");
        divEl.innerHTML = 'Steps: <span class="steps-counter">0</span>';
        tilesContainer.before(divEl);
    }
}

function countSteps() {
    const counter = document.querySelector(".steps-counter");
    counter.textContent = ++counter.textContent;
}

function createWinDiv() {
    const winDiv = document.createElement("div");
    winDiv.innerHTML = "<span>You are win!</span>";
    winDiv.classList.add("winner");
    winDiv.onclick = (event) => {
        event.stopPropagation();
    };
    return winDiv;
}
