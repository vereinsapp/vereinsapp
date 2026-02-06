/**
 * @param {JQuery} $gruppieren_manip
 */

function Liste_$GruppierenModalOeffnen($gruppieren_manip) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_manip.attr("data-liste"), undefined);

    const $neues_gruppieren_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($gruppieren_manip.attr("data-title"), undefined),
        "gruppieren_manip_modal",
    );

    Schnittstelle_Dom$ModalOeffnen($neues_gruppieren_modal);

    // Initialiserung von $gruppieren_vorgegeben
    // entfällt, weil (noch) keine vorgegebene Filter für gruppieren existieren

    // Initialiserung von $gruppieren_eigenschaft
    const $gruppieren_eigenschaft = $neues_gruppieren_modal.find(".gruppieren_eigenschaft");
    $gruppieren_eigenschaft.attr("data-liste", liste);
    const $gruppieren_wert = $neues_gruppieren_modal.find(".gruppieren_wert");
    $gruppieren_wert.empty();
    $.each(GRUPPIERBARE_EIGENSCHAFTEN[liste], function (position, eigenschaft) {
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($gruppieren_wert);
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$GruppierenFormularInitialisieren: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    });

    // Verknüpfung von $gruppieren_vorgegeben und $gruppieren_eigenschaft mit $gruppieren_manip
    Schnittstelle_Dom$Quelle$ZielVerknuepfen($neues_gruppieren_modal.find(".gruppieren_vorgegeben, .gruppieren_eigenschaft"), $gruppieren_manip);

    // Aktualisieren der $gruppieren_eigenschaft
    Liste_$GruppierenEigenschaftAktualisieren($gruppieren_eigenschaft);
}
