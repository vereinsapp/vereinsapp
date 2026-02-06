/**
 * @param {JQuery} $filtern_formular
 */

function Liste_$FilternFormularInitialisieren($filtern_formular) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_formular.attr("data-liste"), undefined);

    // Initialiserung von $filtern_vorgegeben
    const $filtern_vorgegeben = $filtern_formular.find(".filtern_vorgegeben");
    if (liste in FILTERN_VORGEGEBEN) {
        const $filtern_vorgegeben_auswahl = $filtern_vorgegeben.find(".filtern_vorgegeben_auswahl");
        $filtern_vorgegeben_auswahl.empty();

        $("<option selected></option>").appendTo($filtern_vorgegeben_auswahl);
        $.each(FILTERN_VORGEGEBEN[liste], function (filtern_vorgegeben_id, eigenschaften) {
            $('<option value="' + filtern_vorgegeben_id + '">' + eigenschaften.beschriftung + "</option>").appendTo($filtern_vorgegeben_auswahl);
        });

        $filtern_vorgegeben.attr("data-liste", liste).removeClass("invisible");
    } else $filtern_vorgegeben.removeAttr("data-liste").addClass("invisible");

    // Initialiserung von $filtern_eigenschaft
    $filtern_formular.find(".filtern_eigenschaft").remove();
    $.each(FILTERBARE_EIGENSCHAFTEN[liste], function (position, eigenschaft) {
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            const typ = EIGENSCHAFTEN[liste][eigenschaft].typ;
            const $neue_filtern_eigenschaft = FILTERN.$blanko_filtern_eigenschaft[typ].clone().removeClass("blanko invisible");

            $neue_filtern_eigenschaft.attr("data-eigenschaft", eigenschaft).attr("data-liste", liste);
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
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$FilternFormularInitialisieren: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    });

    // Verknüpfung von $filtern_vorgegeben und $filtern_eigenschaft mit $filtern_prio
    const $filtern_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($filtern_formular);
    Schnittstelle_Dom$Quelle$ZielEntknuepfen($filtern_formular, $filtern_prio);
    Schnittstelle_Dom$Quelle$ZielVerknuepfen($filtern_formular.find(".filtern_vorgegeben, .filtern_eigenschaft"), $filtern_prio);

    $.each($filtern_formular.find(".filtern_eigenschaft"), function () {
        const $filtern_eigenschaft = $(this);
        // Aktualisieren der $filtern_eigenschaft
        Liste_$FilternEigenschaftAktualisieren($filtern_eigenschaft);
    });
}
