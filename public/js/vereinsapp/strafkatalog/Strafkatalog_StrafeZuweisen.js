function Strafkatalog_StrafeZuweisen(auswahl_einfordern, bestaetigung_einfordern, dom, title, strafe_id, mitglied_id, liste) {
    if (auswahl_einfordern) {
        if (liste === "strafkatalog") liste = "mitglieder";
        else if (liste === "mitglieder") liste = "strafkatalog";
        Liste_ElementAuswahlEinfordern($(), title, liste, "btn_strafe_zuweisen bestaetigung_einfordern", {
            strafe_id: strafe_id,
            mitglied_id: mitglied_id,
            title: title,
        });
    } else if (bestaetigung_einfordern) {
        if (dom.$modal.exists()) Schnittstelle_DomModalSchliessen(dom.$modal);

        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich " +
                Liste_ElementBeschriftungZurueck(mitglied_id, "mitglieder") +
                " die Strafe " +
                Liste_ElementBeschriftungZurueck(strafe_id, "strafkatalog") +
                " zuweisen?",
            title,
            "btn_strafe_zuweisen",
            { strafe_id: strafe_id, mitglied_id: mitglied_id },
        );
    } else
        Strafkatalog_KassenbucheintragErstellen(false, dom, {
            titel: Schnittstelle_VariableRausZurueck("titel", strafe_id, "strafkatalog", undefined),
            wert: Schnittstelle_VariableRausZurueck("wert", strafe_id, "strafkatalog", undefined),
            mitglied_id: mitglied_id,
            erledigt: null,
            bemerkung: "Strafe",
        });
}
