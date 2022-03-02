

const loadAllMobile = () => {
    const searchArea = document.getElementById('search-area');
    const searchInText = searchArea.value;


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

const showAllMobiles = (mobiles, status) => {
    if (status == false) {

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
                    <a href="#"> <button  onclick="loadMobileDetails('${mobile.slug}')"  class="btn btn-primary ">Details</button></a>
                </div>
            </div>
        `
            mobileDiv.appendChild(div)

        })

        mobileDetailDiv.textContent = '';
    }

}

/* Load All Mobile Details By ID */

const loadMobileDetails = mobileId => {
    const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`

    // console.log(url)
    // console.log(mobileid)

    fetch(url)
        .then(res => res.json())
        .then(result => mobiledetails(result.data))
}


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
      
   
    </div>
   
`
    mobileDetailDiv.appendChild(div);

}
