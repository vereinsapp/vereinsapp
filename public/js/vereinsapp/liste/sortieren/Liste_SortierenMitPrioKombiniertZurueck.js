function Liste_SortierenMitPrioKombiniertZurueck(sortieren_prio_niedrig, sortieren_prio_hoch, liste) {
    let sortieren_kombiniert;

    if (
        (typeof sortieren_prio_niedrig === "undefined" ||
            isEmptyString(sortieren_prio_niedrig) ||
            Object.keys(sortieren_prio_niedrig).length === 0) &&
        isObject(sortieren_prio_hoch) &&
        Object.keys(sortieren_prio_hoch).length > 0
    )
        sortieren_kombiniert = sortieren_prio_hoch;
    else if (
        (typeof sortieren_prio_hoch === "undefined" || isEmptyString(sortieren_prio_hoch) || Object.keys(sortieren_prio_hoch).length === 0) &&
        isObject(sortieren_prio_niedrig) &&
        Object.keys(sortieren_prio_niedrig).length > 0
    )
        sortieren_kombiniert = sortieren_prio_niedrig;
    else {
        sortieren_kombiniert = sortieren_prio_hoch;
    }

    return sortieren_kombiniert;
}
