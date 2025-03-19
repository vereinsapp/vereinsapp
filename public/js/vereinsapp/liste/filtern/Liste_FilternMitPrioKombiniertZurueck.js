function Liste_FilternMitPrioKombiniertZurueck(filtern, filtern_prio, liste) {
    if (Object.keys(filtern).length === 0 && Object.keys(filtern_prio).length > 0) filtern_kombiniert = filtern_prio;
    else if (Object.keys(filtern_prio).length === 0 && Object.keys(filtern).length > 0) filtern_kombiniert = filtern;
    else {
        filtern_kombiniert = new Object();

        $.each(Object.keys(filtern).concat(Object.keys(filtern_prio)), function (schluessel, eigenschaft) {
            filtern_kombiniert[eigenschaft] = new Object();
            switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
                case "text":
                    // (noch) kein filtern möglich
                    break;
                case "zahl":
                case "zeitpunkt":
                    $.each(["start", "ende"], function (position, filtern_klasse) {
                        if (eigenschaft in filtern_prio && filtern_klasse in filtern_prio[eigenschaft])
                            filtern_kombiniert[eigenschaft][filtern_klasse] = filtern_prio[eigenschaft][filtern_klasse];
                        else if (eigenschaft in filtern && filtern_klasse in filtern[eigenschaft])
                            filtern_kombiniert[eigenschaft][filtern_klasse] = filtern[eigenschaft][filtern_klasse];
                    });
                    break;
                case "vorgegebene_werte":
                case "janein":
                case "element_id":
                    $.each(["inklusiv", "exklusiv"], function (position, filtern_klasse) {
                        let filtern_eigenschaft_filtern_klasse = new Array();
                        let filtern_prio_eigenschaft_filtern_klasse = new Array();
                        if (eigenschaft in filtern && filtern_klasse in filtern[eigenschaft])
                            filtern_eigenschaft_filtern_klasse = filtern[eigenschaft][filtern_klasse];
                        if (eigenschaft in filtern_prio && filtern_klasse in filtern_prio[eigenschaft])
                            filtern_prio_eigenschaft_filtern_klasse = filtern_prio[eigenschaft][filtern_klasse];
                        if (filtern_eigenschaft_filtern_klasse.length > 0 || filtern_prio_eigenschaft_filtern_klasse.length > 0)
                            filtern_kombiniert[eigenschaft][filtern_klasse] = filtern_eigenschaft_filtern_klasse.concat(
                                filtern_prio_eigenschaft_filtern_klasse
                            );
                    });
                    break;
            }
        });
    }

    return filtern_kombiniert;
}
