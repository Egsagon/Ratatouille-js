// HTML elements
dis = document.querySelector('.display')    // main field
set = document.querySelector('.settings')   // settings div
nex = document.querySelector('.new')        // next button
ani = document.querySelector('.animate')    // animations checkbox

// random function
rand = (max) => {return Math.floor(Math.random() * max)}

// menu handling
window.addEventListener('click', (e) => {
    if (e.target.id == 'sBtn') {set.style.display = 'unset'}
    if (e.target.id == 'html') {set.style.display = 'none'}
})

// retrieve data words server
try {
    var request = new XMLHttpRequest()
    request.open('GET', '/src', false)
    request.responseType = 'application/json'
    request.send()

    res = JSON.parse(request.response)
    var debList = res['first']
    var midList = res['mid']
    var endList = res['end']

    console.log('Successfuly loaded data from server.')

} catch {console.log('Failed to retrieve data from server.')}

// scroll
nex.addEventListener('click', () => {
    let after = dis.cloneNode(true)
    dis.parentNode.replaceChild(after, dis)
    dis = after
    dis.innerHTML = debList[rand(debList.length)]
                    + ' ' + midList[rand(midList.length)]
                    + ' ' + endList[rand(endList.length)]
})

// allow animations
ani.addEventListener('change', () => {
    if (ani.checked) {dis.style.animation = 'scroll 0.7s'}
    else {dis.style.animation = 'none'}
})