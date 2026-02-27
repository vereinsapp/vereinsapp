/**
 * @param {JQuery} $gruppieren_eigenschaft
 */

function Liste_$GruppierenEigenschaftZuruecksetzen($gruppieren_eigenschaft) {
    const $werkzeug = Schnittstelle_Dom$ZielZu$QuelleZurueck($gruppieren_eigenschaft);

    // Definition von gruppieren_manip
    // entfällt, weil gruppieren_manip komplett überschrieben wird

    // Ändern von gruppieren_manip
    const gruppieren_manip = undefined;

    // Überschreiben des bisherigen gruppieren_manip mit geändertem gruppieren_manip
    $werkzeug.val(JsonStringifiedZurueck(gruppieren_manip, undefined)).trigger("change");

    // Aktualisieren der $gruppieren_eigenschaft
    // entfällt, weil Modal direkt geschlossen wird
    Schnittstelle_Dom$ModalSchliessen($gruppieren_eigenschaft.closest(".modal"));
}
