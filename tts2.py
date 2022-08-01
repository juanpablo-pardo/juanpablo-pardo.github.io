#pip install pyttsx3
import pyttsx3
engine = pyttsx3.init()
palabra = str(input("Pon algo: "))
engine.say(palabra)
engine.runAndWait()