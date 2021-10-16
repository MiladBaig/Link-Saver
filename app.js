let myLinks = [];

const inputBtn = document.querySelector('#input-btn');
const inputEl = document.querySelector('#input-el');
const ulEl = document.querySelector('#ul-el');
const p = document.createElement('p');
const btns = document.querySelectorAll('.btn');


let leadFromLocalStorage = JSON.parse(localStorage.getItem('myLinks'));
if (leadFromLocalStorage){
    myLinks = leadFromLocalStorage;
    renderingLinks(myLinks);
}


btns.forEach(btn =>{
    btn.addEventListener('click', () =>{
        if (btn.getAttribute('id') === 'input-btn'){
            if (inputEl.value){
                myLinks.push(inputEl.value);
                localStorage.setItem('myLinks', JSON.stringify(myLinks))
                ulEl.innerHTML = '';
                inputEl.value = ''
                renderingLinks(myLinks);
                
            }else{
                p.textContent = 'Please enter a link then click the Save Link button!';
                p.style.color = 'rgb(150, 130, 134)';
                p.style.fontSize = '1.125rem'
                document.body.appendChild(p)
            }
            
        } else if (btn.getAttribute('id') === 'delete-btn'){
            localStorage.clear();
            myLinks = [];
            renderingLinks(myLinks);

        } else if(btn.getAttribute('id') === 'tab-btn'){
            // chrome API for grab the current link
            chrome.tabs.query({active:true, currentWindow: true}, tabs =>{
                myLinks.push(tabs[0].url);
                localStorage.setItem('myLinks', JSON.stringify(myLinks))
                renderingLinks(myLinks)
                
            })


        }
    })
})





function renderingLinks(links){
    p.textContent = '';
    let listItems = '';
    for (let i = 0; i < links.length; i++){
        listItems += `
        <li>
            <a target='_blank' href='${links[i]}'> ${links[i]} </a>
        </li>
        
        `
    }
    
    ulEl.innerHTML = listItems; 

}

