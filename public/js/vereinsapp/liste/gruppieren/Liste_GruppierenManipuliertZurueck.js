/**
 * @param {Object} gruppieren_basis
 * @param {Object} gruppieren_manip
 * @param {string} liste
 */

function Liste_GruppierenManipuliertZurueck(gruppieren_basis, gruppieren_manip, liste) {
    if (typeof gruppieren_manip === "undefined") {
        const eigenschaft = gruppieren_manip;
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            if (liste in GRUPPIERBARE_EIGENSCHAFTEN && GRUPPIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
                return gruppieren_manip;
            } else
                Schnittstelle_LogInDieKonsole(
                    "Liste_GruppierenManipuliertZurueck: manip-Eigenschaft " +
                        eigenschaft +
                        " existiert nicht in GRUPPIERBARE_EIGENSCHAFTEN." +
                        liste +
                        "!",
                );
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_GruppierenManipuliertZurueck: manip-Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    }

    if (typeof gruppieren_basis === "undefined") {
        const eigenschaft = gruppieren_basis;
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            if (liste in GRUPPIERBARE_EIGENSCHAFTEN && GRUPPIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
                return gruppieren_basis;
            } else
                Schnittstelle_LogInDieKonsole(
                    "Liste_GruppierenManipuliertZurueck: basis-Eigenschaft " +
                        eigenschaft +
                        " existiert nicht in GRUPPIERBARE_EIGENSCHAFTEN." +
                        liste +
                        "!",
                );
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_GruppierenManipuliertZurueck: basis-Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    }

    return { eigenschaft: undefined, richtung: undefined };
}
