function Schnittstelle_EventSqlUpdLocalstorage(folgendes_event) {
    Schnittstelle_AjaxInDieSchlange("einstellungen/ajax_tabellen", { folgendes_event: folgendes_event }, new Object(), function (AJAX) {
        if (isObject(AJAX) && "antwort" in AJAX && isObject(AJAX.antwort) && "tabellen" in AJAX.antwort && isObject(AJAX.antwort.tabellen))
            $.each(AJAX.antwort.tabellen, function (liste, tabelle) {
                Schnittstelle_LocalstorageRein(liste + "_tabelle", tabelle);
            });

        if (typeof AJAX.data.folgendes_event === "function" || (isArray(AJAX.data.folgendes_event) && AJAX.data.folgendes_event.length > 0))
            $.each(AJAX.antwort.tabellen, function (liste, tabelle) {
                Schnittstelle_EventAusfuehren(AJAX.data.folgendes_event, { liste: liste });
            });
    });
}
