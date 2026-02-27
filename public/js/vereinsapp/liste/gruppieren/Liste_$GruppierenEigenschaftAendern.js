/**
 * @param {JQuery} $gruppieren_eigenschaft
 */

function Liste_$GruppierenEigenschaftAendern($gruppieren_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_eigenschaft.attr("data-liste"), undefined);
    const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_eigenschaft.find(".gruppieren_wert").val(), undefined);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in GRUPPIERBARE_EIGENSCHAFTEN && GRUPPIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            const $werkzeug = Schnittstelle_Dom$ZielZu$QuelleZurueck($gruppieren_eigenschaft);

            // Definition von gruppieren_manip
            // entfällt, weil gruppieren_manip komplett überschrieben wird

            // Ändern von gruppieren_manip
            const gruppieren_manip = eigenschaft;

            // Überschreiben des bisherigen gruppieren_manip mit geändertem gruppieren_manip
            $werkzeug.val(JsonStringifiedZurueck(gruppieren_manip, undefined)).trigger("change");

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
