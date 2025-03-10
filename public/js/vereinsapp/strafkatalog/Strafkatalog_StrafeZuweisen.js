function Strafkatalog_StrafeZuweisen(auswahl_einfordern, bestaetigung_einfordern, dom, data, title, element_id, liste) {
    if (typeof element_id !== "undefined") element_id = Number(element_id);

    if (typeof data.gegen_liste === "undefined" && liste == "strafkatalog") data.gegen_liste = "mitglieder";
    else if (typeof data.gegen_liste === "undefined" && liste == "mitglieder") data.gegen_liste = "strafkatalog";

    let strafe_id, mitglied_id;
    if (liste == "strafkatalog" && data.gegen_liste == "mitglieder") {
        strafe_id = element_id;
        mitglied_id = data.gegen_element_id;
    } else if (liste == "mitglieder" && data.gegen_liste == "strafkatalog") {
        mitglied_id = element_id;
        strafe_id = data.gegen_element_id;
    }

    if (auswahl_einfordern)
        Liste_ElementAuswahlEinfordern(new Object(), title, data.gegen_liste, "btn_strafe_zuweisen", {
            gegen_liste: liste,
            gegen_element_id: element_id,
        });
    else if (bestaetigung_einfordern) {
        if (dom.$modal.exists()) Schnittstelle_DomModalSchliessen(dom.$modal);

        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich " +
                Liste_ElementBeschriftungZurueck(mitglied_id, "mitglieder") +
                " die Strafe " +
                Liste_ElementBeschriftungZurueck(strafe_id, "strafkatalog") +
                " zuweisen?",
            title,
            "btn_strafe_zuweisen",
            { liste: liste, element_id: element_id, gegen_liste: data.gegen_liste, gegen_element_id: data.gegen_element_id }
        );
    } else
        Strafkatalog_KassenbucheintragErstellen(false, dom, {
            titel: Schnittstelle_VariableRausZurueck("titel", strafe_id, "strafkatalog"),
            wert: Schnittstelle_VariableRausZurueck("wert", strafe_id, "strafkatalog"),
            mitglied_id: mitglied_id,
            erledigt: null,
            bemerkung: "Strafe",
        });
}
