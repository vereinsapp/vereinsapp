/**
 * @param {string} liste
 */

function Liste_EventVariableUpdLocalstorage(liste) {
    // tabelle_LocalStorage wird aus der Variable geholt
    const tabelle_LocalStorage = new Array();
    $.each(LISTEN[liste].tabelle, function () {
        const element = this;
        if ("id" in element) tabelle_LocalStorage.push(element);
    });

    // tabelle_LocalStorage wird im LocalStorage gespeichert
    Localstorage_Rein(liste + "_tabelle", tabelle_LocalStorage);

    $.each(LISTEN[liste].instanz, function (instanz) {
        // filtern wird im LocalStorage gespeichert
        if (Object.keys(LISTEN[liste].instanz[instanz].filtern).length > 0)
            Localstorage_Rein(liste + "_" + instanz + "_filtern", LISTEN[liste].instanz[instanz].filtern);
        else Localstorage_Loeschen(liste + "_" + instanz + "_filtern");
        // sortieren wird im LocalStorage gespeichert
        if (typeof LISTEN[liste].instanz[instanz].sortieren !== "undefined")
            Localstorage_Rein(liste + "_" + instanz + "_sortieren", LISTEN[liste].instanz[instanz].sortieren);
        else Localstorage_Loeschen(liste + "_" + instanz + "_sortieren");
        // gruppieren wird im LocalStorage gespeichert
        if (typeof LISTEN[liste].instanz[instanz].gruppieren !== "undefined")
            Localstorage_Rein(liste + "_" + instanz + "_gruppieren", LISTEN[liste].instanz[instanz].gruppieren);
        else Localstorage_Loeschen(liste + "_" + instanz + "_gruppieren");
    });
}
