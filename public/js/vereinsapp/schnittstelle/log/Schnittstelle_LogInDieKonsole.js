function Schnittstelle_LogInDieKonsole(...log) {
    $.each(log, function (position, eintrag) {
        if (isObject(eintrag) && !isJquery(eintrag)) log[position] = JSON.parse(JsonStringifiedZurueck(eintrag, new Object()));
        if (isArray(eintrag)) log[position] = JSON.parse(JsonStringifiedZurueck(eintrag, new Array()));
    });

    console.log(...log);
}
