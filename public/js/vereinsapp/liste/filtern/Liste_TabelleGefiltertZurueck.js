function Liste_TabelleGefiltertZurueck(filtern, tabelle, liste) {
    const tabelle_gefiltert = new Array();
    $.each(tabelle, function () {
        const element = this;
        if ("id" in element) {
            let filtern_ergebnis = true;
            $.each(filtern, function (eigenschaft) {
                switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
                    case "text":
                        // (noch) kein filtern möglich
                        break;
                    case "zahl":
                    case "zeitpunkt":
                        if ("start" in filtern[eigenschaft]) {
                            filtern_ergebnis_start = false;
                            if (filtern[eigenschaft].start <= element[eigenschaft]) filtern_ergebnis_start = true;
                            filtern_ergebnis &= filtern_ergebnis_start;
                        }
                        if ("ende" in filtern[eigenschaft]) {
                            filtern_ergebnis_ende = false;
                            if (filtern[eigenschaft].ende >= element[eigenschaft]) filtern_ergebnis_ende = true;
                            filtern_ergebnis &= filtern_ergebnis_ende;
                        }
                        break;
                    case "vorgegebene_werte":
                    case "element_id":
                        if ("inklusiv" in filtern[eigenschaft]) {
                            filtern_ergebnis_inklusiv = false;
                            if (isArray(filtern[eigenschaft].inklusiv) && filtern[eigenschaft].inklusiv.includes(element[eigenschaft]))
                                filtern_ergebnis_inklusiv = true;
                            filtern_ergebnis &= filtern_ergebnis_inklusiv;
                        }
                        if ("exklusiv" in filtern[eigenschaft]) {
                            filtern_ergebnis_exklusiv = false;
                            if (isArray(filtern[eigenschaft].exklusiv) && !filtern[eigenschaft].exklusiv.includes(element[eigenschaft]))
                                filtern_ergebnis_exklusiv = true;
                            filtern_ergebnis &= filtern_ergebnis_exklusiv;
                        }
                        break;
                }
            });

            if (filtern_ergebnis) tabelle_gefiltert.push(element);
        }
    });

    return tabelle_gefiltert;
}
