import numpy as np
import pandas as pd
from flask import Flask, render_template
from scipy.spatial.distance import cdist
from sklearn import decomposition
from sklearn import manifold
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances
import matplotlib.pyplot as plt

app = Flask(__name__)


# function to calculate random sampling
def random_sampling(data):
    return data.sample(frac=0.25)


# function to calculate stratified sampling
def stratified_sampling(df):
    distortions = []
    mapping1 = {}
    cluster_size = 10
    for k in range(1, cluster_size):
        model = KMeans(n_clusters=k).fit(df)
        distortions.append(sum(np.min(cdist(df, model.cluster_centers_, 'euclidean'), axis=1)) / df.shape[0])
        mapping1[k] = sum(np.min(cdist(df, model.cluster_centers_, 'euclidean'), axis=1)) / df.shape[0]

    # number of clusters decided using the above elbow method
    sampled_df = pd.DataFrame(columns=df.columns)

    plt.plot(range(1, cluster_size), distortions, 'bx-')
    plt.xlabel('Values of K')
    plt.ylabel('Distortion')
    plt.title('The Elbow Method using Distortion')
    # plt.show()

    km = KMeans(n_clusters=3)
    km.fit(df)
    df['Label'] = km.labels_
    for i in range(4):
        cluster_records = df[df['Label'] == i]
        sampled_df = sampled_df.append(cluster_records.sample(frac=0.25))
    return sampled_df


def cal_mds_by_euclidean(data):
    mds_data = manifold.MDS(n_components=2, dissimilarity='precomputed')
    return {'mds_euclidean': mds_data.fit_transform(pairwise_distances(data, metric='euclidean')).tolist()}


def cal_mds_by_correlation(data):
    mds_data = manifold.MDS(n_components=2, dissimilarity='precomputed')
    return {'mds_correlation': mds_data.fit_transform(pairwise_distances(data, metric='correlation')).tolist()}


df = pd.read_csv('data.csv', usecols=(
    'Overall', 'Balance', 'Strength', 'HeadingAccuracy',
    'ShortPassing', 'LongPassing', 'Dribbling', 'BallControl', 'Acceleration',
    'SprintSpeed', 'Agility', 'ShotPower', 'Aggression'))

df = df.dropna()

stratified_sampling_df = stratified_sampling(df)
random_sampling_df = random_sampling(df)


@app.route('/')
def index():
    return render_template('index.html')


def cal_pca(data):
    pca = decomposition.PCA()
    pca.fit(data)
    loadings = np.sum(np.square(pca.components_), axis=0)
    indices_of_top_3_attributes = loadings.argsort()[-3:][::-1]
    return pca.explained_variance_ratio_, indices_of_top_3_attributes


def get_scree_plot_data(df):
    pca_params, indices_of_top_3_attributes = cal_pca(df)
    pca_params_cumsum = np.cumsum(pca_params)
    data_frontend = {'pca_components': pca_params.tolist()}
    data_frontend['cumsum'] = pca_params_cumsum.tolist()
    print("Top three PCA attributes are", df.columns[indices_of_top_3_attributes].tolist())
    return data_frontend, indices_of_top_3_attributes


def get_top_3_pca_attr_data(df, indices):
    matrix_data = df[df.columns[indices]]
    data = {'matrix_data': np.array(matrix_data).tolist()}
    data['columns'] = np.array(df.columns[indices]).tolist()
    return data


def get_top_pca_two_components(data):
    pca = decomposition.PCA(n_components=2)
    return {'pca_components': (pca.fit_transform(data)).tolist()}


@app.route('/scree_plot_original')
def scree_plot_original():
    data, indices_of_top_3_attributes_o = get_scree_plot_data(df)
    return data


@app.route('/scree_plot_random')
def scree_plot_random():
    data, indices_of_top_3_attributes_r = get_scree_plot_data(random_sampling_df)
    return data


@app.route('/scree_plot_stratified')
def scree_plot_stratified():
    data, indices_of_top_3_attributes_s = get_scree_plot_data(stratified_sampling_df)
    return data


@app.route('/top_2_pca_o')
def top_2_pca_o():
    return get_top_pca_two_components(df)


@app.route('/top_2_pca_r')
def top_2_pca_r():
    return get_top_pca_two_components(random_sampling_df)


@app.route('/top_2_pca_s')
def top_2_pca_s():
    return get_top_pca_two_components(stratified_sampling_df)


@app.route('/mds_euclidean_o')
def mds_euclidean_o():
    return cal_mds_by_euclidean(df)


@app.route('/mds_euclidean_r')
def mds_euclidean_r():
    return cal_mds_by_euclidean(random_sampling_df)


@app.route('/mds_euclidean_s')
def mds_euclidean_s():
    return cal_mds_by_euclidean(random_sampling_df)


@app.route('/mds_correlation_o')
def mds_correlation_o():
    return cal_mds_by_correlation(df)


@app.route('/mds_correlation_r')
def mds_correlation_r():
    return cal_mds_by_correlation(random_sampling_df)


@app.route('/mds_correlation_s')
def mds_correlation_s():
    return cal_mds_by_correlation(stratified_sampling_df)


@app.route('/top_3_pca_attr_o')
def top_3_pca_attr_o():
    pca_params, indices_of_top_3_attributes = cal_pca(df)
    return get_top_3_pca_attr_data(df, indices_of_top_3_attributes)


@app.route('/top_3_pca_attr_r')
def top_3_pca_attr_r():
    pca_params, indices_of_top_3_attributes = cal_pca(random_sampling_df)
    return get_top_3_pca_attr_data(random_sampling_df, indices_of_top_3_attributes)


@app.route('/top_3_pca_attr_s')
def top_3_pca_attr_s():
    pca_params, indices_of_top_3_attributes = cal_pca(stratified_sampling_df)
    return get_top_3_pca_attr_data(stratified_sampling_df, indices_of_top_3_attributes)


if __name__ == "__main__":
    app.run(debug=True)
