(function ($) {

  $.fn.swellCast = function () {

    return this.each(function () {

      var client_container = $(this).attr("id"),
        container = $("#" + client_container),
        loc = container.data('swellcast-location'),
        loc_name = loc.replace(/-/g, " "),
        loc_string = loc.replace(/-/g, ""),
        hd_bg = container.data('swellcast-headerbg'),
        hd_text = container.data('swellcast-headertext'),
        loading = '<div class="swellcast_forecast_header" style="background-color:' + hd_bg + ';color:' +
          hd_text + '"><h5>' + loc_name + ' Surf Forecast</h5><p>powered by <a style="color:' + hd_text +
          '" href="http://swellcast.com.au" title="Visit swellcast.com.au">Swellcast</a></p></div><div class="swellcast_loading"><p class="blink_text">fetching data…</p></div><div class="swellcast_forecast_footer"><p>Primary Swell Height (m) / Wind Speed (kt)</p><a class="swellcast_visit" href="http://swellcast.com.au/locations/' +
          loc + '-surf-report" title="View full 7 day forecast"></a></div>';

      container.append(loading);


      $.ajax({
        url: 'http://swellcast.com.au/api/v1/locations/' + loc + '-surf-report/web_embed.json',
        timeout: 10000,
        type: 'GET',
        dataType: 'jsonp',
        jsonpCallback: loc_string,
        
        success: function (data) {

          forecast_body =
            '<div class="swellcast_forecast"><div class="swellcast_forecast_header" style="background-color:' +
            hd_bg + ';color:' + hd_text + '"><h5>' + loc_name +
            ' Surf Forecast</h5><p>powered by <a style="color:' + hd_text +
            '" href="http://swellcast.com.au" title="Visit swellcast.com.au">Swellcast</a></p></div><div class="swellcast_forecast_chart"><div class="vert_1"></div><div class="swell_label swell_label_1">1</div><div class="wind_label wind_label_5">5</div><div class="swell_scale swell_scale_1"></div><div class="swell_label swell_label_2">2</div><div class="wind_label wind_label_10">10</div><div class="swell_scale swell_scale_2"></div><div class="swell_label swell_label_3">3</div><div class="wind_label wind_label_15">15</div><div class="swell_scale swell_scale_3"></div><div class="swell_label swell_label_4">4</div><div class="wind_label wind_label_20">20</div><div class="swell_scale swell_scale_4"></div><div class="swell_label swell_label_5">5</div><div class="wind_label wind_label_25">25</div><div class="swell_scale swell_scale_5"></div><div class="swell_label swell_label_6">6</div><div class="wind_label wind_label_30">30</div><div class="swell_scale swell_scale_6"></div><div class="swell_label swell_label_7">7</div><div class="wind_label wind_label_35">35</div><div class="swell_scale swell_scale_7"></div><div class="swell_label swell_label_8">8</div><div class="wind_label wind_label_40">40</div><div class="swell_scale swell_scale_8"></div><div class="full_outlook_inner"><ol class="full_outlook">';


          $.each(data.forecasts, function (i, item) { // Each day

            forecast_body += '<li><h6>' + this.short_day + '<span>' + this.month + ' ' + this.day_of_month +
              '</span></h6><ol>';

            $.each(item.steps, function (s, step) { // Each step

              var h = step.s_height * 25,
                ws = (step.w_spe * 5) - 8,
                wd = step.w_dir;

              forecast_body += '<li><div class="swellcast_h_bar" style="height:' + h +
                'px;"></div><div class="swellcast_w_arrow dir_' + wd + '" style="bottom:' + ws +
                'px;"></div></li>';

            });

            forecast_body += '</ol><div class="vert"></div></li>';
          });

          forecast_body +=
            '</ol></div></div><div class="swellcast_forecast_footer"><p>Primary Swell Height (m) / Wind Speed (kt)</p><a class="swellcast_visit" href="http://swellcast.com.au/locations/' +
            loc + '-surf-report" title="View full 7 day forecast"></a></div></div>';


          $(container).empty().append($.trim(forecast_body));

          $(".swell_scale").each(function (index) {
            $(this).delay(200 * index).fadeIn(800);
          });

          $(".full_outlook ol").each(function (index) {
            $(this).delay(200 * index).fadeIn(800);
          });

        },

        error: function () {

          $('.swellcast_loading').html('<p>error loading data</p>');

        }

      });
    });

  }

})(jQuery);