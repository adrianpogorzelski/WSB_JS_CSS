function prepareObject() {
    const form = document.getElementById("element-form");
    const data = new FormData(form);

    const object = {};
    for (let el of data.entries()) {
        object[el[0]] = el[1];
    }

    return object;
}

function addElement() {

    const object = prepareObject();

    const valid = validate(object);
    if (!valid) {
        return;
    }

    const newPre = document.createElement("pre");
    newPre.className = "column half-column element";
    newPre.innerText = JSON.stringify(object, null, 2);

    document.getElementById("db").append(newPre);
}


function validate(object) {

    // walidujemy wszystkie pola
    const validNumber = validateNumber(object.number);
    const validRadio = validateRadio(object.favouriteNumber);
    const validPassword = validatePassword(object.password);
    const validRepeatedPassword = validateRepeatedPassword(object.password, object.password2);

    // zwracamy wynik walidacji - że formularz ją przeszedł, wszystkie pola muszą być wypełnione poprawnie
    return validNumber && validRadio && validPassword && validRepeatedPassword;
}

function validateNumber(number) {

    // walidujemy numer, podany w argumencie - w tym wypadku sprawdzamy, czy jest większy lub równy 0
    const valid = number >= 0;

    // odszukujemy na stronie odpowiednie pole - input, w którym został wpisany numer
    const input = document.querySelector("input[name='number']");

    if (valid) {
        // jeśli numer pasuje do wzorca - usuwamy ewentualne komunikaty walidacyjne, jeśli są

        // ustawiamy pustą klasę - w razie jakby input był wcześniej oznaczony na czerwono
        input.className = "";

        const nameMessage = document.getElementById("number-input-message");
        if (nameMessage) {
            //jeśli wyświetla się komunikat - usuwamy go
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        // numer nie pasuje do wzorca - dodajemy komunikaty walidacyjne, jeśli ich nie ma

        // dodajemy inputowi klasę, która oznacza, że coś z nim nie tak
        input.className = "invalid";

        // sprawdzamy, czy wyświetla się komunikat o błędzie w polu z numerem
        if (!document.getElementById("number-input-message")) {
            // tworzymy element, który będzie mówił o błędzie w wybranym polu
            const small = document.createElement("small");
            small.id = "number-input-message"; // nadajemy id - potem dzięki niemu dostaniemy się do elementu, żeby go usunąć
            small.className = "invalid"; // nadajemy klasę - żeby był czerwony
            small.innerText = "Niepoprawny numer - dopuszczalna tylko dodatnia liczba"; // dodajemy tekst, który wyświetli się użytkownikowi

            // doczepiamy element jako "rodzeństwo" inputa
            input.parentElement.appendChild(small);
        }
    }

    // zwracamy wynik walidacji
    return valid;
}

const valid = (input, value) => {
    input.className = "";
    inputName = input.name
    inputId = input.name + "-input-message"
    const nameMessage = document.getElementById(inputId);
    if (nameMessage) {
        nameMessage.parentElement.removeChild(nameMessage);
    }
    return value
}


const error = (input, errorMessage) => {
    input.className = "invalid";
    inputName = input.name
    inputId = input.name + "-input-message"
    if (!document.getElementById(inputId)) {
        const small = document.createElement("small");
        small.id = inputId;
        small.className = "invalid";
        small.innerText = errorMessage;
        input.parentElement.appendChild(small);
    }
    return false;
}

function validateRadio(radio) {
    // todo
    // Pierwotnie input mial być zawarty w funkcji 'error', ale w żaden sposób nie udało mi się zmusić w ten sposób funkcji do działania.
    // Funkcja cały czas zwracała null, kiedy jest wewnątrz funkcji walidujących działa prawidłowo
    /*
    const error = (inputName, errorMessage) => {
        const input = document.querySelectorAll("input[name=inputName]");
        input.className = "invalid"
        (...)
    }
    */
    // Wtedy funkcje walidujące przyjmowałyby np. "error('favouriteNumber', '"'Wybierz liczbę.') i unikałbym powtórzeń w skrypcie
    const input = document.querySelector("input[name='favouriteNumber']");
    return (radio ? valid(input, radio) : error(input, 'Wybierz liczbę.'))
}

function validatePassword(password) {
    // todo
    const input = document.querySelector("input[name='password']");
    return (password.length >= 8 ? valid(input, password) : error(input, 'Hasło musi zawierać przynajmniej 8 znaków.'))
}

function validateRepeatedPassword(password, repeatedPassword) {
    // todo
    const input = document.querySelector("input[name='password2']");
    return (password === repeatedPassword ? valid(input, true) : error(input, 'Hasło nie zgadza się z poprzednim.'))
}