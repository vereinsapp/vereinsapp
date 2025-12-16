/**
 * @param {number} modal_id
 * @param {number} liste_id
 * @param {string} title
 * @param {number} mitglied_id
 */

function Strafkatalog_OffeneKassenbucheintraegeVerwalten(modal_id, liste_id, title, mitglied_id) {
    const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, modal_id);
    const $neue_liste = $neues_modal.find("#" + liste_id + ".liste");

    const filtern = Schnittstelle_VariableWertBereinigtZurueck($neue_liste.attr("data-filtern"), new Object());
    filtern.mitglied_id = { inklusiv: [mitglied_id] };
    $neue_liste.attr("data-filtern", JsonStringifiedZurueck(filtern), new Object());

    Schnittstelle_DomModalOeffnen($neues_modal);
    Schnittstelle_EventVariableUpdDom($neue_liste.attr("data-liste"));
}
