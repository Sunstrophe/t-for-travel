from openai import OpenAI
from os import getenv
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=getenv("OPENAI_API_KEY"))


def call_ai():
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "You are a helpful assistant designed to output JSON composed of latitude and longitude keys."},
            {"role": "user", "content": "music"}
        ]
    )
    print(response.choices[0].message)
    # print()
    # print(response.usage)


call_ai()
