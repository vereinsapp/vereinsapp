/**
 * @param {JQuery} $werkzeug
 */

function Liste_$FilternModalOeffnen($werkzeug) {
    const liste = Util_WertBereinigtZurueck($werkzeug.attr("liste"), undefined);

    const $modal = Dom_$ModalInitialisiertZurueck(
        Liste_ElementTextMitBeschriftungErsetztZurueck(Util_WertBereinigtZurueck($werkzeug.attr("modal_title"), undefined), {
            liste1: liste,
        }),
        "filtern_manip_modal",
    );

    Dom_$ModalOeffnen($modal);

    // Initialiserung von $filtern_vorgegeben
    const $filtern_vorgegeben = $modal.find(".filtern_vorgegeben");
    if (liste in FILTERN_VORGEGEBEN) {
        const $filtern_vorgegeben_auswahl = $filtern_vorgegeben.find(".filtern_vorgegeben_auswahl");
        $filtern_vorgegeben_auswahl.empty();

        $("<option selected></option>").appendTo($filtern_vorgegeben_auswahl);
        $.each(FILTERN_VORGEGEBEN[liste], function (filtern_vorgegeben_id, eigenschaften) {
            $('<option value="' + filtern_vorgegeben_id + '">' + eigenschaften.beschriftung + "</option>").appendTo($filtern_vorgegeben_auswahl);
        });

        $filtern_vorgegeben.attr("liste", liste).removeClass("invisible");
    } else $filtern_vorgegeben.removeAttr("liste").addClass("invisible");

    // Initialiserung von $filtern_eigenschaft
    const $filtern_eigenschaften = $modal.find(".filtern_eigenschaften");
    $filtern_eigenschaften.empty();
    $.each(FILTERBARE_EIGENSCHAFTEN[liste], function (position, eigenschaft) {
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            const typ = EIGENSCHAFTEN[liste][eigenschaft].typ;
            const $filtern_eigenschaft = FILTERN.$blanko_filtern_eigenschaft[typ].clone().removeClass("blanko invisible");

            $filtern_eigenschaft.attr("eigenschaft", eigenschaft).attr("liste", liste);
            $filtern_eigenschaft.find("label").find(".beschriftung").text(EIGENSCHAFTEN[liste][eigenschaft].beschriftung);

            if (typ == "janein") {
                $filtern_eigenschaft.find(".filtern_auswahl, .filtern_werte").empty();
                $("<option selected></option>").appendTo($filtern_eigenschaft.find(".filtern_auswahl"));
                $.each(JANEIN, function (wert, beschriftung) {
                    $('<option value="' + wert + '">' + beschriftung + "</option>").appendTo($filtern_eigenschaft.find(".filtern_auswahl"));
                });
            } else if (typ == "vorgegebene_werte") {
                $filtern_eigenschaft.find(".filtern_auswahl, .filtern_werte").empty();
                $("<option selected></option>").appendTo($filtern_eigenschaft.find(".filtern_auswahl"));
                $.each(VORGEGEBENE_WERTE[liste][eigenschaft], function (wert, beschriftung) {
                    $('<option value="' + wert + '">' + beschriftung + "</option>").appendTo($filtern_eigenschaft.find(".filtern_auswahl"));
                });
            }

            $filtern_eigenschaft.appendTo($filtern_eigenschaften);
        } else Log_InDieKonsole("Liste_$FilternModalOeffnen: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!");
    });

    // Verknüpfung von $filtern_vorgegeben und $filtern_eigenschaft mit $werkzeug
    Dom_$Quelle$ZielVerknuepfen($modal.find(".filtern_vorgegeben, .filtern_eigenschaft"), $werkzeug);

    $.each($filtern_eigenschaften.find(".filtern_eigenschaft"), function () {
        const $filtern_eigenschaft = $(this);
        // Aktualisieren der $filtern_eigenschaft
        Liste_$FilternEigenschaftAktualisieren($filtern_eigenschaft);
    });
}
