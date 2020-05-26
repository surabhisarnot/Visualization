function get_scree_plot_data(url){
    $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json; charset=utf-8',
    xhrFields: {
    withCredentials: false
    },
    headers: {
    },
    success: function(result) {
        createScreePlot(result["pca_components"],result["cumsum"])
    }
    }
  );
  }

  function get_top_2_pca_data(url){
    $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json; charset=utf-8',
    xhrFields: {
    withCredentials: false
    },
    headers: {
    },
    success: function(result) {
        createScatterPlot(result["pca_components"], "Scatter Plot - Top 2 PCA Vectors")
    }
    }
  );
}

function get_mds_euclidean_data(url){
    $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json; charset=utf-8',
    xhrFields: {
    withCredentials: false
    },
    headers: {
    },
    success: function(result) {
        createScatterPlot(result["mds_euclidean"],"Scatter Plot - MDS Euclidean distance")
    }
    }
  );
}


function get_mds_correlation_data(url){
    $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json; charset=utf-8',
    xhrFields: {
    withCredentials: false
    },
    headers: {
    },
    success: function(result) {
        createScatterPlot(result["mds_correlation"],"Scatter Plot - MDS Correlation distance")
    }
    }
  );
}

function get_top_3_pca_attr_data(url){
    $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json; charset=utf-8',
    xhrFields: {
    withCredentials: false
    },
    headers: {
    },
    success: function(result) {
        create_scatter_matrix(result["matrix_data"], result["columns"], "Scatterplot matrix - 3 highest PCA loaded attributes")
    }
    }
  );
}