const modalOverlay = document.querySelector('.modal-overlay');
const receitas = document.querySelectorAll('.receita');

for (let receita of receitas){
    receita.addEventListener("click", function(){
        const receitaId = receita.getAttribute("id")
        let infoReceita = receita.innerHTML
        document.getElementById("modal-receita").innerHTML = infoReceita
        modalOverlay.classList.add('active')
        // modalOverlay.querySelector("img").src = `assets/${receitaId}`
    })
}

document.querySelector('.close-modal').addEventListener("click", function(){
    modalOverlay.classList.remove('active')
})