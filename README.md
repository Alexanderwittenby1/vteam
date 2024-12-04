# GetGo scooter applikation

# Översikt
Denna applikation gör det möjligt för användare att hyra elektriska scooters genom en enkel och användarvänlig plattform. Applikationen är byggd för att hantera scooteruthyrning i realtid, inklusive funktioner som användarregistrering, scooterbokning, och betalning.

## Teknologi och Verktyg

- **Docker**: Applikationen körs i containrar för att säkerställa en konsekvent och isolerad utvecklings- och produktionsmiljö.
- **Backend**: [Beskriv backendteknologin, t.ex. Node.js, Python, Java, etc.]
- **Frontend**: [Beskriv frontendteknologin, t.ex. React, Angular, etc.]
- **Databas**: [Beskriv vilken databas som används, t.ex. MySQL, MongoDB, PostgreSQL, etc.]
- **API**: RESTful API för att hantera scooterdata och användarinteraktioner.


### Förutsättningar

Innan du kan köra applikationen lokalt måste du ha följande installerat:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Installera och köra applikationen med Docker

1. Klona detta repository:

   ```bash
   git clone https://github.com/alexanderwittenby1/vteam.git
   cd vteam


Bygg och starta applikationen med Docker Compose:

```
docker-compose up --build
```

Kör detta kommandot om docker-compose visar några fel.

```
docker-compose down --volumes --rmi all
docker-compose up --build
```

Det kan hända att backend-containern inte startar. Gå då in på din docker desktop och starta den manuellt.



