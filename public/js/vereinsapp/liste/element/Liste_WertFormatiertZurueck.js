function Liste_WertFormatiertZurueck(wert, eigenschaft, liste) {
    switch (eigenschaft) {
        case "geburt":
            wert_formatiert = wert.toFormat("dd.MM.yyyy");
            break;
        case "geburtstag":
            wert_formatiert = wert.toFormat("dd.MM.");
            break;
        case "alter":
        case "alter_geburtstag":
            wert_formatiert = Math.floor(wert) + " Jahre";
            break;
        case "geschlecht":
        case "register":
        case "auto":
        case "funktion":
        case "vorstandschaft":
        case "aktiv":
        case "erledigt_janein":
        case "kategorie":
        case "ich_rueckgemeldet":
        case "ich_eingeladen":
            wert_formatiert = VORGEGEBENE_WERTE[liste][eigenschaft][wert].beschriftung;
            break;
        case "erstellung":
        case "letzte_aktivitaet":
        case "erledigt":
        case "created_at":
        case "updated_at":
            if (wert === null) wert_formatiert = "nie";
            else wert_formatiert = wert.toFormat("dd.MM.yyyy HH:mm");
            break;
        case "start":
        case "ende":
            wert_formatiert = WOCHENTAGE_KURZ[wert.weekday].beschriftung + ", " + wert.toFormat("dd.MM.yyyy HH:mm");
            break;
        case "wert":
            wert_formatiert = parseFloat(wert).toFixed(2).replace(".", ";").replace(",", ".").replace(";", ",") + "€";
            break;
        case "anzahl_noten":
            wert_formatiert = wert + '<i class="bi bi-' + SYMBOLE["noten"]["bootstrap"] + '">';
            break;
        case "anzahl_audio":
            wert_formatiert = wert + '<i class="bi bi-' + SYMBOLE["audio"]["bootstrap"] + '">';
            break;
        case "anzahl_verzeichnis":
            wert_formatiert = wert + '<i class="bi bi-' + SYMBOLE["verzeichnis"]["bootstrap"] + '">';
            break;
        case "mitglied_id":
            if (wert === null) wert_formatiert = "Mitglied nicht gefunden";
            else wert_formatiert = Liste_ElementBeschriftungZurueck(wert, "mitglieder");
            break;
        case "zugeordnetes_element":
            if (wert === null || !("liste" in wert) || wert.liste === null || !("id" in wert) || wert.id === null) wert_formatiert = "";
            else wert_formatiert = Liste_ElementBeschriftungZurueck(wert.id, wert.liste);
            break;
        default:
            wert_formatiert = wert;
    }

    return wert_formatiert;
}
