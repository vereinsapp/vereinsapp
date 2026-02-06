/**
 * @param {Object} sortieren_basis
 * @param {Object} sortieren_manip
 * @param {string} liste
 */

function Liste_SortierenManipuliertZurueck(sortieren_basis, sortieren_manip, liste) {
    if (isObject(sortieren_manip) && "eigenschaft" in sortieren_manip && "richtung" in sortieren_manip) {
        const eigenschaft = sortieren_manip.eigenschaft;
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
                return sortieren_manip;
            } else
                Schnittstelle_LogInDieKonsole(
                    "Liste_SortierenManipuliertZurueck: manip-Eigenschaft " +
                        eigenschaft +
                        " existiert nicht in SORTIERBARE_EIGENSCHAFTEN." +
                        liste +
                        "!",
                );
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_SortierenManipuliertZurueck: manip-Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    }

    if (isObject(sortieren_basis) && "eigenschaft" in sortieren_basis && "richtung" in sortieren_basis) {
        const eigenschaft = sortieren_basis.eigenschaft;
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
                return sortieren_basis;
            } else
                Schnittstelle_LogInDieKonsole(
                    "Liste_SortierenManipuliertZurueck: basis-Eigenschaft " +
                        eigenschaft +
                        " existiert nicht in SORTIERBARE_EIGENSCHAFTEN." +
                        liste +
                        "!",
                );
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_SortierenManipuliertZurueck: basis-Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    }

    return { eigenschaft: undefined, richtung: undefined };
}
