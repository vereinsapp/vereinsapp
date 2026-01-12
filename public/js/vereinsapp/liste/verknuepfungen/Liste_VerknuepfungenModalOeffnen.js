/**
 * @param {number} modal_id
 * @param {string} instanz
 * @param {string} title
 * @param {number} verknuepfte_element_id
 * @param {string} verknuepfte_liste
 */

function Liste_VerknuepfungenModalOeffnen(modal_id, instanz, title, verknuepfte_element_id, verknuepfte_liste) {
    const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, modal_id);

    const liste = $neues_modal.find("#" + instanz + ".liste").attr("data-liste");
    LISTEN[liste].instanz[instanz].$blanko_element
        .find(".verknuepfungen_auswahlmoeglichkeiten")
        .attr("data-" + LISTEN[verknuepfte_liste].element + "_id", verknuepfte_element_id);

    Schnittstelle_DomModalOeffnen($neues_modal);
    Schnittstelle_EventVariableUpdDom(liste);
}
