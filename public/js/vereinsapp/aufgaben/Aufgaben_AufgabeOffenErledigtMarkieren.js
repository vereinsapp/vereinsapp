function Aufgaben_AufgabeOffenErledigtMarkieren(bestaetigung_einfordern, dom, title, aufgabe_id) {
    if (typeof aufgabe_id !== "undefined") aufgabe_id = Number(aufgabe_id);
    else if ("$btn_ausloesend" in dom && typeof dom.$btn_ausloesend.attr("data-element_id") !== "undefined")
        aufgabe_id = Number(dom.$btn_ausloesend.attr("data-element_id"));
    let erledigt = Schnittstelle_VariableRausZurueck("erledigt", aufgabe_id, "aufgaben");

    if (bestaetigung_einfordern) {
        if (erledigt === null) erledigt = "erledigt";
        else erledigt = "offen";
        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich die Aufgabe " + Liste_ElementBeschriftungZurueck(aufgabe_id, "aufgaben") + " als " + erledigt + " markieren?",
            title,
            "btn_aufgabe_offen_erledigt_markieren",
            { aufgabe_id: aufgabe_id }
        );
    } else {
        if (erledigt === null) erledigt = DateTime.now();
        else erledigt = null;
        Aufgaben_AufgabeAendern(false, dom, { erledigt: erledigt }, title, aufgabe_id);
    }
}
