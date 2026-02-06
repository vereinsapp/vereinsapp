/**
 * @param {Object} gruppieren_prio_niedrig
 * @param {Object} gruppieren_prio_hoch
 * @param {string} liste
 */

function Liste_GruppierenMitPrioKombiniertZurueck(gruppieren_prio_niedrig, gruppieren_prio_hoch, liste) {
    let gruppieren_kombiniert;

    if ((typeof gruppieren_prio_niedrig === "undefined" || isEmptyString(gruppieren_prio_niedrig)) && typeof gruppieren_prio_hoch !== "undefined")
        gruppieren_kombiniert = gruppieren_prio_hoch;
    else if ((typeof gruppieren_prio_hoch === "undefined" || isEmptyString(gruppieren_prio_hoch)) && typeof gruppieren_prio_niedrig !== "undefined")
        gruppieren_kombiniert = gruppieren_prio_niedrig;
    else {
        gruppieren_kombiniert = gruppieren_prio_hoch;
    }

    return gruppieren_kombiniert;
}
