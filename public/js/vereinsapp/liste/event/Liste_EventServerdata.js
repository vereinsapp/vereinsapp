/**
 */

function Liste_EventServerdata(AJAX) {
    if (isObject(AJAX) && "antwort" in AJAX && isObject(AJAX.antwort) && "tabellen" in AJAX.antwort && isObject(AJAX.antwort.tabellen))
        $.each(AJAX.antwort.tabellen, function (liste, tabelle) {
            Localstorage_Rein(liste + "_tabelle", tabelle);
        });

    $.each(LISTEN, function (liste) {
        Liste_EventLocalstorageUpdVariable(liste);
    });

    $.each(LISTEN, function (liste) {
        Liste_VerknuepfungenZuordnen(liste);
    });

    $.each(LISTEN, function (liste) {
        Liste_ElementErgaenzen(liste);
    });

    $.each(LISTEN, function (liste) {
        Liste_EventVariableUpdDom(liste);
    });
}
