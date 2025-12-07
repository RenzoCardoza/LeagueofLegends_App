//get the search icon
const inputElement = document.querySelector('.inputSearch');

function redirectToResult (input, icon) {
    input.addEventListener
}

inputElement.addEventListener('keypress', e =>{
    if (e.key === 'Enter') {
        const term = searchInput.value.trim();
        window.location.href = `/champions/search?name=${encodeURIComponent(term)}`;
        document.querySelector('.icon')
    }
});
