/**
 * @param {JQuery} $sortieren_manip
 */

function Liste_$SortierenModalOeffnen($sortieren_manip) {
    const $neues_sortieren_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($sortieren_manip.attr("data-title"), undefined),
        "SORTIEREN",
    );

    const $sortieren_formular = $neues_sortieren_modal.find(".formular");
    $sortieren_formular.attr("data-liste", Schnittstelle_VariableWertBereinigtZurueck($sortieren_manip.attr("data-liste"), undefined));

    Schnittstelle_Dom$Quelle$ZielVerknuepfen($sortieren_formular, $sortieren_manip);
    Schnittstelle_Dom$ModalOeffnen($neues_sortieren_modal);
    Liste_$SortierenFormularInitialisieren($sortieren_formular);
}
