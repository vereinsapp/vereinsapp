function Schnittstelle_EventLocalstorageUpdVariable(liste) {
    LISTEN[liste].tabelle = new Array();
    $.each(Localstorage_RausZurueck(liste + "_tabelle", new Array()), function (position, element) {
        LISTEN[liste].tabelle[element.id] = element;
    });

    $.each(LISTEN[liste].instanz, function (instanz) {
        LISTEN[liste].instanz[instanz].filtern = Localstorage_RausZurueck(liste + "_" + instanz + "_filtern", new Object());
        LISTEN[liste].instanz[instanz].sortieren = Localstorage_RausZurueck(liste + "_" + instanz + "_sortieren", undefined);
        LISTEN[liste].instanz[instanz].gruppieren = Localstorage_RausZurueck(liste + "_" + instanz + "_gruppieren", undefined);
    });
}
