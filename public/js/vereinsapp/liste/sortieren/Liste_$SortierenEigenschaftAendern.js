/**
 * @param {JQuery} $sortieren_eigenschaft
 */

function Liste_$SortierenEigenschaftAendern($sortieren_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($sortieren_eigenschaft.attr("data-liste"), undefined);
    const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($sortieren_eigenschaft.find(".sortieren_wert").val(), undefined);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            const $werkzeug = Schnittstelle_Dom$ZielZu$QuelleZurueck($sortieren_eigenschaft);

            // Definition von sortieren_manip
            // entfällt, weil sortieren_manip komplett überschrieben wird

            // Ändern von sortieren_manip
            const sortieren_manip = {
                eigenschaft: eigenschaft,
                richtung: Schnittstelle_VariableWertBereinigtZurueck($sortieren_eigenschaft.find(".sortieren_richtung:checked").val(), undefined),
            };

            // Überschreiben des bisherigen sortieren_manip mit geändertem sortieren_manip
            $werkzeug.val(JsonStringifiedZurueck(sortieren_manip, undefined)).trigger("change");

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
