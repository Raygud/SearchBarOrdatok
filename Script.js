const SayingsSearched = document.getElementById('SayingsSearched');
const SearchBar = document.getElementById('SearchBar');
let SearchedShown = document.getElementById("SayingsSearched")
let Sayings = [];

SearchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    
    if (searchString.length >= 1){SayingsSearched.style.display = "block"}
    if (searchString.length <= 1){SayingsSearched.style.display = "none"}
   

    const FilteredSayings = Sayings.filter((character) => {
        return (
            character.saying.toLowerCase().includes(searchString) ||
            character.theme.toLowerCase().includes(searchString)
        );
    });
    DisplaySayings(FilteredSayings);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('http://127.0.0.1:5500/Ordatok_api.html');
        Sayings = await res.json();
        DisplaySayings(Sayings);
    } catch (err) {
        console.error(err);
    }
};

const DisplaySayings = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="SayingsSearched">
                <h2>${character.saying}</h2>
                <p>evni: ${character.theme}</p>
            </li>
        `;
        })
        .join('');
    SayingsSearched.innerHTML = htmlString;

};

loadCharacters();
