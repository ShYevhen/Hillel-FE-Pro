window.onload = () => {
    const nodesList = findNodesBySelector("[data-id='revenue-value'");
    const sumRevenue = sumNumbersFromNodes(Array.from(nodesList));
    addNodeTextContent("#summ", convertToMillion(sumRevenue));
};
