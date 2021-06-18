let seuVotoPara = document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d1-2 span');
let descricao = document.querySelector('.d1-4');
let aviso = document.querySelector('.d2');
let lateral = document.querySelector('.d1-right');
let numeros = document.querySelector('.d1-3')


// Variaveis de Ambiente
let etapaAtual = 0;
var vbranco = false;
votos=[];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    numeroHtml = '';
    numero = '';
    vbranco = false;

    for(let i = 0; i<etapa.numeros;i++){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>'; 
        } else{
        numeroHtml += '<div class="numero"></div>';
        }

    }

    seuVotoPara.style.display='none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML ='';
    aviso.style.display='none';
    lateral.innerHTML='';
    numeros.innerHTML = numeroHtml;

}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;

        }else{
            return false;
        }

    });
        if(candidato.length > 0){
            candidato = candidato[0];
            seuVotoPara.style.display='block';
            descricao.innerHTML = `Nome: ${candidato.name} <br> Partido: ${candidato.partido} <br>`;
            aviso.style.display='block';


            let fotosHtml='';

            for (let i in candidato.fotos){
                if(candidato.fotos[i].small){
                    fotosHtml += `<div class="d1-image small"> <img src="${candidato.fotos[i].url}" alt=""> ${candidato.fotos[i].legenda} </div>`
                }
                    else {
                    fotosHtml += `<div class="d1-image"> <img src="${candidato.fotos[i].url}" alt=""> ${candidato.fotos[i].legenda} </div>`
                    }
            }

            lateral.innerHTML = fotosHtml;
        } else{
            seuVotoPara.style.display='block';
            aviso.style.display='block';
            descricao.innerHTML= '<div class="aviso--grande pisca"> VOTO NULO</div>'
        }
}
function clicou(n){
   let elNumero = document.querySelector('.numero.pisca');
   if (elNumero!== null){
       elNumero.innerHTML = n;
       numero = `${numero}${n}`;

       elNumero.classList.remove('pisca');

       if(elNumero.nextElementSibling !== null){
       elNumero.nextElementSibling.classList.add('pisca');
    }else{
        atualizaInterface();
    }
   }
}

function branco(){
    if(numero=== ''){
        vbranco = true;
        seuVotoPara.style.display='block';
        aviso.style.display='block';
        numeros.innerHTML ='';
        descricao.innerHTML= '<div class="aviso--grande pisca"> VOTO EM BRANCO</div>'
    }
}

function corrige(){
    comecarEtapa();

}

function confirma(){
    let etapa = etapas[etapaAtual];
    votoConfirmado=false;
    if(vbranco=== true){
        console.log('Confirmando como em branco')
        votoConfirmado=true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        });

   } else if(numero.length === etapa.numeros){
       console.log('Confirmando como ' , numero);
       votoConfirmado=true;
       votos.push({
        etapa: etapas[etapaAtual].titulo,
        voto: numero
    });


   }

   if(votoConfirmado=== true){
       etapaAtual++;

       if(etapas[etapaAtual] !== undefined){
           comecarEtapa();
       } else{
           document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca"> FIM </div>';
           console.log(votos);

       }
   }

}

comecarEtapa();