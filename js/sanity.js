const urlSanity = "https://utmu0l1z.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22itens%22+%7C%7C+_type+%3D%3D+%22cardapio%22+%7C%7C+_type+%3D%3D+%22paginas%22+%7C%7C+_type+%3D%3D+%22restaurantes%22%5D+%7B%0A++...%2C++%0A++_type+%3D%3D+%22paginas%22+%3D%3E+%7B%0A++++...%2C%0A++++%22imagePrimaryUrl%22%3A+imagemPrincipal.asset-%3Eurl%2C%0A++++%22imageSecondaryUrl%22%3A+imagemSecundaria.asset-%3Eurl%0A++%7D%2C%0A++_type+%3D%3D+%22restaurantes%22+%3D%3E+%7B%0A++++%22imagePrimaryUrl%22%3A+imagemPrincipal.asset-%3Eurl%0A++%7D%0A%7D%0A&perspective=published";

window.addEventListener("load", async () => {

    const result = await fetch(urlSanity, {
        method: "GET",
    });

    const data = await result.json();

    const itens = [];
    const diasBrute = [];
    const paginas = [];
    const restaurantes = [];

    for (let i = 0; i < data.result.length; i++) {
        let obj = data.result[i];
        if (obj._type == "itens") {
            const newObj = { subtype: obj.subtipo, id: obj._id, nome: obj.ingrediente };
            itens.push(newObj);
        } else if (obj._type == "cardapio") {
            const newObj = { id: obj._id, dia: obj.dia, principais: obj.principais, ordem: obj.order, complementos: obj.complementos };
            diasBrute.push(newObj);
        } else if (obj._type == "paginas") {
            const newObj = { id: obj._id, titulo: obj.titulo, subtitulo: obj.subtitulo, descricao: obj.descricao, imagePrimaryUrl: obj.imagePrimaryUrl, imageSecondaryUrl: obj.imageSecondaryUrl };
            paginas.push(newObj);
        } else if (obj._type == "restaurantes") {
            const newObj = { id: obj._id, titulo: obj.titulo, endereco: obj.endereco, imagePrimaryUrl: obj.imagePrimaryUrl };
            restaurantes.push(newObj);
        }
    }

    const dias = [];
    for (let i = 0; i < diasBrute.length; i++) {
        const dia = { ...diasBrute[i] };
        const principais = [];
        for (let j = 0; j < dia.principais.length; j++) {
            let principal = dia.principais[j];
            const findItem = itens.find((item) => item.id === principal._ref);
            const newObj = { id: findItem.id, nome: findItem.nome };
            principais.push(newObj);
        }
        dia.principais = principais;

        const complementos = [];
        for (let j = 0; j < dia.complementos.length; j++) {
            let complemento = dia.complementos[j];
            const findItem = itens.find((item) => item.id === complemento._ref);
            const newObj = { id: findItem.id, nome: findItem.nome, ordem: dia.ordem };
            complementos.push(newObj);
        }
        dia.complementos = complementos;
        dias.push(dia);
    }

    dias.sort((a, b) => a.ordem - b.ordem);

    dias.forEach(element => {
        mostarCardapio(element);
    });

    mostrarPaginas(paginas);
    console.log(restaurantes)
    mostrarRestaurantes(restaurantes);
});

function mostarCardapio(element) {

    const cardCardapio = document.createElement("div");
    cardCardapio.className = "card-cardapio";

    const diaArea = document.createElement("div");
    diaArea.className = "dia-area";

    const nomeDia = document.createElement("a");
    nomeDia.className = "nome-dia";
    nomeDia.innerText = element.dia;

    diaArea.append(nomeDia);
    cardCardapio.append(diaArea);

    const describCardapio = document.createElement("div");
    describCardapio.className = "describ-cardapio";

    const describCardapioItens = document.createElement("div");
    describCardapioItens.className = "describ-cardapio-itens";

    describCardapio.append(describCardapioItens);
    cardCardapio.append(describCardapio);

    const containerDias = document.getElementById('container-dias');

    const a = document.createElement("a");
    a.style.fontSize = '23px';
    a.classList = 'bold'
    a.innerText = 'Pratos principais:';
    const li = document.createElement("li");
    li.append(a);

    const div = describCardapioItens;
    div.append(a, li);

    const elements = [];
    for (let i = 0; i < element.principais.length; i++) {
        const principal = element.principais[i];
        const a = document.createElement("a");
        a.style.fontSize = '18px';
        a.innerText = principal.nome;
        const li = document.createElement("li");
        li.append(a);
        elements.push(a, li);
        div.append(a, li);
    }

    const br = document.createElement('br')

    const sectionComplemento = document.createElement('section');
    const aComplemento = document.createElement("a");
    aComplemento.style.fontSize = '23px';
    aComplemento.classList = 'fodaseBOld'
    aComplemento.innerText = 'Complementos:';
    sectionComplemento.append(br, aComplemento)
    div.append(sectionComplemento)

    for (let i = 0; i < element.complementos.length; i++) {
        const complemento = element.complementos[i];
        const a = document.createElement("a");
        a.style.fontSize = '18px';
        a.innerText = complemento.nome;
        const li = document.createElement("li");
        li.append(a);
        elements.push(a, li);
        div.append(a, li);
    }

    containerDias.append(cardCardapio);
}

function mostrarPaginas(cardDataList) {
    const containerCarousel = document.getElementById("container-pages-carousel");

    for (let i = 0; i < cardDataList.length; i++) {
        const cardData = cardDataList[i];

        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-content", formatString(cardData.titulo));
        const img = document.createElement("img");
        img.style.cursor = 'pointer';
        img.src = cardData.imagePrimaryUrl;
        img.alt = cardData.title;
        card.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = cardData.titulo;
        cardBody.appendChild(title);

        const description = document.createElement("p");
        description.classList.add("card-text");
        description.textContent = cardData.subtitulo;
        cardBody.appendChild(description);

        card.appendChild(cardBody);

        containerCarousel.appendChild(card);
    }


    for (let i = 0; i < cardDataList.length; i++) {
        const cardData = cardDataList[i];

        const containerDescricao = document.getElementById("contents-carousel-description");
        const cardDesc = document.createElement('div');
        cardDesc.id = formatString(cardData.titulo);
        cardDesc.classList.add('content');

        const titleArea = document.createElement('div');
        titleArea.classList.add('content-title-area');
        const titleDescription = document.createElement('div');
        titleDescription.classList.add('content-title');
        titleDescription.textContent = cardData.titulo;
        titleArea.appendChild(titleDescription);

        const contentArea = document.createElement('div');
        contentArea.classList.add('content-area');

        const imgContainer = document.createElement('div');
        const imgS = document.createElement('img');
        imgS.classList.add('img-content');
        imgS.src = cardData.imageSecondaryUrl;
        imgContainer.appendChild(imgS);

        const textContentArea = document.createElement('div');
        textContentArea.classList.add('text-content-area');
        const textContent = document.createElement('div');
        textContent.classList.add('text-content');
        const textSpan = document.createElement('span');
        textSpan.innerHTML = cardData.descricao;
        textContent.appendChild(textSpan);
        textContentArea.appendChild(textContent);

        contentArea.appendChild(imgContainer);
        contentArea.appendChild(textContentArea);

        cardDesc.appendChild(titleArea);
        cardDesc.appendChild(contentArea);

        containerDescricao.appendChild(cardDesc);
    }

    const cards = document.querySelectorAll(".card");
    const contents = document.querySelectorAll(".content");
    let activeContent = null;

    cards.forEach(card => {
        card.addEventListener("click", function () {
            const contentId = this.getAttribute("data-content");
            const contentElement = document.getElementById(contentId);

            if (activeContent && activeContent === contentElement) {
                contentElement.classList.remove("active");
                activeContent = null;
            } else {
                contents.forEach(content => content.classList.remove("active"));
                contentElement.classList.add("active");
                activeContent = contentElement;
            }
        });
    });
}

function mostrarRestaurantes(list) {

    for (let i = 0; i < list.length; i++) {
        const data = list[i];
        const containerRestaurants = document.getElementById('carousel-restaurants');

        const cardRest = document.createElement('div');
        cardRest.classList.add('cardrest');

        const img = document.createElement('img');
        img.src = data.imagePrimaryUrl;
        img.alt = data.titulo;

        const cardRestBody = document.createElement('div');
        cardRestBody.classList.add('cardrest-body');

        const cardRestTitle = document.createElement('h5');
        cardRestTitle.classList.add('cardrest-title');
        cardRestTitle.textContent = data.titulo;

        const cardRestText = document.createElement('p');
        cardRestText.classList.add('cardrest-text');
        cardRestText.textContent = data.endereco;

        cardRestBody.appendChild(cardRestTitle);
        cardRestBody.appendChild(cardRestText);
        cardRest.appendChild(img);
        cardRest.appendChild(cardRestBody);

        containerRestaurants.appendChild(cardRest);
    }
}

function formatString(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');
}