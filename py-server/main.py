from paddleocr import PaddleOCR
from flask import Flask, render_template, request, jsonify
from PIL import Image
import uuid
import os

paddle = PaddleOCR(lang="en", ocr_version="PP-OCRv4", show_log=False)


def scanner(image_path):
    print(scanner)
    result = paddle.ocr(image_path, cls=True)
    result = result[0]
    texts = [line[1][0] for line in result]
    text_joined = " ".join(texts)
    return text_joined

app = Flask(__name__)

@app.route("/upload", methods=["POST"])
def uploadUtility():
    if 'image' not in request.files:
        return jsonify({"error": "No image data"}), 400
    image_data = request.files.get('image')
    image = Image.open(image_data)
    image = image.convert("RGB")
    new_id = str(uuid.uuid4())
    image.save(f'${new_id}.jpg')
    data = Image.open(f'${new_id}.jpg').convert("RGB")
    vehicle_id = scanner(f'${new_id}.jpg')
    os.remove(f'${new_id}.jpg')
    if vehicle_id:
        return {"ocr_data": vehicle_id , "success": True}
    return {"ocr_data": None, "success": False}

if __name__ == '__main__':
    app.run(debug=True)