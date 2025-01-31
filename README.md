# React Boiler Room Travel Planner

## Projektbeskrivning
Detta är en resplaneringsapplikation byggd med React, där användare kan skapa resor och lägga till aktiviteter inom varje resa. Applikationen använder `db.json` som en lokal databas via `json-server` för att hantera resor och aktiviteter.

## Funktionalitet
### **Resor (Trips)**
- Användare kan skapa, redigera och ta bort resor.
- Resorna listas i `TripList`, där varje resa visas som ett `TripItem`.
- Varje resa kan innehålla flera aktiviteter.

### **Aktiviteter (Activities)**
- Varje resa kan ha flera aktiviteter som listas i `ActivityList`.
- Aktiviteter sorteras efter datum.
- Aktiviteter kan redigeras och tas bort utan att påverka andra resor.

## Senaste uppdateringar
### **1. Förbättrad TripList-layout**
- `TripList` har nu samma layout som `ActivityList`, där `TripItem` mappar ut alla resor.
- Separata sidor används för resor och aktiviteter.

### **2. Uppdaterad ActivityItem med Edit och Delete**
- `ActivityItem` har förbättrad `handleClickEdit` och `handleClickDelete`.
- Uppdateringar sker korrekt i `db.json` och UI uppdateras dynamiskt.
- Fix för DELETE: Rätt URL används för att ta bort en aktivitet inuti en resa.

### **3. Fix för EditActivity och navigering**
- `EditActivity` fyller nu korrekt i data från `db.json`.
- Uppdateringar sker genom att hämta hela resan, uppdatera `activities`, och sedan skicka en PUT-request.
- Navigeringen tillbaka till `activity-list/:id` fungerar nu korrekt efter redigering.

## Installation och Start
### **1. Klona projektet**
```sh
git clone https://github.com/ToeCrow/React-indv-Boiler-Room-Travelplaner.git
cd React-indv-Boiler-Room-Travelplaner
```

### **2. Installera beroenden**
```sh
npm install
```

### **3. Starta json-server**
```sh
npx json-server --watch db.json --port 3001
```

### **4. Starta React-applikationen**
```sh
npm run dev
```

## Användning
1. Gå till `http://localhost:5173` för att använda applikationen.
2. Skapa en ny resa via `TripForm`.
3. Lägg till aktiviteter i en resa.
4. Redigera eller ta bort aktiviteter.
5. Se till att ändringar sparas i `db.json`.

## Filstruktur
```
/src
  /Components
  /Pages
    /ActivityList
    /ActivityForm
    /EditActivity
    /TripList
    /TripForm
    /EditTrip
  App.js
  main.jsx
  router.js
/db.json
```

## Framtida förbättringar
- Implementera en backend för att hantera resor och aktiviteter mer robust.
- Lägg till autentisering för att hantera användarspecifika resor.
- Förbättra UI-design och användarupplevelse.

---
Senast uppdaterad: **Januari 2025**

