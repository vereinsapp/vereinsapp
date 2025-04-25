function Strafkatalog_KassenbucheintragOffenErledigtMarkieren(bestaetigung_einfordern, dom, title, kassenbucheintrag_id) {
    if (typeof kassenbucheintrag_id !== "undefined") kassenbucheintrag_id = Number(kassenbucheintrag_id);
    else if ("$btn_ausloesend" in dom && typeof dom.$btn_ausloesend.attr("data-element_id") !== "undefined")
        kassenbucheintrag_id = Number(dom.$btn_ausloesend.attr("data-element_id"));
    let erledigt = Schnittstelle_VariableRausZurueck("erledigt", kassenbucheintrag_id, "kassenbuch");

    if (bestaetigung_einfordern) {
        if (erledigt === null) erledigt = "erledigt";
        else erledigt = "offen";
        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich den Kassenbucheintrag " +
                Liste_ElementBeschriftungZurueck(kassenbucheintrag_id, "kassenbuch") +
                " als " +
                erledigt +
                " markieren?",
            title,
            "btn_kassenbucheintrag_offen_erledigt_markieren",
            { kassenbucheintrag_id: kassenbucheintrag_id }
        );
    } else {
        if (erledigt === null) erledigt = DateTime.now();
        else erledigt = null;
        Strafkatalog_KassenbucheintragAendern(false, dom, { erledigt: erledigt }, title, kassenbucheintrag_id);
    }
}
