import { Knjiga } from "./knjiga.js";
export class Raf {
  constructor(id, naziv, brRedova, brPolicaPoRedu) {
    this.id = id;
    this.naziv = naziv;
    this.brRedova = brRedova;
    this.brPolicaPoRedu = brPolicaPoRedu;
    this.knjige = [];
    this.kontejner = null;
  }
  dodajKnjigu(k) {
    this.knjige.push(k);
  }
  crtajRaf(host) {
    if (!host) throw new Exception("Parent element ne postoji");
    let info = document.createElement("label");
    info.classList.add("info");
    info.classList.add("nazivRafa");
    info.innerHTML = this.naziv;
    host.appendChild(info);
    this.kontejner = document.createElement("div");
    this.kontejner.classList.add("kontRaf");
    host.appendChild(this.kontejner);
    const divZaForme = document.createElement("div");
    divZaForme.className = "rafForme";
    this.kontejner.appendChild(divZaForme);
    this.formaDodaj(divZaForme);
    this.formaIzmeni(divZaForme);
    const divZaCrtanje = document.createElement("div");
    divZaCrtanje.className = "divZaCrtanje";
    this.kontejner.appendChild(divZaCrtanje);
    this.crtajPolice(divZaCrtanje);
  }
  formaDodaj(host) {
    const forma = document.createElement("div");
    host.appendChild(forma);
    forma.classList.add("rafForme");
    forma.classList.add("fDodaj");
    let labele = [
      "Naziv:",
      "Autor:",
      "Broj strana(min 30):",
      "Godina izdavanja:",
      "Količina:",
    ];
    let tipovi = ["text", "text", "number", "number", "number"];
    let klase = ["naziv", "autor", "brStrana", "godIzd", "kol"];
    let polje = null;
    let labela = document.createElement("label");
    labela.innerHTML = "Unos knjige";
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
    let koordinate = ["Red:", "Pozicija u redu:"];
    let vrednosti = [this.brRedova, this.brPolicaPoRedu];
    klase = ["X", "Y"];
    let kord = document.createElement("div");
    let el = null;
    forma.appendChild(kord);
    koordinate.forEach((e, ind) => {
      el = document.createElement("label");
      el.innerHTML = e;
      kord.appendChild(el);
      let sel = document.createElement("select");
      sel.className = klase[ind];
      kord.appendChild(sel);
      for (let i = 1; i <= vrednosti[ind]; i++) {
        el = document.createElement("option");
        el.innerHTML = i;
        el.value = i;
        sel.appendChild(el);
      }
    });
    polje = document.createElement("button");
    polje.className = "dugme";
    polje.innerHTML = "Dodaj";
    forma.appendChild(polje);
    polje.onclick = (ev) => {
      const naziv = forma.querySelector(".naziv").value;
      const autor = forma.querySelector(".autor").value;
      const brStrana = parseInt(forma.querySelector(".brStrana").value);
      const godIzd = parseInt(forma.querySelector(".godIzd").value);
      const kolicina = parseInt(forma.querySelector(".kol").value);
      const x = parseInt(forma.querySelector(".X").value);
      const y = parseInt(forma.querySelector(".Y").value);
      console.log(naziv, autor, brStrana, godIzd, kolicina, x, y);
      console.log(this.knjige);
      if (naziv == "") alert("Morate da unesete naziv knjige.");
      else if (autor == "") alert("Morate da unesete ime i prezime autora.");
      else if (isNaN(brStrana)) alert("Morate da unesete broj strana.");
      else if (isNaN(godIzd)) alert("Morate da unesete godinu izdanja.");
      else if (isNaN(kolicina)) alert("Morate da unesete količinu.");
      else {
        fetch("https://localhost:5001/Knjizara/UpisiKnjigu/" + this.id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            naziv: naziv,
            autor: autor,
            brStrana: brStrana,
            godIzdavanja: godIzd,
            kolicina: kolicina,
            red: x,
            pozUredu: y,
          }),
        }).then((p) => {
          if (p.ok) {
            this.knjige[(x - 1) * this.brPolicaPoRedu + y - 1].dodajNaPolicu(
              0,
              naziv,
              autor,
              brStrana,
              godIzd,
              kolicina,
              x,
              y,
              this.naziv
            );
            location.reload();
          } else if (p.status == 400) {
            const greskaLokacija = { x: 0, y: 0 };
            p.json().then((q) => {
              greskaLokacija.x = q.x;
              greskaLokacija.y = q.y;
              alert(
                "Ova knjiga već postoji u " +
                  greskaLokacija.x +
                  ". redu, na " +
                  greskaLokacija.y +
                  ". polici.\nAžurirajte količinu na toj lokaciji ako želite da dodate još knjiga."
              );
            });
          } else if (p.status === 406) {
            alert(
              "Na ovoj lokaciji se već nalazi neka druga knjiga.\nProbajte da dodate knjigu na drugu lokaciju."
            );
          } else if (p.status === 407) {
            alert(
              "Knjiga je već na ovoj lokaciji.\nAžurirajte količinu ako želite da dodate još knjiga."
            );
          } else if (p.status === 409) {
            alert("Knjiga mora da ima minimum 30 strana.");
          } else if (p.status === 410) {
            alert("Morate dodati bar jednu knjigu.");
          } else alert("greska");
        });
      }
      console.log(this.knjige);
    };
  }
  formaIzmeni(host) {
    const formaIzmeni = document.createElement("div");
    host.appendChild(formaIzmeni);
    formaIzmeni.classList.add("rafForme");
    formaIzmeni.classList.add("fIzmeni");
    let labelaI = document.createElement("label");
    labelaI.innerHTML = "Promena količine ili </br> brisanje knjige";
    labelaI.style.textAlign="center";
    labelaI.className = "nazivForme";
    formaIzmeni.appendChild(labelaI);
    
    let labelaIzbor= document.createElement("label");
    labelaIzbor.innerHTML="Izaberite knjigu sa rafa";
    formaIzmeni.appendChild(labelaIzbor);

    let selection = document.createElement("select");
    selection.className= "selection";
    selection.name= this.naziv;
    formaIzmeni.appendChild(selection);

    fetch("https://localhost:5001/Knjizara/PreuzmiKnjigeSaRafa/" + this.id).then(
      (p) => {
        p.json().then((data) => {
          data.forEach(k => {
            let option = document.createElement("option");
            option.innerHTML = k.naziv;
            option.value = k.id;
            selection.appendChild(option);
            console.log(k);
          });
        });
      }
    );

    let el = document.createElement("label");
    el.innerHTML = "Unesite novu količinu";
    formaIzmeni.appendChild(el);
    el = document.createElement("input");
    el.type = "number";
    el.className = "novaKol";
    formaIzmeni.appendChild(el);

    const d1 = document.createElement("button");
    d1.innerHTML = "Promeni količinu";
    formaIzmeni.appendChild(d1);
    
    const d2= document.createElement("button");
    d2.innerHTML= "Obriši knjigu";
    formaIzmeni.appendChild(d2);
    d1.onclick = (ev) =>{
      const novaKolicina = parseInt(
        formaIzmeni.querySelector(".novaKol").value
      );
      if (isNaN(novaKolicina)) {
        alert("Niste uneli novu količinu!");
        return;
      }
      let selektor= this.kontejner.querySelector("select[name=\"" + this.naziv + "\"]");
      console.log(selektor);
      let idKnjige= selektor.options[selektor.selectedIndex].value;
      fetch("https://localhost:5001/Knjizara/IzmeniKnjigu/" + idKnjige +"/" + novaKolicina, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((p) => {
        if (p.ok) {
            this.knjige.find(k => k.id == idKnjige).azurirajKolicinu(
            novaKolicina,
            this.naziv
          );
          location.reload();
        } else if (p.status == 404) {
          alert("Knjiga nije pronađena.");
        } else if (p.status == 406) {
          alert("Nova količina mora da bude bar 1.");
        }
      });
    }
    d2.onclick = (ev) =>{
      let selektor= this.kontejner.querySelector("select[name=\"" + this.naziv + "\"]");
      console.log(selektor);
      let idKnjige= selektor.options[selektor.selectedIndex].value;
      fetch("https://localhost:5001/Knjizara/ObrisiKnjigu/" + idKnjige , {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((p) => {
        if (p.ok) {
            this.knjige.find(k => k.id == idKnjige).obrisi();
            location.reload();
        } else if (p.status == 404) {
          alert("Knjiga nije pronađena.");
        }
      });
    }
  } 
  crtajPolice(host) {
    let red = null;
    for (let i = 0; i < this.brRedova; i++) {
      red = document.createElement("div");
      host.appendChild(red);
      red.className = "red";
      for (let j = 0; j < this.brPolicaPoRedu; j++) {
        this.dodajKnjigu(new Knjiga(0, " ", " ", " ", 0, 0, i + 1, j + 1));
        this.knjige[i * this.brPolicaPoRedu + j].crtajKnjigu(red);
      }
    }
  }
}
