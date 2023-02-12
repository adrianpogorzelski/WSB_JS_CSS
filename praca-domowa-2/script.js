const resultDiv = document.getElementById('result')
const checkYear = () => {
    const input = document.getElementById('number').value
    axios.get(`http://numbersapi.com/${input}/year`)
        .then(response => resultDiv.innerHTML = response.data)
        .catch(error => resultDiv.innerHTML = "ERROR: Incorrect date (" + error.message + ")!")
}