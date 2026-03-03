/**
 * @param {JQuery} $quelle
 */

function Schnittstelle_Dom$ZielZu$QuelleZurueck($quelle) {
    if (typeof $quelle !== "undefined" && $quelle.exists()) {
        const $ziel = $("#" + $quelle.attr("ziel_id"));
        if (typeof $ziel !== "undefined" && $ziel.exists()) return $ziel;
        else {
            Schnittstelle_LogInDieKonsole("Schnittstelle_Dom$ZielZu$QuelleZurueck: Ziel für #" + $quelle.attr("ziel_id") + " nicht gefunden!");
            return $(); // todo: ist das wirklich korrekt?
        }
    } else {
        Schnittstelle_LogInDieKonsole("Schnittstelle_Dom$ZielZu$QuelleZurueck: Quelle nicht gefunden!");
        return $(); // todo: ist das wirklich korrekt?
    }
}
