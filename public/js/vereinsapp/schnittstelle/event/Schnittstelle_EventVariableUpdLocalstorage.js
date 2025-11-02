function Schnittstelle_EventVariableUpdLocalstorage(liste) {
    // tabelle_LocalStorage wird aus der Variable geholt
    const tabelle_LocalStorage = new Array();
    $.each(LISTEN[liste].tabelle, function () {
        const element = this;
        if ("id" in element) {
            delete element.zugeordnete_element_ids_nach_liste;
            tabelle_LocalStorage.push(element);
        }
    });

    // tabelle_LocalStorage wird im LocalStorage gespeichert
    Schnittstelle_LocalstorageRein(liste + "_tabelle", tabelle_LocalStorage);

    $.each(LISTEN[liste].instanz, function (instanz) {
        // filtern wird im LocalStorage gespeichert
        if (Object.keys(LISTEN[liste].instanz[instanz].filtern).length > 0)
            Schnittstelle_LocalstorageRein(liste + "_" + instanz + "_filtern", LISTEN[liste].instanz[instanz].filtern);
        else Schnittstelle_LocalstorageLoeschen(liste + "_" + instanz + "_filtern");
        // sortieren wird im LocalStorage gespeichert
        if (typeof LISTEN[liste].instanz[instanz].sortieren !== "undefined")
            Schnittstelle_LocalstorageRein(liste + "_" + instanz + "_sortieren", LISTEN[liste].instanz[instanz].sortieren);
        else Schnittstelle_LocalstorageLoeschen(liste + "_" + instanz + "_sortieren");
        // gruppieren wird im LocalStorage gespeichert
        if (typeof LISTEN[liste].instanz[instanz].gruppieren !== "undefined")
            Schnittstelle_LocalstorageRein(liste + "_" + instanz + "_gruppieren", LISTEN[liste].instanz[instanz].gruppieren);
        else Schnittstelle_LocalstorageLoeschen(liste + "_" + instanz + "_gruppieren");
    });
}
