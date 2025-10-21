function Aufgaben_AufgabeOffenErledigtMarkieren(bestaetigung_einfordern, dom, title, aufgabe_id) {
    if (typeof aufgabe_id !== "undefined") aufgabe_id = Number(aufgabe_id);
    else if ("$btn_ausloesend" in dom && typeof dom.$btn_ausloesend.attr("data-element_id") !== "undefined")
        aufgabe_id = Number(dom.$btn_ausloesend.attr("data-element_id"));

    if (bestaetigung_einfordern) {
        let erledigt_string;
        if (Schnittstelle_VariableRausZurueck("erledigt", aufgabe_id, "aufgaben", null) !== null) erledigt_string = "offen";
        else erledigt_string = "erledigt";
        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich die Aufgabe " + Liste_ElementBeschriftungZurueck(aufgabe_id, "aufgaben") + " als " + erledigt_string + " markieren?",
            title,
            "btn_aufgabe_offen_erledigt_markieren",
            { aufgabe_id: aufgabe_id }
        );
    } else {
        let erledigt;
        if (Schnittstelle_VariableRausZurueck("erledigt", aufgabe_id, "aufgaben", null) !== null) erledigt = null;
        else erledigt = DATETIME.now();
        Aufgaben_AufgabeAendern(false, dom, { erledigt: erledigt }, title, aufgabe_id);
    }
}
