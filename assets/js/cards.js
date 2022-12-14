function createNode(element) {
    return document.createElement(element)
}

function append(parent, el) {
    return parent.appendChild(el)
}

const section = document.querySelector('.cards')
let url = window.location.href
let salgadosPage = 'salgados.html'
let docesPage = 'doces.html'
let dataRecipe
let idBotao
let currentPage
let currentButton


fetch("js/db.json")
    .then((response) => response.json())
    .then(function(data) {
        //verificação da localização da pagina
        if(url.match(salgadosPage)) {
            dataRecipe = data.salgados
        } else if(url.match(docesPage)) {
            dataRecipe = data.doces
        }
        return dataRecipe.map(function(receita) {
            //criando elementos
            let divAll = createNode('div')
            divAll.classList.add('card')
            let divImage = createNode('div')
            let img = createNode('img')
            img.setAttribute('alt', `imagem da receita de ${receita.nome}`)
            let divText = createNode('div')
            let title = createNode('p')
            title.classList.add('title-card')
            let description = createNode('p')
            let author = createNode('p')
            author.classList.add('small-text')
            let porcao = createNode('p')
            porcao.classList.add('small-text')
            let botao = createNode('button')
            botao.setAttribute('id', `${receita.id}`)

            //atribuindo valores a eles
            img.src = receita.imagem
            title.innerHTML = `${receita.nome}`
            description.innerHTML = `${receita.descricao}`
            author.innerHTML = `por: <a href=${receita.contato} target="_blank">${receita.autor}</a>`
            porcao.innerHTML = `serve: ${receita.rendimento}`
            botao.innerHTML = 'Ver Receita'

            //chamando eles
            append(divImage, img)
            append(divText, title)
            append(divText, description)
            append(divText, author)
            append(divText, porcao)
            append(divText, botao)
            append(divAll, divImage)
            append(divAll, divText)
            append(section, divAll)

            botao.addEventListener('click', (e) => {

                currentPage = window.location.href.split('assets/')[1]
                idBotao = e.target.id

                fetch("js/db.json")
                    .then((response) => response.json())
                    .then(function(data) {
                        if(currentPage === 'salgados.html') {
                            currentButton = data.salgados
                        } else if(currentPage === 'doces.html') {
                            currentButton = data.doces
                        }
                        console.log(currentButton[idBotao])
                    })

            })

        })

    })
    .catch(function(error) {
        console.log(error)
    })











