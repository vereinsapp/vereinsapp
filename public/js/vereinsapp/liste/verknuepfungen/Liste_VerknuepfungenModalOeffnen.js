/**
 * @param {number} modal_id
 * @param {string} instanz
 * @param {string} title
 * @param {Object} verknuepfte_element_id
 * @param {string} verknuepfungen
 */

function Liste_VerknuepfungenModalOeffnen(modal_id, instanz, title, verknuepfte_element_id, verknuepfungen) {
    const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, modal_id);
    const liste = Schnittstelle_VariableWertBereinigtZurueck($neues_modal.find("#" + instanz + ".liste[data-liste]").attr("data-liste"), undefined);

    const verknuepfte_listen = VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen;
    $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
        const element_id = verknuepfte_element_id[LISTEN[verknuepfte_liste].element + "_id"];
        if (typeof element_id !== "undefined")
            LISTEN[liste].instanz[instanz].$blanko_element.attr("data-" + LISTEN[verknuepfte_liste].element + "_id", element_id);
    });

    Schnittstelle_DomModalOeffnen($neues_modal);
    Schnittstelle_EventVariableUpdDom(liste);
}
