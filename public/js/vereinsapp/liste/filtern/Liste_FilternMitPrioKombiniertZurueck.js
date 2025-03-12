function Liste_FilternMitPrioKombiniertZurueck(filtern, filtern_prio, liste) {
    if (Object.keys(filtern).length === 0 && Object.keys(filtern_prio).length > 0) filtern_kombiniert = filtern_prio;
    else if (Object.keys(filtern_prio).length === 0 && Object.keys(filtern).length > 0) filtern_kombiniert = filtern;
    else {
        filtern_kombiniert = new Object();
        $.each(filtern, function (eigenschaft) {
            if (eigenschaft in filtern_prio) {
                switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
                    case "text":
                        // (noch) kein filtern möglich
                        break;
                    case "zahl":
                    case "zeitpunkt":
                        if ("start" in filtern_prio[eigenschaft]) filtern_kombiniert[eigenschaft].start = filtern_prio[eigenschaft].start;
                        else {
                            if (!(eigenschaft in filtern_kombiniert)) filtern_kombiniert[eigenschaft] = new Object();
                            filtern_kombiniert[eigenschaft].start = filtern[eigenschaft].start;
                        }
                        if ("ende" in filtern_prio[eigenschaft]) filtern_kombiniert[eigenschaft].ende = filtern_prio[eigenschaft].ende;
                        else {
                            if (!(eigenschaft in filtern_kombiniert)) filtern_kombiniert[eigenschaft] = new Object();
                            filtern_kombiniert[eigenschaft].ende = filtern[eigenschaft].ende;
                        }
                        break;
                    case "vorgegebene_werte":
                    case "element_id":
                        if (!(eigenschaft in filtern_kombiniert)) filtern_kombiniert[eigenschaft] = new Object();
                        if (!("inklusiv" in filtern[eigenschaft])) filtern[eigenschaft].inklusiv = new Array();
                        if (!("inklusiv" in filtern_prio[eigenschaft])) filtern_prio[eigenschaft].inklusiv = new Array();
                        filtern_kombiniert[eigenschaft].inklusiv = filtern[eigenschaft].inklusiv.concat(filtern_prio[eigenschaft].inklusiv);
                        if (!("exklusiv" in filtern[eigenschaft])) filtern[eigenschaft].exklusiv = new Array();
                        if (!("exklusiv" in filtern_prio[eigenschaft])) filtern_prio[eigenschaft].exklusiv = new Array();
                        filtern_kombiniert[eigenschaft].exklusiv = filtern[eigenschaft].exklusiv.concat(filtern_prio[eigenschaft].exklusiv);
                        break;
                }
                delete filtern[eigenschaft];
                delete filtern_prio[eigenschaft];
            } else {
                filtern_kombiniert[eigenschaft] = filtern[eigenschaft];
                delete filtern[eigenschaft];
            }
        });
        $.each(filtern_prio, function (eigenschaft) {
            filtern_kombiniert[eigenschaft] = filtern_prio[eigenschaft];
            delete filtern_prio[eigenschaft];
        });
    }

    // todo:
    // if (Object.keys(filtern).length !== 0 || Object.keys(filtern_prio).length !== 0)
    //     Schnittstelle_LogInDieKonsole("Liste_FilternMitPrioKombiniertZurueck", filtern, filtern_prio, liste);

    return filtern_kombiniert;
}
