function findNodesBySelector(selector) {
    let nodesList = [];
    if (selector) {
        nodesList = document.querySelectorAll(selector);
    }
    return nodesList;
}

function convertToNumber(textNumber) {
    return Number(textNumber.replace("B", "e9").replace("M", "e6"));
}

function sumNumbersFromNodes(nodesArr) {
    return nodesArr.reduce((sum, nodeItem) => sum + convertToNumber(nodeItem.textContent), 0);
}

function convertToMillion(number) {
    return `${number / Number("1e6")}M`;
}

function addNodeTextContent(selector, newText) {
    const nodeForUpdate = document.querySelector(selector);
    if (nodeForUpdate) {
        nodeForUpdate.textContent = `${nodeForUpdate.textContent} ${newText}`;
    }
}
