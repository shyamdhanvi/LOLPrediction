from bs4 import BeautifulSoup
import requests
import json
import time
import sys
from dotenv import load_dotenv
import os

# Gets the mast matches from mobalytics
def wait(seconds):
    print("Waiting....")
    for i in range(seconds, 0, -1):
        sys.stdout.write(str(i) + " ")
        sys.stdout.flush()
        time.sleep(1)

def get_past_matches(riot_user_name: str, riot_tag_line: str, region: str, top: int):
    print("Function Called!")  
    print(f"Region: {region}") 
    regions = region
    regions = regions.upper()
    gameName = f"{riot_user_name}"
    tagLine = f"{riot_tag_line}"
    if "#" in tagLine:
        tagLine = tagLine.replace("#", "", 1)
    url = "https://app.mobalytics.gg/api/lol/graphql/v1/query"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "web:MTczODM0MjU2MXxkQUZQNWJTaXBsTUFNV0NXdU9iYmRCRTdqMm54TUl3QWV1TmdlYlQ5R2tKR1J3bTA0TzNYQU5XODBMOTJBN1d2TW9haFZMeDJkLW5WaDhLRTBNYjZRYmxjcmhaUUN2WVlJMDhpVWFack9OUHFMbzZFYTdpc0RPcFNCODZ5RnRwRTcwTVNUVy1QMkhaMnFMLUk0TEU0Z0FIdHloUTZ0bFlHRnlfRERtSllkN3pDeDdBMnl4MVZmTV94OGppMUkzWkp4N1phUlBKM0JReFp0QkhvWlRnNXJNaGdjWWlmYUFDbEZaZz187iF6MiguVJJ4N4TBUOrzYHQrLbnvAphvfwY45N_aTyQ="  # Replace with a valid token if required
    }
    payload = json.dumps({
        "operationName": "LolProfilePageSummonerOverviewQuery",  # Adjust based on what query you need
        "variables": {
            "gameName": gameName,
            "tagLine": tagLine,
            "region": regions,
            "sQueue": "RANKED_SOLO",
            "sRole": None,
            "top": top,
            "sChampion": None,
            "skip": 0
    },
    "extensions": {
        "persistedQuery": {
            "version": 1,
            "sha256Hash": "638315ba7d9b4a6070adc0fa3d7ab3bdf5a85087ca9834938b2e28e517049b1a",
        }
    }
    })
    try:
        response = requests.post(url, headers=headers, data=payload)
        response.raise_for_status()
        games_list = response.json()["data"]["lol"]["player"]["matchesHistory"]["matches"]
        return games_list
    except Exception as e:
        print(f"Error: {e}")
        return None

# Mapping Riot API regions for PUUID and Mastery endpoints
REGION_MAPPING = {
    "na": "americas", "br": "americas", "lan": "americas", "las": "americas",
    "euw": "europe", "eune": "europe", "tr": "europe", "ru": "europe",
    "kr": "asia", "jp": "asia", "tw": "asia", "vn": "asia", "ph": "asia", "sg": "asia", "th": "asia",
    "esports": "esports"
}

SERVER_MAPPING = {
    "na": "na1", "br": "br1", "lan": "la1", "las": "la2",
    "euw": "euw1", "eune": "eun1", "tr": "tr1", "ru": "ru",
    "kr": "kr", "jp": "jp1", "tw": "tw2", "vn": "vn2", "ph": "ph2", "sg": "sg2", "th": "th2",
    "esports": "esports"
}

# Riot API Key (Replace with your actual API Key)
load_dotenv()
API_KEY = os.getenv('RIOT_API_KEY')

def get_puuid(riot_user_name: str, riot_tag_line: str, region: str) -> str:
    """
    Fetches the PUUID of a player using Riot's Summoner API.
    """
    if "#" in riot_tag_line:
        riot_tag_line = riot_tag_line.replace("#", "", 1)
    riot_api_region = REGION_MAPPING.get(region.lower(), "americas")
    url = f"https://{riot_api_region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{riot_user_name}/{riot_tag_line}?api_key={API_KEY}"
    
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data.get("puuid")
    except requests.exceptions.RequestException as e:
        print(f"Failed to get PUUID: {e}")
        return None

def get_masteries(riot_user_name: str, riot_tag_line: str, region: str) -> dict:
    """
    Fetches champion masteries of a player using Riot's Mastery API.
    """
    puuid = get_puuid(riot_user_name, riot_tag_line, region)
    if not puuid:
        print("Error: Could not retrieve PUUID.")
        return None
    
    server = SERVER_MAPPING.get(region.lower(), "na1")  # Default to NA1 if region is invalid
    mastery_url = f"https://{server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}?api_key={API_KEY}"
    
    try:
        response = requests.get(mastery_url, timeout=10)
        response.raise_for_status()
        mastery_data = response.json()
        mastery_list = []
        for entry in mastery_data:
            mastery_list.append({"mastery": entry["championPoints"], "championId": entry["championId"]})

        mastery_dict = {
            "summonerName": f"{riot_user_name}#{riot_tag_line}",
            "region": server,
            "mastery": mastery_list
        }
        return mastery_dict

    except requests.exceptions.RequestException as e:
        print(f"Failed to get champion masteries: {e}")
        return None

def get_masteries_past(riot_user_name: str, riot_tag_line: str, region: str) -> dict:
    """
    Fetches champion masteries of a player using Riot's Mastery API.
    """
    puuid = get_puuid(riot_user_name, riot_tag_line, region)
    if not puuid:
        print("Error: Could not retrieve PUUID.")
        return None
    
    server = SERVER_MAPPING.get(region.lower(), "na1")  # Default to NA1 if region is invalid
    mastery_url = f"https://{server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}?api_key={API_KEY}"
    
    try:
        response = requests.get(mastery_url, timeout=10)
        response.raise_for_status()
        mastery_data = response.json()
        mastery_list = []
        for entry in mastery_data:
            mastery_list.append({"mastery": entry["championPoints"], "championId": entry["championId"]})

        mastery_dict = {
            "summonerName": f"{riot_user_name}#{riot_tag_line}",
            "region": server,
            "mastery": mastery_list
        }
        return mastery_dict

    except requests.exceptions.RequestException as e:
        print(f"Failed to get champion masteries: {e}")
        return None

def get_winrates_past(riot_user_name: str, riot_tag_line: str, region: str):
    regions = region.upper()
    print(regions)
    print(riot_tag_line)
    print(riot_user_name)
    url = "https://u.gg/api/graphql/"
    summonerWinrate = {}
    regionOf = {
        "LAN": "la1",
        "LAS": "la2",
        "NA": "na1",
        "EUW": "euw1",
        "EUNE": "eun1",
        "BR": "br1",
        "JP": "jp1",
        "KR": "kr",
        "OCE": "oc1",
        "RU": "ru",
        "TR": "tr1",
    }
    
    def fetch_stats(season_id):
        """Fetch player statistics for the given season."""
        payload = json.dumps({
            "operationName": "getPlayerStats",
            "variables": {
                "riotUserName": riot_user_name,
                "riotTagLine": riot_tag_line,
                "regionId": regionOf.get(regions, "na1"),
                "role": 7,
                "seasonId": season_id,
                "queueType": [420],
            },
            "query": """
                query getPlayerStats(
                    $queueType: [Int!], 
                    $regionId: String!, 
                    $role: Int!, 
                    $seasonId: Int!, 
                    $riotUserName: String!, 
                    $riotTagLine: String!
                ) {
                    fetchPlayerStatistics(
                        queueType: $queueType
                        riotUserName: $riotUserName
                        riotTagLine: $riotTagLine
                        regionId: $regionId
                        role: $role
                        seasonId: $seasonId
                    ) {
                        basicChampionPerformances {
                            championId
                            totalMatches
                            wins
                        }
                    }
                }
            """
        })

        headers = {"Content-Type": "application/json"}
        response = requests.post(url, headers=headers, data=payload)

        # Handle 403 Rate Limit
        while response.status_code == 403:
            print("Rate limited. Retrying in 150 seconds...")
            time.sleep(150)
            response = requests.post(url, headers=headers, data=payload)

        return response.json()

    # Fetch stats for **Season 27 & 28**
    seasons = [27, 28]
    for season in seasons:
        playerStats = fetch_stats(season)

        if not playerStats or "data" not in playerStats or "fetchPlayerStatistics" not in playerStats["data"]:
            print(f"Error fetching data for season {season}")
            continue

        for playerStatistics in playerStats["data"]["fetchPlayerStatistics"]:
            if not playerStatistics or "basicChampionPerformances" not in playerStatistics:
                continue

            for championPerformance in playerStatistics["basicChampionPerformances"]:
                champ_id = championPerformance["championId"]
                total_matches = championPerformance["totalMatches"]
                wins = championPerformance["wins"]

                if champ_id in summonerWinrate:
                    summonerWinrate[champ_id]["totalMatches"] += total_matches
                    summonerWinrate[champ_id]["wins"] += wins
                else:
                    summonerWinrate[champ_id] = {"totalMatches": total_matches, "wins": wins}

    # Compute winrates
    winrate_list = [
        {"championID": champ_id, "winrate": (champ["wins"] / champ["totalMatches"] * 100)}
        for champ_id, champ in summonerWinrate.items()
        if champ["totalMatches"] > 0
    ]

    # Print winrates
    for winrate in winrate_list:
        print(winrate)

    # Return formatted data
    winrate_dict = {
        "summonerName": f"{riot_user_name}#{riot_tag_line}",
        "region": region,
        "winrate": winrate_list,
    }
    
    return winrate_dict if winrate_list else None
  
def get_winrates(riot_user_name: str, riot_tag_line: str, region: str):
    print("+++"+riot_user_name, riot_tag_line, region)
    url = "https://u.gg/api/graphql/"
    summonerWinrate = {}
    regionOf = {
        "LAN": "la1",
        "LAS": "la2",
        "NA": "na1",
        "EUW": "euw1",
        "EUNE": "eun1",
        "BR": "br1",
        "JP": "jp1",
        "KR": "kr",
        "OCE": "oc1",
        "RU": "ru",
        "TR": "tr1",
    }
    
    def fetch_stats(season_id):
        """Fetch player statistics for the given season."""
        payload = json.dumps({
            "operationName": "getPlayerStats",
            "variables": {
                "riotUserName": riot_user_name,
                "riotTagLine": riot_tag_line,
                "regionId": regionOf.get(region, "na1"),
                "role": 7,
                "seasonId": season_id,
                "queueType": [420],
            },
            "query": """
                query getPlayerStats(
                    $queueType: [Int!], 
                    $regionId: String!, 
                    $role: Int!, 
                    $seasonId: Int!, 
                    $riotUserName: String!, 
                    $riotTagLine: String!
                ) {
                    fetchPlayerStatistics(
                        queueType: $queueType
                        riotUserName: $riotUserName
                        riotTagLine: $riotTagLine
                        regionId: $regionId
                        role: $role
                        seasonId: $seasonId
                    ) {
                        basicChampionPerformances {
                            championId
                            totalMatches
                            wins
                        }
                    }
                }
            """
        })

        headers = {"Content-Type": "application/json"}
        response = requests.post(url, headers=headers, data=payload)

        # Handle 403 Rate Limit
        while response.status_code == 403:
            print("Rate limited. Retrying in 150 seconds...")
            time.sleep(150)
            response = requests.post(url, headers=headers, data=payload)

        return response.json()

    # Fetch stats for **Season 27 & 28**
    seasons = [27, 28]
    for season in seasons:
        playerStats = fetch_stats(season)

        if not playerStats or "data" not in playerStats or "fetchPlayerStatistics" not in playerStats["data"]:
            print(f"Error fetching data for season {season}")
            continue

        for playerStatistics in playerStats["data"]["fetchPlayerStatistics"]:
            if not playerStatistics or "basicChampionPerformances" not in playerStatistics:
                continue

            for championPerformance in playerStatistics["basicChampionPerformances"]:
                champ_id = championPerformance["championId"]
                total_matches = championPerformance["totalMatches"]
                wins = championPerformance["wins"]

                if champ_id in summonerWinrate:
                    summonerWinrate[champ_id]["totalMatches"] += total_matches
                    summonerWinrate[champ_id]["wins"] += wins
                else:
                    summonerWinrate[champ_id] = {"totalMatches": total_matches, "wins": wins}

    # Compute winrates
    winrate_list = [
        {"championID": champ_id, "winrate": (champ["wins"] / champ["totalMatches"] * 100)}
        for champ_id, champ in summonerWinrate.items()
        if champ["totalMatches"] > 0
    ]

    # Print winrates
    for winrate in winrate_list:
        print(winrate)

    # Return formatted data
    winrate_dict = {
        "summonerName": f"{riot_user_name}#{riot_tag_line}",
        "region": region,
        "winrate": winrate_list,
    }
    
    return winrate_dict if winrate_list else None

def transform_live_game_data(new_data):
    """Converts new API response to old format"""
    old_format = {
        "gameType": new_data.get("gameType"),
        "participants": []
    }

    # Process both teams
    for team_key in ['teamA', 'teamB']:
        team_data = new_data.get(team_key, [])
        team_label = "BLUE" if team_key == "teamA" else "RED"
        
        for participant in team_data:
            old_participant = {
                "championLosses": participant.get("championLosses"),
                "championId": participant.get("championId"),
                "championWins": participant.get("championWins"),
                "currentRole": participant.get("currentRole"),
                "summonerName": participant.get("summonerName"),
                "team": team_label
            }
            old_format["participants"].append(old_participant)

    return old_format

def get_live_match(riot_user_name: str, riot_tag_line: str, region: str):
    print("Getting live match")
    region_mapping = {
        "LAN": "la1",
        "NA": "na1",
        "EUW": "euw1",
        "EUNE": "eun1",
        "BR": "br1",
        "JP": "jp1",
        "KR": "kr",
        "OCE": "oc1",
        "RU": "ru",
        "TR": "tr1"
    }

    url = "https://u.gg/api/graphql/"
    query = """
    query GetLiveGame($riotUserName: String!, $riotTagLine: String!, $regionId: String!) {
        getLiveGame(
            riotUserName: $riotUserName
            riotTagLine: $riotTagLine
            regionId: $regionId
        ) {
            gameType
            queueId
            gameLengthSeconds
            teamA {
                championId
                riotUserName
                riotTagLine
                summonerIconId
                summonerSpellA
                summonerSpellB
                currentRole
                championStats {
                    kills
                    deaths
                    assists
                }
            }
            teamB {
                championId
                riotUserName
                riotTagLine
                summonerIconId
                summonerSpellA
                summonerSpellB
                currentRole
                championStats {
                    kills
                    deaths
                    assists
                }
            }
        }
    }
    """
    region_id = region_mapping.get(region.upper(), "na1")
    payload = {
        "operationName": "GetLiveGame",
        "variables": {
            "riotUserName": riot_user_name,
            "riotTagLine": riot_tag_line,
            "regionId": region_id
        },
        "query": query.strip()
    }
    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        data = response.json()
        
        if 'errors' in data:
            print(f"API Error: {data['errors']}")
            return None

        game_data = data.get('data', {}).get('getLiveGame')
        if not game_data:
            return None

        live_game_data = {
            "gameType": game_data.get("gameType"),
            "queueId": game_data.get("queueId"),
            "gameLengthSeconds": game_data.get("gameLengthSeconds"),
            "participants": []
        }

        for team_key, team_side in [('teamA', 'BLUE'), ('teamB', 'RED')]:
            team_participants = game_data.get(team_key, [])
            for participant in team_participants:
                stats = participant.get('championStats', {})
                live_game_data["participants"].append({
                    "summonerName": participant.get(f"riotUserName")+"#"+participant.get(f"riotTagLine"),
                    "team": team_side,
                    "championId": participant.get("championId"),
                    "currentRole": participant.get("currentRole"),
                    "kills": stats.get("kills", 0),
                    "deaths": stats.get("deaths", 0),
                    "assists": stats.get("assists", 0),
                    "summonerSpellA": participant.get("summonerSpellA"),
                    "summonerSpellB": participant.get("summonerSpellB")
                })
        print(live_game_data)
        return live_game_data
    
    except (requests.exceptions.RequestException, KeyError, TypeError) as e:
        print(f"Error fetching live match: {str(e)}")
        return None