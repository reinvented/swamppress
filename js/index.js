$( document ).ready(function() {

    // When the "Count" button is clicked, count!
    
    $("#countbutton").click("click", function () {
    
        // This is the text that was entered.
        var thetext = $("#thetext").val();

        // Count the frequency of each character in the entered text.       
        var freq = {};
        for (var i=0; i<thetext.length;i++) {
            var character = thetext.charAt(i);
            if (freq[character]) {
               freq[character]++;
            } else {
               freq[character] = 1;
            }
        }
        // Sort the keys of the character count alphabetically.
        var keys = Object.keys(freq);
        keys.sort();
        var len = keys.length;
        
        // This is the "factor" that we multiply the font-scheme by, to allow estimating how many fonts are required.
        var factor = $("#factor").val();

        // Set up an HTML table for the output.
        var html = "<table cellpadding='3' cellspacing='0' border='1' style='font-size: 150%'>";
        html = html + "<tr><th>Letter</th><th>Text</th><th>Scheme</th></tr>";
        
        // Loop through each character found in the text and display
        // frequency, and how it compares to the character count in the font scheme
        var key = '';
        var scheme = 0;
        for (i = 0; i < len; i++) {
            key = keys[i];
            if ((key != ' ') && (key != '\n')) {
                if (fontscheme.hasOwnProperty(key)) {
                    if (freq[key] > (fontscheme[key] * factor)) {
                        html = html + "<tr style='background: #f00'>";
                    }
                    else if (freq[key] > (fontscheme[key] * factor * 0.8)) {
                        html = html + "<tr style='background: #ff0'>";
                    }
                    else {
                        html = html + "<tr style='background: #093'>";
                    }
                    scheme = fontscheme[key] * factor;
                }
                else {
                    scheme = "N/A";
                    html = html + "<tr>";
                }
                html = html +  "<td>" + key + "</td><td>" + (freq[key]) + "</td><td>" + scheme + "</td>";
                html = html + "</tr>";
            }
        }
        html = html + '</table>';
        $("#results").html(html);
    });
});