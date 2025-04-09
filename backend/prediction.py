from flask import Flask, request, jsonify
import json
import traceback
import joblib
import api_calls
import numpy as np
import scipy.stats
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Load champions dictionary
with open("C:\\Users\\dhanv\\Desktop\\New folder (9)\\New folder (7)\\champions_name_dictionary.json", "r") as file:
    champions = json.load(file)

def add_stats(raw_data) -> list:
    try:
        processed_data = []
        processed_data += raw_data

        # Add average
        processed_data.append(np.average(raw_data))
        # Add median
        processed_data.append(np.median(raw_data))
        # Add coefficient of kurtosis
        processed_data.append(scipy.stats.kurtosis(raw_data, bias=False))
        # Add coefficient of skewness
        processed_data.append(scipy.stats.skew(raw_data, bias=False))
        # Add standard deviation
        processed_data.append(np.std(raw_data))
        # Add variance
        processed_data.append(np.var(raw_data))

        return processed_data
    except Exception as e:
        print(f"Error in add_stats function: {e}")
        traceback.print_exc()

def predict_match_past(match, region):
    try:
        print("Predicting Match")
        print(match)
        print(region)
        participants = match["participants"]
        print("participant = ",len(participants))
        print("Match found!")
        blueWinrates = []
        blueMasteries = []
        redWinrates = []
        redMasteries = []

        batch = 0
        totalBatches = 10
        # Get Masteries and Winrates
        for participant in participants:
            batch += 1
            print(f"Processing participant {batch} ({100*batch//totalBatches}%)")
            riot_user_name = participant.get("gameName", "")
            riot_tag_line = participant.get("tagLine", "")
            riot_tag_line = "#" + riot_tag_line
            championId = participant["championId"]
            team = participant["team"]
            winrate_list = api_calls.get_winrates_past(riot_user_name, riot_tag_line, region)["winrate"]
            mastery_list = api_calls.get_masteries_past(riot_user_name, riot_tag_line, region)["mastery"]
            mastery = 0

            # Go over each element of the list
            for mastery_object in mastery_list:
                if championId == mastery_object["championId"]:
                    mastery = mastery_object["mastery"]

            winrate = 0
            for winrate_object in winrate_list:
                if championId == winrate_object["championID"]:
                    winrate = winrate_object["winrate"] / 100

            if team == "RED":
                redMasteries.append(mastery)
                redWinrates.append(winrate)
            else:
                blueMasteries.append(mastery)
                blueWinrates.append(winrate)

        # Process Data
        print("Processing data...")
        blueData = []
        redData = []

        blueData += add_stats(blueMasteries)
        blueData += add_stats(blueWinrates)
        redData += add_stats(redMasteries)
        redData += add_stats(redWinrates)

        final_data = []
        final_data += blueData
        final_data += redData

        dataset = final_data
        model = joblib.load("C:/Users/dhanv/Desktop/New folder (9)/New folder (7)/src/finalized_model.sav")
        prediction = model.predict([dataset])

        return prediction
    except Exception as e:
        print(f"Error in predict_match function: {e}")
        traceback.print_exc()

def predict_match(match, region):
    try:
        print("Predicting Match")
        participants = match["participants"]
        print("Match found!")
        blueWinrates = []
        blueMasteries = []
        redWinrates = []
        redMasteries = []

        batch = 0
        totalBatches = 10
        riot_user_name = ""
        riot_tag_line = ""
        # Get Masteries and Winrates
        for participant in participants:
            batch += 1
            print(f"Processing participant {batch} ({100*batch//totalBatches}%)")
            summoner_name = participant.get("summonerName", "")
            championId = participant["championId"]
            team = participant["team"]
            if '#' in summoner_name:
                riot_user_name, riot_tag_line = summoner_name.split('#')
                riot_tag_line = "#" + riot_tag_line
            print(riot_tag_line, riot_user_name, region)
            winrate_list = api_calls.get_winrates(riot_user_name, riot_tag_line, region)["winrate"]
            mastery_list = api_calls.get_masteries(riot_user_name, riot_tag_line, region)["mastery"]
            mastery = 0

            # Go over each element of the list
            for mastery_object in mastery_list:
                if championId == mastery_object["championId"]:
                    mastery = mastery_object["mastery"]

            winrate = 0
            for winrate_object in winrate_list:
                if championId == winrate_object["championID"]:
                    winrate = winrate_object["winrate"] / 100

            if team == "RED":
                redMasteries.append(mastery)
                redWinrates.append(winrate)
            else:
                blueMasteries.append(mastery)
                blueWinrates.append(winrate)

        # Process Data
        print("Processing data...")
        blueData = []
        redData = []

        blueData += add_stats(blueMasteries)
        blueData += add_stats(blueWinrates)
        redData += add_stats(redMasteries)
        redData += add_stats(redWinrates)

        final_data = []
        final_data += blueData
        final_data += redData

        dataset = final_data
        model = joblib.load("C:\\Users\\dhanv\\Desktop\\New folder (10)\\my-app\\backend\\finalized_model.sav")
        prediction = model.predict([dataset])

        return prediction
    except Exception as e:
        print(f"Error in predict_match function: {e}")
        traceback.print_exc()

def make_json_serializable(d):
    for key, value in d.items():
        if isinstance(value, np.ndarray):
            d[key] = value.tolist()
    return d

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        riot_user_name = data.get("riot_user_name")
        riot_tag_line = data.get("riot_tag_line")
        region = data.get("region")
        prediction_type = data.get("prediction_type")

        if not all([riot_user_name, riot_tag_line, region, prediction_type]):
            return jsonify({"error": "Missing required fields"}), 400

        if prediction_type == "current":
            result = get_current_match_prediction(riot_user_name, riot_tag_line, region)
        elif prediction_type == "last":
            result = get_last_match_prediction(riot_user_name, riot_tag_line, region)
        else:
            return jsonify({"error": "Invalid prediction type"}), 400
        print(result)
        result = make_json_serializable(result)  # ✅ Fix serialization
        return jsonify(result), 200
    except Exception as e:
        print(f"Error in /predict endpoint: {e}")
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500

def get_current_match_prediction(riot_user_name: str, riot_tag_line: str, region: str):
    try:
        region_map = {
            "BR": "br1",
            "EUNE": "eun1",
            "EUW": "euw1",
            "JP": "jp1",
            "KR": "kr",
            "LAN": "la1",
            "LAS": "la2",
            "NA": "na1",
            "OCE": "oc1",
            "RU": "ru",
            "TR": "tr1",
            "TW": "tw2",
            "TH": "th2",
            "PH": "ph2",
            "SG": "sg2"
        }

        region_code = region_map.get(region, "na1")
        match = api_calls.get_live_match(riot_user_name, riot_tag_line, region_code)

        if not match:
            return {"error": "No active match found"}

        your_team = None
        your_champion = None
        your_role = None

        for participant in match.get("participants", []):
            if participant.get("summonerName") == f"{riot_user_name}{riot_tag_line}":
                your_team = participant.get("team")
                your_champion = champions.get(str(participant.get("championId")), "Unknown")
                your_role = participant.get("currentRole")
                break

        if not all([your_team, your_champion, your_role]):
            return {"error": "Missing participant details"}

        prediction = predict_match(match, region)
        response = {
            "victory_predicted": (
                (prediction == 1 and your_team == "BLUE") or
                (prediction == 0 and your_team == "RED")
            ),
            "team": your_team,
            "champion": your_champion,
            "role": your_role
        }
        return response
    except Exception as e:
        print(f"Error in get_current_match_prediction function: {e}")
        traceback.print_exc()
        return {"error": "Failed to fetch current match prediction"}

def get_last_match_prediction(riot_user_name: str, riot_tag_line: str, region: str):
    try:
        match = api_calls.get_past_matches(riot_user_name, riot_tag_line, region, 1)[0]
        print(match)
        prediction = predict_match_past(match, region)

        teams_result = {
            match["teams"][0]["teamId"]: match["teams"][0]["result"],
            match["teams"][1]["teamId"]: match["teams"][1]["result"],
        }

        result = 1 if teams_result["BLUE"] == "WON" else 0

        your_championId = match["subject"]["championId"]
        your_team = match["subject"]["team"]
        your_role = match["subject"]["role"]

        response = {
            "team": your_team,
            "role": your_role,
            "champion": champions[str(your_championId)],
            "won": ((result == 1 and your_team == "BLUE") or (result == 0 and your_team == "RED")),
            "correct": (result == prediction)
        }
        return response
    except Exception as e:
        print(f"Error in get_last_match_prediction function: {e}")
        traceback.print_exc()
        return {"error": "Failed to fetch last match prediction"}

if __name__ == '__main__':
    app.run(debug=True, port=5000)