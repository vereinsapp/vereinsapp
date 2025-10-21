function Schnittstelle_LogInDieKonsole(...log) {
    $.each(log, function (position, eintrag) {
        if (!isJquery(eintrag) && isObject(eintrag)) log[position] = JSON.parse(JsonStringifiedZurueck(eintrag));
        if (isArray(eintrag)) log[position] = JSON.parse(JsonStringifiedZurueck(eintrag));
    });

    console.log(...log);
}
