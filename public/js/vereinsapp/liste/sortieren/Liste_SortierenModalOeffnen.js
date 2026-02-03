/**
 * @param {JQuery} $btn_sortieren_modal_oeffnen
 */

function Liste_SortierenModalOeffnen($btn_sortieren_modal_oeffnen) {
    const $ziel = $btn_sortieren_modal_oeffnen;
    const ziel_id = zufaelligeZeichenketteZurueck(8);
    if (typeof $ziel !== "undefined" && $ziel.exists()) $ziel.attr("id", ziel_id);

    const $neues_sortieren_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($btn_sortieren_modal_oeffnen.attr("data-title"), undefined),
        "SORTIEREN",
    );
    Schnittstelle_Dom$ModalOeffnen($neues_sortieren_modal);

    const $sortieren_formular = $neues_sortieren_modal.find(".formular");
    $sortieren_formular
        .attr("data-ziel_id", ziel_id)
        .attr("data-liste", Schnittstelle_VariableWertBereinigtZurueck($btn_sortieren_modal_oeffnen.attr("data-liste"), undefined));
    Liste_$SortierenFormularInitialisieren($sortieren_formular);
}
