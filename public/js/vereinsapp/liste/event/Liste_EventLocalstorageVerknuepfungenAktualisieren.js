/**
 * @param {string} verknuepfungen
 */

function Liste_EventLocalstorageVerknuepfungenAktualisieren(verknuepfungen) {
    // tabelle_LocalStorage wird aus der Variable geholt
    const tabelle_LocalStorage = new Array();
    $.each(VERKNUEPFUNGEN[verknuepfungen].tabelle, function () {
        const element = this;
        if ("id" in element) tabelle_LocalStorage.push(element);
    });

    // tabelle_LocalStorage wird im LocalStorage gespeichert
    Localstorage_Rein(verknuepfungen + "_tabelle", tabelle_LocalStorage);

    $.each(VERKNUEPFUNGEN[verknuepfungen].instanz, function (instanz) {
        // filtern wird im LocalStorage gespeichert
        if (Object.keys(VERKNUEPFUNGEN[verknuepfungen].instanz[instanz].filtern).length > 0)
            Localstorage_Rein(verknuepfungen + "_" + instanz + "_filtern", VERKNUEPFUNGEN[verknuepfungen].instanz[instanz].filtern);
        else Localstorage_Loeschen(verknuepfungen + "_" + instanz + "_filtern");
        // sortieren wird im LocalStorage gespeichert
        if (typeof VERKNUEPFUNGEN[verknuepfungen].instanz[instanz].sortieren !== "undefined")
            Localstorage_Rein(verknuepfungen + "_" + instanz + "_sortieren", VERKNUEPFUNGEN[verknuepfungen].instanz[instanz].sortieren);
        else Localstorage_Loeschen(verknuepfungen + "_" + instanz + "_sortieren");
        // gruppieren wird im LocalStorage gespeichert
        if (typeof VERKNUEPFUNGEN[verknuepfungen].instanz[instanz].gruppieren !== "undefined")
            Localstorage_Rein(verknuepfungen + "_" + instanz + "_gruppieren", VERKNUEPFUNGEN[verknuepfungen].instanz[instanz].gruppieren);
        else Localstorage_Loeschen(verknuepfungen + "_" + instanz + "_gruppieren");
        // bearbeiten_modus wird im LocalStorage gespeichert
        if (VERKNUEPFUNGEN[verknuepfungen].instanz[instanz].bearbeiten_modus !== false)
            Localstorage_Rein(verknuepfungen + "_" + instanz + "_bearbeiten_modus", VERKNUEPFUNGEN[verknuepfungen].instanz[instanz].bearbeiten_modus);
        else Localstorage_Loeschen(verknuepfungen + "_" + instanz + "_bearbeiten_modus");
    });
}
