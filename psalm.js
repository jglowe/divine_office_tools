

function add_recitation_note(note, times, last_note_emphasized) {
    var notes = [];
    for (var i = 0; i < times; i++) {
        if (last_note_emphasized && i === times - 1) {
            notes.push("'" + note);
        } else {
            notes.push(note);
        }
    }
    return notes;
}

function get_possible_tune_combinations(index, tune) {
    if (tune.length <= index) {
        return [tune];
    }

    if (tune[index].match(/[r]/)) {
        var tune_without_note = [...tune];
        tune_without_note.splice(index, 1);
        var tune_with_note = [...tune];
        tune_with_note[index] = tune_with_note[index].replace(/[r]$/, "");
        return get_possible_tune_combinations(index, tune_without_note).concat(get_possible_tune_combinations(index + 1, tune_with_note));
    } else {
        return get_possible_tune_combinations(index + 1, tune);
    }
}

function make_all_possible_tunes(recitation_note, length, end, last_note_emphasized) {
    const possible_tune_endings = get_possible_tune_combinations(0, end);

    var tunes = [];

    for (const ending of possible_tune_endings) {
        tunes.push(add_recitation_note(recitation_note, length - ending.length, last_note_emphasized).concat(ending));
    }

    return tunes;
}

function join_text_to_tune(text, tune) {
    var syllable_count = 0;

    for (const word of text) {
        if (word[0] !== "†" &&
            word[0] !== "$" &&
            word[0] !== "*") {
            syllable_count += word.length;
        }
    }

    if (syllable_count !== tune.length) {
        new Error("When assenbling text with a tune the syllable counts don't match");
    }

    var gabc = "";
    var tune_index = 0;
    for (const word of text) {
        for (const syllable of word) {
            gabc += syllable + "(" + tune[tune_index].replace(/[r']/, "") + ")";
            tune_index += 1;
        }
        gabc += " ";
    }
    return gabc;
}

function get_tune_for_text(incipit, use_incipit, recitation_note, ending, syllable_count, accented_syllables, is_flex) {
    var tunes = [];
    if (incipit !== null && use_incipit) {
        var min_length = ending.filter((neum) => !neum.match(/[r]/)).length;
        var min_length_with_incipit = min_length + 1 + incipit.length; // One recitation note needed to have incipit
        if (syllable_count < min_length) {
            return ending.filter((neum) => !neum.match(/[r]/)).slice(-syllable_count);
        } else if (syllable_count === min_length) {
            return ending.filter((neum) => !neum.match(/[r]/)).slice(-syllable_count);
        } else if (syllable_count < min_length_with_incipit){
            tunes = make_all_possible_tunes(recitation_note, syllable_count, ending, is_flex);
        } else { // Actually use the incipit this time
            tunes = make_all_possible_tunes(recitation_note, syllable_count - incipit.length, ending, is_flex).map((tune) => incipit.concat(tune));
        }
    } else {
        var min_length = ending.filter((neum) => !neum.match(/[r]/)).length;
        if (syllable_count < min_length) {
            return ending.filter((neum) => !neum.match(/[r]/)).slice(-syllable_count);
        } else if (syllable_count === min_length) {
            return ending.filter((neum) => !neum.match(/[r]/)).slice(-syllable_count);
        } else {
            tunes = make_all_possible_tunes(recitation_note, syllable_count, ending, is_flex);
        }
    }

    var best_tune_index = 0;
    var best_lined_up_syllables = 0;
    for (const [i, tune] of tunes.entries()) {
        var lined_up_accented_syllables = 0;
        for (const [j, neum] of tune.entries()) {
            if (neum.match(/[']/) && accented_syllables.includes(j)) {
                lined_up_accented_syllables += 1;
            }
        }

        if (lined_up_accented_syllables > best_lined_up_syllables) {
            best_lined_up_syllables = lined_up_accented_syllables;
            best_tune_index = i;
        }
    }

    return tunes[best_tune_index];
}

const generate_gabc_button = document.getElementById("generate_gabc");

// Execute a function when the user presses a key on the keyboard
generate_gabc_button.addEventListener("click", function() {
    const cleff_box = document.getElementById("cleff");
    const incipit_box = document.getElementById("incipit");
    const first_recitation_note_box = document.getElementById("first_recitation_note");
    const flex_box = document.getElementById("flex");
    const mediator_box = document.getElementById("mediator");
    const second_recitation_note_box = document.getElementById("second_recitation_note");
    const finitor_box = document.getElementById("finitor");
    const gabc_box = document.getElementById("gabc");
    const psalm_box = document.getElementById("psalm");

    const cleff = cleff_box.value;
    const incipit = incipit_box.value.split(/[\s]+/);
    const first_recitation_note = first_recitation_note_box.value;
    const flex = flex_box.value.split(/[\s]+/);
    const mediator = mediator_box.value.split(/[\s]+/);
    const second_recitation_note = second_recitation_note_box.value;
    const finitor = finitor_box.value.split(/[\s]+/);

    const psalm = psalm_box.value.split(/\n/).map(function (verse) {
        return verse.trim().split(/[\s]/).map(function (word) {
            return word.split("=");
        });
    });

    var gabc = "(" + cleff + ")\n";
    for (const [index, line] of psalm.entries()) {
        if (line.length === 0 || line[0][0] === "") {
            continue
        }

        // Count the syllables so we can detect issues upfront
        var syllable_count = 0;
        for (const word of line) {
            if (word[0] !== "†" &&
                word[0] !== "$" &&
                word[0] !== "*") {
                syllable_count += word.length;
            }
        }

        var accented_syllables_in_text = [];
        var syllable_in_line_index = 0;

        for (const [i, word] of line.entries()) {
            for (const [j, syllable] of word.entries()) {
                if (syllable.match(/[àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]/)) {
                    accented_syllables_in_text.push(syllable_in_line_index);
                }
                syllable_in_line_index += 1;
            }
        }

        var use_incipit = true;
        if (index === 0) {
            use_incipit = true;
        } else {
            use_incipit = false;
        }

        // Flexitor
        if (line[line.length - 1][0] === "†" || line[line.length - 1][0] === "$") {
            const line_without_dagger = line.slice(0, -1);
            const tune = get_tune_for_text(incipit, use_incipit, first_recitation_note, flex, syllable_count, accented_syllables_in_text, true);
            gabc += join_text_to_tune(line_without_dagger, tune) + "†(,)\n";
        // Mediator
        } else if (line[line.length - 1][0] === "*") {
            const line_without_asterisk = line.slice(0, -1);
            const tune = get_tune_for_text(incipit, use_incipit, first_recitation_note, mediator, syllable_count, accented_syllables_in_text, false);
            gabc += join_text_to_tune(line_without_asterisk, tune) + "*(:)\n";
        // Finitor
        } else {
            const tune = get_tune_for_text(null, false, second_recitation_note, finitor, syllable_count, accented_syllables_in_text, false);

            if (index === psalm.length - 1) {
                gabc += join_text_to_tune(line, tune) + "(::)";
            } else {
                gabc += join_text_to_tune(line, tune) + "(:)\n";
            }
        }
    }

    gabc_box.value = gabc;

    var ctxt = new exsurge.ChantContext();
    var mappings = exsurge.Gabc.createMappingsFromSource(ctxt, gabc);
    var score = new exsurge.ChantScore(ctxt, mappings, true);
    var width = document.getElementById("chant_preview").offsetWidth;

    // perform layout on the chant
    score.performLayoutAsync(ctxt, function() {
      score.layoutChantLines(ctxt, width, function() {
        document.getElementById("chant_preview").innerHTML = score.createSvg(ctxt);
      });
    });
});
