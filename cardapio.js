const URL = "https://utmu0l1z.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22cardapioSegunda%22%5D%0A";

window.addEventListener("load", async () => {
    const wrapper = document.querySelector("describ-cardapio-itens")

    const result = await fetch (URL, {
        method: "GET",
    });

    const data = await result.json();

    console.log(data.result)

    data.result.forEach(element => {
        monstarCardapio(elemente);
    });
});

function monstarCardapio(element){
  //                      <div class="describ-cardapio-itens">
  //                          <li><a>Principal:</a></li>
 //                               <li><a>Arroz</a></li>
 //                               <li><a>Feijão</a></li>
 //                               <li><a>Carne ao Molho</a></li>
//                                <li><a>Canjiquinha</a></li>
 //                           <div class="linha-horizontal"></div>
 //                           <li><a>Complementos:</a></li>                            
  //                              <br>
 //                             <br>
  //                              <li><a>Salada</a></li>
   //                             <li><a>Suco</a></li>
  //                      </div> 
}