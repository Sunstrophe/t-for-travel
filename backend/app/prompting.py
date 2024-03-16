from openai import OpenAI
from os import getenv
from dotenv import load_dotenv
from app.exceptions import MaxTokenReachedException, InvalidFormatException

load_dotenv()

client = OpenAI(api_key=getenv("OPENAI_API_KEY"))
max_length = 100

# Is supposed to approximate the amount of tokens used by user input
# Currently it only counts length
def count_input_token(input):
    return len(input)


def call_for_location(input):
    if count_input_token(input) > max_length:
        raise MaxTokenReachedException
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "You are a helpful assistant designed to output JSON composed of latitude and longitude keys."},
            {"role": "user", "content": input}
        ]
    )
    content = eval(response.choices[0].message.content)
    keys = ["latitude", "longitude"]
    if not verify_output(list_of_keys=keys, message_data=content):
        raise InvalidFormatException
    log_output(response)
    return content, input


# Log output either to file on server or db
def log_output(response):
    content_message = response.choices[0].message.content
    created_at = response.created
    usage = response.usage
    log_message = f"Created at {created_at}\nMessage:\n{content_message}\n{usage}\n\n"
    log_path = "../.log"

    with open(log_path, "a") as f:
        f.write(log_message)

# Make sure out put has atleast latitude and longitude keys


def verify_output(list_of_keys: list, message_data):
    for key in list_of_keys:
        if key not in message_data:
            return False
    return True


def call_for_list(location: dict, activity: str):
    system_input = """
    You are a helpful ai designed to output JSON data.
    The output should be formatted as: {'title': title, 'description': description, 'latitude': latitude, 'longitude': longitude}
    Please give locations within 10km of
    """ + f"{location['latitude']} and {location['longitude']}"
    prompt_for = f"Please find me five activities relevant to {activity}"
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_input},
            {"role": "user", "content": prompt_for}
        ]
    )
    print(response)
    log_output(response)
    content = response.choices[0].message.content
    # content = eval(content)
    # keys = ["title", "description", "latitude", "longitude"]
    # if not verify_output(list_of_keys=keys, message_data=content["locations"]):
    #     raise InvalidFormatException
    return content


if __name__ == "__main__":
    # call_for_location("Beach, europe")
    location, activity = call_for_location("Beach, europe")
    call_for_list(location, activity=activity)
