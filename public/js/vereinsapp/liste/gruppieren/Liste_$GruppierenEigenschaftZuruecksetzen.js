/**
 * @param {JQuery} $gruppieren_eigenschaft
 */

function Liste_$GruppierenEigenschaftZuruecksetzen($gruppieren_eigenschaft) {
    const $gruppieren_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($gruppieren_eigenschaft);

    // Definition von bisherigem gruppieren_prio_niedrig und gruppieren_prio_hoch
    // entfällt, weil
    // gruppieren_prio_hoch überschrieben wird und
    // gruppieren_prio_niedrig nicht verwendet wird (weil Modal direkt geschlossen wird)

    // Änderung von gruppieren_prio_hoch
    const gruppieren_prio_hoch = undefined;

    // Überschreiben des bisherigen gruppieren_prio_hoch mit geändertem gruppieren_prio_hoch
    $gruppieren_prio.val(JsonStringifiedZurueck(gruppieren_prio_hoch, undefined)).trigger("change");

    // Aktualisieren der $gruppieren_eigenschaft
    // entfällt, weil Modal direkt geschlossen wird
    Schnittstelle_Dom$ModalSchliessen($gruppieren_eigenschaft.closest(".modal"));
}
