
/* Loading... Display Handle */
const toggleLoading = displayStyle => {
    document.getElementById('loading').style.display = displayStyle;

    /*  Show More Button Handle  */
}
const toggleShowMore = displayStyle => {
    document.getElementById('show-more-btn').style.display = displayStyle;
}

/* Loading All Mobile Data From API */
const loadAllMobile = () => {
    const searchArea = document.getElementById('search-area');
    const searchInText = searchArea.value;
    searchInText.toLowerCase();

    if (searchInText.length == 0) {
        toggleLoading('none')
        document.getElementById('error').innerHTML = "Please enter something to continue search!!!";

    }
    else {
        toggleLoading('block')
        document.getElementById('error').style.display = "none";
        searchArea.value = '';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchInText}`
        fetch(url)
            .then(res => res.json())
            .then(result => showAllMobiles(result.data, result.status))

    }

}


/* Display ALL Mobile in card layout */
const showAllMobiles = (mobiles, status) => {
    if (status == false) {
        document.getElementById('error').style.display = "block";
        document.getElementById('error').innerHTML = "API data not found";
    }
    else {

        // console.log(mobiles)

        const mobileDiv = document.getElementById('mobile-container');

        mobileDiv.textContent = '';

        mobiles?.forEach(mobile => {
            // console.log(mobile)
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
        <div class="card h-100 mx-3 mt-5">
                <img src="${mobile.image}" class="card-img-top w-50 mx-auto mt-2" alt="...">
                <div class="card-body mx-auto">
                    <h5 class="card-title">${mobile.brand}</h5>
                    <p class="card-text">${mobile.phone_name}</p>
                    <a href="#"> <button  onclick="loadMobileDetails('${mobile.slug}')"  class="btn btn-primary">Details</button></a>
                </div>
            </div>
        `
            mobileDiv.appendChild(div)

        })
        toggleLoading('none')
        toggleShowMore('block')
        mobileDetailDiv.textContent = '';
    }

}

/* Load All Mobile Data By Using ID From API*/
const loadMobileDetails = mobileId => {
    const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`

    // console.log(url)
    // console.log(mobileid)

    fetch(url)
        .then(res => res.json())
        .then(info => mobiledetails(info.data))
}

/* Display Sngle Mobile Details */
const mobileDetailDiv = document.getElementById('mobile-details');
const mobiledetails = mobile => {
    mobileDetailDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
    <img src="${mobile.image}" class="card-img-top w-25 mt-3 mx-auto " alt="...">
    <div class="card-body">
        <h3><strong>Brand:  </strong>${mobile.brand}</h3>
        <h5><strong> ${mobile.name}  </strong> </h5>
        <p><strong>Realease Date: </strong> ${mobile.releaseDate ? mobile.releaseDate : 'Not Found'}  </p>
        <p><strong>Main Features: </strong></p>
        <p><strong>Storage: </strong>${mobile.mainFeatures.storage ? mobile.mainFeatures.storage : 'Not Found'}</p>
        <p><strong>Display Size: </strong> ${mobile.mainFeatures.displaySize ? mobile.mainFeatures.displaySize : 'Not Found'}  </p>
        <p><strong>Chipset: </strong> ${mobile.mainFeatures.chipSet ? mobile.mainFeatures.chipSet : 'Not Found'}  </p>
        <p><strong>Memory: </strong> ${mobile.mainFeatures.memory ? mobile.mainFeatures.memory : 'Not Found'}  </p>
        <p> <strong>Sensors</strong>: 
        ${mobile.mainFeatures.sensors[0] ? mobile.mainFeatures.sensors[0] : 'Not Found'}, 
        ${mobile.mainFeatures.sensors[1] ? mobile.mainFeatures.sensors[1] : 'Not Found'},
        ${mobile.mainFeatures.sensors[2] ? mobile.mainFeatures.sensors[2] : 'Not Found'},
        ${mobile.mainFeatures.sensors[3] ? mobile.mainFeatures.sensors[3] : 'Not Found'},
        ${mobile.mainFeatures.sensors[4] ? mobile.mainFeatures.sensors[4] : 'Not Found'},
        ${mobile.mainFeatures.sensors[5] ? mobile.mainFeatures.sensors[5] : 'Not Found'} </p> 
        <p><strong>Others: </strong></p>
        <p><strong>WLAN: </strong> ${mobile?.others?.WLAN ?? 'Not Found'}  </p>
        <p><strong>Bluetooth: </strong> ${mobile?.others?.Bluetooth ?? 'Not Found'}  </p>
        <p><strong>GPS: </strong> ${mobile?.others?.GPS ?? 'Not Found'}  </p>
        <p><strong>NFC: </strong> ${mobile?.others?.NFC ?? 'Not Found'}  </p>
        <p><strong>Radio: </strong> ${mobile?.others?.Radio ?? 'Not Found'}  </p>
        <p><strong>USB: </strong> ${mobile?.others?.USB ?? 'Not Found'}  </p>
   
    </div>
   
`
    mobileDetailDiv.appendChild(div);

}








