const url = "https://utmu0l1z.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22cardapio%22%5D%0A&perspective=previewDrafts";

window.addEventListener("load", async () => {
    const wrapper = document.querySelector("div.describ-cardapio-itens")

    const result = await fetch (url, {
        method: "GET",
    });

    const data = await result.json();

    data.result.forEach(element => {
        mostarCardapio(element);
    });
});

function mostarCardapio(element){
    console.log(element)

    const a =document.createElement("a");
    a.innerText = 'Principal:';

    const li = document.createElement("li");
    li.append(a);

    const a1 =document.createElement("a");
    a1.innerText = element.ingrediente1;

    const li1 = document.createElement("li");
    li1.append(a1);

    const a2 =document.createElement("a");
    a2.innerText = element.ingrediente2;

    const li2 = document.createElement("li");
    li2.append(a2);

    const a3 =document.createElement("a");
    a3.innerText = element.ingrediente3;

    const li3 = document.createElement("li");
    li3.append(a3);

    const a4 =document.createElement("a");
    a4.innerText = element.ingrediente4;

    const li4 = document.createElement("li");
    li4.append(a4);

    const br1 = document.createElement('br')

    const hr = document.createElement('hr')

    const br2 = document.createElement('br')

    const a5 =document.createElement("a");
    a5.innerText = 'Complemento:';

    
    const br3 = document.createElement('br')

    const li5 = document.createElement("li");
    li5.append(a5);

    const a6 =document.createElement("a");
    a6.innerText = element.complemento1;

    const li6 = document.createElement("li");
    li6.append(a6);

    const a7 =document.createElement("a");
    a7.innerText = element.complemento2;

    const li7 = document.createElement("li");
    li7.append(a7);

    const br4 = document.createElement('br')



    const div = document.getElementsByClassName('describ-cardapio-itens')[0];
    div.append(li, li1, li2, li3, li4, br1, hr, br2, li5, br3, li6, li7, br4);
    
    console.log(div)
}