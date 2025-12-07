//get the search icon
const inputElement = document.querySelector('.inputSearch');
const iconSearch = document.querySelector('#searchIcon');

//function to trigger the search once there is input
function triggerSearch() {
    const term = inputElement.value.trim();
    if (term !== "") {
        window.location.href = `/champions/search?name=${encodeURIComponent(term)}`;
    }
}

//enter a key search
inputElement.addEventListener('keydown', e =>{
    if (e.key === 'Enter') {
        triggerSearch();
    }
});

//click the icon to trigger search
iconSearch.addEventListener('click', triggerSearch());
