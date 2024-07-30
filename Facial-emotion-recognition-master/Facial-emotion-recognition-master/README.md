# Facial-Emotion-Recognition

## About The Project

A tensorflow/keras implementation of a facial emotion recognition model based on a convolutional neural network architecture and trained on the FER2013 dataset with FERPlus labels.

### Built With
* Keras
* Tensorflow
* OpenCV

### Installation
  pip install tensorflow
  pip install keras
  pip install opencv
  pip install numpy

<!-- USAGE EXAMPLES -->
## Usage

To train the model use the following command
 ```sh
  python fer.py
 ```
The model can make predictions on saved images by providing the image path using the following command
 ```sh
  python img_predict.py img_name.png
 ```
It can also predict on saved videos
```sh
  python vid_predict.py vid_name.mp4
```
Or by using a live camera
```sh
  python live_cam_predict.py
```

