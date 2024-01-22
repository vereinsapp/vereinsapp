function Liste_ElementErstellen($btn) {
    const liste = $btn.attr("data-liste");
    const element = G.LISTEN[liste].element;
    const element_id = $btn.attr("data-element_id");
    const aktion = $btn.attr("data-aktion");
    const data_werte = $btn.attr("data-werte");

    const AJAX_DATA = new Object();
    if (typeof element_id !== "undefined") AJAX_DATA.id = Number(element_id);
    if (typeof data_werte !== "undefined")
        $.each(JSON.parse(data_werte), function (eigenschaft, wert) {
            AJAX_DATA[eigenschaft] = wert;
        });

    // WERTE AUS DEM FORMULAR
    $btn.closest(".formular")
        .find(".eigenschaft")
        .each(function () {
            const $eigenschaft = $(this);
            const eigenschaft = $eigenschaft.attr("data-eigenschaft");

            let wert = $eigenschaft.val();
            // Wenn aber die Eigenschaft ein Datum, ein Uhrzeit oder ein Datum und eine Uhrzeit ist
            if (["date", "time", "datetime-local"].includes($eigenschaft.attr("type"))) {
                wert = DateTime.fromISO(wert);
                if (eigenschaft == "ende") wert = wert.plus({ days: 1 }).minus({ seconds: 1 });
                wert = wert.toSQL();
            }
            // Und wenn der Wert im JSON-Format ist
            if (isJson(wert)) wert = JSON.parse(wert);

            AJAX_DATA[eigenschaft] = wert;

            $eigenschaft.removeClass("is-valid").removeClass("is-invalid");
            $eigenschaft.find(".valid-tooltip").remove();
            $eigenschaft.find(".invalid-tooltip").remove();
        });

    const neue_ajax_id = G.AJAX.length;
    G.AJAX[neue_ajax_id] = {
        ajax_id: neue_ajax_id,
        label: element + "_" + aktion,
        url: G.LISTEN[liste].controller + "/ajax_" + element + "_" + aktion,
        data: AJAX_DATA,
        liste: liste,
        $btn: $btn,
        raus_aktion: function (AJAX) {
            Schnittstelle_BtnWartenStart(AJAX.$btn);
        },
        rein_validation_neg_aktion: function (AJAX) {
            AJAX.$btn
                .closest(".formular")
                .find(".eigenschaft")
                .each(function () {
                    const $eigenschaft = $(this);
                    const eigenschaft = $eigenschaft.attr("data-eigenschaft");

                    if (eigenschaft in AJAX.antwort.validation) {
                        $eigenschaft.addClass("is-invalid").removeClass("is-valid");
                        $eigenschaft.after('<div class="invalid-tooltip">' + AJAX.antwort.validation[eigenschaft] + "</div>");
                    } else {
                        $eigenschaft.addClass("is-valid").removeClass("is-invalid");
                    }
                });
        },
        rein_validation_pos_aktion: function (AJAX) {
            if (typeof AJAX.data.id === "undefined") {
                AJAX.data.id = G.LISTEN[AJAX.liste].tabelle.length + 1;
                G.LISTEN[AJAX.liste].tabelle[AJAX.data.id] = new Object();
            }
            $.each(AJAX.data, function (eigenschaft, wert) {
                if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME)
                    Schnittstelle_VariableRein(wert, eigenschaft, Number(AJAX.data.id), AJAX.liste);
            });
            Schnittstelle_EventVariableUpdLocalstorage(AJAX.liste, [Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom]);
            AJAX.$btn.closest(".formular").modal("hide");
        },
        rein_aktion: function (AJAX) {
            Schnittstelle_BtnWartenEnde(AJAX.$btn);
        },
    };

    Schnittstelle_AjaxInDieSchlange(G.AJAX[neue_ajax_id]);
}
