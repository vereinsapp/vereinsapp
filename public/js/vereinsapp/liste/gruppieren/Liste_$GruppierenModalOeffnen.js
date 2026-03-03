/**
 * @param {JQuery} $werkzeug
 */

function Liste_$GruppierenModalOeffnen($werkzeug) {
    const liste = Liste_WertBereinigtZurueck($werkzeug.attr("liste"), undefined);

    const $neues_gruppieren_modal = Dom_$NeuesModalInitialisiertZurueck(
        Liste_WertBereinigtZurueck($werkzeug.attr("modal_title"), undefined),
        "gruppieren_manip_modal",
    );

    Dom_$ModalOeffnen($neues_gruppieren_modal);

    // Initialiserung von $gruppieren_vorgegeben
    // entfällt, weil (noch) keine vorgegebene Filter für gruppieren existieren

    // Initialiserung von $gruppieren_eigenschaft
    const $gruppieren_eigenschaft = $neues_gruppieren_modal.find(".gruppieren_eigenschaft");
    $gruppieren_eigenschaft.attr("liste", liste);
    const $gruppieren_wert = $neues_gruppieren_modal.find(".gruppieren_wert");
    $gruppieren_wert.empty();
    $.each(GRUPPIERBARE_EIGENSCHAFTEN[liste], function (position, eigenschaft) {
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($gruppieren_wert);
        } else
            Log_InDieKonsole(
                "Liste_$GruppierenFormularInitialisieren: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    });

    // Verknüpfung von $gruppieren_vorgegeben und $gruppieren_eigenschaft mit $werkzeug
    Dom_$Quelle$ZielVerknuepfen($neues_gruppieren_modal.find(".gruppieren_vorgegeben, .gruppieren_eigenschaft"), $werkzeug);

    // Aktualisieren der $gruppieren_eigenschaft
    Liste_$GruppierenEigenschaftAktualisieren($gruppieren_eigenschaft);
}
