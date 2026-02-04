/**
 * @param {JQuery} $gruppieren_prio
 */

function Liste_GruppierenModalOeffnen($gruppieren_prio) {
    const $neues_gruppieren_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($gruppieren_prio.attr("data-title"), undefined),
        "GRUPPIEREN",
    );

    const $gruppieren_formular = $neues_gruppieren_modal.find(".formular");
    $gruppieren_formular.attr("data-liste", Schnittstelle_VariableWertBereinigtZurueck($gruppieren_prio.attr("data-liste"), undefined));

    Schnittstelle_Dom$Quelle$ZielVerknuepfen($gruppieren_formular, $gruppieren_prio);
    Schnittstelle_Dom$ModalOeffnen($neues_gruppieren_modal);
    Liste_$GruppierenFormularInitialisieren($gruppieren_formular);
}
