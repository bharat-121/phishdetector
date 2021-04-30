from django.apps import AppConfig
import html
import pathlib
import os
import numpy as np
from keras.layers import Embedding, SpatialDropout1D, LSTM, Dropout, Bidirectional, Dense
from keras.models import Sequential


# from fast_bert.prediction import BertClassificationPredictor


# class WebappConfig(AppConfig):
#     name = 'fastbert'
#     MODEL_PATH = Path("model")
#     BERT_PRETRAINED_PATH = Path("model/uncased_L-12_H-768_A-12/")
#     LABEL_PATH = Path("label/")
#     predictor = BertClassificationPredictor(model_path=MODEL_PATH/"multilabel-emotion-fastbert-basic.bin",
#                                             pretrained_path=BERT_PRETRAINED_PATH,
#                                             label_path=LABEL_PATH, multi_label=True)


NB_DENSE_CELLS = 256
LSTM_CELLS = 64
DENSE_CELLS = 2
EMBEDDING_SIZE = 100

def build_bidirectional_lstm_model(num_tokens, fixed_len):
    model = Sequential()
    model.add(Embedding(input_dim=num_tokens, output_dim=EMBEDDING_SIZE, input_length=fixed_len))
    model.add(SpatialDropout1D(0.2))
    model.add(Bidirectional(LSTM(units=LSTM_CELLS, dropout=0.2,recurrent_dropout=0.2, input_shape=(fixed_len, EMBEDDING_SIZE))))
    model.add(Dense(NB_DENSE_CELLS))
    model.add(Dropout(0.3))   
    model.add(Dense(DENSE_CELLS, activation='sigmoid'))

    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model


class BidirectionalLstmEmbedPredictor:
    model_name = 'bidirectional-lstm'
    MODEL_DIR = os.path.join(pathlib.Path().absolute(),"fastdetect", "model")

    @staticmethod
    def get_config_file_path():
        return os.path.join(BidirectionalLstmEmbedPredictor.MODEL_DIR, BidirectionalLstmEmbedPredictor.model_name + '-config.npy')

    @staticmethod
    def get_weight_file_path():
        return os.path.join(BidirectionalLstmEmbedPredictor.MODEL_DIR, BidirectionalLstmEmbedPredictor.model_name + '-weights.h5')

    def load_bidirectional_lstm_model(self):
        configuration_file_path = self.get_config_file_path()
        weight_file_path = self.get_weight_file_path()

        config = np.load(configuration_file_path,allow_pickle=True).item()
        self.num_tokens = config['num_tokens']
        self.fixed_length = config['fixed_length']
        self.idx2char = config['idx2char']
        self.char2idx = config['char2idx']

        self.model = build_bidirectional_lstm_model(self.num_tokens, self.fixed_length)
        self.model.load_weights(weight_file_path)

    def predict(self, url):       
        #trim url if it greater than fixed length
        if len(url) > self.fixed_length:
          url=url[0:self.fixed_length]
        
        data_size = 1
        X = np.zeros(shape=(data_size, self.fixed_length))
    
        for index, c in enumerate(url):
            if c in self.char2idx:
                X[0, index] = self.char2idx[c]
            else :
                X[0, index] = self.char2idx["unknown"]

        predicted = self.model.predict(X)[0]
        predicted_label = np.argmax(predicted)
        return predicted_label



class FastdetectConfig(AppConfig):
    name = 'fastdetect'
    # MODEL_PATH = Path("model")
    # PRETRAINED_PATH = Path("model/")
    # LABEL_PATH = Path("label/")
    # predictor = BertClassificationPredictor(model_path=MODEL_PATH/"multilabel-emotion-fastbert-basic.bin",
    #                                         pretrained_path=BERT_PRETRAINED_PATH,
    #                                         label_path=LABEL_PATH, multi_label=True)

    classifier = BidirectionalLstmEmbedPredictor()
    classifier.load_bidirectional_lstm_model()
    # predicted_label = classifier.predict(url)
    # if predicted_label == 0:
    #     return "Phishing URL"
    # else:
    #     return "Legitimate URL"

    # def getPrediction(url):
