/**
 * @param {JQuery} $btn_filtern_modal_oeffnen
 */

function Liste_FilternModalOeffnen($btn_filtern_modal_oeffnen) {
    const $ziel = $btn_filtern_modal_oeffnen;
    const ziel_id = zufaelligeZeichenketteZurueck(8);
    if (typeof $ziel !== "undefined" && $ziel.exists()) $ziel.attr("id", ziel_id);

    const $neues_filtern_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(
        Schnittstelle_VariableWertBereinigtZurueck($btn_filtern_modal_oeffnen.attr("data-title"), undefined),
        "FILTERN",
    );
    Schnittstelle_Dom$ModalOeffnen($neues_filtern_modal);

    const $filtern_formular = $neues_filtern_modal.find(".formular");
    $filtern_formular
        .attr("data-ziel_id", ziel_id)
        .attr("data-liste", Schnittstelle_VariableWertBereinigtZurueck($btn_filtern_modal_oeffnen.attr("data-liste"), undefined));
    Liste_$FilternFormularInitialisieren($filtern_formular);
}
