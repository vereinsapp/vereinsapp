/**
 * @param {Object} verzeichnis
 * @param {string} typ
 */

function Liste_VerzeichnisAnzahlZurueck(verzeichnis, typ = "verzeichnis") {
    let anzahl = 0;

    if (typeof verzeichnis !== "undefined") {
        $.each(verzeichnis.unterverzeichnisse, function (position, unterverzeichnis) {
            if (typ == "verzeichnis") anzahl++;
            anzahl += Liste_VerzeichnisAnzahlZurueck(unterverzeichnis, typ);
        });

        $.each(verzeichnis.dateien, function (position, datei) {
            const punkt = datei.lastIndexOf(".");
            if (typ == datei.slice(punkt + 1)) anzahl++;
        });
    }

    return anzahl;
}
