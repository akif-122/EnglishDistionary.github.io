
let form = document.getElementById("form");
let input = document.getElementById("input");
let title = document.getElementById("title");
let meaning = document.getElementById("meaning");
let btn = document.getElementById("btn");
let err = document.querySelector(".err");

input.addEventListener("keydown", () => {
    err.innerText = "";
})


async function getData() {
    try {
        let value = input.value.trim();
        if (value == "") {
            err.innerText = "Value should not empty!";
        } else if (value.includes(" ")) {
            err.innerText = "Value should be a Single Word!";

        } else {

            btn.innerHTML = `<img src="spinner.gif" />`;
            btn.style.pointerEvents = "none";
            btn.style.cursor = "not-allowed";
            let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`);
            data = await data.json();
            console.log(data);
            title.innerHTML = `Word Title : " ${data[0].word} "`;
            meaning.innerText = `Word Meaning :  ${data[0].meanings[0].definitions[0].definition} `;

            btn.innerHTML = "Search";
            btn.style.pointerEvents = "all";
            btn.style.cursor = "pointer";
            input.value = "";

        }

    } catch (error) {
        console.log(error)
       err.innerText = "Something Goes Wrong!";
        btn.innerHTML = "Search";
        btn.style.pointerEvents = "all";
        btn.style.cursor = "pointer";
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault()
    getData();
});