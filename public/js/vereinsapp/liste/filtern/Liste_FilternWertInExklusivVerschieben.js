function Liste_FilternWertInExklusivVerschieben(dom, instanz, liste) {
    const $filtern_wert = dom.$filtern_wert;
    let filtern_wert = Schnittstelle_VariableWertBereinigtZurueck($filtern_wert.attr("data-wert"));
    const eigenschaft = $filtern_wert.closest(".filtern_eigenschaft").attr("data-eigenschaft");

    const filtern_eigenschaft = LISTEN[liste].instanz[instanz].filtern[eigenschaft];

    switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
        case "text":
            // (noch) kein filtern möglich
            break;
        case "zahl":
        case "zeitpunkt":
            // (noch) keine Vielzahl an Werten
            break;
        case "vorgegebene_werte":
        case "janein":
        case "element_id":
            if (EIGENSCHAFTEN[liste][eigenschaft].typ == "janein") filtern_wert = JANEIN[filtern_wert].wert;

            let filtern_klasse_alt, filtern_wert_position;
            $.each(["inklusiv", "exklusiv"], function (position, filtern_klasse) {
                if (filtern_klasse in filtern_eigenschaft && filtern_eigenschaft[filtern_klasse].includes(filtern_wert)) {
                    filtern_wert_position = filtern_eigenschaft[filtern_klasse].indexOf(filtern_wert);
                    filtern_klasse_alt = filtern_klasse;
                    return;
                }
            });

            filtern_eigenschaft[filtern_klasse_alt].splice(filtern_wert_position, 1);
            if (filtern_eigenschaft[filtern_klasse_alt].length === 0) delete filtern_eigenschaft[filtern_klasse_alt];

            let filtern_klasse_neu;
            if (filtern_klasse_alt == "inklusiv") filtern_klasse_neu = "exklusiv";
            else if (filtern_klasse_alt == "exklusiv") filtern_klasse_neu = "inklusiv";

            if (!(filtern_klasse_neu in filtern_eigenschaft)) filtern_eigenschaft[filtern_klasse_neu] = new Array();
            if (!filtern_eigenschaft[filtern_klasse_neu].includes(filtern_wert)) {
                filtern_eigenschaft[filtern_klasse_neu].push(filtern_wert);

                if (filtern_klasse_neu == "exklusiv") $filtern_wert.find(".beschriftung").addClass("text-decoration-line-through");
                else if (filtern_klasse_neu == "inklusiv") $filtern_wert.find(".beschriftung").removeClass("text-decoration-line-through");
            }

            break;
    }

    if (Object.keys(filtern_eigenschaft).length === 0) delete LISTEN[liste].instanz[instanz].filtern[eigenschaft];

    Schnittstelle_EventAusfuehren(
        [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
        { liste: liste }
    );
}
