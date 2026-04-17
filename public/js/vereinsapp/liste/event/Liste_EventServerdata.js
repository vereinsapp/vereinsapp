/**
 */

function Liste_EventServerdata(AJAX) {
    if (isObject(AJAX) && "antwort" in AJAX && isObject(AJAX.antwort)) {
        if ("liste" in AJAX.antwort && isObject(AJAX.antwort.liste))
            $.each(AJAX.antwort.liste, function (liste, data) {
                Localstorage_Rein(liste + "_tabelle", data.tabelle);
            });

        if ("verknuepfungen" in AJAX.antwort && isObject(AJAX.antwort.verknuepfungen))
            $.each(AJAX.antwort.verknuepfungen, function (verknuepfungen, data) {
                Localstorage_Rein(verknuepfungen + "_tabelle", data.tabelle);
                Localstorage_Rein(verknuepfungen + "_verknuepfung_ids_nach_liste", data.verknuepfung_ids_nach_liste);
            });
    }

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
