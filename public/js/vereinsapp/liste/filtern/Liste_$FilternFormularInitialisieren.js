/**
 * @param {JQuery} $filtern_formular
 */

function Liste_$FilternFormularInitialisieren($filtern_formular) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_formular.attr("data-liste"), undefined);
    const ziel_id = Schnittstelle_VariableWertBereinigtZurueck($filtern_formular.attr("data-ziel_id"), undefined);

    // Initialiserung von $filtern_vorgegeben
    const $filtern_vorgegeben = $filtern_formular.find(".filtern_vorgegeben");
    const $filtern_vorgegeben_auswahl = $filtern_vorgegeben.find(".filtern_vorgegeben_auswahl");
    $filtern_vorgegeben_auswahl.empty();
    if (liste in FILTERN_VORGEGEBEN) {
        $("<option selected></option>").appendTo($filtern_vorgegeben_auswahl);
        $.each(FILTERN_VORGEGEBEN[liste], function (filtern_vorgegeben_id, eigenschaften) {
            $('<option value="' + filtern_vorgegeben_id + '">' + eigenschaften.beschriftung + "</option>").appendTo($filtern_vorgegeben_auswahl);
        });

        $filtern_vorgegeben_auswahl.attr("data-liste", liste).attr("data-ziel_id", ziel_id);
        $filtern_vorgegeben.removeClass("invisible");
    } else $filtern_vorgegeben.addClass("invisible");

    // Initialiserung von $filtern_eigenschaft
    $filtern_formular.find(".filtern_eigenschaft").remove();
    $.each(FILTERBARE_EIGENSCHAFTEN[liste], function (position, eigenschaft) {
        const typ = EIGENSCHAFTEN[liste][eigenschaft].typ;
        const $neue_filtern_eigenschaft = FILTERN.$blanko_filtern_eigenschaft[typ].clone().removeClass("blanko invisible");

        $neue_filtern_eigenschaft.attr("data-eigenschaft", eigenschaft).attr("data-liste", liste).attr("data-ziel_id", ziel_id);
        $neue_filtern_eigenschaft.find("label").find(".beschriftung").text(EIGENSCHAFTEN[liste][eigenschaft].beschriftung);

        if (typ == "vorgegebene_werte") {
            $neue_filtern_eigenschaft.find(".filtern_auswahl, .filtern_werte").empty();
            $("<option selected></option>").appendTo($neue_filtern_eigenschaft.find(".filtern_auswahl"));
            $.each(VORGEGEBENE_WERTE[liste][eigenschaft], function (wert, eigenschaften) {
                $('<option value="' + wert + '">' + eigenschaften.beschriftung + "</option>").appendTo(
                    $neue_filtern_eigenschaft.find(".filtern_auswahl"),
                );
            });
        } else if (typ == "janein") {
            $neue_filtern_eigenschaft.find(".filtern_auswahl, .filtern_werte").empty();
            $("<option selected></option>").appendTo($neue_filtern_eigenschaft.find(".filtern_auswahl"));
            $.each(JANEIN, function (wert, eigenschaften) {
                $('<option value="' + wert + '">' + eigenschaften.beschriftung + "</option>").appendTo(
                    $neue_filtern_eigenschaft.find(".filtern_auswahl"),
                );
            });
        }

        $neue_filtern_eigenschaft.appendTo($filtern_formular);
    });

    // Definition von filtern_prio_niedrig und filtern_prio_hoch
    let filtern_prio_niedrig, filtern_prio_hoch;
    if (typeof ziel_id !== "undefined") {
        filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).attr("data-filtern_prio_niedrig"), new Object());
        filtern_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).val(), new Object());
    } else {
        filtern_prio_niedrig = new Object();
        filtern_prio_hoch = new Object();
    }

    // Überschreiben des bisherigen filtern_prio_hoch mit geändertem filtern_prio_hoch
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern_prio_hoch, new Object()))
            .trigger("change");

    $.each(
        Liste_FilternMitPrioKombiniertZurueck(filtern_prio_niedrig, filtern_prio_hoch, liste),
        function (eigenschaft, filtern_eigenschaft_aktualisieren) {
            // Aktualisieren der $filtern_eigenschaft
            const $filtern_eigenschaft = $filtern_formular.find('.filtern_eigenschaft[data-eigenschaft="' + eigenschaft + '"]');
            Liste_FilternFormular$EigenschaftAktualisieren($filtern_eigenschaft, filtern_eigenschaft_aktualisieren, liste);
        },
    );
}
