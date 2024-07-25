import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

class RecommendationModel:
    def __init__(self, data):
        self.data = pd.read_csv(data)
        self.model = None
        self._prepare_model()

    def _prepare_model(self):
        tfidf = TfidfVectorizer(stop_words='english')
        self.data['product_description'] = self.data['product_description'].fillna('')
        tfidf_matrix = tfidf.fit_transform(self.data['product_description'])
        self.model = linear_kernel(tfidf_matrix, tfidf_matrix)

    def get_recommendations(self, product_id):
        idx = self.data[self.data['product_id'] == product_id].index[0]
        sim_scores = list(enumerate(self.model[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:6]
        product_indices = [i[0] for i in sim_scores]
        return self.data['product_id'].iloc[product_indices].tolist()

# Usage
recommendation_model = RecommendationModel('products.csv')
print(recommendation_model.get_recommendations(1))
