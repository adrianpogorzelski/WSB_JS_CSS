const content = document.getElementById('content')
const translateText = () => {
    const inputText = document.getElementById('inputText').value
    const targetDiv = document.getElementById('content')
    axios.get('https://libretranslate.com/translate?q=hello&source=en&target=cs')
        .then(response => targetDiv.innerHTML = response.translatedText)
        .catch(targetDiv.innerHTML = '???')
/*    const header = {
        'q': inputText,
        'source': 'pl',
        'target': 'cs'
    }
    axios.post('https://libretranslate.com/translate', header)
        .then(response => targetDiv.innerHTML = response.translatedText)
        .catch(targetDiv.innerHTML = '???')*/
}