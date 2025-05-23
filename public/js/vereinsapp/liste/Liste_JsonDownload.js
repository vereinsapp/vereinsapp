function Liste_JsonDownload(bestaetigung_einfordern, dom, title, instanz, liste) {
    if (bestaetigung_einfordern)
        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich die Liste als JSON-Datei herunterladen?",
            title,
            "btn_" + liste + "_json_download",
            { liste: liste, instanz: instanz }
        );
    else {
        if (typeof dom.$btn_ausloesend !== "undefined") Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const data = { element_ids: new Array() };
        $.each($('.liste[id="' + instanz + '"]').find(".element"), function () {
            data.element_ids.push(Number($(this).attr("data-element_id")));
        });

        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data);

        Schnittstelle_AjaxInDieSchlange(
            LISTEN[liste].controller + "/ajax_" + liste + "_json_download",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                /* todo:
                Wahrscheinlich ist es einfacher, wenn die Datei in einem temp-Verzeichnis gespeichert wird.
                Dann muss eine URL zurückgegeben werden, die temp-Dateien aus dem writable-Verzeichnis bereitstellt.
                Danach muss ein zweiter AJAX-Request erfolgen, um die Datei wieder zu löschen.
                const $link = $("<a>")
                    .attr("href", window.URL.createObjectURL(new Blob([AJAX.antwort.datei])))
                    .attr("download", AJAX.antwort.dateiname)
                    .appendTo(AJAX.dom.$modal);
                $link[0].click();
                $link.remove();
                */
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern("Die Liste wurde erfolgreich als JSON-Datei zum Download bereitgestellt.");
            },
            function (AJAX) {
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                Schnittstelle_DomToastFeuern("Die Liste konnte nicht als JSON-Datei zum Download bereitgestellt werden.", "danger");
            }
        );
    }
}
