const url1 = "https://utmu0l1z.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%27contato%27%5D";

window.addEventListener("load", async () => {
    const wrapper = document.querySelector(".footer-contat")

    const result = await fetch (url1, {
        method: "GET",
    });

    const data = await result.json();

    data.result.forEach(element => {
        mostrarContato(element, wrapper);
    });
});

function mostrarContato(element, wrapper) {
    console.log(element);

    const h4 = document.createElement("h4");
    h4.innerText = 'Contato:';

    const a1 = document.createElement("a");
    a1.innerText = element.email;

    const li1 = document.createElement("li");
    li1.append(a1);

    const a2 = document.createElement("a");
    a2.innerText = element.telefone;

    const li2 = document.createElement("li");
    li2.append(a2);

    const ul = document.createElement("ul");
    ul.append(li1, li2);

    wrapper.append(h4, ul);

    console.log(wrapper);
}