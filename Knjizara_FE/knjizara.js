import { Raf } from "./raf.js";

export class Knjizara {
  constructor(id, naziv, adresa) {
    this.id = id;
    this.naziv = naziv;
    this.adresa = adresa;
    this.rafovi = [];
    this.kontejner = null;
  }
  dodajraf(r) {
    this.rafovi.push(r);
  }
  crtajKnjizaru(host) {
    if (!host) throw new Exception("Parent element ne postoji");
    this.kontejner = document.createElement("div");
    this.kontejner.classList.add("kontKnjizara");
    host.appendChild(this.kontejner);
    let velikiDiv= document.createElement("div");
    velikiDiv.className="velikiDiv";
    this.kontejner.appendChild(velikiDiv);
    let divInfo= document.createElement("div");
    divInfo.className="divInfo";
    velikiDiv.appendChild(divInfo);
    let info = document.createElement("label");
    info.className = "info";
    info.innerHTML = `Naziv knjižare: ${this.naziv}`;
    divInfo.appendChild(info);
    info = document.createElement("label");
    info.className = "info";
    info.innerHTML = `Adresa: ${this.adresa}`;
    divInfo.appendChild(info);
    this.formaZaraf(velikiDiv);
    fetch("https://localhost:5001/Knjizara/PreuzmiRafove/" + this.id).then(
      (p) => {
        p.json().then((data) => {
          data.forEach((r) => {
            const raf = new Raf(r.id, r.naziv, r.brojRedova, r.brPolicaPoRedu);
            this.dodajraf(raf);
            raf.crtajRaf(this.kontejner);
            console.log(r.knjige);
            r.knjige.forEach((knjiga) => {
              raf.knjige[
                (knjiga.red - 1) * raf.brPolicaPoRedu + knjiga.pozUredu - 1
              ].dodajNaPolicu(
                knjiga.id,
                knjiga.naziv,
                knjiga.autor,
                knjiga.brStrana,
                knjiga.godIzdavanja,
                knjiga.kolicina,
                knjiga.red,
                knjiga.pozUredu,
                raf.naziv
              );
            });
          });
        });
      }
    );
    console.log(this.rafovi);
  }
  formaZaraf(host) {
    const forma = document.createElement("div");
    host.appendChild(forma);
    forma.className = "formaRaf";
    let labele = ["Naziv:", "Broj redova:", "Broj polica po redu:"];
    let tipovi = ["text", "number", "number"];
    let klase = ["naziv", "brRedova", "brPolica"];
    let polje = null;
    let labela = document.createElement("label");
    labela.innerHTML = "Unos novog rafa";
    labela.className = "nazivForme";
    forma.appendChild(labela);
    labele.forEach((el, ind) => {
      labela = document.createElement("label");
      labela.innerHTML = el;
      forma.appendChild(labela);
      polje = document.createElement("input");
      polje.type = tipovi[ind];
      polje.className = klase[ind];
      forma.appendChild(polje);
    });
    polje = document.createElement("button");
    polje.className = "dugme";
    polje.innerHTML = "Dodaj";
    forma.appendChild(polje);
    console.log(this.rafovi.length + 1);
    polje.onclick = (ev) => {
      const naziv = forma.querySelector(".naziv").value;
      const brRedova = parseInt(forma.querySelector(".brRedova").value);
      const brPolica = parseInt(forma.querySelector(".brPolica").value);
      const id = this.id;
      if (naziv == "") alert("Morate da unesete naziv rafa.");
      else if (isNaN(brRedova)) alert("Morate da unesete broj redova.");
      else if (isNaN(brPolica))
        alert("Morate da unesete broj polica u svakom redu.");
      else {
        fetch("https://localhost:5001/Knjizara/UpisiRaf/" + this.id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            naziv: naziv,
            brojRedova: brRedova,
            brPolicaPoRedu: brPolica,
          }),
        }).then((p) => {
          if (p.ok) {
            const r = new Raf(this.rafovi.length, naziv, brRedova, brPolica);
            console.log(this.rafovi);
            this.dodajraf(r);
            r.crtajRaf(this.kontejner);
          } else if (p.status == 406) {
            alert("Već postoji ovo raf u biblioteci.");
          } else if (p.status == 407) {
            alert("raf mora imati bar jedan red i bar jednu policu po redu.");
          }
        });
      }
    };
  }
}
