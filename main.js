function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    return arr1.every((value, index) => value === arr2[index]);
}

const generate_gabc_button = document.getElementById("generate_gabc");

// Execute a function when the user presses a key on the keyboard
generate_gabc_button.addEventListener("click", function() {
    const cleff_box = document.getElementById("cleff");
    const tune_box = document.getElementById("tune");
    const hymn_box = document.getElementById("hymn");
    const gabc_box = document.getElementById("gabc");

    const cleff = cleff_box.value;
    const unprocessed_tune = tune_box.value;
    const unprocessed_hymn = hymn_box.value;

    const verses = unprocessed_hymn.split(/\n\n/).map(function (verse) {
        if (verse.trim() === "Amen" || verse.trim() === "A=men") {
            return [["A", "men"]];
        }
        return verse.trim().split(/[\s\n]/).map(function (word) {
            return word.split("=");
        });
    });

    const tune_parts = unprocessed_tune.split(/\n\n/);

    const tune = tune_parts[0].split(/[\n\s]/);
    const amen = tune_parts[1].split(/[\s\n]/);

    // Count so we can detect issues upfront
    const tune_syllables = tune.filter((n) => n !== ";" && n !== "," && n !== ":" && n !== "::").length;

    var gabc = "(" + cleff + ")\n";
    for (const [index, verse] of verses.entries()) {
        if (verse.length === 1 && verse[0].length === 2 && verse[0][0] === "A" && verse[0][1] === "men") {
            var tune_index = 0;
            for (const [i, word] of verse.entries()) {
                if (i !== 0) {
                    gabc += " ";
                }

                for (const syllable of word) {
                    gabc += syllable + "(" + amen[tune_index] + ")"
                    tune_index += 1
                    if (tune_index < amen.length && (amen[tune_index] === "," ||
                                                     amen[tune_index] === ";" ||
                                                     amen[tune_index] === ":" ||
                                                     amen[tune_index] === "::")) {
                        gabc += " (" + amen[tune_index] + ")";
                        tune_index += 1
                    }
                }
            }

            continue
        }

        // Count the syllables so we can detect issues upfront
        var syllable_count = 0;
        for (const word of verse) {
            syllable_count += word.length;
        }

        if (tune_syllables !== syllable_count) {
            window.alert("The syllables in the verse #" + (index + 1) + ", (" + syllable_count + ") does not match the syllables in the tune (" + tune_syllables + ")");
            return;
        }

        var tune_index = 0;

        for (const [i, word] of verse.entries()) {
            if (i !== 0) {
                gabc += " ";
            }

            for (const syllable of word) {
                gabc += syllable + "(" + tune[tune_index] + ")"
                tune_index += 1
                if (tune_index < tune.length && (tune[tune_index] === "," ||
                                                 tune[tune_index] === ";" ||
                                                 tune[tune_index] === ":" ||
                                                 tune[tune_index] === "::")) {
                    gabc += " (" + tune[tune_index] + ")";
                    tune_index += 1
                }
            }
        }
        gabc += "\n";
    }

    gabc_box.value = gabc;
});
