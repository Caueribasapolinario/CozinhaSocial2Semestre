const URL = "https://utmu0l1z.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22sobreEmpresa%22%5D";

window.addEventListener("load", async () => {
    const wrapper = document.querySelector("div.txt-box-text")

    const result = await fetch(URL, {
        method: "GET",
    });

    const data = await result.json();

    data.result.forEach(element => {
        const div = MontarSobre(element);
    });
});

function MontarSobre(element) {
    const h2 =document.createElement("h2");
    h2.innerText = .Descricao;

    const h3 = document.createElement("h3");
    h3.innerText = .FraseFinal;

}