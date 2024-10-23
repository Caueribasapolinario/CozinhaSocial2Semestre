const URL = "https://utmu0l1z.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22sobreEmpresa%22%5D%0A";

window.addEventListener("load", async () => {
    const wrapper = document.querySelector("div.txt-box-text")

    const result = await fetch(URL, {
        method: "GET",
    });

    const data = await result.json();

    console.log(data.result)

    data.result.forEach(element => {
        montarSobre(element);
    });
});

function montarSobre(element) {
    console.log(element)

    const h2 =document.createElement("h2");
    h2.innerText = element.Descricao;

    console.log(h2)

    const h3 = document.createElement("h3");
    h3.innerText = element.FraseFinal;
    
    const br1 = document.createElement('br')
    const br2 = document.createElement('br')


    const div = document.getElementsByClassName('txt-box-text')[0]
   
    div.append(h2, br1, br2,  h3);

    console.log(div)
}