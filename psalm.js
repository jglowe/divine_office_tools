var tones = new Map();

tones.set("I", new Map([
    ["cleff", "c4"],
    ["incipit", "f gh"],
    ["first_tenor", "h"],
    ["flex", "gr g."],
    ["mediatur", new Map([
        ["not_solemn", "'ixi hr h 'g hr h."],
        ["solemn", "hg ixgi h hr 'hg gh.."]
    ])],
    ["second_tenor", "h"],
    ["finitur", new Map([
        ["a", "g f 'g hr h."],
        ["a2", "g f 'g gr gh.."],
        ["d", "g f gr 'gf d."],
        ["d2", "g f 'g gr gvFED."],
        ["d3", "g f 'gh gr gvFED."],
        ["f", "g f 'gh gr gf.."],
        ["g", "g f 'gh gr g."],
        ["g2", "g f 'g gr ghg."],
        ["g3", "g f 'g gr g."],
    ])]
]));

tones.set("II", new Map([
    ["cleff", "f3"],
    ["incipit", "e f"],
    ["first_tenor", "h"],
    ["flex", "fr f."],
    ["mediatur", new Map([
        ["not_solemn", "'i hr h."],
        ["solemn", "hg hi i 'hi hr h."]
    ])],
    ["second_tenor", "h"],
    ["finitur", new Map([
        ["d", "g er 'ef f."],
    ])]
]));

tones.set("III", new Map([
    ["cleff", "c4"],
    ["incipit", "g hj"],
    ["first_tenor", "j"],
    ["flex", "hr h."],
    ["mediatur", new Map([
        ["not_solemn", "'k jr j jr 'ih j."],
        ["solemn", "'jk jr j jr 'ih hj.."]
    ])],
    ["second_tenor", "j"],
    ["finitur", new Map([
        ["a", "h 'j jr ih.."],
        ["a2", "ji hi 'h gr gh.."],
        ["b", "h 'j jr i."],
        ["g", "ji hi 'h gr g."],
        ["g2", "h j i 'h gr g."],
    ])]
]));

tones.set("III_antiphonale_romanum", new Map([
    ["cleff", "c4"],
    ["incipit", "g hi"],
    ["first_tenor", "i"],
    ["flex", "hr h."],
    ["mediatur", new Map([
        ["not_solemn", "'k jr j jr 'ih j."],
        ["solemn", ""]
    ])],
    ["second_tenor", "i"],
    ["finitur", new Map([
        ["a", "'j hr h 'j jr ih.."],
        ["a2", "'j hr hi 'h gr gh.."],
        ["b", "'j hr h 'j jr i."],
        ["g", "'j hr hi 'h gr g."],
    ])]
]));

tones.set("IV", new Map([
    ["cleff", "c4"],
    ["incipit", "h gh"],
    ["first_tenor", "h"],
    ["flex", "gr g."],
    ["mediatur", new Map([
        ["not_solemn", "g h 'i hr h."],
        ["solemn", ""]
    ])],
    ["second_tenor", "h"],
    ["finitur", new Map([
        ["a", "g h i 'g hr h."],
        ["g", "'h gr g."],
        ["e", "g h ih gr 'gf e."],
    ])]
]));

tones.set("V", new Map([
    ["cleff", "c3"],
    ["incipit", "d f"],
    ["first_tenor", "h"],
    ["flex", "fr f."],
    ["mediatur", new Map([
        ["not_solemn", "'i hr h."],
        ["solemn", ""]
    ])],
    ["second_tenor", "h"],
    ["finitur", new Map([
        ["a", "'i gr g 'h fr f."],
    ])]
]));

tones.set("VI", new Map([
    ["cleff", "c4"],
    ["incipit", "f gh"],
    ["first_tenor", "h"],
    ["flex", "gr g."],
    ["mediatur", new Map([
        ["not_solemn", "'ixi hr h 'g hr h."],
        ["solemn", ""]
    ])],
    ["second_tenor", "h"],
    ["finitur", new Map([
        ["f(c)", "f gh 'g fr f."],
    ])]
]));

tones.set("VI_antiphonale_romanum_c4", new Map([
    ["cleff", "c4"],
    ["incipit", "f gh"],
    ["first_tenor", "h"],
    ["flex", "gr g."],
    ["mediatur", new Map([
        ["not_solemn", "g 'h fr f."],
        ["solemn", ""]
    ])],
    ["second_tenor", "h"],
    ["finitur", new Map([
        ["f(c)", "f gh 'g fr f."],
    ])]
]));

tones.set("VI_antiphonale_romanum_c2", new Map([
    ["cleff", "c2"],
    ["incipit", "f gh"],
    ["first_tenor", "h"],
    ["flex", "gr g."],
    ["mediatur", new Map([
        ["not_solemn", "g 'h fr f."],
        ["solemn", ""]
    ])],
    ["second_tenor", "h"],
    ["finitur", new Map([
        ["f(c)", "f gh 'g fr f."],
    ])]
]));

tones.set("VII", new Map([
    ["cleff", "c3"],
    ["incipit", "hg hi"],
    ["first_tenor", "i"],
    ["flex", "hr h."],
    ["mediatur", new Map([
        ["not_solemn", "'k jr j 'i jr j."],
        ["solemn", ""]
    ])],
    ["second_tenor", "i"],
    ["finitur", new Map([
        ["a", "'j ir i 'h hr gf.."],
        ["b", "'j ir i 'h hr g."],
        ["c", "'j ir i 'h hr gh.."],
        ["c2", "'j ir i 'h hr ih.."],
        ["d", "'j ir i 'h hr gi.."],
    ])]
]));

tones.set("VIII", new Map([
    ["cleff", "c4"],
    ["incipit", "g h "],
    ["first_tenor", "j"],
    ["flex", "hr h."],
    ["mediatur", new Map([
        ["not_solemn", "'k jr j."],
        ["solemn", ""]
    ])],
    ["second_tenor", "j"],
    ["finitur", new Map([
        ["c", "h j 'k jr j."],
        ["g", "i j 'h gr g."],
        ["g2", "i j 'h gr ghg."],
    ])]
]));

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
        if (tune[index + 1] !== null && tune[index + 1].match(/[']/)) {
            var tune_with_note_accented = [...tune];
            tune_with_note_accented[index] = "'" + tune_with_note_accented[index];
            tune_with_note_accented[index + 1] = tune_with_note_accented[index + 1].replaceAll(/[']/g, "");
            return get_possible_tune_combinations(index, tune_without_note)
                       .concat(get_possible_tune_combinations(index + 1, tune_with_note))
                       .concat(get_possible_tune_combinations(index + 1, tune_with_note_accented));
        } else {
            return get_possible_tune_combinations(index, tune_without_note).concat(get_possible_tune_combinations(index + 1, tune_with_note));
        }
    } else {
        return get_possible_tune_combinations(index + 1, tune);
    }
}

function make_all_possible_tunes(tenor_note, length, end, last_note_emphasized) {
    const possible_tune_endings = get_possible_tune_combinations(0, end);

    var tunes = [];

    for (const ending of possible_tune_endings) {
        tunes.push({
            tune: add_recitation_note(tenor_note, length - ending.length, last_note_emphasized).concat(ending),
            tenor_length: length - ending.length,
            incipit_used: false,
            incipit_length: 0,
        });
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

    if (syllable_count !== tune.tune.length) {
        new Error("When assenbling text with a tune the syllable counts don't match");
    }

    var gabc = "";
    var tune_index = 0;
    for (const word of text) {
        for (const syllable of word) {
            gabc += syllable + "(" + tune.tune[tune_index].replaceAll(/[r']/g, "") + ")";
            tune_index += 1;
        }
        gabc += " ";
    }
    return gabc;
}

function point_line(text, tune, tenor, is_flex, is_mediatur, is_finitur) {
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

    var prefix_length = 0;

    if (tune.incipit_used) {
        prefix_length = tune.incipit_length + tune.tenor_length;
    } else {
        prefix_length = tune.tenor_length;
    }

    var output = "";
    var tune_index = 0;
    for (const word of text) {
        for (const [word_index, syllable] of word.entries()) {
            if (prefix_length === tune_index) {
                if (word_index === 0) {
                    output += "| "
                } else {
                    output += "-|-"
                }
            }
            var prefix = "";
            var suffix = "";
            if (tune_index < tune.incipit_length && tune.incipit_used) {
                prefix = prefix + "<i>";
                suffix = "</i>" + suffix;
            }
            if (tune.tune[tune_index].match(/[']/)) {
                prefix = prefix + "<strong>";
                suffix = "</strong>" + suffix;
            }
            // Remove all accents, modifiers, flats, sharps
            if (tune.tune[tune_index].replaceAll(/['r._]|.x|.#/g, "").length > 1) {
                prefix = prefix + "<u>";
                suffix = "</u>" + suffix;
            }
            if (tune.tune[tune_index].match(/[r]/)) {
                prefix = prefix + "<i>";
                suffix = "</i>" + suffix;
            }
            console.log(prefix + suffix);
            output += prefix + syllable + suffix;
            tune_index += 1;
        }
        output += " ";
    }

    if (is_flex) {
        output += " †";
    } else if (is_mediatur) {
        output += " *";
    }

    output += "<br>"
    return output;
}

function get_tune_for_text(incipit, use_incipit, recitation_note, ending, syllable_count, accented_syllables, is_flex) {
    var tunes = [];
    if (incipit !== null && use_incipit) {
        var min_length = ending.filter((neum) => !neum.match(/[r]/)).length;
        var min_length_with_incipit = min_length + 1 + incipit.length; // One recitation note needed to have incipit
        if (syllable_count < min_length) {
            return {
                tune: ending.filter((neum) => !neum.match(/[r]/)).slice(-syllable_count),
                tenor_length: 0,
                incipit_used: false,
                incipit_length: 0,
            };
        } else if (syllable_count === min_length) {
            return {
                tune: ending.filter((neum) => !neum.match(/[r]/)).slice(-syllable_count),
                tenor_length: 0,
                incipit_used: false,
                incipit_length: 0,
            };
        } else if (syllable_count < min_length_with_incipit){
            tunes = make_all_possible_tunes(recitation_note, syllable_count, ending, is_flex);
        } else { // Actually use the incipit this time
            tunes = make_all_possible_tunes(recitation_note, syllable_count - incipit.length, ending, is_flex);
            for (var tune of tunes) {
                tune.tune = incipit.concat(tune.tune);
                tune.incipit_used = true;
                tune.incipit_length = incipit.length;
            }
        }
    } else {
        var min_length = ending.filter((neum) => !neum.match(/[r]/)).length;
        if (syllable_count < min_length) {
            return {
                tune: ending.filter((neum) => !neum.match(/[r]/)).slice(-syllable_count),
                tenor_length: 0,
                incipit_used: false,
                incipit_length: 0,
            };
        } else if (syllable_count === min_length) {
            return {
                tune: ending.filter((neum) => !neum.match(/[r]/)).slice(-syllable_count),
                tenor_length: 0,
                incipit_used: false,
                incipit_length: 0,
            };
        } else {
            tunes = make_all_possible_tunes(recitation_note, syllable_count, ending, is_flex);
        }
    }

    var best_tune_index = 0;
    var best_lined_up_syllables = 0;
    for (const [i, tune] of tunes.entries()) {
        var lined_up_accented_syllables = 0;
        console.log(tune);
        for (const [j, neum] of tune.tune.entries()) {
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
    const first_tenor_box = document.getElementById("first_tenor");
    const flex_box = document.getElementById("flex");
    const mediatur_box = document.getElementById("mediatur");
    const second_tenor_box = document.getElementById("second_tenor");
    const finitur_box = document.getElementById("finitur");
    const gabc_box = document.getElementById("gabc");
    const psalm_box = document.getElementById("psalm");
    const pointed_text_div = document.getElementById("pointed_chant");

    const cleff = cleff_box.value;
    const incipit = incipit_box.value.split(/[\s]+/);
    const first_tenor = first_tenor_box.value;
    const flex = flex_box.value.split(/[\s]+/);
    const mediatur = mediatur_box.value.split(/[\s]+/);
    const second_tenor = second_tenor_box.value;
    const finitur = finitur_box.value.split(/[\s]+/);

    const psalm = psalm_box.value.split(/\n/).map(function (verse) {
        return verse.trim().split(/[\s]/).map(function (word) {
            return word.split("=");
        });
    });

    var pointed_text = "<p>";
    var gabc = "(" + cleff + ")\n";
    for (const [index, line] of psalm.entries()) {
        if (line.length === 0 || line[0][0] === "") {
            pointed_text += "<br>"
            continue
        }

        // Count the syllables so we can detect issues upfront
        var syllable_count = 0;
        for (const word of line) {
            if (word[0] !== "+" &&
                word[0] !== "†" &&
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
        if (line[line.length - 1][0] === "+" || line[line.length - 1][0] === "†" || line[line.length - 1][0] === "$") {
            const line_without_dagger = line.slice(0, -1);
            const tune = get_tune_for_text(incipit, use_incipit, first_tenor, flex, syllable_count, accented_syllables_in_text, true);
            pointed_text += point_line(line_without_dagger, tune, first_tenor, true, false, false);
            gabc += join_text_to_tune(line_without_dagger, tune) + "†(,)\n";
        // Mediator
        } else if (line[line.length - 1][0] === "*") {
            const line_without_asterisk = line.slice(0, -1);
            const tune = get_tune_for_text(incipit, use_incipit, first_tenor, mediatur, syllable_count, accented_syllables_in_text, false);
            pointed_text += point_line(line_without_asterisk, tune, first_tenor, false, true, false);
            gabc += join_text_to_tune(line_without_asterisk, tune) + "*(:)\n";
        // Finitor
        } else {
            const tune = get_tune_for_text(null, false, second_tenor, finitur, syllable_count, accented_syllables_in_text, false);
            pointed_text += point_line(line, tune, second_tenor, false, false, true);

            if (index === psalm.length - 1) {
                gabc += join_text_to_tune(line, tune) + "(::)";
            } else {
                gabc += join_text_to_tune(line, tune) + "(:)\n";
            }
        }
    }

    pointed_text += "</p>"

    gabc_box.value = gabc;
    pointed_text_div.innerHTML = pointed_text;

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

function update_tone_boxes() {
    const tone_select_box = document.getElementById("tone");
    const ending_select_box = document.getElementById("ending");

    const cleff_box = document.getElementById("cleff");
    const incipit_box = document.getElementById("incipit");
    const first_tenor_box = document.getElementById("first_tenor");
    const flex_box = document.getElementById("flex");
    const mediatur_box = document.getElementById("mediatur");
    const second_tenor_box = document.getElementById("second_tenor");
    const finitur_box = document.getElementById("finitur");

    var tone = tones.get(tone_select_box.value);
    cleff_box.value = tone.get("cleff");
    incipit_box.value = tone.get("incipit");
    first_tenor_box.value = tone.get("first_tenor");
    second_tenor_box.value = tone.get("second_tenor");
    flex_box.value = tone.get("flex");
    mediatur_box.value = tone.get("mediatur").get("not_solemn");
    finitur_box.value = tone.get("finitur").get(ending_select_box.value);
}

function update_endings_box() {
    const tone_select_box = document.getElementById("tone");
    const ending_select_box = document.getElementById("ending");
    ending_select_box.innerHTML = "";

    var first = true;
    for (const key of tones.get(tone_select_box.value).get("finitur").keys()) {
        var new_option = document.createElement("option");
        new_option.value = key;
        new_option.innerHTML = key;
        if (first) {
            new_option.selected = true;
            first = false;
        }
        ending_select_box.appendChild(new_option);
    }

    update_tone_boxes();
}

function populate_tone_selection() {
    const tone_select_box = document.getElementById("tone");

    if (tone_select_box.innerHTML === "") {
        var first = true;
        for (const key of tones.keys()) {
            var new_option = document.createElement("option");
            new_option.value = key;
            new_option.innerHTML = "Tone: " + key;
            if (first) {
                new_option.selected = true;
                first = false;
            }
            tone_select_box.appendChild(new_option)
        }
    }

    update_endings_box();
}

const tone_select_box = document.getElementById("tone");
tone_select_box.addEventListener('change', function() {
    update_endings_box();
});

const ending_select_box = document.getElementById("ending");
ending_select_box.addEventListener('change', function() {
    update_tone_boxes();
});

populate_tone_selection();
