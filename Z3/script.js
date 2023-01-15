function fetchCatFact() {

    const lang = document.getElementsByName("lang")[0].value;

    axios.get("https://meowfacts.herokuapp.com/?lang=" + lang).then(response => {
        const factDiv = document.getElementById("fact");
        factDiv.innerText = response.data.data;
    });
}

