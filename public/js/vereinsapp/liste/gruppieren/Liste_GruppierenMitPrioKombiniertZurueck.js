function Liste_GruppierenMitPrioKombiniertZurueck(gruppieren_prio_niedrig, gruppieren_prio_hoch, liste) {
    let gruppieren_kombiniert;

    if (typeof gruppieren_prio_niedrig === "undefined" && typeof gruppieren_prio_hoch !== "undefined") gruppieren_kombiniert = gruppieren_prio_hoch;
    else if (typeof gruppieren_prio_hoch === "undefined" && typeof gruppieren_prio_niedrig !== "undefined")
        gruppieren_kombiniert = gruppieren_prio_niedrig;
    else {
        gruppieren_kombiniert = gruppieren_prio_hoch;
    }

    return gruppieren_kombiniert;
}
