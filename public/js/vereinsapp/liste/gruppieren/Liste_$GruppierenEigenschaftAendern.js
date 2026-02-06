/**
 * @param {JQuery} $gruppieren_eigenschaft
 */

function Liste_$GruppierenEigenschaftAendern($gruppieren_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_eigenschaft.attr("data-liste"), undefined);
    const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_eigenschaft.find(".gruppieren_wert").val(), undefined);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in GRUPPIERBARE_EIGENSCHAFTEN && GRUPPIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            const $gruppieren_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($gruppieren_eigenschaft);

            // Definition von gruppieren_prio_hoch
            // entfällt, weil gruppieren_prio_hoch komplett überschrieben wird

            // Ändern von gruppieren_prio_hoch
            const gruppieren_prio_hoch = eigenschaft;

            // Überschreiben des bisherigen gruppieren_prio_hoch mit geändertem gruppieren_prio_hoch
            $gruppieren_prio.val(JsonStringifiedZurueck(gruppieren_prio_hoch, undefined)).trigger("change");

            // Aktualisieren der $gruppieren_eigenschaft
            // entfällt, weil Modal direkt geschlossen wird
            Schnittstelle_Dom$ModalSchliessen($gruppieren_eigenschaft.closest(".modal"));
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$GruppierenEigenschaftAendern: Eigenschaft " + eigenschaft + " existiert nicht in GRUPPIERBARE_EIGENSCHAFTEN." + liste + "!",
            );
    } else
        Schnittstelle_LogInDieKonsole(
            "Liste_$GruppierenEigenschaftAendern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
        );
}
