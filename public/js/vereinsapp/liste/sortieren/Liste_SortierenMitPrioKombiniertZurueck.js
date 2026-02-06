/**
 * @param {Object} sortieren_prio_niedrig
 * @param {Object} sortieren_prio_hoch
 * @param {string} liste
 */

function Liste_SortierenMitPrioKombiniertZurueck(sortieren_prio_niedrig, sortieren_prio_hoch, liste) {
    if (isObject(sortieren_prio_hoch) && "eigenschaft" in sortieren_prio_hoch && "richtung" in sortieren_prio_hoch) {
        const eigenschaft = sortieren_prio_hoch.eigenschaft;
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
                return sortieren_prio_hoch;
            } else
                Schnittstelle_LogInDieKonsole(
                    "Liste_SortierenMitPrioKombiniertZurueck: Prio-Hoch-Eigenschaft " +
                        eigenschaft +
                        " existiert nicht in SORTIERBARE_EIGENSCHAFTEN." +
                        liste +
                        "!",
                );
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_SortierenMitPrioKombiniertZurueck: Prio-Hoch-Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    }

    if (isObject(sortieren_prio_niedrig) && "eigenschaft" in sortieren_prio_niedrig && "richtung" in sortieren_prio_niedrig) {
        const eigenschaft = sortieren_prio_niedrig.eigenschaft;
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            if (liste in SORTIERBARE_EIGENSCHAFTEN && SORTIERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
                return sortieren_prio_niedrig;
            } else
                Schnittstelle_LogInDieKonsole(
                    "Liste_SortierenMitPrioKombiniertZurueck: Prio-Niedrig-Eigenschaft " +
                        eigenschaft +
                        " existiert nicht in SORTIERBARE_EIGENSCHAFTEN." +
                        liste +
                        "!",
                );
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_SortierenMitPrioKombiniertZurueck: Prio-Niedrig-Eigenschaft " +
                    eigenschaft +
                    " existiert nicht in EIGENSCHAFTEN." +
                    liste +
                    "!",
            );
    }

    return { eigenschaft: undefined, richtung: undefined };
}
