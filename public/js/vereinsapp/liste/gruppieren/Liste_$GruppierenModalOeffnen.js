/**
 * @param {JQuery} $gruppieren_manip
 */

function Liste_$GruppierenModalOeffnen($gruppieren_manip) {
    const $neues_gruppieren_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($gruppieren_manip.attr("data-title"), undefined),
        "GRUPPIEREN",
    );

    const $gruppieren_formular = $neues_gruppieren_modal.find(".formular");
    $gruppieren_formular.attr("data-liste", Schnittstelle_VariableWertBereinigtZurueck($gruppieren_manip.attr("data-liste"), undefined));

    Schnittstelle_Dom$Quelle$ZielVerknuepfen($gruppieren_formular, $gruppieren_manip);
    Schnittstelle_Dom$ModalOeffnen($neues_gruppieren_modal);
    Liste_$GruppierenFormularInitialisieren($gruppieren_formular);
}
