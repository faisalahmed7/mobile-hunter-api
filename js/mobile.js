

const loadAllMobile = () => {
    const searchArea = document.getElementById('search-area');
    const searchInText = searchArea.value;
    searchInText.toLowerCase();

    if (searchInText.length == 0) {
        toggleSpinner('none')
        document.getElementById('error').innerHTML = "Please enter something to continue search!!!";

    } else {
        toggleSpinner('block')

        document.getElementById('error').style.display = "none";
        searchArea.value = '';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchInText}`
        fetch(url)
            .then(response => response.json())
            .then(result => showAllMobiles(result.data, result.status))

    }

}
