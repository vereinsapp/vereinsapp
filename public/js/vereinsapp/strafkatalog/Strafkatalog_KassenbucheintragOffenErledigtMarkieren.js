function Strafkatalog_KassenbucheintragOffenErledigtMarkieren(bestaetigung_einfordern, dom, title, kassenbucheintrag_id) {
    if (typeof kassenbucheintrag_id !== "undefined") kassenbucheintrag_id = Number(kassenbucheintrag_id);
    else if ("$btn_ausloesend" in dom && typeof dom.$btn_ausloesend.attr("data-element_id") !== "undefined")
        kassenbucheintrag_id = Schnittstelle_VariableWertBereinigtZurueck(dom.$btn_ausloesend.attr("data-element_id"), undefined);

    if (bestaetigung_einfordern) {
        let erledigt_string;
        if (Schnittstelle_VariableRausZurueck("erledigt", kassenbucheintrag_id, "kassenbuch", null) !== null) erledigt_string = "offen";
        else erledigt_string = "erledigt";
        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich den Kassenbucheintrag " +
                Liste_ElementBeschriftungZurueck(kassenbucheintrag_id, "kassenbuch") +
                " als " +
                erledigt_string +
                " markieren?",
            title,
            "btn_kassenbucheintrag_offen_erledigt_markieren",
            { kassenbucheintrag_id: kassenbucheintrag_id }
        );
    } else {
        let erledigt;
        if (Schnittstelle_VariableRausZurueck("erledigt", kassenbucheintrag_id, "kassenbuch", null) !== null) erledigt = null;
        else erledigt = DATETIME.now();
        Strafkatalog_KassenbucheintragAendern(false, dom, { erledigt: erledigt }, title, kassenbucheintrag_id);
    }
}
