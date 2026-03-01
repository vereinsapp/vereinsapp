function Schnittstelle_EventSqlUpdLocalstorage() {
    Schnittstelle_AjaxInDieSchlange(
        "einstellungen/ajax_tabellen",
        new Object(),
        new Object(),
        function (AJAX) {
            // rein_validation_pos_aktion:
            if (isObject(AJAX) && "antwort" in AJAX && isObject(AJAX.antwort) && "tabellen" in AJAX.antwort && isObject(AJAX.antwort.tabellen))
                $.each(AJAX.antwort.tabellen, function (liste, tabelle) {
                    Schnittstelle_LocalstorageRein(liste + "_tabelle", tabelle);
                });

            $.each(LISTEN, function (liste) {
                Schnittstelle_EventLocalstorageUpdVariable(liste);
            });

            $.each(LISTEN, function (liste) {
                Liste_VerknuepfungenZuordnen(liste);
            });

            $.each(LISTEN, function (liste) {
                Schnittstelle_VariableElementErgaenzen(liste);
            });

            $.each(LISTEN, function (liste) {
                Schnittstelle_EventVariableUpdDom(liste);
            });
        },
        function (AJAX) {
            // rein_validation_neg_aktion:
        },
    );
}
