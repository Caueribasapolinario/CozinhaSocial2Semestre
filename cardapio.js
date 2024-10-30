const url = "https://utmu0l1z.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22cardapio%22+%7C%7C+_type+%3D%3D+%22itens%22%5D&perspective=previewDrafts";

window.addEventListener("load", async () => {
    const wrapper = document.querySelector("div.describ-cardapio-itens")

    const result = await fetch(url, {
        method: "GET",
    });

    const data = await result.json();

    const itens = [];
    const diasBrute = [];

    for (let i = 0; i < data.result.length; i++) {
        let obj = data.result[i];
        if (obj._type == "itens") {
            const newObj = { subtype: obj.subtipo, id: obj._id, nome: obj.ingrediente };
            itens.push(newObj);
        } else if (obj._type == "cardapio") {
            const newObj = { id: obj._id, dia: obj.dia, principais: obj.principais, ordem: obj.order, complementos: obj.complementos };
            diasBrute.push(newObj);
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
    a.classList = 'fodaseBOld'
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