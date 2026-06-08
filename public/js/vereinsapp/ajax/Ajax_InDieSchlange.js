function Ajax_InDieSchlange(url, data, dom, rein_validation_pos_aktion, rein_validation_neg_aktion) {
    if ("$werkzeug" in dom && dom.$werkzeug.exists()) {
        dom.$werkzeug.find(".spinner").remove();
        dom.$werkzeug.find(".beschriftung").addClass("invisible").after(Dom_$SpinnerInitialisiertZurueck());

        const $label = dom.$werkzeug.closest(".verknuepfung_erstellen").siblings("label");
        $label.find(".spinner").remove();
        $label.find(".beschriftung").addClass("invisible").after(Dom_$SpinnerInitialisiertZurueck());

        dom.$werkzeug.prop("disabled", true);
    }

    data.ajax_id = AJAXSCHLANGE.length;

    AJAXSCHLANGE[data.ajax_id] = {
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

                if ("info" in AJAX.antwort) Log_InDieKonsole("INFO", JsonStringifiedZurueck(AJAX.antwort.info, undefined));

                if ("dom" in AJAX && "$werkzeug" in AJAX.dom && AJAX.dom.$werkzeug.exists()) {
                    AJAX.dom.$werkzeug.prop("disabled", false);

                    AJAX.dom.$werkzeug.find(".spinner").remove();
                    AJAX.dom.$werkzeug.find(".beschriftung").removeClass("invisible");

                    const $label = AJAX.dom.$werkzeug.closest(".verknuepfung_erstellen").siblings("label");
                    $label.find(".spinner").remove();
                    $label.find(".beschriftung").removeClass("invisible");
                }

                // WENN DIE VALIDATION FEHLSCHLÄGT
                if ("validation" in AJAX.antwort) {
                    Log_InDieKonsole("VALIDATION", JsonStringifiedZurueck(AJAX.antwort.validation, undefined));
                    if (typeof AJAX.rein_validation_neg_aktion === "function") AJAX.rein_validation_neg_aktion(AJAX);
                }

                // WENN DIE VALIDATION ERFOLGREICH DURCHLÄUFT
                else {
                    if (typeof AJAX.rein_validation_pos_aktion === "function") AJAX.rein_validation_pos_aktion(AJAX);
                }
            }
        },
        error: function (xhr) {
            Log_InDieKonsole("FEHLER", xhr.status, xhr.statusText, xhr);
        },
        complete: function () {},
    });
}
