/**
 * @param {Object} gruppieren_prio_niedrig
 * @param {Object} gruppieren_prio_hoch
 * @param {string} liste
 */

function Liste_GruppierenMitPrioKombiniertZurueck(gruppieren_prio_niedrig, gruppieren_prio_hoch, liste) {
    if (typeof gruppieren_prio_hoch === "undefined") {
        const eigenschaft = gruppieren_prio_hoch;
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            if (liste in GRUPPIERBARE_EIGENSCHAFTEN && GRUPPIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
                return gruppieren_prio_hoch;
            } else
                Schnittstelle_LogInDieKonsole(
                    "Liste_GruppierenMitPrioKombiniertZurueck: Prio-Hoch-Eigenschaft " +
                        eigenschaft +
                        " existiert nicht in GRUPPIERBARE_EIGENSCHAFTEN." +
                        liste +
                        "!",
                );
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_GruppierenMitPrioKombiniertZurueck: Prio-Hoch-Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    }

    if (typeof gruppieren_prio_niedrig === "undefined") {
        const eigenschaft = gruppieren_prio_niedrig;
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            if (liste in GRUPPIERBARE_EIGENSCHAFTEN && GRUPPIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
                return gruppieren_prio_niedrig;
            } else
                Schnittstelle_LogInDieKonsole(
                    "Liste_GruppierenMitPrioKombiniertZurueck: Prio-Niedrig-Eigenschaft " +
                        eigenschaft +
                        " existiert nicht in GRUPPIERBARE_EIGENSCHAFTEN." +
                        liste +
                        "!",
                );
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_GruppierenMitPrioKombiniertZurueck: Prio-Niedrig-Eigenschaft " +
                    eigenschaft +
                    " existiert nicht in EIGENSCHAFTEN." +
                    liste +
                    "!",
            );
    }

    return { eigenschaft: undefined, richtung: undefined };
}
