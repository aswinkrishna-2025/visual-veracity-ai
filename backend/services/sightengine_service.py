# services/sightengine_service.py

import requests
from backend.config import (
    SIGHTENGINE_API_USER,
    SIGHTENGINE_API_SECRET,
    SIGHTENGINE_ENDPOINT
)

def analyze_image(image_path: str):

    try:
        with open(image_path, "rb") as image_file:

            response = requests.post(
                SIGHTENGINE_ENDPOINT,
                files={"media": image_file},
                data={
                    "models": "genai",
                    "api_user": SIGHTENGINE_API_USER,
                    "api_secret": SIGHTENGINE_API_SECRET
                }
            )

        result = response.json()

        # Extract AI detection scores
        ai_score = result.get("type", {}).get("ai_generated", 0)
        human_score = result.get("type", {}).get("human", 0)

        # Decide prediction
        prediction = "AI_GENERATED" if ai_score > human_score else "REAL"

        confidence = max(ai_score, human_score)

        return {
            "prediction": prediction,
            "confidence": round(confidence * 100, 2),
            "ai_score": ai_score,
            "human_score": human_score,
            "raw_response": result
        }

    except Exception as e:
        return {
            "error": str(e)
        }
