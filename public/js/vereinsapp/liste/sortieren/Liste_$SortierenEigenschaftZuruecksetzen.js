/**
 * @param {JQuery} $sortieren_eigenschaft
 */

function Liste_$SortierenEigenschaftZuruecksetzen($sortieren_eigenschaft) {
    const $werkzeug = Dom_$ZielZu$QuelleZurueck($sortieren_eigenschaft);

    // Definition von sortieren_manip
    // entfällt, weil sortieren_manip komplett überschrieben wird

    // Ändern von sortieren_manip
    const sortieren_manip = undefined;

    // Überschreiben des bisherigen sortieren_manip mit geändertem sortieren_manip
    $werkzeug.val(JsonStringifiedZurueck(sortieren_manip, undefined)).trigger("change");

    // Aktualisieren der $sortieren_eigenschaft
    // entfällt, weil Modal direkt geschlossen wird
    Dom_$ModalSchliessen($sortieren_eigenschaft.closest(".modal"));
}
