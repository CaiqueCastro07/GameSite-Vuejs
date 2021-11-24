import { Carta } from "./build";

const files = require.context("./", true, /.json$/); // puxa todos os cards da pasta cards, vira um obj

const deck = () => {
  const oDobro = [];

  files.keys().forEach((fileName) => {
    // for each no Objeto files pela keys()
    const cardData = files(fileName); // acessa o JSON
    const primeira = new Carta(cardData);
    const segunda = new Carta(cardData);

    oDobro.push(primeira);
    oDobro.push(segunda);
  });

  return oDobro;
};

export default deck;
