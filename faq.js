const FAQ_URL = "https://utmu0l1z.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%27faq%27%5D";

window.addEventListener("load", async () => {
    const container = document.querySelector(".faqs-container");

    try {
        const result = await fetch(FAQ_URL, {
            method: "GET",
        });

        const data = await result.json();

        if (data.result && data.result.length > 0) {
            data.result.forEach(element => {
                montarFaq(element, container);
            });
        } else {
            console.error("Nenhum FAQ encontrado na resposta.");
        }
    } catch (error) {
        console.error("Erro ao buscar FAQs:", error);
    }
});

function montarFaq(element, container) {    
    for (let i = 1; i <= 5; i++) {
        const titleKey = i === 1 ? 'Titulo' : `Titulo${i}`;
        const commentKey = i === 1 ? 'comentario' : `comentario${i}`;

        if (element[titleKey] && element[commentKey]) {
            const faqItem = document.createElement("div");
            faqItem.classList.add("faq");

            const question = document.createElement("h3");
            question.classList.add("faq-title");
            question.innerText = element[titleKey];
            
            const answer = document.createElement("p");
            answer.classList.add("faq-text");
            answer.innerText = element[commentKey];
            answer.style.display = "none"; 

            const toggleButton = document.createElement("button");
            toggleButton.classList.add("faq-toggle");

            const iconOpen = document.createElement("i");
            iconOpen.classList.add("fas", "fa-chevron-down");
            const iconClose = document.createElement("i");
            iconClose.classList.add("fas", "fa-times");

            toggleButton.appendChild(iconOpen);
            toggleButton.appendChild(iconClose);

            toggleButton.addEventListener("click", () => {
                const isVisible = answer.style.display === "block";
                answer.style.display = isVisible ? "none" : "block";
                faqItem.classList.toggle("active", !isVisible);
            });

            faqItem.appendChild(question);
            faqItem.appendChild(answer);
            faqItem.appendChild(toggleButton);

            container.appendChild(faqItem);
        }
    }
}