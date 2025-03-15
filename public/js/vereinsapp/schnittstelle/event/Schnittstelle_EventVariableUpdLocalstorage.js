function Schnittstelle_EventVariableUpdLocalstorage(folgendes_event, data) {
    let liste;
    if ("liste" in data && data.liste in LISTEN) liste = data.liste;

    const LOC_tabelle = new Array();
    $.each(LISTEN[liste].tabelle, function () {
        const element = this; // if ("alter" in element) delete element["alter"];
        if ("id" in element) LOC_tabelle.push(element);
    });
    Schnittstelle_LocalstorageRein(liste + "_tabelle", LOC_tabelle);

    $.each(LISTEN[liste].instanz, function (instanz) {
        const LOC_filtern = LISTEN[liste].instanz[instanz].filtern;
        if (Object.keys(LOC_filtern).length > 0) Schnittstelle_LocalstorageRein(liste + "_" + instanz + "_filtern", LOC_filtern);
        else Schnittstelle_LocalstorageLoeschen(liste + "_" + instanz + "_filtern");

        const LOC_sortieren = LISTEN[liste].instanz[instanz].sortieren;
        if (typeof LOC_sortieren !== "undefined") Schnittstelle_LocalstorageRein(liste + "_" + instanz + "_sortieren", LOC_sortieren);
        else Schnittstelle_LocalstorageLoeschen(liste + "_" + instanz + "_sortieren");

        const LOC_gruppieren = LISTEN[liste].instanz[instanz].gruppieren;
        if (typeof LOC_gruppieren !== "undefined") Schnittstelle_LocalstorageRein(liste + "_" + instanz + "_gruppieren", LOC_gruppieren);
        else Schnittstelle_LocalstorageLoeschen(liste + "_" + instanz + "_gruppieren");
    });

    if (typeof folgendes_event === "function" || (isArray(folgendes_event) && folgendes_event.length > 0))
        Schnittstelle_EventAusfuehren(folgendes_event, data);
}
