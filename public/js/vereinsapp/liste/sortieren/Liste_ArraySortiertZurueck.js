function Liste_ArraySortiertZurueck(array, sortieren) {
    if (isObject(sortieren) && "eigenschaft" in sortieren && "richtung" in sortieren)
        return array.sort((a, b) => {
            // Sortierrichtung berücksichtigen
            const valA = sortieren.richtung === SORT_DESC ? b[sortieren.eigenschaft] : a[sortieren.eigenschaft];
            const valB = sortieren.richtung === SORT_DESC ? a[sortieren.eigenschaft] : b[sortieren.eigenschaft];

            // Luxon DateTime-Objekte vergleichen
            if (isLuxonDateTime(valA) && isLuxonDateTime(valB)) return valA.toMillis() - valB.toMillis();

            // Zahlen vergleichen
            if (typeof valA === "number" && typeof valB === "number") return valA - valB;

            // Strings vergleichen mit localeCompare
            if (typeof valA === "string" && typeof valB === "string") return valA.localeCompare(valB, undefined, { sensitivity: "base" });

            // Fallback für andere Typen
            return 0;
        });
    else return array;
}

function Liste_MultiArraySortiertZurueck(array, sortieren) {
    // https://bithacker.dev/javascript-object-multi-property-sort
    if (array.length === 0 || sortieren.length === 0) return array;
    else
        return array.sort(function (a, b) {
            let i = 0,
                result = 0;
            while (i < sortieren.length && result === 0) {
                let richtung = 1;
                if (sortieren[i].richtung == SORT_ASC) richtung = 1;
                else if (sortieren[i].richtung == SORT_DESC) richtung = -1;

                a_formatiert = a[sortieren[i].eigenschaft];
                b_formatiert = b[sortieren[i].eigenschaft];
                // Wenn aber a und b vom Typ String sind
                if (typeof a_formatiert === "string" && typeof b_formatiert === "string") {
                    a_formatiert = umlaute2unixZurueck(a_formatiert.toString());
                    b_formatiert = umlaute2unixZurueck(b_formatiert.toString());
                }

                result = richtung * (a_formatiert < b_formatiert ? -1 : a_formatiert > b_formatiert ? 1 : 0);
                i++;
            }
            return result;
        });

    function umlaute2unixZurueck(umlaute) {
        let unix = umlaute;
        $.each(
            [
                [" ", "_"],
                [" ", "-"],
                ["ä", "ae"],
                ["ö", "oe"],
                ["ü", "ue"],
                ["Ä", "Ae"],
                ["Ö", "Oe"],
                ["Ü", "Ue"],
                ["ß", "ss"],
            ],
            function (index, konvertierung) {
                unix = unix.replaceAll(konvertierung[0], konvertierung[1]);
            }
        );

        return unix;
    }
}
