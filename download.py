from pytube import YouTube
link = input("Introduce el link del vídeo: ")
yt = YouTube(link)
ys = yt.streams.get_highest_resolution()
ys.download()
