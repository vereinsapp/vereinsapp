function Liste_FilternMitPrioKombiniertZurueck(filtern_prio_niedrig, filtern_prio_hoch, liste) {
    let filtern_kombiniert;

    if (
        (typeof filtern_prio_niedrig === "undefined" || isEmptyString(filtern_prio_niedrig) || Object.keys(filtern_prio_niedrig).length === 0) &&
        isObject(filtern_prio_hoch) &&
        Object.keys(filtern_prio_hoch).length > 0
    )
        filtern_kombiniert = filtern_prio_hoch;
    else if (
        (typeof filtern_prio_hoch === "undefined" || isEmptyString(filtern_prio_hoch) || Object.keys(filtern_prio_hoch).length === 0) &&
        isObject(filtern_prio_niedrig) &&
        Object.keys(filtern_prio_niedrig).length > 0
    )
        filtern_kombiniert = filtern_prio_niedrig;
    else {
        filtern_kombiniert = new Object();

        $.each(Object.keys(filtern_prio_niedrig).concat(Object.keys(filtern_prio_hoch)), function (schluessel, eigenschaft) {
            filtern_kombiniert[eigenschaft] = new Object();
            switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
                case "text":
                    // (noch) kein filtern möglich
                    break;
                case "zahl":
                case "zeitpunkt":
                    $.each(["start", "ende"], function (position, filtern_klasse) {
                        if (eigenschaft in filtern_prio_hoch && filtern_klasse in filtern_prio_hoch[eigenschaft])
                            filtern_kombiniert[eigenschaft][filtern_klasse] = filtern_prio_hoch[eigenschaft][filtern_klasse];
                        else if (eigenschaft in filtern_prio_niedrig && filtern_klasse in filtern_prio_niedrig[eigenschaft])
                            filtern_kombiniert[eigenschaft][filtern_klasse] = filtern_prio_niedrig[eigenschaft][filtern_klasse];
                    });
                    break;
                case "vorgegebene_werte":
                case "janein":
                case "element_id":
                    $.each(["inklusiv", "exklusiv"], function (position, filtern_klasse) {
                        if (eigenschaft in filtern_prio_hoch) {
                            if (filtern_klasse in filtern_prio_hoch[eigenschaft])
                                filtern_kombiniert[eigenschaft][filtern_klasse] = filtern_prio_hoch[eigenschaft][filtern_klasse];
                        } else if (eigenschaft in filtern_prio_niedrig) {
                            if (filtern_klasse in filtern_prio_niedrig[eigenschaft])
                                filtern_kombiniert[eigenschaft][filtern_klasse] = filtern_prio_niedrig[eigenschaft][filtern_klasse];
                        }
                    });
                    break;
            }
        });
    }

    return filtern_kombiniert;
}
