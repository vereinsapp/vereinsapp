/**
 * @param {JQuery} $sortieren_prio
 */

function Liste_SortierenModalOeffnen($sortieren_prio) {
    const $neues_sortieren_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($sortieren_prio.attr("data-title"), undefined),
        "SORTIEREN",
    );

    const $sortieren_formular = $neues_sortieren_modal.find(".formular");
    $sortieren_formular.attr("data-liste", Schnittstelle_VariableWertBereinigtZurueck($sortieren_prio.attr("data-liste"), undefined));

    Schnittstelle_Dom$Quelle$ZielVerknuepfen($sortieren_formular, $sortieren_prio);
    Schnittstelle_Dom$ModalOeffnen($neues_sortieren_modal);
    Liste_$SortierenFormularInitialisieren($sortieren_formular);
}
