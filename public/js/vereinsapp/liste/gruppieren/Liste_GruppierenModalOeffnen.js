/**
 * @param {JQuery} $btn_gruppieren_modal_oeffnen
 */

function Liste_GruppierenModalOeffnen($btn_gruppieren_modal_oeffnen) {
    const $ziel = $btn_sortieren_modal_oeffnen;
    const ziel_id = zufaelligeZeichenketteZurueck(8);
    if (typeof $ziel !== "undefined" && $ziel.exists()) $ziel.attr("id", ziel_id);

    const $neues_gruppieren_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($btn_gruppieren_modal_oeffnen.attr("data-title"), undefined),
        "GRUPPIEREN",
    );
    Schnittstelle_Dom$ModalOeffnen($neues_gruppieren_modal);

    const $gruppieren_formular = $neues_gruppieren_modal.find(".formular");
    $gruppieren_formular
        .attr("data-ziel_id", ziel_id)
        .attr("data-liste", Schnittstelle_VariableWertBereinigtZurueck($btn_gruppieren_modal_oeffnen.attr("data-liste"), undefined));
    Liste_$GruppierenFormularInitialisieren($gruppieren_formular);
}
