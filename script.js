const wordInput = document.getElementById("wordInput");
const searchButton = document.getElementById("searchButton");
const result = document.getElementById("result");

searchButton.addEventListener("click", async function() {
    const word = wordInput.value;

    result.textContent = "Searching...";

    const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    const data = await response.json();

    const wordData = data[0];

    let definitionsHTML = "";
    let synonyms = [];

    wordData.meanings.forEach(function(meaning) {

        definitionsHTML += `<h3>${meaning.partOfSpeech}</h3>`;

        meaning.definitions.forEach(function(definition) {

            definitionsHTML += `
                <p>${definition.definition}</p>
            `;

            if (definition.synonyms) {
                synonyms.push(...definition.synonyms);
            }

        });

    });

    synonyms = [...new Set(synonyms)];

    let synonymsHTML = "";

    if (synonyms.length > 0) {
        synonymsHTML = `
            <h3>Synonyms</h3>
            <p>${synonyms.join(", ")}</p>
        `;
    }

    result.innerHTML = `
        <h2>${wordData.word}</h2>

        <p>
            Pronunciation: ${wordData.phonetic || "Not available"}
        </p>

        <h3>Definitions</h3>

        ${definitionsHTML}

        ${synonymsHTML}
    `;
});

