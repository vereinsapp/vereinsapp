/**
 * @param {JQuery} $filtern_manip
 */

function Liste_$FilternModalOeffnen($filtern_manip) {
    const $neues_filtern_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($filtern_manip.attr("data-title"), undefined),
        "FILTERN",
    );

    const $filtern_formular = $neues_filtern_modal.find(".formular");
    $filtern_formular.attr("data-liste", Schnittstelle_VariableWertBereinigtZurueck($filtern_manip.attr("data-liste"), undefined));

    Schnittstelle_Dom$Quelle$ZielVerknuepfen($filtern_formular, $filtern_manip);
    Schnittstelle_Dom$ModalOeffnen($neues_filtern_modal);
    Liste_$FilternFormularInitialisieren($filtern_formular);
}
