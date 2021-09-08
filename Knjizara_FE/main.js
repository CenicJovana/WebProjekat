import { Knjizara } from "./knjizara.js";

//let k1 = new Knjizara(5, "naziv", "blabla");
//k1.crtajKnjizaru(document.body); 

 fetch("https://localhost:5001/Knjizara/PreuzmiKnjizare").then((p) => {
  p.json().then((data) => {
    data.forEach((knjizara) => {
      const k = new Knjizara(knjizara.id, knjizara.naziv, knjizara.adresa);
      k.crtajKnjizaru(document.body);
    });
  });
}); 
