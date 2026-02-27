function Schnittstelle_AjaxInDieSchlange(url, data, dom, rein_validation_pos_aktion, rein_validation_neg_aktion) {
    const neue_ajax_id = AJAXSCHLANGE.length;

    if ("$werkzeug" in dom && dom.$werkzeug.exists()) {
        dom.$werkzeug.find("." + STATUS_SPINNER_CLASS).remove();
        dom.$werkzeug.find(".beschriftung").addClass("invisible");
        dom.$werkzeug.find(".beschriftung").after(STATUS_SPINNER_HTML);

        const $label = dom.$werkzeug.closest(".verknuepfungen").siblings("label");
        $label.find("." + STATUS_SPINNER_CLASS).remove();
        $label.find(".beschriftung").addClass("invisible");
        $label.find(".beschriftung").after(STATUS_SPINNER_HTML);

        dom.$werkzeug.prop("disabled", true);
    }

    data.ajax_id = neue_ajax_id;

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
                delete AJAX.data.ajax_id;

                // CSRF-hash wird gespeichert
                CSRF[CSRF_NAME] = AJAX.antwort[CSRF_NAME];
                // Spezialfall login-view
                $('input[name="' + CSRF_NAME + '"]').val(CSRF[CSRF_NAME]);
                delete AJAX.antwort[CSRF_NAME];

                if ("info" in AJAX.antwort) Schnittstelle_LogInDieKonsole("INFO", JsonStringifiedZurueck(AJAX.antwort.info, undefined));

                if ("dom" in AJAX && "$werkzeug" in AJAX.dom && AJAX.dom.$werkzeug.exists()) {
                    AJAX.dom.$werkzeug.prop("disabled", false);

                    AJAX.dom.$werkzeug.find("." + STATUS_SPINNER_CLASS).remove();
                    AJAX.dom.$werkzeug.find(".beschriftung").removeClass("invisible");

                    const $label = AJAX.dom.$werkzeug.closest(".verknuepfungen").siblings("label");
                    $label.find("." + STATUS_SPINNER_CLASS).remove();
                    $label.find(".beschriftung").removeClass("invisible");
                }

                // WENN DIE VALIDATION FEHLSCHLÄGT
                if ("validation" in AJAX.antwort) {
                    Schnittstelle_LogInDieKonsole("VALIDATION", JsonStringifiedZurueck(AJAX.antwort.validation, undefined));
                    if (typeof AJAX.rein_validation_neg_aktion === "function") AJAX.rein_validation_neg_aktion(AJAX);
                }

                // WENN DIE VALIDATION ERFOLGREICH DURCHLÄUFT
                else {
                    if (typeof AJAX.rein_validation_pos_aktion === "function") AJAX.rein_validation_pos_aktion(AJAX);
                }
            }
        },
        error: function (xhr) {
            Schnittstelle_LogInDieKonsole("FEHLER", xhr.status, xhr.statusText, xhr);
        },
        complete: function () {},
    });
}
