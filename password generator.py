import random
import string
import time
import pyperclip as clipboard
lower_upper_alphabet = string.ascii_letters+"1234567890?"
word=""
n = int(input("Número de caracteres: "))
for i in range (n):
    random_letter = random.choice(lower_upper_alphabet)
    word = word + random_letter

clipboard.copy(word)
print(word)
print("Contraseña copiada al portapapeles!")
time.sleep(5)

