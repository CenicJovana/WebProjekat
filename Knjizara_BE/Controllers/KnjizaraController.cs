using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Knjizara_BE.Models;


namespace Knjizara_BE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KnjizaraController : ControllerBase
    {
        public KnjizaraContext Context { get; set; }

        public KnjizaraController(KnjizaraContext context)
        {
            Context = context;
        }

        [Route("PreuzmiKnjizare")]
        [HttpGet]
        public async Task<List<Knjizara>> PreuzmiKnjizare()
        {
            return await Context.Knjizare.Include(p => p.Rafovi).ToListAsync();
        }

        [Route("UpisiRaf/{idKnjizare}")]
        [HttpPost]
        public async Task<IActionResult> UpisiRaf(int idKnjizare, [FromBody] Raf Raf)
        {
            //k =>> knjizara  r =>>raf
            var k = await Context.Knjizare.FindAsync(idKnjizare);
            Raf.Knjizara = k;
            var r = Context.Rafovi.Where(rr => rr.Naziv == Raf.Naziv).FirstOrDefault();
            if (r != null)
            {
                return StatusCode(406);
            }
            else if (Raf.BrojRedova < 1 || Raf.BrPolicaPoRedu < 1)
            {
                return StatusCode(407);
            }
            else
            {
                Context.Rafovi.Add(Raf);
                await Context.SaveChangesAsync();
                return Ok();
            }

        }

        [Route("PreuzmiRafove/{idKnjizare}")]
        [HttpGet]
        public async Task<List<Raf>> PreuzmiRafove(int idKnjizare)
        {
            return await Context.Rafovi.Where(Raf => Raf.Knjizara.ID == idKnjizare).Include(r => r.Knjige).ToListAsync();
        }

        [Route("UpisiKnjigu/{idRafa}")]
        [HttpPost]
        public async Task<IActionResult> UpisiKnjigu(int idRafa, [FromBody] Knjiga knjiga)
        {
            var r = await Context.Rafovi.FindAsync(idRafa);
            knjiga.Raf = r;
            if (Context.Knjige.Any(p => p.Naziv == knjiga.Naziv && (p.Red != knjiga.Red || p.PozUredu != knjiga.PozUredu)))
            {
                var xy = Context.Knjige.Where(p => p.Naziv == knjiga.Naziv).FirstOrDefault();
                return BadRequest(new { X = xy?.Red, Y = xy?.PozUredu });//knjiga postoji na drugoj lokaciji
            }
            var pozicija = Context.Knjige.Where(p => p.Raf.ID == idRafa && p.Red == knjiga.Red && p.PozUredu == knjiga.PozUredu).FirstOrDefault();

            if (pozicija != null)
            {
                if (pozicija.Naziv != knjiga.Naziv)
                {
                    return StatusCode(406);//na ovoj lokaciji je druga knjiga, probajte na nekoj drugoj
                }
                else
                {
                    return StatusCode(407);//ovde je da knjiga, mozete da azurirate kolicinu
                }
            }
            if (knjiga.BrStrana < 30)
                return StatusCode(409);
            else if (knjiga.Kolicina < 1)
                return StatusCode(410);

            Context.Knjige.Add(knjiga);
            await Context.SaveChangesAsync();
            return Ok();
        }
        [Route("IzmeniKnjigu/{idKnjige}/{novaKolicina}")]
        [HttpPut]
        public async Task<IActionResult> IzmeniKnjigu(int idKnjige, int novaKolicina)
        {
             if (novaKolicina < 1)
                return StatusCode(406);
            
            var k = Context.Knjige.Where(p => p.ID == idKnjige).FirstOrDefault();
            if (k != null)
            {
                k.Kolicina = novaKolicina;
                Context.Update<Knjiga>(k);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
                return StatusCode(404);
           
            
        }
        [Route("ObrisiKnjigu/{idKnjige}")]
        [HttpDelete]
        public async Task<IActionResult> ObrisiKnjigu(int idKnjige)
        {
            var k = Context.Knjige.Where(p => p.ID == idKnjige).FirstOrDefault();
            if (k != null)
            {
                Context.Knjige.Remove(k);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
                return StatusCode(404);
        }

        [Route("PreuzmiKnjige")]
        [HttpGet]
        public async Task<List<Knjiga>> PreuzmiKnjige()
        {
            return await Context.Knjige.ToListAsync();
        }

        [Route("PreuzmiKnjigeSaRafa/{IdRafa}")]
        [HttpGet]
        public async Task<List<Knjiga>> PreuzmiKnjigeSaRafa(int IdRafa)
        {
            return await Context.Knjige.Where(p => p.Raf.ID == IdRafa).ToListAsync();
        }
    }
}
