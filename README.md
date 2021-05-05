# FullstackProject
**Yleistä tietoa**
Yksinkertainen Sää-applikaatio missä näkyy nykyinen sää
Tallentaa maiden nimet sql 
Front end tehty vueCli

backend tehty Nodejs 

tietokanta mysql (lokaalinen)

**rest rajapinta nodejs**
Projektiin on lisätty kirjautumis systeemi
**express**
POST(http//localhost:3000/register)
 -Rekistyröi sovellukseen ja tarkistaa tietokannasta onko sähköpostti käytössä
POST(http//localhost:3000/login) 
-kirjautuu sovellukseen tarkistaa tietokannasta onko olemassa minkä jälkeen Generoi JSWT salaisen tokenin.
Jwt avulla tiedämme onko käyttäjä kirjautunut
tämän jälkeen clientissä tallennetaan localstorage
GET(http//localhost:3000/user)-
-Haluamme käyttäjän tiedot clientissä tämä hakee sen lähettämällä salaisen JSWT tokenin ja validoi sen
Tämän avulla tarkistaa onko käyttäjä kirjautunut
käytetäään useasti kun tehdään muita requesteja
POST(http//localhost:3000/NewCountry)-
tallentaa kirjautuneen käyttäjän tiedot sql
POST(http//localhost:3000/clearTable)
poistaa tiedot sql
POST(http//localhost:3000/getCountries)
Hakee sql kaikki maat kyseisellä käyttäjällä
Kaikki tiedot lähetetään jsonina 




