/**
 * @param {JQuery} $gruppieren_eigenschaft
 */

function Liste_$GruppierenEigenschaftAktualisieren($gruppieren_eigenschaft) {
    const liste = Util_WertBereinigtZurueck($gruppieren_eigenschaft.attr("liste"), undefined);
    const $werkzeug = Dom_$ZielZu$QuelleZurueck($gruppieren_eigenschaft);

    // Definition von gruppieren_eigenschaft
    const gruppieren_eigenschaft = Liste_GruppierenManipuliertZurueck(
        Util_WertBereinigtZurueck($werkzeug.attr("gruppieren_basis"), undefined),
        Util_WertBereinigtZurueck($werkzeug.val(), undefined),
        liste,
    );
    const eigenschaft = gruppieren_eigenschaft;

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            // Aktualisieren der $gruppieren_eigenschaft
            $gruppieren_eigenschaft.find(".gruppieren_wert").val(eigenschaft);
        } else
            Log_InDieKonsole(
                "Liste_$GruppierenEigenschaftAktualisieren: Eigenschaft " +
                    eigenschaft +
                    " existiert nicht in SORTIERBARE_EIGENSCHAFTEN." +
                    liste +
                    "!",
            );
    } else
        Log_InDieKonsole(
            "Liste_$GruppierenEigenschaftAktualisieren: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
        );
}
