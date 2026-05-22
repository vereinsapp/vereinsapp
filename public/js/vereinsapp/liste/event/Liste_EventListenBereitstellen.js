/**
 * @param {string} liste
 */

function Liste_EventListenBereitstellen(liste) {
    if (liste in LISTEN) {
        LISTEN[liste].tabelle = new Array();
        $.each(Localstorage_RausZurueck(liste + "_tabelle", new Array()), function (position, element) {
            LISTEN[liste].tabelle[Number(element.id)] = element;
        });

        $.each(LISTEN[liste].instanz, function (instanz) {
            LISTEN[liste].instanz[instanz].filtern = Localstorage_RausZurueck(liste + "_" + instanz + "_filtern", new Object());
            LISTEN[liste].instanz[instanz].sortieren = Localstorage_RausZurueck(liste + "_" + instanz + "_sortieren", undefined);
            LISTEN[liste].instanz[instanz].gruppieren = Localstorage_RausZurueck(liste + "_" + instanz + "_gruppieren", undefined);
            LISTEN[liste].instanz[instanz].bearbeiten_modus = Localstorage_RausZurueck(liste + "_" + instanz + "_bearbeiten_modus", false);
        });
    }
}
