# Keyflower Generator 🎲🌻

Aplikacija za pripremu partije i nasumično generisanje pločica po godišnjim dobima za društvenu igru **Keyflower** (za 2 do 6 igrača), sa ugrađenim pravilima i računačem konačnih poena.

---

## 🚀 Kako objaviti na GitHub Pages (Publish to GitHub Pages)

Ovaj projekat je u potpunosti pripremljen za objavljivanje na **GitHub Pages** kao projektni sajt (Project Site). Na raspolaganju su vam **dva načina** (izaberite onaj koji vam više odgovara):

---

### Metod 1: Automatski preko GitHub Actions (Preporučeno) ⭐

U projektu je već kreiran radni tok (`.github/workflows/deploy.yml`) koji automatski kompajlira i objavljuje aplikaciju čim postavite kod na GitHub:

1. **Kreirajte novi repozitorijum na GitHub-u** (npr. `keyflower-generator`).
2. **Postavite kod na GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Keyflower Generator"
   git branch -M main
   git remote add origin https://github.com/VASE_KORISNICKO_IME/keyflower-generator.git
   git push -u origin main
   ```
3. **Uključite GitHub Actions za Pages**:
   - Otvorite vaš repozitorijum na GitHub-u.
   - Idite na **Settings** ➔ **Pages** (u levom meniju).
   - Pod **Build and deployment** ➔ **Source**, izaberite: **`GitHub Actions`**.
4. To je sve! GitHub će automatski pokrenuti akciju i za 1-2 minuta vaša aplikacija će biti uživo na adresi:
   `https://VASE_KORISNICKO_IME.github.io/keyflower-generator/`

---

### Metod 2: Ručno preko komande `npm run deploy` (gh-pages)

Ako preferirate ručno objavljivanje iz terminala:

1. Proverite da li je vaš repozitorijum povezan sa GitHub-om (`git remote -v`).
2. Pokrenite sledeću komandu u terminalu:
   ```bash
   npm run deploy
   ```
   *Ova komanda će automatski pokrenuti `npm run build` i poslati izgrađene fajlove iz `dist` foldera na `gh-pages` granu na vašem GitHub-u.*
3. U postavkama repozitorijuma na GitHub-u (**Settings ➔ Pages**), pod **Source** izaberite **Deploy from a branch**, a za granu odaberite **`gh-pages`** i folder **`/(root)`**, pa kliknite na **Save**.

---

## 💻 Lokalno pokretanje (Local Development)

Ako želite da testirate ili menjate aplikaciju na svom računaru:

```bash
# 1. Instalacija paketa
npm install

# 2. Pokretanje razvojnog servera
npm run dev
```

Aplikacija će biti dostupna na: `http://localhost:3000`

Za izgradnju produkcione verzije:
```bash
npm run build
```

---

## 🌟 Funkcionalnosti

- **Izbor broja igrača (2 do 6):** Pravilno raspoređuje broj domova, brodova, pločica redosleda i broj pločica po godišnjim dobima prema zvaničnoj tabeli iz pravilnika.
- **Tajni zimski tajlovi (Pass-and-Play):** Omogućava igračima da bezbedno pogledaju svoje dodeljene zimske pločice prebacivanjem telefona iz ruke u ruku uz dugme za sakrivanje/prikaz.
- **Godišnja doba (Proleće, Leto, Jesen, Zima):** Prikaz svih izvučenih tajlova sa brojem puteva, dejstvom i mogućnošću okretanja za pregled nadogradnje.
- **Letnji brodovi (1a/1b, 2a/2b, 3a/3b, 4a/4b):** Automatski nasumičan odabir strane uz mogućnost ručnog prebacivanja.
- **Dolazak radnika na brodove:** Tačan prikaz koliko meepla i žetona veština stiže na svaki aktivni brod po sezonama.
- **Računač konačnih poena:** Detaljan unos i automatski obračun poena (selo, ambari, zimske pločice, brodovi, zlato) sa pobedničkim postoljem i konfetama.
- **Katalog svih 64 tajlova:** Pretraga i filtriranje svih pločica u igri sa uvećanim pregledom i pojašnjenjima pravila.
- **Dvojezičnost:** Podrška za Srpski i Engleski jezik.
- **Responzivni dizajn:** Prilagođeno za mobilne uređaje i tablete pored stola tokom igranja.
