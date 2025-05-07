
#  BuzzOn! 

BuzzOn is een moderne React-applicatie waarmee gebruikers evenementen kunnen bekijken, aanmaken, bewerken en verwijderen. De app maakt gebruik van Chakra UI voor styling en JSON Server als back-end voor dataopslag.

## Functionaliteiten

- 📅 Overzicht van alle evenementen
- 🔍 Zoek- en filtermogelijkheden op categorie
- ➕ Toevoegen van nieuwe evenementen incl. organisatorgegevens
- 📝 Bewerken van bestaande evenementen
- ❌ Verwijderen van evenementen met bevestigingsdialoog
- 🏷️ Categorieën en gebruikersbeheer via JSON Server
- 🌐 Navigatie met React Router
- 💅 Responsieve layout met Chakra UI
- 📷 Aparte afhandeling voor afbeeldingen i.v.m. copyright

## Gebruikte technologieën

- React
- React Router DOM
- Chakra UI
- JSON Server (voor mock-API)
- Vite (voor lokale ontwikkeling)

## Installatie

1. **Clone de repository**

```bash
git clone https://github.com/jouw-gebruikersnaam/BuzzOn.git
cd BuzzOn
```

2. **Installeer dependencies**

```bash
npm install
```

3. **Start de app en JSON Server**

In twee aparte terminals:

```bash
npm run dev           # start React-app via Vite
npm run server        # start JSON Server op http://localhost:3000
```

> De `server`-script moet toegevoegd worden in je `package.json`:
```json
"scripts": {
  "dev": "vite",
  "server": "json-server --watch db.json --port 3000"
}
```
## Backend data

De `db.json` bevat `events`, `users` en `categories`.

## Layout

De app gebruikt Chakra UI met een globale layout in `Root.jsx`, inclusief:

- `Header` met navigatie
- `Footer` met copyright
- `Outlet` voor child routes


## Projectstructuur

```
src/
├── components/        # Layoutcomponenten zoals Header, Footer, FilterBar
├── pages/             # Pagina's zoals HomePage, EventsPage, AddEventPage
├── context/           # AppContext voor globale state (categorieën, users)
├── App.jsx            # Rootcomponent
├── main.jsx           # Chakra + Router + Context setup
├── router.jsx         # Alle routes gedefinieerd
public/
└── images/            # Logo's en achtergrondafbeeldingen
```

## Opmerkingen

- Afbeeldingen worden handmatig door de beheerder toegevoegd wegens copyright-overwegingen.
- De app is bedoeld voor demonstratie- en opleidingsdoeleinden.

## Contact

Voor vragen of bijdragen: open een issue of neem contact op via de contactpagina in de app!
