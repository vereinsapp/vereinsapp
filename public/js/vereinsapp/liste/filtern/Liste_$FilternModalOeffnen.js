/**
 * @param {JQuery} $filtern_prio
 */

function Liste_$FilternModalOeffnen($filtern_prio) {
    const $neues_filtern_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($filtern_prio.attr("data-title"), undefined),
        "FILTERN",
    );

    const $filtern_formular = $neues_filtern_modal.find(".formular");
    $filtern_formular.attr("data-liste", Schnittstelle_VariableWertBereinigtZurueck($filtern_prio.attr("data-liste"), undefined));

    Schnittstelle_Dom$Quelle$ZielVerknuepfen($filtern_formular, $filtern_prio);
    Schnittstelle_Dom$ModalOeffnen($neues_filtern_modal);
    Liste_$FilternFormularInitialisieren($filtern_formular);
}
