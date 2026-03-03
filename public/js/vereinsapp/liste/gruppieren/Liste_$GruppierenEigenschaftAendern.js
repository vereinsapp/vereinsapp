/**
 * @param {JQuery} $gruppieren_eigenschaft
 */

function Liste_$GruppierenEigenschaftAendern($gruppieren_eigenschaft) {
    const liste = Util_WertBereinigtZurueck($gruppieren_eigenschaft.attr("liste"), undefined);
    const eigenschaft = Util_WertBereinigtZurueck($gruppieren_eigenschaft.find(".gruppieren_wert").val(), undefined);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in GRUPPIERBARE_EIGENSCHAFTEN && GRUPPIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            const $werkzeug = Dom_$ZielZu$QuelleZurueck($gruppieren_eigenschaft);

            // Definition von gruppieren_manip
            // entfällt, weil gruppieren_manip komplett überschrieben wird

            // Ändern von gruppieren_manip
            const gruppieren_manip = eigenschaft;

            // Überschreiben des bisherigen gruppieren_manip mit geändertem gruppieren_manip
            $werkzeug.val(JsonStringifiedZurueck(gruppieren_manip, undefined)).trigger("change");

            // Aktualisieren der $gruppieren_eigenschaft
            // entfällt, weil Modal direkt geschlossen wird
            Dom_$ModalSchliessen($gruppieren_eigenschaft.closest(".modal"));
        } else
            Log_InDieKonsole(
                "Liste_$GruppierenEigenschaftAendern: Eigenschaft " + eigenschaft + " existiert nicht in GRUPPIERBARE_EIGENSCHAFTEN." + liste + "!",
            );
    } else Log_InDieKonsole("Liste_$GruppierenEigenschaftAendern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!");
}
