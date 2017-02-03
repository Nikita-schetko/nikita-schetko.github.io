
      // Get the modal
      var modal = document.getElementById('myModal');

      var modal2 = document.getElementById('shareLink');


      function copyToClipboard() {
        var copyTextarea = document.querySelector('.linkclass');
        copyTextarea.select();

        try {
          var successful = document.execCommand('copy');
        } catch (err) {}

      }
      var map = {
        "ADJ_CLOSE_20DMA_DIST": "20SMA Distance =~ 0.00%",
        "ADJ_CLOSE_50DMA_DIST": "50SMA Distance =~ 0.00%",
        "ADJ_CLOSE_100DMA_DIST": "100SMA Distance =~ 0.00%",
        "ADJ_CLOSE_200DMA_DIST": "200SMA Distance =~ 0.00%",
        "ADJ_CLOSE_9EMA_DIST": "9EMA Distance =~ 0.00%",
        "ADJ_CLOSE_20HIBOLL_DIST": "20-Day Upper Boll Band Distance =~ 0.00%",
        "ADJ_CLOSE_20LOBOLL_DIST": "20-Day Lower Boll Band Distance =~ 0.00%",
        "ADJ_CLOSE_1226_DIST": "MACD Dist Line =~ N/A",
        "ADJ_CLOSE_1226_MACDSIGNAL": "MACD Signal Line =~ N/A",
        "ADJ_CLOSE_1226_MACDHIST": "MACD Histogram =~ N/A",
        "CHG_14RSI": "Custom RSI =~ N/A",
        "TREND": "Trend Composite =~ N/A",
        "TREND_3DMA": "Trend Composite 3MA =~ N/A",
        "TREND_5DMA": "Trend Composite 5MA =~ N/A",
        "TREND_10DMA": "Trend Composite 10MA =~ N/A",
        "TRUERANGE_50CHOPPY": "50-Day Choppiness Index =~ N/A",
        "LOCALPEAK_NO": "Current Peak / Trough # =~ N/A",
        "CHG_14REALRSI": "RSI =~ N/A",
        "STOCHASTIC_14K": "Fast Stochastics K Line =~ N/A",
        "STOCHASTIC_14K_3DMA": "Slow Stochastics K Line =~ N/A",
        "STOCHASTIC_14K_3DMA_3DMA": "Slow Stochastics D Line =~ N/A",
        "CLOSEOPEN": "Close - Open =~ 0.00%",
        "CLOSELOW": "Close - Low =~ 0.00%",
        "HIGHCLOSE": "High - Close =~ 0.00%"
      }

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[2];

      // When the user clicks on <span> (x), close the modal
      span.onclick = function (event) {
        modal.style.display = "none";


      }

      span = document.getElementsByClassName("close")[3];

      // When the user clicks on <span> (x), close the modal
      span.onclick = function (event) {

        modal2.style.display = "none";

      }


      // When the user clicks anywhere outside of the modal, close it
      function windowOutView(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        } else if (event.target == modal2) {
          modal2.style.display = "none";
        }


      }


      window.addEventListener("click", windowOutView);


      function removeLine(currcell) {
        currcell.parentNode.parentNode.parentNode.removeChild(currcell.parentNode.parentNode);
        return false;
      }

      function addCriteria() {
        var modal = document.getElementById('table');
        var newspan = document.createElement('tr');
        newspan.innerHTML =
          '<tr>\
					<td bgcolor="white"><select name="pattern[]" onchange="dropdownChg(this);"><option value="">--  Patterns  --</option><option value="">-- Indicators --</option><option value="ADJ_CLOSE_20DMA_DIST" >20SMA Distance: Match Value of 0.00%</option><option value="ADJ_CLOSE_50DMA_DIST" >50SMA Distance: Match Value of 0.00%</option><option value="ADJ_CLOSE_100DMA_DIST" >100SMA Distance: Match Value of 0.00%</option><option value="ADJ_CLOSE_200DMA_DIST" >200SMA Distance: Match Value of 0.00%</option><option value="ADJ_CLOSE_9EMA_DIST" >9EMA Distance: Match Value of 0.00%</option><option value="ADJ_CLOSE_20HIBOLL_DIST" >20-Day Upper Boll Band Distance: Match Value of 0.00%</option><option value="ADJ_CLOSE_20LOBOLL_DIST" >20-Day Lower Boll Band Distance: Match Value of 0.00%</option><option value="ADJ_CLOSE_1226_DIST" >MACD Dist Line: Match Value of N/A</option><option value="ADJ_CLOSE_1226_MACDSIGNAL" >MACD Signal Line: Match Value of N/A</option><option value="ADJ_CLOSE_1226_MACDHIST" >MACD Histogram: Match Value of N/A</option><option value="CHG_14RSI" >Custom RSI: Match Value of N/A</option><option value="TREND" >Trend Composite: Match Value of N/A</option><option value="TREND_3DMA" >Trend Composite 3MA: Match Value of N/A</option><option value="TREND_5DMA" >Trend Composite 5MA: Match Value of N/A</option><option value="TREND_10DMA" >Trend Composite 10MA: Match Value of N/A</option><option value="TRUERANGE_50CHOPPY" >50-Day Choppiness Index: Match Value of N/A</option><option value="LOCALPEAK_NO" >Current Peak / Trough #: Match Value of N/A</option><option value="CHG_14REALRSI" >RSI: Match Value of N/A</option><option value="STOCHASTIC_14K" >Fast Stochastics K Line: Match Value of N/A</option><option value="STOCHASTIC_14K_3DMA" >Slow Stochastics K Line: Match Value of N/A</option><option value="STOCHASTIC_14K_3DMA_3DMA" >Slow Stochastics D Line: Match Value of N/A</option><option value="CLOSEOPEN" >Close - Open: Match Value of 0.00%</option><option value="CLOSELOW" >Close - Low: Match Value of 0.00%</option><option value="HIGHCLOSE" >High - Close: Match Value of 0.00%</option></select></td>\
					<td bgcolor="white"></td>\
					<td bgcolor="white"><input type="image" src="images/delete.png"></td>\
				</tr>';
        //newspan.innerHTML = '<tr><td>YES</td></tr>';			
        modal.appendChild(newspan);
        return false;
      }

      function dropdownChg(currselect) {

        var str = map[currselect.options[currselect.selectedIndex].value];

        var tr = currselect.parentNode.parentNode;

        var cells = tr.getElementsByTagName('td');

        cells[1].innerHTML = ' ' + str + '</font>';
      }
