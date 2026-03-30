from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for development only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


sales_data = {
    "2023": {"labels": ["Jan", "Feb", "Mar", "Apr", "May"], "values": [12, 19, 3, 5, 2]},
    "2024": {"labels": ["Jan", "Feb", "Mar", "Apr", "May"], "values": [22, 29, 13, 15, 12]},
    "2025": {"labels": ["Jan", "Feb", "Mar", "Apr", "May"], "values": [30, 45, 20, 35, 40]},
}

@app.get("/")
def read_root():
    return {"message": "API is running! Go to /api/sales?year=2024"}


@app.get("/api/sales")
def get_sales(year: str = "2024"): 
    data = sales_data.get(year)
    
    if not data:
        raise HTTPException(status_code=404, detail="Year not found. Try 2023, 2024, or 2025.")
    
    return data