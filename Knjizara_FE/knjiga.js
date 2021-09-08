export class Knjiga {
  constructor(
    id,
    naziv,
    autor,
    brStrana,
    godIzdavanja,
    kolicina,
    red,
    pozUredu
  ) {
    this.id = id;
    this.naziv = naziv;
    this.autor = autor;
    this.brStrana = brStrana;
    this.godIzdavanja = godIzdavanja;
    this.kolicina = kolicina;
    this.red = red;
    this.pozUredu = pozUredu;
    this.miniKontejner = null;
  }
  osnovneInfo() {
    this.miniKontejner.innerHTML = "";
    let divLab = document.createElement("div");
    divLab.className="divLab";
    this.miniKontejner.appendChild(divLab);
    
    let naslov = document.createElement("label");
    naslov.innerHTML = "Naziv: " + this.naziv;
    naslov.className = "naslov";
    divLab.appendChild(naslov);
    naslov = document.createElement("label");
    naslov.innerHTML = "Autor: " + this.autor;
    naslov.className = "naslov";
    divLab.appendChild(naslov);
  }
  crtajKnjigu(host) {
    this.miniKontejner = document.createElement("div");
    this.miniKontejner.className = "knjiga";
    this.miniKontejner.innerHTML = "Nepopunjeno";
    this.miniKontejner.style.alignContent = "center";
    this.miniKontejner.style.justifyContent= "center";
    host.appendChild(this.miniKontejner);
  }
  dugmeInfo() {
    const dugmeInfo = document.createElement("button");
    dugmeInfo.innerHTML = "Prikaži informacije";
    dugmeInfo.className = "dugmeInfo";
    this.miniKontejner.appendChild(dugmeInfo);
    dugmeInfo.onclick = (ev) => {
      console.log(this.id);
      fetch("https://localhost:5001/Knjizara/PreuzmiKnjige").then((p) => {
        p.json().then((knjige) => {
          knjige.forEach((k) => {
            if (k.naziv == this.naziv) {
              const info = `Naziv knjige: ${k.naziv}\n Autor: ${k.autor}\n Broj strana: ${k.brStrana}\n Godina izdavanja: ${k.godIzdavanja}\n Trenutno na stanju: ${k.kolicina} `;
              alert(info);
            }
          });
        });
      });
    };
  }

  postaviBoju(naziv,opacity) {
    const firstAlphabet = naziv.charAt(0).toLowerCase();
    const asciiCode = firstAlphabet.charCodeAt(0);
    const colorNum =
      asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

    var num = Math.round(0xffffff * parseInt(colorNum));
    var r = (num >> 16) & 255;
    var g = (num >> 8) & 255;
    var b = num & 255;
    this.miniKontejner.style.backgroundColor =
      "rgba(" + r + ", " + b + ", " + g + "," + opacity +")";
   
  }
  dodajNaPolicu(id, naziv, autor, brStrana, godIzdavanja, kolicina, red, poz, raf) {
    this.id = id;
    this.naziv = naziv;
    this.autor = autor;
    this.brStrana = brStrana;
    this.godIzdavanja = godIzdavanja;
    this.kolicina = kolicina;
    this.red = red;
    this.pozUredu = poz;
    this.osnovneInfo();
    this.dugmeInfo();
    let opacity = (this.kolicina>=100)?100:this.kolicina%100;
    this.postaviBoju(raf,opacity/100);
    
  }
  azurirajKolicinu(novaKolicina, raf) {
    this.kolicina = novaKolicina;
    this.osnovneInfo();
    this.dugmeInfo();
    this.postaviBoju(raf);
   
  }
  obrisi() {
    this.naziv = " ";
    this.autor = " ";
    this.brStrana = 0;
    this.godIzdavanja = 0;
    this.kolicina = 0;
    console.log(this);
   
  }
}
