/**
 * @param {JQuery} $sortieren_eigenschaft
 */

function Liste_$SortierenEigenschaftAendern($sortieren_eigenschaft) {
    const $sortieren_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($sortieren_eigenschaft);

    // Definition von bisherigem sortieren_prio_niedrig und sortieren_prio_hoch
    // entfällt, weil
    // sortieren_prio_hoch überschrieben wird und
    // sortieren_prio_niedrig nicht verwendet wird (weil Modal direkt geschlossen wird)

    // Änderung von sortieren_prio_hoch
    const $formular = $sortieren_eigenschaft.closest(".formular");
    const sortieren_prio_hoch = {
        eigenschaft: $formular.find(".sortieren_wert").val(),
        richtung: Number($formular.find(".sortieren_richtung:checked").val()),
    };

    // Überschreiben des bisherigen sortieren_prio_hoch mit geändertem sortieren_prio_hoch
    $sortieren_prio.val(JsonStringifiedZurueck(sortieren_prio_hoch, undefined)).trigger("change");

    // Aktualisieren der $sortieren_eigenschaft
    // entfällt, weil Modal direkt geschlossen wird
    Schnittstelle_Dom$ModalSchliessen($sortieren_eigenschaft.closest(".modal"));
}
