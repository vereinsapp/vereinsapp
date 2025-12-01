function Schnittstelle_AjaxInDieSchlange(url, data, dom, rein_validation_pos_aktion, rein_validation_neg_aktion) {
    const neue_ajax_id = AJAXSCHLANGE.length;

    if ("$btn_ausloesend" in dom && dom.$btn_ausloesend.exists()) {
        dom.$btn_ausloesend.find(".beschriftung").addClass("invisible");
        dom.$btn_ausloesend.find(".beschriftung").after(STATUS_SPINNER_HTML);
        dom.$btn_ausloesend.prop("disabled", true);
    }

    if (!("ajax_id" in data)) data.ajax_id = neue_ajax_id;

    AJAXSCHLANGE[neue_ajax_id] = {
        data: data,
        dom: dom,
        rein_validation_pos_aktion: rein_validation_pos_aktion,
        rein_validation_neg_aktion: rein_validation_neg_aktion,
    };

    $.ajaxQueue({
        url: SITE_URL + url,
        method: "post",
        data: data,
        dataType: "json",
        beforeSend: function () {},
        success: function (antwort) {
            if (isObject(antwort) && "ajax_id" in antwort) {
                const AJAX = AJAXSCHLANGE[Number(antwort.ajax_id)];

                // antwort wird in der AJAXSCHLANGE gespeichert
                AJAX.antwort = antwort;

                // CSRF-hash wird gespeichert
                CSRF[CSRF_NAME] = AJAX.antwort[CSRF_NAME];

                // Spezialfall login-view
                $('input[name="' + CSRF_NAME + '"]').val(CSRF[CSRF_NAME]);

                if ("info" in AJAX.antwort) Schnittstelle_LogInDieKonsole("INFO", JsonStringifiedZurueck(AJAX.antwort.info, undefined));

                // WENN DIE VALIDATION FEHLSCHLÄGT
                if ("validation" in AJAX.antwort) {
                    Schnittstelle_LogInDieKonsole("VALIDATION", JsonStringifiedZurueck(AJAX.antwort.validation, undefined));
                    if (typeof AJAX.rein_validation_neg_aktion === "function") AJAX.rein_validation_neg_aktion(AJAX);
                }

                // WENN DIE VALIDATION ERFOLGREICH DURCHLÄUFT
                else {
                    if (typeof AJAX.rein_validation_pos_aktion === "function") AJAX.rein_validation_pos_aktion(AJAX);
                }

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists()) {
                    AJAX.dom.$btn_ausloesend.prop("disabled", false);
                    AJAX.dom.$btn_ausloesend.find("." + STATUS_SPINNER_CLASS).remove();
                    AJAX.dom.$btn_ausloesend.find(".beschriftung").removeClass("invisible");
                }
            }
        },
        error: function (xhr) {
            Schnittstelle_LogInDieKonsole("FEHLER", xhr.status, xhr.statusText, xhr);
        },
        complete: function () {},
    });
}
