/**
 * @param {JQuery} $sortieren_eigenschaft
 */

function Liste_$SortierenEigenschaftAendern($sortieren_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($sortieren_eigenschaft.attr("data-liste"), undefined);
    const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($sortieren_eigenschaft.find(".sortieren_wert").val(), undefined);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            const $sortieren_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($sortieren_eigenschaft);

            // Definition von sortieren_prio_hoch
            // entfällt, weil sortieren_prio_hoch komplett überschrieben wird

            // Ändern von sortieren_prio_hoch
            const sortieren_prio_hoch = {
                eigenschaft: eigenschaft,
                richtung: Schnittstelle_VariableWertBereinigtZurueck($sortieren_eigenschaft.find(".sortieren_richtung:checked").val(), undefined),
            };

            // Überschreiben des bisherigen sortieren_prio_hoch mit geändertem sortieren_prio_hoch
            $sortieren_prio.val(JsonStringifiedZurueck(sortieren_prio_hoch, undefined)).trigger("change");

            // Aktualisieren der $sortieren_eigenschaft
            // entfällt, weil Modal direkt geschlossen wird
            Schnittstelle_Dom$ModalSchliessen($sortieren_eigenschaft.closest(".modal"));
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$SortierenEigenschaftAendern: Eigenschaft " + eigenschaft + " existiert nicht in SORTIERBARE_EIGENSCHAFTEN." + liste + "!",
            );
    } else
        Schnittstelle_LogInDieKonsole(
            "Liste_$SortierenEigenschaftAendern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
        );
}
