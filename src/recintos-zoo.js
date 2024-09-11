const animaisValidos = [
  { especie: "LEAO", tamanho: 3, bioma: ["savana"] },
  { especie: "LEOPARDO", tamanho: 2, bioma: ["savana"] },
  { especie: "CROCODILO", tamanho: 3, bioma: ["rio"] },
  { especie: "MACACO", tamanho: 1, bioma: ["savana", "floresta"] },
  { especie: "GAZELA", tamanho: 2, bioma: ["savana"] },
  { especie: "HIPOPOTAMO", tamanho: 4, bioma: ["savana", "rio"] },
];

const recintos = [
  {
    id: 1,
    bioma: "savana",
    tamanho: 10,
    animaisExistentes: 3,
    animais: ["MACACO"],
  },
  { id: 2, bioma: "floresta", tamanho: 5, animaisExistentes: 0, animais: [] },
  {
    id: 3,
    bioma: "savana e rio",
    tamanho: 7,
    animaisExistentes: 1,
    animais: ["GAZELA"],
  },
  { id: 4, bioma: "rio", tamanho: 8, animaisExistentes: 0, animais: [] },
  {
    id: 5,
    bioma: "savana",
    tamanho: 9,
    animaisExistentes: 1,
    animais: ["LEAO"],
  },
];

const carnivoros = ["LEAO", "LEOPARDO"];
const herbivoros = ["GAZELA", "MACACO", "HIPOPOTAMO"];

class RecintosZoo {
  analisaRecintos(animal, quantidade) {
    const animalExiste = animaisValidos.find(
      (bicho) => bicho.especie === animal.toUpperCase()
    );

    let recintoViavel = false;
    let recintosViaveis = [];
    if (!animalExiste) {
      return {
        erro: "Animal inválido",
        recintosViaveis: false,
      };
    } else if (quantidade <= 0) {
      return {
        erro: "Quantidade inválida",
        recintosViaveis: false,
      };
    }

    recintos.forEach((recinto) => {
      const recintoAnimal = animalExiste.bioma
        .map((bioma) => {
          if (recinto.id === 3) {
            if (bioma.includes("savana" || "rio")) return recinto.bioma;
          } else if (bioma.includes(recinto.bioma)) {
            return recinto.bioma;
          }
        })
        .filter((recintoValido) => recintoValido !== undefined);
      if (recintoAnimal.length > 0) {
        const presentesNoRecinto = recinto.animais;
        const espacoExtra =
          presentesNoRecinto.length > 0 &&
          !presentesNoRecinto.includes(animalExiste.especie)
            ? 1
            : 0;
        const isCarnivoro = carnivoros.includes(animalExiste.especie);
        const isHerbivoro = herbivoros.includes(animalExiste.especie);
        const contemCarnivoro = presentesNoRecinto.some((a) =>
          carnivoros.includes(a)
        );
        const contemHerbivoro = presentesNoRecinto.some((a) =>
          herbivoros.includes(a)
        );

        if (
          !(isCarnivoro && contemHerbivoro) ||
          !(isHerbivoro && contemCarnivoro)
        ) {
          // let animaisNoRecinto = [{tamanho: 0}]
          // animaisValidos.forEach(nome => {if(nome.especie ===presentesNoRecinto[0]) {animaisNoRecinto = nome}}  )

          const espacoDisponivel =
            recinto.tamanho - recinto.animaisExistentes - espacoExtra;

          if (espacoDisponivel >= quantidade) {
            recintoViavel = true;

            recintosViaveis.push(
              `Recinto ${recinto.id} (espaço livre: ${
                espacoDisponivel - quantidade * animalExiste.tamanho
              } total: ${recinto.tamanho})`
            );

            if (!recinto.animais.includes(animalExiste.especie)) {
              recinto.animais.push(animalExiste.especie);
            }
          }
        }
      }
    });

    if (!recintoViavel) {
      return {
        erro: "Não há recinto viável",
        recintosViaveis: false,
      };
    }

    return {
      erro: null,
      recintosViaveis,
    };
  }
}

export { RecintosZoo as RecintosZoo };

console.log(new RecintosZoo().analisaRecintos("MACACO", 1).recintosViaveis[0]);
