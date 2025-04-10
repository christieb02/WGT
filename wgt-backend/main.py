#  pip3 install fastapi uvicorn pillow scikit-learn python-multipart 
# uvicorn main:app --reload  
import io
import numpy as np
import PIL.ImageOps
import PIL.Image
import pickle
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf

# with open ('mnist_model.pkl', 'rb') as f:
#     model = pickle.load(f)

# Import model
with open('cf_metadata.pkl', 'rb') as f:
    cf_metadata = pickle.load(f)
    class_names = cf_metadata['class_names']

model = tf.keras.models.load_model('image_classifier.keras')


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict-image/")
async def predict_image(file: UploadFile = File(...)):
    try: 
        contents = await file.read()
        # pil_image = PIL.Image.open(io.BytesIO(contents)).convert('L')
        pil_image = PIL.Image.open(io.BytesIO(contents)).convert('RGB')
        pil_image = PIL.ImageOps.invert(pil_image)
        # pil_image = pil_image.resize((28, 28), PIL.Image.LANCZOS)
        pil_image = pil_image.resize((32, 32), PIL.Image.LANCZOS)
        # img_array = np.array(pil_image).reshape(1, -1)
        img_array = np.array(pil_image)/ 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        prediction = model.predict(img_array)
        # return {"prediction": int(prediction[0])}
        index = int(np.argmax(prediction))
        return {"prediction": class_names[index]}
    except Exception as e:
        print(f"Prediction failed: {e}")
        return {"error": "Prediction failed"}