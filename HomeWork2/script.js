let questionsList = [
    { question: 'Сколько будет 2 + \'2\' в JavaScript?', answer: '22' },
    { question: 'Назовите оператор присваивания в JavaScript', answer: '=' },
    { question: 'Сколько будет 5 / 0?', answer: 'Infinity' },
    { question: 'Одинаково ли работает == и === в JavaScript?', answer: 'no' },
    { question: 'Чему равно выражение Boolean(null) в JavaScript?', answer: 'false' },
];
let pointCounter = 0;
let pointsToPass = questionsList.length * 5; // questionsList.length * 10 * 0.5

questionsList.forEach(questionItem => {
    let userAnswer = prompt(questionItem.question);
    if (userAnswer && userAnswer === questionItem.answer) {
        pointCounter += 10;
        questionItem.rightAnswer = true;
    } else {
        questionItem.rightAnswer = false;
    }
});

let userResult = `Ваш результат: ${pointCounter} баллов
Тест ${pointCounter >= pointsToPass ? 'сдал' : 'не сдал'}
Показать подробный отчет?`;

if (confirm(userResult)) {
    let fullReport = '';
    questionsList.forEach(questionItem => {
        fullReport += `Вопрос: ${questionItem.question}\r\nОтвет: ${questionItem.rightAnswer ? 'Верный' : 'Неверный' }\r\n\r\n`;
    });
    alert(fullReport);
}