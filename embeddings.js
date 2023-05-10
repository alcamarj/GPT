const products = [{
    title: "El rey leon",
    description: "Una pelicula animada de Disney que cuenta la historia de Simba, un joven leon que debe enfrentarse a su malvado tio Scar para reclamar su lugar como rey de la selva.",
    img: "https://es.web.img2.acsta.net/c_310_420/medias/nmedia/18/68/20/31/19785394.jpg"
  },
  {
    title: "Harry Potter y la Piedra Filosofal",
    description: "Un joven llamado Harry Potter descubre que es un mago y es aceptado en la escuela de magia Hogwarts, donde se enfrenta al malvado Voldemort en su busqueda de la legendaria Piedra Filosofal.",
    img: "https://es.web.img3.acsta.net/c_310_420/pictures/14/04/30/11/55/592219.jpg"
  },
  {
    title: "Terminator: La rebelion de las maquinas",
    description: "John Connor tiene diecinueve años (año 2004), no tiene a nadie mas que a si mismo y vive desconectado del mundo para evitar que lo encuentren. Del futuro envian un ultimo exterminador para matarlo: la T-X mas inteligente, fuerte y rapida de lo que ha sido cualquier terminador. A su vez un T-850 (Arnold Schwarzenegger) es enviado para protegerlo a el y a Katherine Brewster.",
    img: "https://es.web.img3.acsta.net/c_310_420/medias/nmedia/18/79/19/79/20134033.jpg"
  },
  {
    title: "Titanic",
    description: "Una pareja de enamorados se conoce a bordo del transatlantico mas famoso del mundo, que se hunde tras chocar con un iceberg.",
    img: "https://es.web.img3.acsta.net/c_310_420/medias/nmedia/18/86/91/41/19870073.jpg"
  },
  {
    title: "Matrix",
    description: "Un hacker descubre que el mundo en el que vive es una simulacion creada por unas maquinas inteligentes.",
    img: "https://es.web.img3.acsta.net/c_310_420/medias/nmedia/18/72/16/76/20065616.jpg"
  },
  {
    title: "Coco",
    description: "Una pelicula animada de Pixar que sigue a un joven llamado Miguel que viaja al mundo de los muertos en busca de su bisabuelo musico y descubre secretos sobre su familia.",
    img: "https://es.web.img3.acsta.net/c_310_420/pictures/17/09/14/10/49/2019727.jpg"
  },
  {
    title: "La lista de Schindler",
    description: "Un empresario aleman salva la vida de mas de mil judios durante el Holocausto empleandolos en su fabrica.",
    img: "https://es.web.img3.acsta.net/c_310_420/pictures/19/02/12/18/49/4078948.jpg"
  },
  {
    title: "Star Wars: Una nueva esperanza",
    description: "Es la primera pelicula de la trilogia original de Star Wars. La historia sigue a un joven granjero llamado Luke Skywalker que se une a la Alianza Rebelde para derrotar al Imperio Galactico y rescatar a la Princesa Leia.",
    img: "https://es.web.img3.acsta.net/c_310_420/medias/nmedia/18/71/18/12/20061511.jpg"
  },
  {
    title: "Salvar al soldado Ryan",
    description: "Es una pelicula ambientada en la Segunda Guerra Mundial que sigue a un grupo de soldados estadounidenses que son enviados a Francia para rescatar a un soldado cuyos hermanos han sido todos asesinados en combate.",
    img: "https://es.web.img3.acsta.net/c_310_420/pictures/14/03/05/09/42/163621.jpg"
  },
  {
    title: "Los puentes de Madison",
    description: "Pelicula romantica que cuenta la historia de una ama de casa y un fotografo que se encuentran en una granja de Iowa y tienen una breve pero intensa aventura amorosa.",
    img: "https://es.web.img3.acsta.net/c_310_420/medias/nmedia/18/68/46/37/20340605.jpg"
  },
  {
    title: "El señor de los anillos",
    description: "Trilogia epica de fantasia basada en la novela de J.R.R. Tolkien. La historia sigue a un grupo de aventureros que se unen para destruir un anillo magico que otorga un poder inmenso a su portador y que debe ser arrojado al fuego del Monte del Destino para evitar que caiga en manos del malvado Sauron.",
    img: "https://es.web.img2.acsta.net/c_310_420/medias/nmedia/18/89/67/45/20061512.jpg"
  },
  {
    title: "La Sirenita",
    description: "Es una pelicula animada de Disney que cuenta la historia de Ariel, una joven sirena que sueña con vivir en la superficie y enamorarse de un humano.",
    img: "https://es.web.img3.acsta.net/c_310_420/medias/nmedia/18/80/56/45/19549127.jpg"
  },
  {
    title: "Avatar",
    description: "Pelicula de ciencia ficcion epica dirigida por James Cameron en la que un exmarine es enviado a Pandora, un planeta habitado por una raza indigena, y se enamora de una nativa y su cultura, lo que lo lleva a luchar contra la explotacion de los recursos naturales del planeta por parte de una corporacion.",
    img: "https://es.web.img3.acsta.net/c_310_420/pictures/22/11/02/15/37/0544148.jpg"
  },
  {
  title: "Memorias de africa",
  description:"Memorias de africa es una pelicula de drama romantico de 1985 ambientada en el continente africano que cuenta la historia de su vida en Kenia colonial y su romance con el cazador y aventurero Denys Finch Hatton.",
  img:"https://es.web.img2.acsta.net/c_310_420/pictures/14/03/28/12/29/489691.jpg"
  }
];


const embeddings = [];
async function getProductRecommendations() {

  for (let i = 0; i < products.length; i++) {

    const embedding = await getEmbeddings(products[i].description);
    embeddings.push(embedding);
  }
}

async function getRecommendations(lookingForText) {

  const lookingForTextEmbedding = await getEmbeddings(lookingForText);

  return products
    .map((p, i) => ({
      ...p,
      similarity: distanceBetween(
        lookingForTextEmbedding,
        embeddings[i]
      )
    }))
    .sort((a, b) => b.similarity - a.similarity);
}


async function getEmbeddings(text) {
  const response = await fetch("https://azureopenai-jam.openai.azure.com/openai/deployments/EMBEDDINGJAM/embeddings?api-version=2022-12-01", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: text
    })
  });
  const respuesta = (await response.json()).data[0].embedding;
  
  return respuesta;
}


function distanceBetween(embeddingA, embeddingB) {
  console.log(embeddingA, embeddingB)
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < embeddingA.length; i++) {
    dotProduct += embeddingA[i] * embeddingB[i];
    normA += Math.pow(embeddingA[i], 2);
    normB += Math.pow(embeddingB[i], 2);
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

document.getElementById('gen').addEventListener('click', () => {
  var query = document.getElementById('prompt').value;

  document.getElementById('status').innerHTML = "Loading...";

  getRecommendations(query).then((r) => {
    console.log(r);
    document.getElementById('status').innerHTML = "";
    document.getElementById('text').innerHTML = "Te recomendamos esta peli: " + r[0].title;
  });

});

const contenedor = document.getElementById("peliculas");

products.forEach((pelicula) => {
  const img = document.createElement("img");
  var r1 = "";
  var r2 = "";
  img.src = pelicula.img;

  img.addEventListener('click', () => {
    getRecommendations(pelicula.description).then((r) => {
      r1 = r[1].img;
      r2 = r[2].img;
       console.log(r1+r2);
      $('#exampleModal').modal({
        show: true
      })
      document.getElementById('modal-title').innerHTML = pelicula.title;
      document.getElementById('description').innerHTML = pelicula.description;
       document.getElementById('recomended-films').innerHTML="<img src="+r1+" width='200'><img src="+r2+" width='200'>";

    });


  })

  contenedor.appendChild(img);
});


