from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/productivity")
def get_productivity(month: str = Query(None)):
    df = pd.read_csv("data.csv")

    filtered_df = df
    if month:
        filtered_df = df[df["month"] == month]

        if filtered_df.empty:
            raise HTTPException(status_code=404, detail="No data found for this month")

    return filtered_df.to_dict(orient="records")