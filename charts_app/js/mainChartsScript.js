
			function hideChart() {
				document.getElementById('panel').style.display = 'none';
				document.getElementById('chart1').style.display = 'none';
			}

			var priceData =
			var forecastData =
				'[{"date":"2017-02-02","price":38.77,"minprice":38.12,"maxprice":39.23},{"date":"2017-02-03","price":38.6,"minprice":37.3,"maxprice":39.52},{"date":"2017-02-06","price":38.68,"minprice":37.46,"maxprice":39.75},{"date":"2017-02-07","price":38.75,"minprice":37.63,"maxprice":39.97},{"date":"2017-02-08","price":38.82,"minprice":37.79,"maxprice":40.2},{"date":"2017-02-09","price":38.92,"minprice":37.55,"maxprice":40.26},{"date":"2017-02-10","price":39.02,"minprice":37.31,"maxprice":40.32},{"date":"2017-02-13","price":39.11,"minprice":37.06,"maxprice":40.38},{"date":"2017-02-14","price":39.21,"minprice":36.82,"maxprice":40.44},{"date":"2017-02-15","price":39.31,"minprice":36.58,"maxprice":40.5},{"date":"2017-02-16","price":39.33,"minprice":36.62,"maxprice":40.58},{"date":"2017-02-17","price":39.35,"minprice":36.65,"maxprice":40.66},{"date":"2017-02-20","price":39.37,"minprice":36.69,"maxprice":40.74},{"date":"2017-02-21","price":39.38,"minprice":36.73,"maxprice":40.82},{"date":"2017-02-22","price":39.4,"minprice":36.77,"maxprice":40.9},{"date":"2017-02-23","price":39.42,"minprice":36.81,"maxprice":40.98},{"date":"2017-02-24","price":39.44,"minprice":36.85,"maxprice":41.06},{"date":"2017-02-27","price":39.46,"minprice":36.89,"maxprice":41.14},{"date":"2017-02-28","price":39.48,"minprice":36.92,"maxprice":41.22},{"date":"2017-03-01","price":39.49,"minprice":36.96,"maxprice":41.3}]';

			var containerId = 'chart1';
			var chart, container, series = {},
				seriesState = {},
				axis = {};
			var OHLC = [],
				PREDICT = [],
				PREDICTMAX = [],
				PREDICTMIN = [],
				MA_50 = [],
				MA_200 = [],
				BB_mid = [],
				BB_high = [],
				BB_low = [],
				Volume = [],
				RSI = [],
				MACD_dist = [],
				MACD_signal = [],
				MACD_hist = [],
				stoch_fast_k = [],
				stoch_slow_k = [],
				stoch_slow_d = [],
				indicatorIds = ['rsi', 'macd', 'stoch'],
				// for predict price show
				lastDate, lastPredictDate, predictRangeMin, predictRangeMax, rangeScale;

			var RSI_MAX = 70,
				RSI_MIN = 30,
				tempRSI;
			var groupingUnits = [
				[
					'day', // unit name
					[1] // allowed multiples
				]
				/*, [
								'month',
								[1, 2, 3, 4, 6]
							]*/
			];

			var defaultOptions = {
				rangeSelector: {
					buttons: [{
						type: 'month',
						count: 1,
						text: '1m'
					}, {
						type: 'month',
						count: 3,
						text: '3m'
					}, {
						type: 'month',
						count: 6,
						text: '6m'
					}, {
						type: 'ytd',
						count: 1,
						text: 'YTD'
					}, {
						type: 'year',
						count: 1,
						text: '1y'
					}, {
						type: 'year',
						count: 5,
						text: '5y'
					}],
					selected: 2
				},
				title: {
					text: 'ConAgra Foods Inc. (CAG) - 2017-02-02'
				},
				credits: {
					enabled: false
				},
				/*legend: {
			enabled: true,
			floating: true,
			verticalAlign: 'top',
			padding: 30,
			y: 15
		},*/
				exporting: {
					chartOptions: { // specific options for the exported image
						plotOptions: {
							series: {
								dataLabels: {
									enabled: false
								}
							}
						},
						chart: {
							events: {
								load: function () {
									this.renderer.image('/images/logo-embed.jpg', 75, 75, 100, 27)
										.add();

								}
							}
						},
						filename: '20170202-CAG'
					},
					fallbackToExportServer: false
				},
				xAxis: {
					type: 'datetime',
					labels: {
						formatter: function () {
							s = this.value
							d = new Date(s);
							return Highcharts.dateFormat('%b %e, %Y', this.value)
						}
					},

					events: {
						setExtremes: function (e) {
							if (typeof e.min == 'undefined' && typeof e.max == 'undefined') {
								toggleForcast(true);
							}
						}
					}
				},
				plotOptions: {
					spline: {
						lineWidth: 2,
						states: {
							hover: {
								lineWidth: 3
							}
						},
						marker: {
							enabled: false
						}
					},
					series: {
						events: {
							legendItemClick: function () {
								return false; // <== returning false will cancel the default action
							}
						}
					}
				},
				navigation: {
					menuItemStyle: {
						fontSize: '10px'
					}
				}
				, responsive: {
					rules: [{
						condition: {
							maxWidth: 500
						},
						chartOptions: {
							chart: {
								height: 800
							},
							subtitle: {
								text: null
							},
							navigator: {
								enabled: false
							}
						}
					}]
				}
			};

			var YAxisOptions = {
				main: {
					id: 'mainAxis',
					labels: {
						align: 'right',
						x: -3
					},
					opposite: false,
					title: {
						text: 'CAG'
					},
					height: /*'50%',/*/ 350,
					lineWidth: 2
				},
				volumn: {
					id: 'volumnAxis',
					labels: {
						align: 'left',
						x: 3
					},
					title: {
						text: ''
					},
					top: /*'30%',/*/ 245,
					height: /*'20%',/*/ 150,
					offset: 0,
					lineWidth: 2
				},
				rsi: {
					id: 'rsiAxis',
					labels: {
						align: 'right',
						x: -3
					},
					opposite: false,
					title: {
						text: 'RSI'
					},
					top: /*'55%',/*/ 420,
					height: /*'20%',/*/ 150,
					min: 0,
					max: 100,
					tickInterval: 25,
					plotLines: [{
						value: 70,
						color: '#000',
						width: 1
					}, {
						value: 30,
						color: '#000',
						width: 1
					}],
					offset: 0,
					lineWidth: 2,
					indicator: true
				},
				macd: {
					id: 'macdAxis',
					labels: {
						align: 'right',
						x: -3
					},
					opposite: false,
					title: {
						text: 'MACD'
					},
					top: /*'80%',/*/ 595,
					height: /*'20%',/*/ 150,
					offset: 0,
					lineWidth: 2,
					indicator: true
				},
				stoch: {
					id: 'stochAxis',
					labels: {
						align: 'right',
						x: -3
					},
					opposite: false,
					title: {
						text: 'STO'
					},
					top: /*'55%',/*/ 420,
					height: /*'20%',/*/ 150,
					min: 0,
					max: 100,
					tickInterval: 25,
					plotLines: [{
						value: 80,
						color: '#000',
						width: 1
					}, {
						value: 20,
						color: '#000',
						width: 1
					}],
					offset: 0,
					lineWidth: 2,
					indicator: true
				},
			};

			var seriesOption = {
				series: [{
						type: 'candlestick',
						id: 'ohlc',
						name: 'CAG',
						data: OHLC,
						color: '#7cb5ec',
						dataGrouping: {
							units: groupingUnits
						},
						//allowPointSelect: true,
						//showCheckbox: true,
						threshold: null,
						turboThreshold: 20000, // to accept point object configuration
						/*point: {
							events: {
								select: function() {
									var p = this;
									p.series.chart.selectedXPoint = p.x;
									//p.series.chart.redraw();
								}
							}
						}*/
					}, { // Predict chart
						type: 'spline',
						id: 'predict',
						name: 'Avg Forecast',
						data: PREDICT,
						color: '#7cb5ec',
						dashStyle: 'dash',
						dataGrouping: {
							units: groupingUnits
						},
					}, { // Predict chart
						type: 'spline',
						id: 'predictmax',
						name: 'Best Forecast',
						data: PREDICTMAX,
						color: '#7cb5ec',
						dashStyle: 'dash',
						lineWidth: 1,
						dataGrouping: {
							units: groupingUnits
						},
					}, { // Predict chart
						type: 'spline',
						id: 'predictmin',
						name: 'Worst Forecast',
						data: PREDICTMIN,
						color: '#7cb5ec',
						dashStyle: 'dash',
						lineWidth: 1,
						dataGrouping: {
							units: groupingUnits
						},
					}, { // Moving average
						type: 'spline',
						id: 'sma50',
						name: '50SMA',
						data: MA_50,
						color: '#8085e9',
						dataGrouping: {
							units: groupingUnits
						},
					}, {
						type: 'spline',
						id: 'sma200',
						name: '200SMA',
						data: MA_200,
						color: '#f15c80',
						dataGrouping: {
							units: groupingUnits
						},
					}, { // Bollinger band
						type: 'spline',
						id: 'bb20',
						name: '20SMA',
						data: BB_mid,
						color: '#90ed7d',
						lineWidth: 1,
						dataGrouping: {
							units: groupingUnits
						},
					}, {
						type: 'spline',
						id: 'bb20h',
						name: '20BB High',
						data: BB_high,
						color: '#90ed7d',
						dataGrouping: {
							units: groupingUnits
						},
					}, {
						type: 'spline',
						id: 'bb20l',
						name: '20BB Low',
						data: BB_low,
						color: '#90ed7d',
						dataGrouping: {
							units: groupingUnits
						},
					}, { // Volumn
						type: 'column',
						id: 'vol20',
						name: 'Volumn(20)',
						data: Volume,
						color: '#c0c0c0',
						yAxis: 'volumnAxis',
						dataGrouping: {
							units: groupingUnits
						},
						zIndex: -1
					}, { // RSI
						type: 'spline',
						id: 'rsi',
						name: 'RSI',
						data: RSI,
						color: '#2b908f',
						yAxis: 'rsiAxis',
						dataGrouping: {
							units: groupingUnits
						},
					}, { // MACD
						type: 'spline',
						id: 'macd',
						name: 'MACD',
						data: MACD_dist,
						color: '#434348',
						yAxis: 'macdAxis',
						dataGrouping: {
							units: groupingUnits
						},
					}, {
						type: 'spline',
						id: 'macd_sig',
						name: 'MACD Signal',
						data: MACD_signal,
						color: '#f45b5b',
						yAxis: 'macdAxis',
						enableMouseTracking: false,
						dataGrouping: {
							units: groupingUnits
						},
					}, {
						type: 'column',
						id: 'macd_his',
						name: 'MACD Histogram',
						data: MACD_hist,
						color: '#7cb5ec',
						yAxis: 'macdAxis',
						enableMouseTracking: false,
						dataGrouping: {
							units: groupingUnits
						},
						zIndex: -1
					}, { // MACD
						type: 'spline',
						id: 'stoch_fast_k',
						name: 'Fast STO K%(14)',
						data: stoch_fast_k,
						color: '#000',
						yAxis: 'stochAxis',
						dataGrouping: {
							units: groupingUnits
						},
					}, {
						type: 'spline',
						id: 'stoch_slow_k',
						name: 'Slow STO K%(14)',
						data: stoch_slow_k,
						color: '#aaa',
						yAxis: 'stochAxis',
						enableMouseTracking: true,
						dataGrouping: {
							units: groupingUnits
						},
					}, {
						type: 'spline',
						id: 'stoch_slow_d',
						name: 'Slow STO D%(3)',
						data: stoch_slow_d,
						color: 'red',
						yAxis: 'stochAxis',
						enableMouseTracking: true,
						dataGrouping: {
							units: groupingUnits
						},
					}



				]
			};

			function convertDate(a) {
				var b = a.replace(new RegExp("-", "g"), "/");
				return Date.parse(b);
			};

			function parseData(processdata) {
				var dataLength = processdata.length;

				// sort by date
				processdata.sort(function (a, b) {
					return convertDate(a["DATE"]) - convertDate(b["DATE"]);
				});

				for (var i = 0; i < dataLength; i += 1) {
					OHLC.push({
						x: convertDate(processdata[i]["DATE"]), // the date
						open: parseFloat(processdata[i]["ADJ_OPEN"]), // open
						high: parseFloat(processdata[i]["ADJ_HIGH"]), // high
						low: parseFloat(processdata[i]["ADJ_LOW"]), // low
						close: parseFloat(processdata[i]["ADJ_CLOSE"]), // close
						y: parseFloat(processdata[i]["ADJ_CLOSE"])
					});

					MA_50.push([
						convertDate(processdata[i]["DATE"]),
						parseFloat(processdata[i]["ADJ_CLOSE_50DMA"])
					]);

					MA_200.push([
						convertDate(processdata[i]["DATE"]),
						parseFloat(processdata[i]["ADJ_CLOSE_200DMA"])
					]);

					BB_mid.push([
						convertDate(processdata[i]["DATE"]),
						parseFloat(processdata[i]["ADJ_CLOSE_20DMA"])
					]);

					BB_high.push([
						convertDate(processdata[i]["DATE"]),
						parseFloat(processdata[i]["ADJ_CLOSE_20HIBOLL"])
					]);

					BB_low.push([
						convertDate(processdata[i]["DATE"]),
						parseFloat(processdata[i]["ADJ_CLOSE_20LOBOLL"])
					]);

					Volume.push([
						convertDate(processdata[i]["DATE"]), // the date
						parseFloat(processdata[i]["VOLUME"]) // the Volume
					]);

					tempRSI = parseFloat(processdata[i]["CHG_14REALRSI"]); // the RSI
					RSI.push([
						convertDate(processdata[i]["DATE"]), // the date
						tempRSI,
						tempRSI > RSI_MAX ? RSI_MAX : tempRSI < RSI_MIN ? RSI_MIN : tempRSI
					]);

					MACD_dist.push([
						convertDate(processdata[i]["DATE"]),
						parseFloat(processdata[i]["ADJ_CLOSE_1226_DIST"])
					]);

					MACD_signal.push([
						convertDate(processdata[i]["DATE"]),
						parseFloat(processdata[i]["ADJ_CLOSE_1226_MACDSIGNAL"])
					]);

					MACD_hist.push([
						convertDate(processdata[i]["DATE"]),
						parseFloat(processdata[i]["ADJ_CLOSE_1226_MACDHIST"])
					]);

					stoch_fast_k.push([
						convertDate(processdata[i]["DATE"]),
						parseFloat(processdata[i]["STOCHASTIC_14K"])
					]);

					stoch_slow_k.push([
						convertDate(processdata[i]["DATE"]),
						parseFloat(processdata[i]["STOCHASTIC_14K_3DMA"])
					]);

					stoch_slow_d.push([
						convertDate(processdata[i]["DATE"]),
						parseFloat(processdata[i]["STOCHASTIC_14K_3DMA_3DMA"])
					]);
				}

				PREDICT = [];
				PREDICT.push([
					OHLC[dataLength - 1 - 1].x,
					OHLC[dataLength - 1 - 1].y
				]);

				PREDICTMIN = [];
				PREDICTMIN.push([
					OHLC[dataLength - 1 - 1].x,
					OHLC[dataLength - 1 - 1].y
				]);

				PREDICTMAX = [];
				PREDICTMAX.push([
					OHLC[dataLength - 1 - 1].x,
					OHLC[dataLength - 1 - 1].y
				]);
			}

			function parsePredictData(jsonData) {
				// sort by date
				jsonData.sort(function (a, b) {
					return convertDate(a["date"]) - convertDate(b["date"]);
				});

				for (var i = 0, len = jsonData.length; i < len; i++) {
					PREDICT.push([
						convertDate(jsonData[i]["date"]),
						jsonData[i]["price"]
					]);

					PREDICTMIN.push([
						convertDate(jsonData[i]["date"]),
						jsonData[i]["minprice"]
					]);

					PREDICTMAX.push([
						convertDate(jsonData[i]["date"]),
						jsonData[i]["maxprice"]
					]);
				}

				// for plot band
				lastDate = PREDICT[0][0];
				lastPredictDate = PREDICT[PREDICT.length - 1][0];
			}

			function onChartLoaded(chart) {
				// init
				seriesState.candlestick = true;
				seriesState.predict = true;
				seriesState.predictmin = true;
				seriesState.predictmax = true;
				seriesState.sma20 = true;
				seriesState.sma50 = true;
				seriesState.sma100 = true;
				seriesState.sma200 = true;
				seriesState.ema9 = true;
				seriesState.ema12 = true;
				seriesState.ema26 = true;
				seriesState.bb20 = true;
				seriesState.vol20 = true;
				seriesState.vol50 = true;
				seriesState.vol100 = true;
				seriesState.vol200 = true;
				seriesState.macd = true;
				seriesState.rsi = true;
				seriesState.stoch = true;

				series.ohlc = chart.get('ohlc');
				series.predict = chart.get('predict');
				series.predictmin = chart.get('predictmin');
				series.predictmax = chart.get('predictmax');
				series.sma50 = chart.get('sma50');
				series.sma200 = chart.get('sma200');
				series.bb20 = [chart.get('bb20'), chart.get('bb20h'), chart.get('bb20l')];

				series.macd = [chart.get('macd'), chart.get('macd_sig'), chart.get('macd_his')];
				series.rsi = chart.get('rsi');
				series.stoch = [chart.get('stoch_fast_k'), chart.get('stoch_slow_k'), chart.get('stoch_slow_d')];


				attachDropDownControlEvents();

				// get axis ref
				axis.main = chart.get('mainAxis');

				$.each(indicatorIds, function (index, id) {
					axis[id] = chart.get(id + 'Axis');
				});
			}

			function toggleMACD(el) {
				if (seriesState.macd) {
					series.macd[0].hide();
					series.macd[1].hide();
					series.macd[2].hide();
					if (el != null)
						$(el).removeClass('active');
					seriesState.macd = false;
					axis.macd.update({
						visible: false
					});
				} else {
					axis.macd.update({
						visible: true
					});
					series.macd[0].show();
					series.macd[1].show();
					series.macd[2].show();
					if (el != null)
						$(el).addClass('active');
					seriesState.macd = true;
				}
			}

			function toggleRSI(el) {
				if (seriesState.rsi) {
					series.rsi.hide();
					if (el != null)
						$(el).removeClass('active');
					seriesState.rsi = false;
					axis.rsi.update({
						visible: false
					});
				} else {
					axis.rsi.update({
						visible: true
					});
					series.rsi.show();
					if (el != null)
						$(el).addClass('active');
					seriesState.rsi = true;
				}
			}

			function toggleStoch(el) {
				if (seriesState.stoch) {
					series.stoch[0].hide();
					series.stoch[1].hide();
					series.stoch[2].hide();
					if (el != null)
						$(el).removeClass('active');
					seriesState.stoch = false;
					axis.stoch.update({
						visible: false
					});
				} else {
					axis.stoch.update({
						visible: true
					});
					series.stoch[0].show();
					series.stoch[1].show();
					series.stoch[2].show();
					if (el != null)
						$(el).addClass('active');
					seriesState.stoch = true;
				}
			}



			function attachDropDownControlEvents() {
				$(".chart-editor .dropdown-menuitem").each(function (i, el) {
					if (seriesState[el.id]) {
						$(el).addClass('active');
					}

					switch (el.id) {
						case 'candlestick':
							$(el).click(function () {
								if (seriesState.candlestick == false) {
									series.ohlc.update({
										type: 'candlestick'
									});
									$(el).addClass('active');
									$(".chart-editor #line").removeClass('active');
									seriesState.candlestick = true;
								}
							});
							break;
						case 'line':
							$(el).click(function () {
								if (seriesState.candlestick) {
									series.ohlc.update({
										type: 'spline'
									});
									$(el).addClass('active');
									$(".chart-editor #candlestick").removeClass('active');
									seriesState.candlestick = false;
								}
							});
							break;

						case 'bb20':
							$(el).click(function () {
								if (seriesState.bb20) {
									series.bb20[0].hide();
									series.bb20[1].hide();
									series.bb20[2].hide();
									$(el).removeClass('active');
									seriesState.bb20 = false;
								} else {
									series.bb20[0].show();
									series.bb20[1].show();
									series.bb20[2].show();
									$(el).addClass('active');
									seriesState.bb20 = true;
								}
							});
							break;
						case 'macd':
							$(el).click(function () {
								/*if (seriesState.macd) {
						series.macd[0].hide();
						series.macd[1].hide();
						series.macd[2].hide();
						$(el).removeClass('active');
						seriesState.macd = false;
						axis.macd.update ({
							visible: false
						});
					} else {
						axis.macd.update ({
							visible: true
						});
						series.macd[0].show();
						series.macd[1].show();
						series.macd[2].show();
						$(el).addClass('active');
						seriesState.macd = true;
					}
	
					resize ();*/
								toggleMACD(el);
								resize();
							});
							break;
						case 'rsi':
							$(el).click(function () {
								toggleRSI(el);

								resize();
							});
							break;
						case 'stoch':
							$(el).click(function () {
								toggleStoch(el);

								resize();
							});
							break;
						default:
							$(el).click(function () {
								serie = series[el.id];
								if (serie) {
									if (seriesState[el.id]) {
										serie.hide();
										$(el).removeClass('active');
										seriesState[el.id] = false;
									} else {
										serie.show();
										$(el).addClass('active');
										seriesState[el.id] = true;
									}
								}
							});
							break;
					}
				});

				// for Quant Forecast checkbox
				$('#forecast').change(function () {
					toggleForcast($(this).is(":checked"));
				});
				$('#forecastmin').change(function () {
					toggleForcastMin($(this).is(":checked"));
				});
				$('#forecastmax').change(function () {
					toggleForcastMax($(this).is(":checked"));
				});
			}

			function toggleForcast(isOn) {
				if (isOn) {
					series.predict.show();
					seriesState.predict = true;
					// for auto moving
					if ((!seriesState.predictmin && !seriesState.predictmax))
						chart.xAxis[0].setExtremes(predictRangeMin, predictRangeMax);
				} else {
					series.predict.hide();
					seriesState.predict = false;

					// for auto moving
					if (!seriesState.predict && !seriesState.predictmin && !seriesState.predictmax)
						chart.xAxis[0].setExtremes(lastDate - rangeScale * 2, lastDate);
				}
			}


			function toggleForcastMin(isOn) {
				if (isOn) {
					series.predictmin.show();
					seriesState.predictmin = true;
					// for auto moving
					if (!seriesState.predict && !seriesState.predictmax)
						chart.xAxis[0].setExtremes(predictRangeMin, predictRangeMax);
				} else {
					series.predictmin.hide();
					seriesState.predictmin = false;

					// for auto moving
					if (!seriesState.predict && !seriesState.predictmin && !seriesState.predictmax)
						chart.xAxis[0].setExtremes(lastDate - rangeScale * 2, lastDate);
				}
			}

			function toggleForcastMax(isOn) {
				if (isOn) {
					series.predictmax.show();
					seriesState.predictmax = true;
					// for auto moving
					if (!seriesState.predict && !seriesState.predictmin)
						chart.xAxis[0].setExtremes(predictRangeMin, predictRangeMax);
				} else {
					series.predictmax.hide();
					seriesState.predictmax = false;

					// for auto moving
					if (!seriesState.predict && !seriesState.predictmin && !seriesState.predictmax)
						chart.xAxis[0].setExtremes(lastDate - rangeScale * 2, lastDate);
				}
			}

			// for resizing
			var INIT_TOTAL_HEIGHT = 864,
				MIN_TOTAL_HEIGHT = 500,
				TOP_PADDING = 45,
				BOTTOM_PADDING = 119,
				PLOT_SPACING = 25,
				RATE = 2;
			var totalHeight, utilsHeight, indicatorHeight = 150;

			function resetSize(initTotalHeight) {
				totalHeight = initTotalHeight > MIN_TOTAL_HEIGHT ? initTotalHeight : MIN_TOTAL_HEIGHT;
				utilsHeight = TOP_PADDING + BOTTOM_PADDING;

				indicatorHeight = (totalHeight - utilsHeight) / (RATE + indicatorIds.length) - PLOT_SPACING;
				container.height(totalHeight);
			}

			function resizeChart(chart) {
				var tempTop = TOP_PADDING + (PLOT_SPACING + indicatorHeight) * RATE;
				var i = 0,
					len = indicatorIds.length,
					k = 0;
				for (; i < len; i++) {
					if (seriesState[indicatorIds[i]]) {
						tempTop += PLOT_SPACING;
						axis[indicatorIds[i]].top = tempTop;
						axis[indicatorIds[i]].update({
							top: tempTop
						});
						tempTop += indicatorHeight;

						k++;
					}
				}
				totalHeight = utilsHeight + (PLOT_SPACING + indicatorHeight) * (RATE + k);
				container.height(totalHeight);
				chart.setSize(container.width(), totalHeight, true);
			}

			function resize() {
				var tempTop = TOP_PADDING + (PLOT_SPACING + indicatorHeight) * RATE;
				var i = 0,
					len = indicatorIds.length,
					k = 0;
				for (; i < len; i++) {
					if (seriesState[indicatorIds[i]]) {
						tempTop += PLOT_SPACING;
						axis[indicatorIds[i]].top = tempTop;
						axis[indicatorIds[i]].update({
							top: tempTop
						});
						tempTop += indicatorHeight;

						k++;
					}
				}
				totalHeight = utilsHeight + (PLOT_SPACING + indicatorHeight) * (RATE + k);
				container.height(totalHeight);
				chart.setSize(container.width(), totalHeight, true);
			}

			function resetChartOptions() {
				var tempTop = 0;
				defaultOptions.yAxis = [];

				for (var id in YAxisOptions) {
					if (YAxisOptions[id].indicator) {
						tempTop += PLOT_SPACING;

						YAxisOptions[id].top = tempTop;
						YAxisOptions[id].height = indicatorHeight;

						tempTop += indicatorHeight;
					} else if (YAxisOptions[id].id == 'volumnAxis') {
						YAxisOptions[id].top = tempTop - indicatorHeight;
						YAxisOptions[id].height = indicatorHeight;
					} else { // main y axis
						tempTop += TOP_PADDING;

						//YAxisOptions[id].top = tempTop;
						var height = (PLOT_SPACING + indicatorHeight) * RATE;
						YAxisOptions[id].height = height;
						tempTop += height;
					}
					defaultOptions.yAxis.push(YAxisOptions[id]);
				}

				//defaultOptions.xAxis.plotBands[0].from = lastDate;
				//defaultOptions.xAxis.plotBands[0].to = lastPredictDate;

				defaultOptions = Highcharts.merge(defaultOptions, seriesOption);
			}

			function refreshPredictData() {
				calcPredictRange();
				series.predict.setData(PREDICT);
				series.predictmin.setData(PREDICTMIN);
				series.predictmax.setData(PREDICTMAX);
				toggleForcast(seriesState.predict);
				toggleForcastMin(seriesState.predictmin);
				toggleForcastMax(seriesState.predictmax);

			}

			function calcPredictRange() {
				var extremes = chart.xAxis[0].getExtremes();
				var oldMin = extremes.min,
					oldMax = extremes.max;
				rangeScale = (oldMax - oldMin) / 2;

				if (lastPredictDate - lastDate > rangeScale) {
					predictRangeMin = lastDate - rangeScale;
					predictRangeMax = lastDate + rangeScale;
				} else {
					predictRangeMin = lastPredictDate - rangeScale * 2;
					predictRangeMax = lastPredictDate;
				}
			}

			$(function () {
				container = $('#' + containerId);
				resetSize(INIT_TOTAL_HEIGHT);


				parseData(JSON.parse(priceData));

				parsePredictData(JSON.parse(forecastData));

				resetChartOptions();
				chart = Highcharts.stockChart(containerId, defaultOptions, onChartLoaded);

				refreshPredictData();
				chart.xAxis[0].setExtremes(predictRangeMin, predictRangeMax);
				chart.xAxis[0].update({
					plotBands: [{
							from: lastDate,
							to: seriesState.predict ? lastPredictDate : lastDate,
							color: 'rgba(68, 170, 213, 0.2)'
						},
						{
							from: Date.UTC(2016, 10, 23),
							to: Date.UTC(2016, 10, 24),
							color: 'rgba(68, 170, 213, 0.2)'
						}, {
							from: Date.UTC(2016, 1, 03),
							to: Date.UTC(2016, 1, 04),
							color: 'rgba(68, 170, 213, 0.2)'
						}, {
							from: Date.UTC(2016, 1, 02),
							to: Date.UTC(2016, 1, 03),
							color: 'rgba(68, 170, 213, 0.2)'
						}, {
							from: Date.UTC(2015, 4, 08),
							to: Date.UTC(2015, 4, 09),
							color: 'rgba(68, 170, 213, 0.2)'
						}, {
							from: Date.UTC(2015, 0, 29),
							to: Date.UTC(2015, 0, 30),
							color: 'rgba(68, 170, 213, 0.2)'
						}, {
							from: Date.UTC(2015, 0, 28),
							to: Date.UTC(2015, 0, 29),
							color: 'rgba(68, 170, 213, 0.2)'
						}, {
							from: Date.UTC(2015, 0, 27),
							to: Date.UTC(2015, 0, 28),
							color: 'rgba(68, 170, 213, 0.2)'
						}, {
							from: Date.UTC(2014, 6, 16),
							to: Date.UTC(2014, 6, 17),
							color: 'rgba(68, 170, 213, 0.2)'
						}, {
							from: Date.UTC(2013, 4, 20),
							to: Date.UTC(2013, 4, 21),
							color: 'rgba(68, 170, 213, 0.2)'
						}


					]
				});
				chart.renderer.image('/images/logo-embed.jpg', 75, 75, 100, 27).on('click', function () {
					location.href = 'http://www.wingcharts.com'
				}).css({
					cursor: 'Pointer'
				}).add();



				$('#zoom0').click(function () {
					var chart = $("#" + containerId).highcharts();
					chart.xAxis[0].setExtremes(

						Date.UTC(2016, 6, 01),
						Date.UTC(2017, 2, 01)
					);


				});


				$('#zoom1').click(function () {
					var chart = $("#" + containerId).highcharts();
					chart.xAxis[0].setExtremes(

						Date.UTC(2016, 9, 16),
						Date.UTC(2017, 1, 23)
					);


				});


				$('#zoom2').click(function () {
					var chart = $("#" + containerId).highcharts();
					chart.xAxis[0].setExtremes(

						Date.UTC(2016, -1, 27),
						Date.UTC(2016, 4, 03)
					);


				});


				$('#zoom3').click(function () {
					var chart = $("#" + containerId).highcharts();
					chart.xAxis[0].setExtremes(

						Date.UTC(2016, -1, 26),
						Date.UTC(2016, 4, 02)
					);


				});


				$('#zoom4').click(function () {
					var chart = $("#" + containerId).highcharts();
					chart.xAxis[0].setExtremes(

						Date.UTC(2015, 3, 01),
						Date.UTC(2015, 7, 08)
					);


				});


				$('#zoom5').click(function () {
					var chart = $("#" + containerId).highcharts();
					chart.xAxis[0].setExtremes(

						Date.UTC(2015, -1, 22),
						Date.UTC(2015, 3, 29)
					);


				});


				$('#zoom6').click(function () {
					var chart = $("#" + containerId).highcharts();
					chart.xAxis[0].setExtremes(

						Date.UTC(2015, -1, 21),
						Date.UTC(2015, 3, 28)
					);


				});


				$('#zoom7').click(function () {
					var chart = $("#" + containerId).highcharts();
					chart.xAxis[0].setExtremes(

						Date.UTC(2015, -1, 20),
						Date.UTC(2015, 3, 27)
					);


				});


				$('#zoom8').click(function () {
					var chart = $("#" + containerId).highcharts();
					chart.xAxis[0].setExtremes(

						Date.UTC(2014, 5, 09),
						Date.UTC(2014, 9, 16)
					);


				});


				$('#zoom9').click(function () {
					var chart = $("#" + containerId).highcharts();
					chart.xAxis[0].setExtremes(

						Date.UTC(2013, 3, 13),
						Date.UTC(2013, 7, 20)
					);


				});
			});