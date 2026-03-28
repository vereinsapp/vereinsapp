/**
 * @param {JQuery} $filtern_eigenschaft
 * @param {string} filtern_wert
 */

function Liste_$FilternEigenschaftWertInExklusivAendern($filtern_eigenschaft, filtern_wert) {
    const liste = Util_WertBereinigtZurueck($filtern_eigenschaft.attr("liste"), undefined);
    const eigenschaft = Util_WertBereinigtZurueck($filtern_eigenschaft.attr("eigenschaft"), undefined);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            const $werkzeug = Dom_$ZielZu$QuelleZurueck($filtern_eigenschaft);

            // Definition von filtern_manip
            const filtern_manip = Util_WertBereinigtZurueck($werkzeug.val(), new Object());
            if (!(eigenschaft in filtern_manip)) filtern_manip[eigenschaft] = new Object();

            // Ändern von filtern_manip
            const filtern_eigenschaft = filtern_manip[eigenschaft];
            switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
                case "text":
                    // (noch) nicht möglich
                    break;
                case "zahl":
                case "zeitpunkt":
                    // (noch) keine Vielzahl an Werten
                    break;
                case "janein":
                    filtern_wert = !!filtern_wert;
                case "vorgegebene_werte":
                case "element_id":
                case "element_ids":
                    let filtern_wert_position, filtern_klasse_alt;
                    $.each(["inklusiv", "exklusiv"], function (position, filtern_klasse) {
                        if (filtern_klasse in filtern_eigenschaft && filtern_eigenschaft[filtern_klasse].includes(filtern_wert)) {
                            filtern_wert_position = filtern_eigenschaft[filtern_klasse].indexOf(filtern_wert);
                            filtern_klasse_alt = filtern_klasse;
                            return;
                        }
                    });

                    if (typeof filtern_wert_position !== "undefined" && typeof filtern_klasse_alt !== "undefined") {
                        // filtern_wert_position und filtern_klasse_alt sind definiert, d.h. eigenschaft existiert in filtern_manip
                        filtern_eigenschaft[filtern_klasse_alt].splice(filtern_wert_position, 1);
                        if (filtern_eigenschaft[filtern_klasse_alt].length === 0) delete filtern_eigenschaft[filtern_klasse_alt];
                    } else {
                        // filtern_wert_position oder filtern_klasse_alt ist nicht definiert, d.h. eigenschaft existiert noch nicht in filtern_manip
                        const filtern_basis = Util_WertBereinigtZurueck($werkzeug.attr("filtern_basis"), new Object());
                        $.each(["inklusiv", "exklusiv"], function (position, filtern_klasse) {
                            if (filtern_klasse in filtern_basis[eigenschaft] && filtern_basis[eigenschaft][filtern_klasse].includes(filtern_wert)) {
                                filtern_wert_position = filtern_basis[eigenschaft][filtern_klasse].indexOf(filtern_wert);
                                filtern_klasse_alt = filtern_klasse;
                                return;
                            }
                        });

                        if (typeof filtern_wert_position !== "undefined" && typeof filtern_klasse_alt !== "undefined") {
                            // filtern_wert_position und filtern_klasse_alt sind definiert, d.h. eigenschaft existiert in filtern_basis
                        } else {
                            // filtern_wert_position oder filtern_klasse_alt ist nicht definiert, d.h. irgendwas läuft schief
                        }
                    }

                    let filtern_klasse_neu;
                    if (filtern_klasse_alt == "inklusiv") filtern_klasse_neu = "exklusiv";
                    else if (filtern_klasse_alt == "exklusiv") filtern_klasse_neu = "inklusiv";

                    if (!(filtern_klasse_neu in filtern_eigenschaft)) filtern_eigenschaft[filtern_klasse_neu] = new Array();
                    if (!filtern_eigenschaft[filtern_klasse_neu].includes(filtern_wert)) filtern_eigenschaft[filtern_klasse_neu].push(filtern_wert);
                    else {
                        // filtern_wert steht bereits in filtern_klasse_neu (und stand auch schon in filtern_klasse_alt), d.h. irgendwas läuft schief
                    }

                    break;
            }

            // Überschreiben des bisherigen filtern_manip mit geändertem filtern_manip
            $werkzeug.val(JsonStringifiedZurueck(filtern_manip, new Object())).trigger("change");

            // Aktualisieren der $filtern_eigenschaft
            Liste_$FilternEigenschaftAktualisieren($filtern_eigenschaft);
        } else
            Log_InDieKonsole(
                "Liste_$FilternEigenschaftWertInExklusivAendern: Eigenschaft " +
                    eigenschaft +
                    " existiert nicht in FILTERBARE_EIGENSCHAFTEN." +
                    liste +
                    "!",
            );
    } else
        Log_InDieKonsole(
            "Liste_$FilternEigenschaftWertInExklusivAendern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
        );
}
