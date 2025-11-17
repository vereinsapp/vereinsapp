function Liste_WertFormatiertZurueck(wert, eigenschaft, liste) {
    let wert_formatiert;

    if (typeof wert !== "undefined")
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
            case "kategorie":
            case "zugeordnete_liste":
                wert_formatiert = VORGEGEBENE_WERTE[liste][eigenschaft][wert].beschriftung;
                break;
            case "vorstandschaft_janein":
            case "aktiv_janein":
            case "real_janein":
            case "erledigt_janein":
            case "ich_eingeladen_janein":
            case "ich_rueckgemeldet_janein":
                if (wert == "true") wert = 1; // todo: es darf kein string "true" geben (nur boolean true)
                else if (wert == "false") wert = 0; // todo: es darf kein string "false" geben (nur boolean false)
                wert_formatiert = JANEIN[Number(wert)].beschriftung;
                break;
            case "erstellung":
            case "letzte_aktivitaet":
            case "erledigt":
            case "created_at":
            case "updated_at":
                if (wert !== null) wert_formatiert = wert.toFormat("dd.MM.yyyy HH:mm");
                else wert_formatiert = "nie";
                break;
            case "start":
            case "ende":
                wert_formatiert = WOCHENTAGE_KURZ[wert.weekday].beschriftung + ", " + wert.toFormat("dd.MM.yyyy HH:mm");
                break;
            case "titel_nr":
                wert_formatiert = "[" + wert + "]";
                break;
            case "komponist":
                if (wert !== null) wert_formatiert = wert;
                else wert_formatiert = "";
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
                if (wert !== null) wert_formatiert = Liste_ElementBeschriftungZurueck(wert, "mitglieder");
                else wert_formatiert = "Mitglied nicht gefunden";
                break;
            case "zugeordnetes_element":
                if (wert !== null && "liste" in wert && wert.liste !== null && "id" in wert && wert.id !== null)
                    wert_formatiert = Liste_ElementBeschriftungZurueck(wert.id, wert.liste);
                else wert_formatiert = "";
                break;
            default:
                wert_formatiert = wert;
        }

    return wert_formatiert;
}
