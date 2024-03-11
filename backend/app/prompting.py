from openai import OpenAI
from os import getenv
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=getenv("OPENAI_API_KEY"))
max_length = 100


def handle_call(input):
    if count_input_token(input) > max_length:
        raise Exception
    response = call_ai(input)
    content = eval(response.choices[0].message.content)
    # log_output(response)
    if not verify_output(content):
        raise Exception
    # print(content)
    return content

# Is supposed to approximate the amount of tokens used by user input
# Currently it only counts length


def count_input_token(input):
    return len(input)


def call_ai(input):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "You are a helpful assistant designed to output JSON composed of latitude and longitude keys."},
            {"role": "user", "content": input}
        ]
    )
    # Returns the following format
    # ChatCompletionMessage(content='{\n    "latitude": 0.0,\n    "longitude": 0.0\n}', role='assistant', function_call=None, tool_calls=None)

    # Prints content of response message
    # print(response.choices[0].message.content)
    return response


# Log output either to file on server or db
def log_output():
    ...


# Make sure out put has atleast latitude and longitude keys
def verify_output(message_data):
    if "latitude" and "longitude" in message_data:
        return True
    return False


if __name__ == "__main__":
    handle_call("Beach, europe")
