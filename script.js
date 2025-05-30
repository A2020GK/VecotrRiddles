const text = document.getElementById("question");
const ans = document.getElementById("answer");
const status = document.getElementById("answer-status");
const what = document.getElementById("what")

const questions = {
    "Я — набор команд для компьютера, <br> Что он должен делать, диктую без шума. <br> Следуя мне, он решает задачи, <br> И никогда не устаёт, хоть плачь. <br> Что я?": "код",
    "Я всегда прихожу в конце. <br> Меня все ждут, но никто не любит. <br> Что я?": "дедлайн",
    "Там есть города, но нет домов. Есть горы, <br> но нет деревьев. Есть вода, но в ней нет рыбы. <br> Что это?": "карта",
    "Что теряет голову утром, но получает обратно ночью?": "подушка",
    "Что есть у каждого, но никто не может это потерять?": "тень",
    "Я под мышкой посижу и что делать укажу: <br> или разрешу гулять, или уложу в кровать.": "термометр",
    "Мал золотник да дорог; своя ноша не тянет, <br> тяжело понесешь - домой не донесешь.": "масса",
    "Она, в жизни, помогает, <br> Интеллект наш развивает. <br> У каждого, методика своя, <br> В ней дублей нет, она твоя.": "логика",
    "Пеший конному не товарищ; поспешишь - людей насмешишь; <br> тише едешь - дальше будешь. О какой физической величине идет речь?": "скорость",
    "Нужная величина, <br> В электричестве глава. <br> Чтоб приборы были целы, <br> Чтобы не было проблем, <br> Каждый знает как она <br> С силой тока связана!": "вольт",
    "Все поведает, хоть без языка, <br> Когда будет ясно, а когда – облака.": "барометр",
    "Какой металл пишет, как карандаш?": "свинец",
    "Им силу тока изменяют, <br> Если что – то в нем сдвигают.": "реостат",
    "Нельзя здесь отшутиться — Радиоактивности единица.": "кюри",
    "Сила упругости как вычисляется, <br>А полученное выражение — <br>Законом называется.<br>Чьей же фамилией он величается?": "гук",
    "Как называется упорядоченное движение заряженных частиц?": "электрический ток",
    "Какое действие тока используется в электросварке?": "тепловое",
    "Вес корабля легко узнать, <br>Какую же силу нужно при этом рассчитать?": "силу архимеда",
    "Сверкает, мигает, огневые стрелы пускает.": "молния",
};



const powers = {}
for (let i = 0; i < 14; i++) powers[`2<sup>${i}</sup>`] = 2 ** i;

const items = Object.keys(questions);
const select_quest = () => items[Math.floor(Math.random() * items.length)]

const item = Object.keys(powers);
const select_powers = () => item[Math.floor(Math.random() * item.length)]

let currentQuestion = select_quest();
let currentPower;
text.innerHTML = currentQuestion;

function dedault_question() {
    what.textContent = "Загадки"
    const items = Object.keys(questions);
    const select_quest = () => items[Math.floor(Math.random() * items.length)];

    let currentQuestion = select_quest();
    text.innerHTML = currentQuestion;
}

function power_question() {
    what.textContent = "Степени 2-ки"
    const item = Object.keys(powers);
    const select_powers = () => item[Math.floor(Math.random() * item.length)];

    currentPower = select_powers();
    text.innerHTML = currentPower;
}


function check_answer(event) {
    event.preventDefault();
    const newMode = getMode()
    if (newMode == "default") {
        const answer = ans.value;
        if (answer.trim().toLocaleLowerCase() == questions[currentQuestion]) {
            status.classList.add("expand", "right");
            currentQuestion = select_quest();
            text.innerHTML = currentQuestion;
        } else{
            status.classList.add("expand", "wrong");
        }

        ans.value = "";
        ans.value = "";

        setTimeout(() => {
            status.classList.add("hidden");
            setTimeout(() => {
                status.classList.remove("wrong", "right", "expand", "hidden");
            }, 1000);
        }, 1000)
    } else if (newMode == "powers"){
        const answer = ans.value;
        if (answer.trim().toLocaleLowerCase() == powers[currentPower]) {
            status.classList.add("expand", "right");
            currentPower = select_powers();
            text.innerHTML = currentPower;
        } else {
            status.classList.add("expand", "wrong");
        }

        ans.value = "";

        setTimeout(() => {
            status.classList.add("hidden");
            setTimeout(() => {
                status.classList.remove("wrong", "right", "expand", "hidden");
            }, 1000);
        }, 1000)
    }
}

document.querySelector("form").addEventListener("submit", check_answer);

const modes = Array.from(document.getElementsByName("mode"));
console.log(modes);
const getMode = () => {
    for (const radio in modes) {
        if (modes[radio].checked) {
            return modes[radio].value;
        }
    }
}

// Можете своровать это в будущие проекты:
const addEventListenerMulti = (arr, event, callback) => arr.forEach(e => e.addEventListener(event, callback));

function modeChange() {
    const newMode = getMode();
    if (newMode == "default") {
        dedault_question()
    } else {
        power_question()
    }

}

addEventListenerMulti(modes, "change", modeChange);
